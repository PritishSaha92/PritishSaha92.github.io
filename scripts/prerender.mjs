import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

// Render the same components used in the browser. The temporary server bundle
// stays outside dist, so GitHub Pages only receives public static files.
await build({
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ".vite/prerender",
    emptyOutDir: true,
    copyPublicDir: false,
  },
});

const { renderPage, pages, notFoundPage, siteUrl } = await import(
  pathToFileURL(resolve(".vite/prerender/entry-server.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const copyrightYear = new Date().getFullYear();
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);

function replaceRequired(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Missing HTML template field: ${pattern}`);
  return html.replace(pattern, () => replacement);
}

function renderDocument(page, pathname, indexable = true) {
  let html = replaceRequired(
    template,
    /<div id="root"><\/div>/,
    `<div id="root" data-build-year="${copyrightYear}">${renderPage(pathname, copyrightYear)}</div>`,
  );
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  const meta = (attribute, name, value) => {
    const pattern = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*\\/?>`);
    html = replaceRequired(html, pattern, `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`);
  };
  meta("name", "description", page.description);
  meta("name", "robots", indexable ? "index, follow" : "noindex, follow");
  meta("property", "og:title", page.title);
  meta("property", "og:description", page.description);
  meta("property", "og:url", indexable ? `${siteUrl}${pathname}` : "");
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    indexable ? `<link rel="canonical" href="${siteUrl}${pathname}" />` : "",
  );
  return html;
}

for (const page of pages) {
  const destination = resolve("dist", `.${page.path}`, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, renderDocument(page, page.path));
}

// GitHub Pages serves this document with a 404 status for unknown paths.
await writeFile("dist/404.html", renderDocument(notFoundPage, "/404/", false));
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`).join("\n")}
</urlset>
`);
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Prerendered ${pages.length} public pages and the 404 page.`);
