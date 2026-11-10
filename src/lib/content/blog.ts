import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Build-time loader for content/blog/*.md (same pattern as the other content loaders).
const DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  author: string;
  status: "draft" | "published";
  excerpt: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  faq?: { q: string; a: string }[];
  body: string;
  words: number;
};

export function getPosts(): BlogPost[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        ...(data as Omit<BlogPost, "slug" | "body" | "words">),
        body: content,
        words: content.split(/\s+/).filter(Boolean).length,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
