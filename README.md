# Pritish Saha — Portfolio

A research portfolio built with React, TypeScript, and Vite. Every public page is generated as static HTML at build time, so the profile and research are readable without JavaScript. The homepage connects work on state and memory, reinforcement learning for reasoning, and structured RL for coordinated decisions under uncertainty. The design uses warm ivory, forest green, locally hosted DM Sans and Lora fonts, and original research figures.

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run preview
```

The build checks TypeScript, bundles the site, renders all seven pages and a 404 page from the same React components, and copies an explicit list of portfolio assets. It also generates page metadata, a sitemap, and `robots.txt`. Automated checks verify rendered content, local links and section anchors, metadata, and the public file list. Private documents are not part of that list.

## Editing the portfolio

- `src/research-content.ts`: research themes, public project summaries, status, and a brief ongoing thesis note. Use stable project IDs for section links. Keep unpublished hypotheses, experiment protocols, and future proposals out of public source files.
- `src/content.ts`: primary contact email, publications, experience, applied projects, tools, and dated updates; re-exports the research content. The footer and email links use the shared `contactEmail` value.
- `src/pages/HomePage.tsx`: introduction, research focus, four selected research summaries, and recent updates. Keep these aligned with the detailed research entries.
- `src/pages/BackgroundPage.tsx`: education, interests, grouped skills, and ongoing systems learning.
- `src/App.tsx`: navigation and shared contact footer.
- `src/site-metadata.ts`: public page paths, titles, descriptions, and canonical URLs. Keep this list aligned with the routes in `src/App.tsx` when adding pages.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: build-time rendering from the existing React components. The temporary server bundle stays in ignored `.vite/`, outside the deployment output.
- `src/main.tsx`: browser hydration and compatibility with previously shared hash links.
- `src/styles.css` and `src/detail-pages.css`: design and responsive layouts.
- `data/Pritish_CV.pdf`: downloadable CV. Replace the file to update it.
- `scripts/copy-assets.mjs`: images and documents included in production. Add new referenced assets here.
- `scripts/check-build.mjs`: checks for generated HTML, navigation, metadata, and allowed public assets. Update the expected pages or assets here when intentionally adding them.
- `public/fonts/`: locally served fonts and their SIL Open Font License files.

## Pages and navigation

Home, Research, Projects, Experience, About, Publications, and CV each have their own HTML document. Clean URLs such as `/research/` work directly on GitHub Pages, including refreshes and visits without JavaScript. Section links use ordinary fragments, such as `/research/#grit`.

Previously shared URLs such as `/#/background` and `/#/research#grit` redirect in the browser to the corresponding page and section. The GitHub profile README’s existing links continue to work.

Mobile navigation supports keyboard access and Escape to close. Before JavaScript loads, or when it is disabled, the navigation stays visible and the research shortcut works as an ordinary link. The site includes a skip link, visible keyboard focus, reduced-motion support, and direct PDF links alongside the embedded CV preview.

## Deployment

Pushing `main` runs `.github/workflows/deploy.yml`, builds the Vite app, and publishes `dist/` through GitHub Pages. In repository settings, set **Pages → Source** to **GitHub Actions**.

The production site uses only its own origin for fonts, images, and documents. Research links and profile links lead to their original external sources. Local `.preview/` screenshots are ignored by Git and are not deployed.

`Work/`, `MTP/`, and `Safe Gen AI/` are reserved for local research and course materials and are ignored by Git. Nothing in the website imports or links to these folders. Vite also blocks direct development-server access to them and `.preview/`. The build copies only the public assets listed in `scripts/copy-assets.mjs`; unpublished drafts, execution logs, and proposals should remain outside `public/` and that list. Removing these local source folders does not affect the site.
