import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content/blog";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getRoles } from "@/lib/content/roles";

// SEO v1 fixes 15 and 16: one homepage URL form (matches the canonical), lastmod on every entry,
// and new blog posts / case studies / roles added automatically at build time.
export const dynamic = "force-static";

const BASE = "https://manamind.ai";
// Last content review of the static pages. Bump when their copy changes.
const PAGES_UPDATED = "2026-11-09";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const studies = getCaseStudies();
  const latest = (dates: string[]) => dates.filter(Boolean).sort().at(-1) ?? PAGES_UPDATED;

  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: PAGES_UPDATED, priority: 1 },
    { url: `${BASE}/product`, lastModified: PAGES_UPDATED, priority: 0.9 },
    { url: `${BASE}/services`, lastModified: PAGES_UPDATED, priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: PAGES_UPDATED, priority: 0.8 },
    { url: `${BASE}/case-studies`, lastModified: latest(studies.map((s) => s.publishedAt)), priority: 0.8 },
    ...studies.map((s) => ({ url: `${BASE}/case-studies/${s.slug}`, lastModified: s.publishedAt, priority: 0.8 })),
    // The blog index stays noindex until three posts are live (SEO v1 fix 4), so it is only listed from then.
    ...(posts.length >= 3 ? [{ url: `${BASE}/blog`, lastModified: latest(posts.map((p) => p.date)), priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: p.date, priority: 0.7 })),
    { url: `${BASE}/about`, lastModified: PAGES_UPDATED, priority: 0.6 },
    { url: `${BASE}/careers`, lastModified: PAGES_UPDATED, priority: 0.5 },
    ...getRoles().map((r) => ({ url: `${BASE}/careers/${r.slug}`, lastModified: PAGES_UPDATED, priority: 0.4 })),
    { url: `${BASE}/contact`, lastModified: PAGES_UPDATED, priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: PAGES_UPDATED, priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: PAGES_UPDATED, priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: PAGES_UPDATED, priority: 0.2 },
  ];
  return pages;
}
