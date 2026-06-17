# ManaMind SEO Audit

## Context / Stack

- Next.js App Router.
- Next 16.1.7 and React 19.2.3.
- Static export via `output: "export"`.
- Hosted on Cloudflare Pages.
- Production domain: `https://manamind.ai`.
- No server runtime, no CMS.
- Page copy lives in React components.
- Structured content lives in `content/`.
- GA4 exists and is consent-gated.
- Google Search Console is not currently set up.
- `npm run build` passes.
- `npm run lint` currently fails due to pre-existing non-SEO issues.

## Baseline Checks

- Public routes are emitted as static HTML in `out/`.
- Main crawlable pages include `/`, `/about`, `/product`, `/careers`, `/case-studies`, `/blog`, `/contact`, `/privacy`, `/terms`, `/cookies`, career detail pages, and case-study detail pages.
- Internal/test-style pages are also exported: `/hero-options`, `/position-finder`, and `/test-annotations`.
- Root metadata exists in `src/app/layout.tsx`.
- Several main pages define their own title and description.
- No `sitemap.xml` found in `public/` or `out/`.
- No `robots.txt` found in `public/` or `out/`.
- No canonical tags found in emitted HTML.
- No Open Graph or Twitter card metadata found.
- No JSON-LD structured data found.
- Markdown content is loaded at build time. `content/roles` becomes crawlable career detail pages. `content/case-studies` becomes exported routes, but the live flag currently renders Coming Soon content. Press, team, investor, and partner markdown is used inside pages, not as standalone crawlable pages.

## Critical Issues

None found. The site builds and the primary pages produce crawlable static HTML.

## High Issues

- Missing `sitemap.xml`.
  - Files: `public/`, `out/`
  - Impact: Search engines have no explicit URL inventory.

- Missing `robots.txt`.
  - Files: `public/`, `out/`
  - Impact: No crawl guidance and no sitemap discovery hint.

- No canonical URL implementation.
  - Files: `src/app/layout.tsx`, route `page.tsx` files
  - Impact: Duplicate URL variants may be ambiguous on Cloudflare Pages.

- Internal/test pages are publicly exported and indexable.
  - Files: `src/app/hero-options/page.tsx`, `src/app/position-finder/page.tsx`, `src/app/test-annotations/page.tsx`
  - Impact: Thin or non-production pages may enter the index.

- Case-study detail pages are exported while `CASE_STUDIES_LIVE = false`.
  - Files: `src/config/flags.ts`, `src/app/case-studies/[slug]/page.tsx`
  - Impact: Detail URLs exist but render Coming Soon content, creating thin/duplicative pages.

## Medium Issues

- Metadata coverage is incomplete.
  - Files: `src/app/cookies/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/how-it-works/page.tsx`, internal/test pages
  - Impact: Several pages inherit homepage title/description.

- No Open Graph or Twitter metadata.
  - Files: `src/app/layout.tsx`, route metadata exports
  - Impact: Weak social/link previews.

- No JSON-LD structured data.
  - Files: `src/app/layout.tsx`, career detail route, product/about pages
  - Impact: Missed eligibility for richer search understanding.

- `/blog` and `/case-studies` are crawlable Coming Soon pages.
  - Files: `src/app/blog/page.tsx`, `src/app/case-studies/page.tsx`
  - Impact: Thin content unless intentionally indexed prelaunch.

- Static export requires all SEO artifacts to be generated at build time.
  - File: `next.config.ts`
  - Impact: No server-side redirects, dynamic robots behavior, or runtime metadata fixes.

## Low Issues

- Image alt text is mostly present, but some logo/headshot alt text is minimal.
  - Files: `src/components/about/BackedBy.tsx`, `src/components/about/TeamSection.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

- Heading structure is mostly sound on main pages, but internal/test routes have non-production heading patterns.
  - Files: `src/app/hero-options/page.tsx`, `src/app/position-finder/page.tsx`, `src/app/test-annotations/page.tsx`

- `App Login` uses `href="#"`.
  - File: `src/components/layout/Navbar.tsx`
  - Impact: Poor navigation/crawl hygiene.

- Performance/Core Web Vitals risks exist from many preloaded font weights, animation-heavy sections, unoptimized static images, and 3D model assets.
  - Files: `src/app/layout.tsx`, `next.config.ts`, `public/models/`, animation-heavy components

## Recommended Implementation Order

1. Add `robots.txt` and `sitemap.xml`, including only canonical production URLs.
2. Remove, hide, or `noindex` internal/test routes.
3. Add `metadataBase` and canonical URLs for every public route.
4. Add page-specific metadata for legal/stub pages, or mark intentionally thin pages `noindex`.
5. Add default Open Graph and Twitter metadata plus a production social image.
6. Decide whether `/blog`, `/case-studies`, and case-study detail pages should be indexed while content is gated.
7. Add JSON-LD: `Organization` and `WebSite` first, then `JobPosting` for career detail pages.
8. Review performance risks around fonts, image weights, animations, and 3D model loading.
9. Set up Google Search Console and submit the sitemap.

## Validation Steps

1. Run `npm run build` and confirm `out/robots.txt` and `out/sitemap.xml` exist.
2. Inspect exported HTML for representative routes and confirm titles, descriptions, canonicals, OG/Twitter tags, and robots directives.
3. Crawl the exported site with Screaming Frog or a similar crawler.
4. Validate the sitemap in Google Search Console.
5. Test JSON-LD with Google Rich Results Test or Schema Markup Validator.
6. Run Lighthouse or PageSpeed Insights against production URLs.
7. Confirm Cloudflare Pages serves one preferred URL shape and that sitemap/canonical URLs match it.
8. Re-run `npm run lint` after unrelated lint issues are addressed; current lint failures are pre-existing and not part of this SEO audit.
