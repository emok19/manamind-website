# ManaMind Website

Marketing website for ManaMind. Built with Next.js (static export) and Tailwind CSS, hosted on Cloudflare Pages at [manamind.ai](https://manamind.ai).

This README is the handover guide. It explains how the site is put together, how to change content, and how to publish. You do not need to understand all of it to edit text or images, that part is in [Editing content](#editing-content).

Last checked against the repository: 2 November 2026. See the [documentation index](docs/README.md) for architecture, SEO, asset provenance, and the original design references.

---

## What this is in one paragraph

Every page is a static HTML file generated ahead of time. There is no application server, database, or separate CMS/admin login. Team, investors, partners, press, careers, and case studies are read from plain text files in `content/`. Other page copy and layouts live in `src/`. Pushing or merging changes into `master` triggers GitHub Actions to build and publish the site to Cloudflare Pages.

## Tech stack

| Piece | What it is |
|---|---|
| Next.js 16 (App Router) | The framework. Set to `output: "export"`, so it produces a folder of static HTML. |
| React 19 + TypeScript | The page components. |
| Tailwind CSS v4 | Styling. |
| gray-matter | Reads `content/<section>/*.md` frontmatter at build time. |
| Three.js / React Three Fiber | The 3D bot visuals. |
| Framer Motion / CSS | Animations. |
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
  data/               <- bot content and type definitions for roles/case studies
  config/flags.ts     <- on/off switches for sections (see Feature flags)
  types/              <- shared TypeScript types

next.config.ts        <- build config (static export, image settings)
.github/workflows/    <- automatic build and Cloudflare Pages deployment
```

## Editing content

For structured content, edit a markdown file in `content/`. For headlines, buttons, and other page copy, use the relevant component in `src/`.

| What you want to change | Where to edit | Where it appears |
|---|---|---|
| Team names, titles, photos, bios | `content/team/` | About |
| Investor and partner names/logos | `content/investors/`, `content/partners/` | About |
| Press articles, podcasts, mentions | `content/press/` | About, grouped by `type` (`article`, `podcast`, `mention`) |
| Job listings and descriptions | `content/roles/` | Careers and individual job pages |
| Case studies | `content/case-studies/` | Case Studies and published detail pages |
| Bot names, categories, abilities, status | `src/data/bots.ts` | Product bot catalogue |
| Headlines, buttons, contact destinations, layout | `src/app/`, `src/components/`, `src/lib/constants.ts` | Relevant pages |

The Blog page is a Coming Soon page; there is no blog-post publishing system. Press entries appear on About.

Each file has a top section between `---` lines (called YAML frontmatter) holding the fields. The current loaders read only those fields; text added below the closing `---` will not appear on the site. Example, `content/team/emil-kostadinov.md`:

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

Keep the `---` lines, field names, indentation, and list structure intact. Only change the values. For a multi-line field such as `bio: >-`, keep the text indented beneath the field. If a short value contains a colon followed by a space, wrap it in quotes, for example `title: "Interview: ManaMind"`.

### Editing on GitHub in your browser (no software needed)

You can do everything below at [github.com/emok19/manamind-website](https://github.com/emok19/manamind-website), signed into your GitHub account. Nothing to install.

**Update an existing entry** (for example, change a team bio or a job description):

1. Open the repo on GitHub and click into the right folder, for example `content` then `team`.
2. Click the file you want, for example `emil-kostadinov.md`.
3. Click the **pencil icon** (top right of the file) to edit it.
4. Change the text after the field you want, for example the words after `bio:`. Leave the `---` lines and the field names (`name:`, `role:`, etc.) exactly as they are.
5. Click **Commit changes** and add a short description. For review, choose a new branch and open a pull request targeting `master`. You can also commit directly to `master` if your permissions allow and the change is ready to publish.
6. Changes publish only once they reach `master`. Check the **Deploy to Cloudflare Pages** run in the [Actions tab](https://github.com/emok19/manamind-website/actions/workflows/deploy-cloudflare-pages.yml). A successful run confirms deployment; a branch commit or an open pull request does not publish by itself. Build time varies.

**Add a new entry** (for example, a new team member, investor, or press link). The easiest way is to copy an existing file as a template so the fields are already correct:

1. Open an existing file of the same type (for example another team member).
2. Copy its raw text, including the `---` lines, so you have the field structure to reuse.
3. Go back to the folder, click **Add file** then **Create new file** (top right).
4. If you are already in `content/team/`, name the file `jane-doe.md` (lowercase, words joined by hyphens). Do not repeat the folder path. From the repository root, use the full path `content/team/jane-doe.md`.
5. Paste the copied text, then change the values to the new entry. Keep the `---` lines and field names.
6. Commit the change and merge into `master` when ready, following the steps above. Set `order` to control display order (lower numbers first).

**Images** (a new team photo, for example): in the GitHub folder, use **Add file** then **Upload files** to add the image to the `public/` folder, then set the `photo:` field to match the filename, for example `photo: /jane-doe.jpg`.

Use a leading `/` in image paths and omit `public/`: `public/team/jane-doe.jpg` becomes `/team/jane-doe.jpg`. Names and letter case must match exactly. Include new assets and the content referencing them in the same branch/pull request before merging.

**Job pages:** the filename determines the URL (`founding-ai-engineer.md` becomes `/careers/founding-ai-engineer`). Job descriptions use structured fields such as `about`, `roleParagraphs`, and `responsibilities`; copy an existing role's full structure. All role files are published; there is no draft flag. Delete a file to remove a role. Renaming or removing a published URL also requires updating `public/sitemap.xml`, `public/llms.txt`, and any links; use `public/_redirects` for an appropriate replacement URL.

**Case studies:** the section is live. Only entries with `published: true` are published. Use `husk-protocol.md` as the current schema reference; the other three files are unpublished drafts using an older structure. Start a new entry with `published: false`. Before publishing, complete the SEO fields, organizations, game details, media, findings, results, and testimonials. The build validates required records, media IDs, and referenced assets. Keep the filename, any explicit `slug`, and `seo.canonical` aligned, and maintain the sitemap and `/llms.txt` when publishing or removing a study. Changing `published` alone does not update those files.

For a new layout or content format, ask Will to update the components and loader in the repo.

### Changing page layout or wording that is not in `content/`

Headlines, buttons, and section copy that are written directly into the pages live in `src/app/<page>/page.tsx` and the components in `src/components/`. These are code files. Editing them is fine but a little more involved than the markdown files.

## Feature flags

`src/config/flags.ts` holds the Case Studies section switch. It is currently enabled:

```ts
export const CASE_STUDIES_LIVE = true;
```

Setting it to `false` makes the section and generated detail pages show Coming Soon content with `noindex`; it does not remove those generated detail routes. Individual entries are controlled separately by `published` in their content files.

## Running the site locally

The deployment workflow uses Node.js 20. To match it locally, use the same version and run these commands from the project folder:

```bash
npm ci           # installs the versions recorded in package-lock.json
npm run dev      # starts a local preview
```

Open [http://localhost:3000](http://localhost:3000). The preview updates as you save changes. This does not affect the live site, it is only on your machine.

Run `npm run build` before publishing to check the production export in `out/`. Use `npm run dev` for local preview; `npm run start` is not the preview command for this static-export setup. `npm run lint` is available separately and is not part of the deployment workflow.

## Publishing changes (deploy)

The site builds to a `out/` folder of static files, which Cloudflare serves.

**Automatic deployment is configured** in [`.github/workflows/deploy-cloudflare-pages.yml`](.github/workflows/deploy-cloudflare-pages.yml). Every push to `master` (including a merged pull request) triggers GitHub Actions to:

1. Check out the repository and set up Node.js 20.
2. Run `npm ci` and `npm run build`.
3. Upload `out/` to the Cloudflare Pages project `manamind` using Wrangler.

The workflow can also be started manually from the Actions tab. It uses the repository secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`; editors do not need those credentials. This is a GitHub Actions deployment, rather than relying on a Cloudflare Git integration.

**Branch naming matters:** the GitHub source/default branch is `master`, but the deployment command deliberately passes `--branch=main` because Cloudflare Pages uses `main` as its production branch. Keep that distinction when deploying manually.

**Manual deploy** (fallback for someone with Cloudflare credentials, from the intended `master` checkout):

```bash
npm ci
npm run build
npx wrangler pages deploy out --project-name=manamind --branch=main --commit-dirty=true
```

Settings used by the GitHub Actions workflow:

| Setting | Value |
|---|---|
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `out` |
| GitHub source branch | `master` |
| Cloudflare production branch argument | `main` |
| Cloudflare Pages project | `manamind` |
| Node version | `20` via `actions/setup-node` |

If deployment fails, open the failed Actions run and inspect the install, build, or deploy step. Fix the reported content/code issue, or ask the repository owner to check the Cloudflare secrets if authentication failed. The workflow runs on pushes to `master` and manual dispatches; it does not currently run a build on pull requests.

## Gotchas worth knowing

- **Static export, no server.** Anything needing a live backend (form handling, databases) will not work as a plain Next.js feature. The site is intentionally all static.
- **Images are unoptimized.** Required for static export. Compress large images before adding them.
- **25 MB file limit on Cloudflare Pages.** Do not commit very large files into `public/`. Source 3D exports were deliberately kept out; only the `.glb` files the site uses are included.
- **GitHub uses `master`; Cloudflare's production deployment argument is `main`.** See the workflow above.
- **Contact uses the visitor's email app.** `ContactConsole.tsx` builds a `mailto:` link: studio/partner enquiries go to `sales@manamind.ai`, press/general enquiries to `emil@manamind.ai`. There is no server-side contact submission, CRM integration, or embedded booking calendar in this checkout.
- **SEO inventories are maintained by hand.** `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt` are checked-in files, not generated from `content/`.

## Known cleanups (optional, not blocking)

- `src/app/how-it-works/page.tsx` is an orphaned stub; the homepage CTA points to a `#how-it-works` anchor instead. Either delete the route or redirect it.
- Internal design/test routes (`/hero-options`, `/position-finder`, `/test-annotations`, `/careers/apply-test`) are marked `noindex` but remain accessible. Decide whether they still need to be exported.
- The homepage demo reel is a placeholder, and App Login links to `#`. Publishing either feature needs a real asset or destination.
- Sitemap, robots, canonical metadata, social metadata, and JSON-LD are implemented. See [SEO status](docs/seo-audit.md) for remaining checks. Google Search Console ownership/submission and production performance cannot be established from the repository alone.
