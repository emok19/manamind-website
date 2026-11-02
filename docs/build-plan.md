# ManaMind website implementation overview

Reviewed against the repository on 2 November 2026. This replaces the initial staged build plan; the site has progressed beyond its original homepage/product-only scope. See [the handover guide](../README.md) for editing and publishing instructions.

## Stack and hosting

- Next.js 16.1.7 App Router, React 19.2.3, TypeScript, Tailwind CSS v4.
- Static export configured in `next.config.ts`; production files are written to `out/`.
- Cloudflare Pages hosts `https://manamind.ai`. The GitHub Action in `.github/workflows/deploy-cloudflare-pages.yml` runs on pushes to `master` and on manual dispatch, using Node.js 20, `npm ci`, `npm run build`, and Wrangler.
- GitHub's source/default branch is `master`; Wrangler passes `--branch=main` for Cloudflare production. The Pages project is `manamind`.
- No separate CMS, application server, database, or runtime content API.

## Current routes

| Routes | Implementation |
|---|---|
| `/` | Homepage: hero, Command Centre showcase, testing pipeline, value propositions, placeholder demo reel. |
| `/product` | Product overview, 3D bot catalogue, architecture, testing pipeline, features, benchmarks, security, contact CTA. |
| `/about` | Company story, team, investors, partners, and press. Structured content is loaded from Markdown. |
| `/careers`, `/careers/[slug]` | Careers overview and a generated page for each role file. |
| `/case-studies`, `/case-studies/[slug]` | Enabled by `CASE_STUDIES_LIVE = true`; only `published: true` entries are loaded. Husk Protocol is the published study. |
| `/contact` | Channel selector and form that opens a prefilled email in the visitor's email app. |
| `/privacy`, `/terms`, `/cookies` | Legal/information pages with route metadata. |
| `/blog`, `/how-it-works` | Coming Soon/stub pages marked `noindex`; not publishing systems. The homepage also has a `#how-it-works` pipeline section. |
| `/hero-options`, `/position-finder`, `/test-annotations`, `/careers/apply-test` | Exported internal/test pages marked `noindex`. They remain accessible by URL. |

## Source map

| Location | Responsibility |
|---|---|
| `src/app/` | Route composition, metadata, root layout, global CSS. |
| `src/components/` | Page sections, shared elements, navigation/footer, cookie banner, animations. |
| `src/lib/content/` | Build-time Markdown frontmatter loaders for team, backers, press, roles, and case studies. |
| `content/` | Content values. Current loaders ignore Markdown body text after frontmatter. |
| `src/data/bots.ts` | Bot catalogue, categories, abilities, status, and model paths. |
| `src/data/roles.ts`, `src/data/case-studies.ts` | Content type definitions; edit the corresponding Markdown files for content. |
| `src/lib/constants.ts` | Shared navigation, analytics ID, product copy/data, and other constants. |
| `src/config/flags.ts` | Case Studies section visibility. |
| `public/` | Images, fonts, GLB models, evidence video/log, static SEO files, Cloudflare headers/redirects. |

Job filenames determine career URL slugs. Case-study filenames supply a default slug; keep the filename, any explicit slug, and `seo.canonical` aligned. Published studies are validated for required fields, records, media references, and local assets. Drafts are filtered out before validation, and the three legacy drafts need migration before publication.

## Design and animation

- Brand tokens live in `src/app/globals.css`: background `#2E1339`, primary `#00FF96`, highlight `#FF4C54`.
- `src/app/layout.tsx` loads local Swiza font files at weights 400, 500, 600, and 700. The original Inter proposal is superseded.
- Framer Motion handles section reveals and many interactions. GSAP packages are also dependencies; CSS defines strikeout and marquee animations.
- `ParticleCanvas.tsx` uses an idle-started canvas loop, 80 particles on desktop/35 on mobile, a roughly 30 fps drawing interval, and pauses when the document is hidden. It skips animation for reduced-motion preference.
- The product bot catalogue uses Three.js/React Three Fiber/Drei and GLB assets. `BotSection.tsx` preloads models and mounts card canvases near the viewport. It is not dynamically imported.
- `FadeInView.tsx` and some CSS animations respect reduced motion. Reduced-motion handling is not universal across every animated component; check new interactions individually.

## Integrations and limits

- GA4 ID `G-PP9ZLMJTTH` comes from `src/lib/constants.ts`. Root scripts load with `afterInteractive`, set default analytics storage to denied, and the cookie banner updates consent. The script is still loaded before a consent choice; this is not a claim that all tracking code is blocked until acceptance.
- Contact submits a `mailto:` link. Studios/partners use `sales@manamind.ai`; press/general enquiries use `emil@manamind.ai`. The visitor must send the email. No CRM, backend contact delivery, or calendar booking integration is implemented.
- Career application destinations come from each role's `applyHref`; the internal `/careers/apply-test` route contains a Tally embed experiment, separate from the contact form.
- App Login still points to `#`; the homepage demo reel is still a placeholder.
- Robots, sitemap, `/llms.txt`, redirects, and response headers are checked in under `public/`. They are not generated from the Markdown loaders.

## Maintenance checks

For a content/code change, use `npm ci`, `npm run dev` for preview, and `npm run build` for the production export. `npm run lint` is separate; the current deployment workflow does not run lint or pull-request checks. Verify deployment in the Actions tab after changes reach `master`.

See [SEO status](seo-audit.md) and [performance review](seo/performance-audit.md) for remaining checks. External account state, search indexing, message delivery, and production performance require separate verification.
