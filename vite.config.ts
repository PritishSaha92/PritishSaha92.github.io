import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
        "**/Safe Gen AI/**",
        "**/.preview/**",
      ],
    },
  },
});
