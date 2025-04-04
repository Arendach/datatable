import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

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
    cssCodeSplit: false,
  },
  plugins: [vue()],
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
