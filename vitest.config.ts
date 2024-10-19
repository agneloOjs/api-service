import stencil from "unplugin-stencil/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
    },
  },
  plugins: [stencil()],
});
