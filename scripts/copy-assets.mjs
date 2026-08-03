import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const publicAssets = [
  "data/Pritish_CV.pdf",
  "data/BTP2_ppt.pdf",
  "images/favicon/favicon.ico",
  "images/favicon/apple-touch-icon.png",
  "images/favicon/android-chrome-192x192.png",
  "images/favicon/android-chrome-512x512.png",
  "images/research/pritish-saha-informal.jpg",
  "images/research/mars-observation-regimes.png",
  "images/research/grit-pipeline.png",
  "images/research/moc-architecture.jpg",
];

for (const asset of publicAssets) {
  const destination = resolve("dist", asset);
  await mkdir(dirname(destination), { recursive: true });
  await cp(resolve(asset), destination);
}
