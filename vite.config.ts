import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { pagesPreview } from "./scripts/pages-preview.mjs";

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  plugins: [react(), pagesPreview() as Plugin],
  base: "/",
  server: {
    fs: {
      // Research drafts, course materials, and local audit artifacts are never served by the dev server.
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "**/Work/**",
        "**/MTP/**",
        "**/Safe Gen AI/**",
        "**/.preview/**",
      ],
    },
  },
}));
