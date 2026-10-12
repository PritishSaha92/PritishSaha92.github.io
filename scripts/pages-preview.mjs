import { readFile, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

// Make local preview follow GitHub Pages: canonical directory URLs, case-sensitive
// pages, and the generated 404 document instead of an SPA homepage fallback.
export function pagesPreview() {
  return {
    name: "github-pages-preview",
    async configurePreviewServer(server) {
      const output = resolve(server.config.root, server.config.build.outDir);
      const [notFoundHtml, sitemap] = await Promise.all([
        readFile(resolve(output, "404.html")),
        readFile(resolve(output, "sitemap.xml"), "utf8"),
      ]);
      const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
      const isRead = (request) => request.method === "GET" || request.method === "HEAD";
      const notFound = (request, response) => {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(request.method === "HEAD" ? undefined : notFoundHtml);
      };
      const requestUrl = (request) => {
        try { return new URL(request.url ?? "/", "http://localhost"); } catch { return null; }
      };

      // Check page case before the static middleware: Windows would otherwise
      // accept /Research/ even though GitHub Pages correctly rejects it.
      server.middlewares.use((request, response, next) => {
        if (!isRead(request)) return next();
        const url = requestUrl(request);
        if (!url) return next();
        const normalized = `${url.pathname.replace(/\/index\.html$/i, "/").replace(/\/+$/, "")}/`;
        const page = pages.find((path) => path.toLowerCase() === normalized.toLowerCase());
        if (!page) return next();
        if (![page, page.slice(0, -1), `${page}index.html`].includes(url.pathname)) {
          return notFound(request, response);
        }
        if (url.pathname !== "/" && url.pathname === page.slice(0, -1)) {
          response.statusCode = 308;
          response.setHeader("Location", `${page}${url.search}`);
          return response.end();
        }
        next();
      });

      // Post-hooks run after static files and path rewrites, but before Vite's
      // HTML middleware. Existing rewritten HTML must still reach that middleware.
      return () => {
        server.middlewares.use(async (request, response, next) => {
          if (!isRead(request)) return next();
          const url = requestUrl(request);
          if (!url) return next();
          let pathname;
          try { pathname = decodeURIComponent(url.pathname); } catch { return next(); }
          const candidate = resolve(output, `.${pathname}`);
          const relativePath = relative(output, candidate);
          const insideOutput = relativePath !== ".." && !relativePath.startsWith(`..${sep}`) && !isAbsolute(relativePath);
          if (insideOutput && pathname.endsWith(".html") &&
              await stat(candidate).then((entry) => entry.isFile(), () => false)) return next();
          notFound(request, response);
        });
      };
    },
  };
}
