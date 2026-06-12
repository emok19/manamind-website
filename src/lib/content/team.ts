import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Build-time loader for team members. Reads content/team/*.md. Server-only.
export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio?: string;
  order?: number;
};

const DIR = path.join(process.cwd(), "content", "team");

export function getTeam(): TeamMember[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => matter(fs.readFileSync(path.join(DIR, file), "utf8")).data as TeamMember)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
