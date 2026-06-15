// Type definitions for careers/roles. The actual content now lives as markdown
// files in content/roles/ and is loaded at build time by
// src/lib/content/roles.ts (edit the markdown files directly).

export type RoleResponsibility = { label: string; body: string };
export type RoleFitBox = { label: string; body: string };

export type Role = {
  slug: string;
  order?: number;
  title: string;
  location: string;
  type: string;
  tags: string[];
  summary: string;
  date: string;
  hookQuestions: string[];
  about: string[];
  roleParagraphs: string[];
  responsibilities: RoleResponsibility[];
  fitIntro: string;
  fitBoxes: RoleFitBox[];
  bonus?: { label: string; body: string };
  applyHref: string;
};
