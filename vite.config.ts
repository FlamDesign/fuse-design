import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  build:
    mode === "artifact"
      ? {
          // The hosted copy is published file by file, so it ships as a few large chunks.
          chunkSizeWarningLimit: 4000,
          rolldownOptions: {
            output: {
              codeSplitting: {
                groups: [
                  { name: "shiki", test: /node_modules[\\/](shiki|@shikijs)/ },
                  { name: "vendor", test: /node_modules/ },
                  { name: "examples", test: /src[\\/]examples/ },
                  { name: "pages", test: /src[\\/]pages/ },
                  { name: "kit", test: /src[\\/]/ },
                ],
              },
            },
          },
        }
      : undefined,
}))
