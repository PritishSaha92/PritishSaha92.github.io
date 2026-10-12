import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App";

export { pages, notFoundPage, siteUrl } from "./site-metadata";

export function renderPage(pathname: string, copyrightYear: number) {
  return renderToString(
    <StaticRouter location={pathname}>
      <App copyrightYear={copyrightYear} />
    </StaticRouter>,
  );
}
