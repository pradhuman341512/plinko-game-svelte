// vite.config.ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import nodePolyfills from "vite-plugin-node-polyfills";

export default defineConfig(({ ssrBuild }) => ({
  plugins: [sveltekit(), nodePolyfills()],
  resolve: {
    alias: ssrBuild
      ? {
          // SSR build: use Node built-ins (no alias for 'crypto')
        }
      : {
          crypto: "crypto-browserify",
          stream: "stream-browserify",
          buffer: "buffer",
          process: "process/browser",
          constants: "constants-browserify",
          util: "util",
        },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  // Ensure CJS polyfills are prebundled to ESM when used on the client
  ssr: {
    noExternal: [
      "crypto-browserify",
      "stream-browserify",
      "buffer",
      "process",
      "constants-browserify",
      "util",
    ],
  },
  optimizeDeps: {
    include: [
      "crypto-browserify",
      "stream-browserify",
      "buffer",
      "process",
      "constants-browserify",
      "util",
    ],
  },
}));