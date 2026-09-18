# Pritish Saha — Portfolio

A research portfolio built with React, TypeScript, and Vite. The homepage connects work on state and memory, reinforcement learning for reasoning, and adaptation from costly feedback. The design uses warm ivory, forest green, locally hosted DM Sans and Lora fonts, and original research figures.

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

The build checks TypeScript, bundles the site, and copies an explicit list of portfolio assets. Private documents are not part of that list.

## Editing the portfolio

- `src/research-content.ts`: research themes, public project summaries, status, and a brief early-stage thesis note. Use stable project IDs for section links. Keep unpublished hypotheses, experiment protocols, and future proposals out of public source files.
- `src/content.ts`: primary contact email, publications, experience, applied projects, tools, and dated updates; re-exports the research content. The footer and email links use the shared `contactEmail` value.
- `src/pages/HomePage.tsx`: introduction, research focus, four selected research summaries, and recent updates. Keep these aligned with the detailed research entries.
- `src/pages/BackgroundPage.tsx`: education, interests, grouped skills, and ongoing systems learning.
- `src/App.tsx`: navigation, page titles, and shared contact footer.
- `src/styles.css` and `src/detail-pages.css`: design and responsive layouts.
- `data/Pritish_CV.pdf`: downloadable CV. Replace the file to update it.
- `scripts/copy-assets.mjs`: images and documents included in production. Add new referenced assets here.
- `public/fonts/`: locally served fonts and their SIL Open Font License files.

## Pages and navigation

Home, Research, Projects, Experience, About, Publications, and CV. Hash routing keeps direct links compatible with GitHub Pages. Existing routes, including `/#/background`, are preserved. Featured work links open the relevant section, such as `/#/research#grit`.

Mobile navigation supports keyboard access and Escape to close. The site includes a skip link, visible keyboard focus, reduced-motion support, and direct PDF links alongside the embedded CV preview.

## Deployment

Pushing `main` runs `.github/workflows/deploy.yml`, builds the Vite app, and publishes `dist/` through GitHub Pages. In repository settings, set **Pages → Source** to **GitHub Actions**.

The production site uses only its own origin for fonts, images, and documents. Research links and profile links lead to their original external sources. Local `.preview/` screenshots are ignored by Git and are not deployed.

`Work/` and `Safe Gen AI/` contain local research and course materials and are ignored by Git. Nothing in the website imports or links to these folders. Vite also blocks direct development-server access to them and `.preview/`. The build copies only the public assets listed in `scripts/copy-assets.mjs`; unpublished drafts, execution logs, and proposals should remain outside `public/` and that list. Removing either local source folder does not affect the site.
