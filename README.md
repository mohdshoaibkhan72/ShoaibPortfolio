# mohammadshoaibkhan.com

Portfolio of Mohammad Shoaib Khan — React 18 + Vite + Tailwind + Framer Motion, hosted on Hostinger.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build **with prerendering** → `dist/` |
| `npm run og` | Regenerate share images (`public/og/`) and app icons — run after changing `public/og.png` or projects |
| `npm run lint` | ESLint |

## How SEO works

- **`src/seo/meta.js`** is the single source of truth for every page's title, description, canonical URL,
  share image and JSON-LD. Edit text there.
- **`npm run build`** renders every route to static HTML (`scripts/prerender.mjs`), so Google, Bing, AI crawlers
  and link previews (WhatsApp, LinkedIn…) get complete pages without running JavaScript. It also generates
  `sitemap.xml` and `llms.txt` from `src/data/`.
- **Share image:** `public/og.png` is used for the main pages (converted to an optimised `og/default.jpg` by
  `npm run og`). Each project page gets its own card in `public/og/projects/`.
- **Adding a project:** add it to `src/data/projects.js`, run `npm run og`, then `npm run build`. Sitemap,
  prerendered page and llms.txt update automatically.
- **Service pages** (`/services/...`) target search phrases like "React Native developer" and "MERN stack
  developer". Their content, search title and description live in `src/data/services.js` — add an entry there to
  create a new one (no other changes needed).
- **Adding a top-level page:** also add it to `STATIC_PATHS` in `src/seo/meta.js` and to the rewrite rule in
  `public/.htaccess`.

## Deploying to Hostinger

1. `npm run build`
2. Upload **everything inside `dist/`** to `public_html` — including the hidden **`.htaccess`** file and the
   **`_pages/`** folder. Without them, `/about`, `/projects/...` etc. return 404.
3. After the first deploy: in Google Search Console, submit `https://mohammadshoaibkhan.com/sitemap.xml`.
