# Pritish Saha — Academic Homepage

React and TypeScript research portfolio for Pritish Saha. The site uses hash-based routing so every major section has a focused page while remaining compatible with GitHub Pages.

## Pages

- Home
- Research
- Publications
- Experience
- Projects
- Background
- CV

## Local development

```bash
npm install
npm run dev
```

Run a production check with:

```bash
npm run build
npm run preview
```

## Deployment

Pushing `main` runs `.github/workflows/deploy.yml`, builds the Vite app, and publishes `dist/` through GitHub Pages. In the repository settings, set **Pages → Source** to **GitHub Actions**.

The build copies only the public portfolio assets listed in `scripts/copy-assets.mjs`. Private research folders and the local `zuyuanzhang/` reference are not dependencies.
