import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudy } from "@/data/case-studies";

// Build-time loader. Reads each markdown file in content/case-studies and
// returns the same CaseStudy shape the components already expect, so nothing
// downstream has to change. Only ever called from server components and
// generateStaticParams, never from the client.
const DIR = path.join(process.cwd(), "content", "case-studies");

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return { slug, ...(data as Omit<CaseStudy, "slug">) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((s) => s.slug === slug);
}
