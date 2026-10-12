import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { findPage } from "./site-metadata";
import "./styles.css";

// Existing shared URLs used hash routing, including a second hash for a section.
// Load the matching static document before hydrating it.
function redirectLegacyRoute() {
  if (!window.location.hash.startsWith("#/")) return false;
  let destination = "/404.html";
  try {
    const legacyUrl = new URL(window.location.hash.slice(1), window.location.origin);
    const pathname = legacyUrl.origin === window.location.origin ? findPage(legacyUrl.pathname)?.path : undefined;
    if (pathname) destination = `${pathname}${legacyUrl.search || window.location.search}${legacyUrl.hash}`;
  } catch {
    // A malformed old URL should still reach the site's not-found page.
  }
  window.location.replace(destination);
  return true;
}

window.addEventListener("hashchange", redirectLegacyRoute);
if (!redirectLegacyRoute()) {
  const page = findPage(window.location.pathname.replace(/\/index\.html$/, "/"));
  if (page && page.path !== window.location.pathname) {
    window.history.replaceState(null, "", `${page.path}${window.location.search}${window.location.hash}`);
  }
  const root = document.getElementById("root")!;
  const copyrightYear = Number(root.dataset.buildYear) || new Date().getFullYear();
  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <App copyrightYear={copyrightYear} />
      </BrowserRouter>
    </React.StrictMode>
  );
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
  else ReactDOM.createRoot(root).render(app);
}
