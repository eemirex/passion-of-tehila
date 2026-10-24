// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Netlify sets NETLIFY=true during its builds. Only then override the Nitro
// preset to "netlify" (serverless function + dist/ static output). Inside the
// Lovable sandbox the config package pins the Cloudflare target and ignores
// user preset options, so this has no effect on Lovable previews/publishes.
const nitro = process.env.NETLIFY === "true" ? { preset: "netlify" } : undefined;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(nitro ? { nitro } : {}),
});
