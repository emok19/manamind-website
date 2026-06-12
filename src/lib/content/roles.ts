import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Role } from "@/data/roles";

// Build-time loader for careers/roles. Reads content/roles/*.md and returns the
// same Role shape the careers pages already expect. Server-side only.
const DIR = path.join(process.cwd(), "content", "roles");

export function getRoles(): Role[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return { slug, ...(data as Omit<Role, "slug">) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getRole(slug: string): Role | undefined {
  return getRoles().find((r) => r.slug === slug);
}
