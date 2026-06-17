# ManaMind Website

Marketing website for ManaMind. Built with Next.js (static export) and Tailwind CSS, hosted on Cloudflare Pages at [manamind.ai](https://manamind.ai).

This README is the handover guide. It explains how the site is put together, how to change content, and how to publish. You do not need to understand all of it to edit text or images, that part is in [Editing content](#editing-content).

---

## What this is in one paragraph

Every page is a static HTML file generated ahead of time. There is no server and no database. The words and images on the marketing sections (team, investors, partners, press, careers, case studies) come from plain text files in the `content/` folder. When those files change and the site is rebuilt, the live pages update. Visual layout and design live in the `src/` folder.

## Tech stack

| Piece | What it is |
|---|---|
| Next.js 16 (App Router) | The framework. Set to `output: "export"`, so it produces a folder of static HTML. |
| React 19 + TypeScript | The page components. |
| Tailwind CSS v4 | Styling. |
| gray-matter | Reads the `content/*.md` text files at build time. |
| Three.js / React Three Fiber | The 3D bot visuals. |
| GSAP / Framer Motion | Animations. |
| Cloudflare Pages | Hosting for manamind.ai. |

## Project structure

```
content/              <- TEXT YOU EDIT lives here (markdown)
  team/               <- one .md file per team member
  investors/          <- one .md file per investor
  partners/           <- one .md file per partner
  press/              <- one .md file per press article
  roles/              <- one .md file per open job
  case-studies/       <- one .md file per case study

public/               <- IMAGES, fonts, 3D models, favicon
  team-emil.jpg, etc.

src/
  app/                <- the pages, one folder per URL
    page.tsx          <- homepage (/)
    about/page.tsx    <- /about
    careers/page.tsx  <- /careers
    ... (product, contact, blog, case-studies, etc.)
    layout.tsx        <- shared shell: header, footer, fonts
    globals.css       <- global styles
  components/         <- reusable building blocks (header, footer, sections)
  lib/content/        <- loaders that read the content/ markdown files
  data/               <- structured data (bots, case studies, roles)
  config/flags.ts     <- on/off switches for sections (see Feature flags)
  types/              <- shared TypeScript types

next.config.ts        <- build config (static export, image settings)
```

## Editing content

This is the common task. Most changes are editing a markdown file in `content/`.

Each file has a top section between `---` lines (called frontmatter) holding the fields, and an optional body below. Example, `content/team/emil-kostadinov.md`:

```markdown
---
order: 1
name: Emil Kostadinov
role: Co-Founder & CEO
photo: /team-emil.jpg
bio: >-
  Emil is a lifelong gamer and racing driver...
---
```

To change Emil's bio, edit the `bio` text. To change his title, edit `role`. To reorder team members, change `order` (lower numbers show first).

- **Add a team member:** copy an existing file in `content/team/`, rename it, edit the fields, and add the photo to `public/`. Point `photo:` at the new image, for example `photo: /team-newperson.jpg`.
- **Add an investor / partner / press item / job:** same pattern in the matching `content/` folder. Copy an existing file as your template.
- **Change a photo:** drop the new image into `public/`, then update the `photo:` field to match the filename.

Keep the `---` lines and the field names exactly as they are. Only change the values.

### Changing page layout or wording that is not in `content/`

Headlines, buttons, and section copy that are written directly into the pages live in `src/app/<page>/page.tsx` and the components in `src/components/`. These are code files. Editing them is fine but a little more involved than the markdown files.

## Feature flags

`src/config/flags.ts` holds simple on/off switches for whole sections. For example, Case Studies is currently hidden:

```ts
export const CASE_STUDIES_LIVE = false;
```

Set a flag to `true`, rebuild, and redeploy to make that section public. The underlying work stays in the repo either way, the flag just controls whether visitors see it.

## Running the site locally

You need [Node.js](https://nodejs.org) version 20 installed. Then, from the project folder:

```bash
npm install      # first time only, installs dependencies
npm run dev      # starts a local preview
```

Open [http://localhost:3000](http://localhost:3000). The preview updates as you save changes. This does not affect the live site, it is only on your machine.

## Publishing changes (deploy)

The site builds to a `out/` folder of static files, which Cloudflare serves.

**If auto-deploy is set up** (repo connected to Cloudflare Pages): just push your changes to the `master` branch on GitHub. Cloudflare rebuilds and publishes manamind.ai automatically in about a minute. Nothing else to do.

**Manual deploy** (if auto-deploy is not connected):

```bash
npx next build
npx wrangler pages deploy out --project-name=manamind --branch=master --commit-dirty=true
```

Build settings used by Cloudflare:

| Setting | Value |
|---|---|
| Build command | `npx next build` |
| Output directory | `out` |
| Production branch | `master` |
| Node version | `20` (env var `NODE_VERSION=20`) |

## Gotchas worth knowing

- **Static export, no server.** Anything needing a live backend (form handling, databases) will not work as a plain Next.js feature. The site is intentionally all static.
- **Images are unoptimized.** Required for static export. Compress large images before adding them.
- **25 MB file limit on Cloudflare Pages.** Do not commit very large files into `public/`. Source 3D exports were deliberately kept out; only the `.glb` files the site uses are included.
- **Default branch is `master`,** not `main`. Deploys and the Cloudflare connection use `master`.

## Known cleanups (optional, not blocking)

- `src/app/how-it-works/page.tsx` is an orphaned stub; the homepage CTA points to a `#how-it-works` anchor instead. Either delete the route or redirect it.
- `src/app/hero-options/page.tsx` and `src/app/test-annotations/page.tsx` look like internal design explorations and can likely be deleted.
- SEO gaps flagged by the SEO contractor: no `sitemap.xml`, no `robots.txt`, Google Search Console not set up.
