# fanslau.me

Personal portfolio and services site for Adam Fanslau — cloud, mobile app, and website development.

**Stack:** Next.js 16 (App Router) · React 19 · three.js · Tailwind CSS v4 · TypeScript · built with [vinext](https://vinext.dev) and hosted on Cloudflare Workers (static assets).

## Development

```bash
npm install
npm run dev              # Next.js dev server, http://localhost:3000
npm run dev:vinext       # same app under vinext/Vite, http://localhost:3001
npm run lint             # ESLint
npm run build            # Next.js static export -> out/ (sanity check only)
npm run build:vinext     # production build -> dist/client (what gets deployed)
npm run preview:vinext   # build, then serve dist/client with wrangler on :8787
npm run deploy:vinext    # build, then deploy from this machine (needs `wrangler login`)
```

Both toolchains read the same `next.config.ts` (`output: "export"`, `images.unoptimized`). `next dev` stays the day-to-day dev loop; `vinext build` is the deployable artefact.

## Editing content

All copy lives in typed data files under [src/content/](src/content/) — components never hardcode content:

- `site.ts` — name, role, tagline, meta description, availability chip, About (summary, `whoami` facts, stats strip, photo caption), Contact intro / "Worth including" hints / prefilled email template / "How it works" steps, footer note, email, social links, nav (incl. the header CTA)
- `services.ts` — the three service pillars (Websites · Automation · Cloud) with icons and hero-tile labels
- `projects.ts` — portfolio projects (the "Work" section). A project can carry a short looping `video` (mp4 + webm under `public/projects/`) that plays over its `image`, which doubles as poster and reduced-motion fallback
- `experience.ts`, `skills.ts` — CV content, rendered on the `/cv` page (printable via the page's Print button)

Static metadata files live in [public/](public/) because vinext's static export does not render `app/sitemap.ts`, `app/robots.ts` or `app/opengraph-image.tsx`:

- `sitemap.xml` — add new routes here as the site grows
- `robots.txt`
- `opengraph-image.png` — 1200×630 social card, referenced from `metadata` in `src/app/layout.tsx`. The `next/og` template it was rendered from is in git history (`src/app/opengraph-image.tsx` before the Cloudflare migration).
- `_headers` — immutable caching for content-hashed `/_next/static/*`
- `_redirects` — 301s the old `/bug-blaster` URLs to [bugblaster.fanslau.me](https://bugblaster.fanslau.me), where the game is now hosted (its own repo deploys it to the VPS)

## Deployment

Hosting is a Cloudflare Worker that serves only static assets. `vinext build` writes the whole site to `dist/client/`; [deploy/wrangler.jsonc](deploy/wrangler.jsonc) points at it and has no Worker script. (It lives in `deploy/` rather than the repo root because a root `wrangler.jsonc` makes vinext assume a server-rendered Worker build.)

Deploys run through **Workers Builds** (Cloudflare's Git integration), so pushing works like it did on Vercel:

- Cloudflare dashboard → Workers & Pages → Create → Import a repository → this repo. Worker name **`fanslau-me`** (must match `name` in `deploy/wrangler.jsonc`).
- Build command: `npm run build:vinext`
- Deploy command: `npx wrangler deploy --config deploy/wrangler.jsonc`
- Non-production branch deploy command: `npx wrangler versions upload --config deploy/wrangler.jsonc` (gives every branch/PR a preview URL without touching production)
- Build variable `NEXT_PUBLIC_CF_BEACON_TOKEN` — the Cloudflare Web Analytics site token (dashboard → Web Analytics → Add a site → manual setup). When it is set the layout renders the analytics beacon; locally it is unset (or lives in a gitignored `.env.local`) so dev builds send nothing.
- Custom domain: Worker → Settings → Domains & Routes → add `fanslau.me` (and `www.fanslau.me`). The domain's DNS has to be on Cloudflare.

Routing behaviour worth knowing: the default `html_handling` serves `/cv` from `cv.html`; `/bug-blaster` and anything under it 301 to `https://bugblaster.fanslau.me` via `public/_redirects`; unknown paths get the exported `404.html`.
