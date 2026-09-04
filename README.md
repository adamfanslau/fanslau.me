# fanslau.me

Personal portfolio and services site for Adam Fanslau — cloud, mobile app, and website development.

**Stack:** Next.js 16 (App Router) · React 19 · three.js · Tailwind CSS v4 · TypeScript · deployed on Vercel.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
npm run lint    # ESLint
```

## Editing content

All copy lives in typed data files under [src/content/](src/content/) — components never hardcode content:

- `site.ts` — name, role, tagline, meta description, availability chip, About paragraphs, Contact intro / "How it works" steps, email, social links, nav
- `services.ts` — the three service pillars (Websites · Automation · Cloud) with icons and hero-tile labels
- `projects.ts` — portfolio projects (the "Work" section)
- `experience.ts`, `skills.ts` — CV content, rendered on the `/cv` page (printable via the page's Print button)

## Deployment

Every push to `main` deploys to production via Vercel; pull requests get preview URLs. The custom domain `fanslau.me` is configured in the Vercel dashboard (Project → Settings → Domains).
