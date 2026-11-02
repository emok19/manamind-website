# ManaMind SEO status

Reviewed from repository source on 2 November 2026. This replaces the earlier pre-implementation audit: its missing-sitemap, missing-metadata, and hidden-case-study findings are superseded. This review does not claim a fresh production crawl, Google Search Console inspection, Lighthouse run, or local build/lint result.

## Implemented

| Area | Current implementation |
|---|---|
| Hosting and rendering | Next.js static export to Cloudflare Pages at `https://manamind.ai`, deployed by GitHub Actions. No server runtime or CMS. |
| Robots | `public/robots.txt` allows crawling and declares the canonical sitemap URL. |
| Sitemap | `public/sitemap.xml` lists the main public pages, three career detail pages, and Husk Protocol. It is maintained by hand. |
| Canonical URLs | Root `metadataBase` and route-level `alternates.canonical` on substantive public and legal pages. `metadataBase` alone does not create canonical links. |
| Social previews | Root and public route metadata provide Open Graph and Twitter fields; case-study metadata uses the study's SEO fields and artwork. |
| Structured data | `Organization` and `WebSite` in the root layout; `SoftwareApplication` on Home/Product; `Article` and `BreadcrumbList` on published case-study pages. |
| Case studies | `CASE_STUDIES_LIVE = true`. Only `published: true` entries are loaded; Husk Protocol is published. Three draft files remain excluded. |
| Thin/internal pages | Blog, How It Works, hero options, position finder, annotation test, and career application test have `noindex` metadata. They are still exported and accessible. |
| AI-facing summary | `public/llms.txt` includes canonical pages, career links, and the published Husk Protocol case study. No `/llms-full.txt` is present. |
| Legacy redirects | `public/_redirects` maps several old website URLs to current routes. |

Team, investor, partner, and press content appears inside About rather than as individual routes. Role files generate career detail pages; published case studies generate study detail pages. Blog remains a Coming Soon page.

## Remaining work and checks

- **Keep URL inventories aligned.** New/removed/renamed roles and published case studies require manual updates to `public/sitemap.xml`, `public/llms.txt`, links, and appropriate redirects. The loaders do not maintain these files.
- **Search Console state is unverified.** Ownership, sitemap submission, indexing, and crawl errors are external account state. The old audit's claim that it was not set up is not current evidence.
- **No `JobPosting` schema is implemented.** Career pages have metadata and visible job content, but no role-specific JSON-LD. Add it only when the required job details are available; structured data does not guarantee a rich result.
- **App Login is a placeholder.** `Navbar.tsx` still uses `href="#"`.
- **Internal routes remain public.** `noindex` expresses an indexing preference, not access control. Decide whether to retain or remove the design/test routes.
- **Placeholder content remains intentional.** Blog and How It Works are thin/noindex; the homepage demo reel is a placeholder.
- **Production URL behavior needs a live check.** Verify HTTP/HTTPS and www/non-www handling, trailing-slash behavior, redirects, response headers, and canonical consistency against the deployed site.
- **Performance needs current measurements.** See [performance review](seo/performance-audit.md); historical bundle sizes are not current Core Web Vitals evidence.
- **Analytics consent needs browser verification.** Source sets analytics storage to denied and changes it through the cookie banner, but loads the GA script with `afterInteractive`. Check first visit, acceptance, rejection, reload, and reopened settings rather than assuming full consent behavior from the code alone.

## Validation after future changes

1. Run `npm ci` and `npm run build`; inspect the resulting routes and copied `out/robots.txt`, `out/sitemap.xml`, and `out/llms.txt`.
2. Inspect exported HTML for representative public, career, case-study, legal, and internal routes. Check titles, descriptions, canonical URLs, social metadata, JSON-LD, and expected `noindex` directives.
3. Check new asset paths and every sitemap/AI-summary URL against actual exported pages. Confirm unpublished studies stay excluded.
4. Run `npm run lint` separately and record the actual result; it is not part of the current deployment workflow.
5. After deployment, crawl production, validate relevant structured data, inspect social previews, and run mobile/desktop performance checks.
6. With Search Console access, confirm sitemap submission, crawl/indexing status, and URL inspection results. Do not infer account state from files in this repository.
