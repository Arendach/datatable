import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "DataTable",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [vue()],
})
