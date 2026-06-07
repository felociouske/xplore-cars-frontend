import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: "es2020",

    // Warn if any single chunk exceeds 600kb
    chunkSizeWarningLimit: 600,

    // Minify with esbuild (default, fastest)
    minify: "esbuild",

    // Enable CSS code splitting — only load CSS needed per chunk
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Manual chunk splitting — keeps vendor code separate from app code
        // so returning visitors don't re-download unchanged vendor bundles
        manualChunks: {
          // React core
          "vendor-react": ["react", "react-dom"],

          // Router
          "vendor-router": ["react-router-dom"],

          // Animation
          "vendor-motion": ["framer-motion"],

          // UI / icons
          "vendor-icons": ["lucide-react"],

          // DOMPurify (used in CarDetail for sanitising HTML)
          "vendor-dompurify": ["dompurify"],
        },

        // Content-hash filenames for long-term browser caching
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },

  // Optimise cold-start in dev by pre-bundling heavy deps
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "dompurify",
    ],
  },
}));