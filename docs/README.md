# Documentation index

Reviewed against the repository on 2 November 2026.

| Document | Purpose and status |
|---|---|
| [Site handover and editing guide](../README.md) | Current instructions for content editing, local development, and GitHub Actions deployment to Cloudflare Pages. Start here. |
| [Implementation overview](build-plan.md) | Current architecture, routes, integrations, and maintenance workflow. Replaces the original staged build plan. |
| [SEO status](seo-audit.md) | Current source-backed SEO implementation and remaining verification work. Replaces the pre-implementation audit. |
| [Performance review](seo/performance-audit.md) | Current source findings and explicitly dated historical measurements; no fresh production scores are claimed. |
| [AEO notes](aeo-notes.md) | How to maintain the checked-in `/llms.txt` alongside public content. |
| [Husk Protocol asset provenance](husk-protocol-assets.md) | Historical asset sources and current repository locations. |
| [Original design brief](brief.md) | Historical requirements, with a current implementation-status note. Not an operations guide. |
| [Original design research](design-research.md) | Historical inspiration and observations, with current implementation notes. External sites have not been re-audited. |

## Keeping these documents accurate

- Update the handover guide and implementation overview when changing hosting, build commands, branch names, content schemas, feature flags, or integrations.
- Update `public/sitemap.xml` and `public/llms.txt` when adding, renaming, publishing, or removing public career/case-study pages. Review redirects for old URLs.
- Treat `content/` as website content, not developer documentation. Check factual changes to bios, hiring status, claims, and approved case-study copy with their owners; repository inspection alone cannot establish those facts.
- Date audit measurements and state whether a finding comes from source inspection, a local build, or the live site. Do not present old bundle sizes, performance scores, or external account setup as current verification.
- Keep the original brief, design research, and asset provenance as history. Put current instructions in the documents marked current above.
