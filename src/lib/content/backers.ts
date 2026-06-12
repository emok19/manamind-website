import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Build-time loader for investors and partners (same shape, different folders).
// Server-only.
export type Backer = { name: string; logo: string | null; scale?: number; order?: number };

function load(dir: string): Backer[] {
  const d = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".md"))
    .map((file) => matter(fs.readFileSync(path.join(d, file), "utf8")).data as Backer)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const getInvestors = () => load("investors");
export const getPartners = () => load("partners");
