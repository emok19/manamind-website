import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PressMention } from "@/lib/constants";

// Build-time loader for press mentions. Reads content/press/*.md. Server-only.
const DIR = path.join(process.cwd(), "content", "press");

export function getPress(): PressMention[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return data as PressMention & { order?: number };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
