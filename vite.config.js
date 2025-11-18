import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        page2: resolve(__dirname, "index2.html"),
        page3: resolve(__dirname, "index3.html")
      }
    }
  },
});
