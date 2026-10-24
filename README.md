# Passion of Tehila

Company website for Passion of Tehila, an Ibadan, Nigeria business (General Contracts, Transportation, Construction & Development, and physical planning coordination). Single-page TanStack Start (React 19 + Vite) site styled with Tailwind CSS v4.

## Local development

```sh
npm install
bash scripts/build-media.sh   # reassembles the project video (see below)
npm run dev
```

Tests: `npm test` · Build: `bash scripts/build-media.sh && npm run build`

## Project media

Real media lives in `public/media/` and is served at `/media/...`:

- `pt-logo.png`, `dbahamas-poster.jpg` — committed directly.
- `dbahamas-court-web.mp4` (53 MB) exceeds the repository's 10 MB per-file
  limit, so it is stored as chunks in `media-src/` and gitignored in
  `public/media/`. `scripts/build-media.sh` concatenates the chunks and
  verifies the byte count before every build. Run it after cloning and before
  `npm run dev` or `npm run build`.

## Deploying to Netlify (Free plan)

`netlify.toml` is already configured:

- **Build command:** `bash scripts/build-media.sh && npm run build`
- **Publish directory:** `dist` (Nitro `netlify` preset static output)
- **Functions:** the build emits a serverless function to
  `.netlify/functions-internal/`, which Netlify detects automatically — no
  manual functions directory needed.
- **Node version:** 22

Steps:

1. Push this repository to GitHub (`main`).
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick
   the repository. Netlify reads `netlify.toml`; no settings changes needed.
3. Deploy. The SSR/server routes run in the auto-detected Netlify Function;
   static assets (including `/media/*`) are served from the CDN.

When Netlify builds, it sets `NETLIFY=true`, and `vite.config.ts` switches the
Nitro preset to `netlify`. Inside Lovable the preset stays Cloudflare, so
previews and publishing there are unaffected.

## Notes

- This project was built with [Lovable](https://lovable.dev); edit it in the
  [Lovable editor](https://lovable.dev/projects/f642eb42-da3e-4cd4-a2a4-7b395607bf29)
  or locally — changes sync via GitHub.
- The contact form opens the visitor's own email app with a pre-filled draft;
  no backend or form delivery is involved.
