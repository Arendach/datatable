import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "DataTable",
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
      assetFileNames: 'index.css',
    },
  },
  plugins: [vue()],
});
