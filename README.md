# SignalFoundry (working name)

Production-oriented scaffold for an evidence-backed startup opportunity platform: research-terminal UX, structured dossiers, transparent scoring, and routes for public discovery, the logged-in workspace, and admin publishing.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **shadcn/ui** (Base UI primitives)
- **Drizzle ORM** + **postgres** driver (Supabase-compatible Postgres)
- **Zod** (env validation) · **TanStack Table** (keyword grids) · **react-markdown** (sections)

## Prerequisites

- Node.js 20+ or 22+ (LTS recommended; avoid odd major versions if your toolchain warns)
- npm
- Optional: local Postgres or [Supabase](https://supabase.com) project for migrations and `db:seed`

## Setup

```bash
npm install
cp .env.example .env.local
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). **Idea data is served from typed seed data** (`lib/data/seed-ideas.ts`) so the UI works without a database.

## Database (optional)

1. Create a Postgres database and set `DATABASE_URL` in `.env.local`.
2. Apply schema:

```bash
npm run db:push
```

   Or generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

3. Seed normalized rows (skips slugs that already exist):

```bash
npm run db:seed
```

The app’s read path for ideas **currently uses seed objects**, not Drizzle queries—wire `lib/repositories/idea-repository.ts` to Postgres when you are ready for production reads.

## Deploy (free, public URL)

The production build is standard Next.js; the **free [Vercel](https://vercel.com) Hobby** tier is the simplest option (optimized for Next.js, HTTPS included).

1. Push this repo to GitHub (or GitLab / Bitbucket). If you just initialized git: `git add -A && git commit -m "Initial commit"`, create an empty repo on GitHub, then `git remote add origin …` and `git push -u origin main`.
2. In Vercel: **Add New → Project**, import the repo. Framework preset **Next.js**, build command `npm run build`, output default.
3. **Environment variables** (Vercel → Project → Settings → Environment Variables) — mostly optional for this app:
   - `NEXT_PUBLIC_APP_URL` — optional; if unset, the app uses Vercel’s automatic `VERCEL_URL` for sitemap and metadata. Set this when you add a **custom domain** so canonical URLs match your real site.
   - `DATABASE_URL` — optional for this scaffold (ideas load from seed data). When you use Postgres in production, use a free tier such as [Neon](https://neon.tech) or [Supabase](https://supabase.com) and paste the connection string (often append `?sslmode=require` if the host requires SSL).
4. Deploy. Vercel assigns a public `*.vercel.app` URL; you can add a custom domain later in the same dashboard.

**CLI alternative:** install [Vercel CLI](https://vercel.com/docs/cli), run `vercel login`, then from the project root `vercel` (preview) or `vercel --prod` (production). You still set env vars in the Vercel dashboard or via `vercel env`.

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Next.js dev server                   |
| `npm run build`   | Production build                     |
| `npm run start`   | Start production server              |
| `npm run lint`    | ESLint                               |
| `npm run db:generate` | Generate SQL migrations from schema |
| `npm run db:push` | Push schema (dev)                    |
| `npm run db:migrate` | Apply migrations                  |
| `npm run db:studio` | Drizzle Studio                    |
| `npm run db:seed` | Insert seed ideas into Postgres      |

## Project layout

- `app/(public)/` — marketing and public dossier routes (`/`, `/idea-of-the-day`, `/ideas`, `/ideas/[slug]`, `/pricing`, `/about`, `/login`)
- `app/app/` — authenticated workspace shell (stub content; Phase 2–3)
- `app/admin/` — publishing and review (stub; Phase 4)
- `components/idea/` — dossier UI (scores, keywords, sections, evidence, export)
- `lib/data/seed-ideas.ts` — 10 full seed dossiers
- `lib/db/schema.ts` — relational schema aligned with the product spec
- `lib/scoring/` — transparent scoring and badge helpers
- `lib/export/` — markdown / JSON export helpers
- `drizzle/` — generated migrations

## Phasing (from product spec)

1. **Phase 1 (this scaffold):** Schema, seed, public home, idea of the day, archive with filters/sort/pagination, idea detail, shared components, SEO sitemap.
2. **Phase 2:** Supabase Auth, premium gating, Stripe, `/login` implementation.
3. **Phase 3:** Save, compare, exports in-app, workflow generation, dashboard depth.
4. **Phase 4:** Admin editor, ingestion jobs, versions, source monitoring.

## License

Private / unlicensed unless you add one.
