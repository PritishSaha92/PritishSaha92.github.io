import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Check the published files independently of the renderer and its route table.
const output = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const origin = "https://pritishsaha92.github.io";
const pages = new Map([
  ["/", "Pritish Saha — Machine learning & research"],
  ["/research/", "Research · Pritish Saha"],
  ["/projects/", "Projects · Pritish Saha"],
  ["/experience/", "Experience · Pritish Saha"],
  ["/background/", "About · Pritish Saha"],
  ["/publications/", "Publications · Pritish Saha"],
  ["/cv/", "CV · Pritish Saha"],
]);
const errors = [];
const documents = new Map();
const check = (condition, message) => { if (!condition) errors.push(message); };
const decode = (value) => value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
  if (name.startsWith("#")) {
    const number = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : Number(name.slice(1));
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  }
  return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[name.toLowerCase()];
});
const text = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

function parse(html) {
  const markup = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b([^>]*)>[\s\S]*?<\/\1>/gi, "<$1$2></$1>");
  const tags = [...markup.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)].map((match) => {
    const attributes = {};
    for (const attribute of match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attributes[attribute[1].toLowerCase()] = decode(attribute[2] ?? attribute[3] ?? attribute[4] ?? "");
    }
    return { name: match[1].toLowerCase(), attributes };
  });
  return { html, tags, ids: new Set(tags.map(({ attributes }) => attributes.id).filter(Boolean)) };
}

async function loadDocument(file) {
  if (!documents.has(file)) documents.set(file, parse(await readFile(file, "utf8")));
  return documents.get(file);
}

async function localTarget(url) {
  const file = resolve(output, `.${decodeURIComponent(url.pathname)}`);
  if (file !== output && !file.startsWith(`${output}${sep}`)) throw new Error("path leaves dist");
  const info = await stat(file);
  const target = info.isDirectory() ? resolve(file, "index.html") : file;
  if (!(await stat(target)).isFile()) throw new Error("not a file");
  return target;
}

async function checkReferences(document, path) {
  const base = `${origin}${path}`;
  for (const { name, attributes } of document.tags) {
    const references = [attributes.href, attributes.src].filter((value) => value !== undefined);
    if (name === "meta" && attributes.property === "og:image") references.push(attributes.content);
    for (const reference of references) {
      if (/^(?:mailto:|tel:|data:)/i.test(reference)) continue;
      if (!reference || /^(?:javascript:|#\/?$)/i.test(reference)) {
        check(false, `${path}: <${name}> has a nonfunctional URL: ${reference}`);
        continue;
      }
      let url;
      try { url = new URL(reference, base); } catch {
        check(false, `${path}: invalid URL ${reference}`);
        continue;
      }
      if (url.origin !== origin) continue;
      check(!url.hash.startsWith("#/"), `${path}: legacy hash route remains: ${reference}`);
      if (name === "a" && pages.has(`${url.pathname}/`)) {
        check(false, `${path}: page link needs a trailing slash: ${reference}`);
      }
      try {
        const target = await localTarget(url);
        if (url.hash && extname(target) === ".html") {
          const targetDocument = await loadDocument(target);
          const fragment = decodeURIComponent(url.hash.slice(1));
          check(targetDocument.ids.has(fragment), `${path}: missing fragment target: ${reference}`);
        }
      } catch (error) {
        check(false, `${path}: unresolved local URL ${reference} (${error.message})`);
      }
    }
  }
}

async function checkPage(path, expectedTitle, isNotFound = false) {
  const file = resolve(output, path === "/404.html" ? "404.html" : `.${path}index.html`);
  let document;
  try { document = await loadDocument(file); } catch (error) {
    check(false, `${path}: missing generated HTML (${error.message})`);
    return;
  }
  const { html, tags, ids } = document;
  const title = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const meta = (key) => tags.filter(({ name, attributes }) => name === "meta" && (attributes.name === key || attributes.property === key));
  const canonical = tags.filter(({ name, attributes }) => name === "link" && attributes.rel === "canonical");
  check(title === expectedTitle, `${path}: incorrect page title: ${title}`);
  check(ids.has("root") && ids.has("main-content"), `${path}: missing application or main-content root`);
  check(text(main).length > 100, `${path}: substantive page content is missing from the initial HTML`);
  check((main.match(/<h1\b/gi) ?? []).length === 1, `${path}: expected one visible page heading in main`);
  check(meta("description").length === 1 && meta("description")[0].attributes.content?.trim().length > 40, `${path}: missing page description`);
  check(meta("og:title")[0]?.attributes.content === title, `${path}: Open Graph title does not match the page`);
  check(meta("og:description")[0]?.attributes.content?.trim().length > 40, `${path}: missing Open Graph description`);
  if (isNotFound) {
    check(canonical.length === 0, "404.html: do not canonicalize an unknown URL");
    check(meta("robots").some(({ attributes }) => /\bnoindex\b/i.test(attributes.content)), "404.html: missing noindex");
  } else {
    const expectedUrl = `${origin}${path}`;
    check(canonical.length === 1 && canonical[0].attributes.href === expectedUrl, `${path}: incorrect canonical URL`);
    check(meta("og:url")[0]?.attributes.content === expectedUrl, `${path}: incorrect Open Graph URL`);
    check(!meta("robots").some(({ attributes }) => /\bnoindex\b/i.test(attributes.content)), `${path}: public page is marked noindex`);
  }
  if (path === "/") {
    check([...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].some((match) =>
      text(match[2]).includes("Explore my research") && /href=["'](?:\/?#research-focus)["']/.test(match[1])
    ), "Home: Explore my research must be a working anchor without JavaScript");
  }
  await checkReferences(document, path);
}

for (const [path, title] of pages) await checkPage(path, title);
await checkPage("/404.html", "Page not found · Pritish Saha", true);

try {
  const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  const expected = [...pages.keys()].map((path) => `${origin}${path}`);
  check(urls.length === expected.length && new Set(urls).size === expected.length && expected.every((url) => urls.includes(url)), "Sitemap must list each public canonical page exactly once, without hashes or 404");
  const robots = await readFile(resolve(output, "robots.txt"), "utf8");
  check(new RegExp(`^Sitemap:\\s*${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml\\s*$`, "im").test(robots), "robots.txt must advertise the canonical sitemap");
  check(!/^Disallow:\s*\/\s*$/im.test(robots), "robots.txt blocks the entire portfolio");
} catch (error) {
  check(false, `Missing crawler metadata: ${error.message}`);
}

// Only explicitly published documents and images may leave the working repo.
const publicFiles = new Set([
  "index.html", "404.html", "favicon.svg", "robots.txt", "sitemap.xml", ".nojekyll",
  ...[...pages.keys()].filter((path) => path !== "/").map((path) => `${path.slice(1)}index.html`),
  "data/Pritish_CV.pdf", "data/BTP2_ppt.pdf",
  "images/favicon/favicon.ico", "images/favicon/apple-touch-icon.png",
  "images/favicon/android-chrome-192x192.png", "images/favicon/android-chrome-512x512.png",
  "images/research/pritish-saha-informal.jpg", "images/research/pritish-saha-formal.jpg",
  "images/research/axis-collector-ring.png", "images/research/mars-observation-regimes.png",
  "images/research/grit-pipeline.png", "images/research/moc-architecture.jpg",
]);
async function inspectFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) { await inspectFiles(file); continue; }
    const path = relative(output, file).split(sep).join("/");
    const generatedAsset = /^assets\/[^/]+\.(?:css|js)$/.test(path);
    const localFont = /^fonts\/(?:[^/]+\.woff2|fonts\.css|(?:dmsans|lora)-OFL\.txt)$/.test(path);
    check(publicFiles.has(path) || generatedAsset || localFont, `Unexpected published file (possibly private or a template leftover): ${path}`);
  }
}
try { await inspectFiles(output); } catch (error) { check(false, `Cannot inspect build: ${error.message}`); }

if (errors.length) {
  console.error(`Static build checks failed (${errors.length}):\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Static build checks passed: 7 readable pages, metadata, local links, fragments, no-JS CTA, 404, sitemap and public assets.");
}
