// Type definitions for case studies. The actual content now lives as markdown
// files in content/case-studies/ and is loaded at build time by
// src/lib/content/case-studies.ts (edit the markdown files directly).

export type Platform = "PC" | "PS5" | "Xbox Series" | "Switch" | "Mobile" | "Android" | "iOS" | "VR";

export type Severity = "Critical" | "High" | "Medium" | "Low";

export type CaseStudy = {
  slug: string;
  order?: number;
  studio: {
    name: string;
    initials: string;
    accent: string;
    logo?: string;
  };
  game: {
    title: string;
    codename: string;
    logo?: string;
  };
  platforms: Platform[];
  genres: string[];
  country: { code: string; flag: string; name: string };
  challengeOneLiner: string;
  headlineMetric: { value: string; label: string };
  snapshot: {
    type: string;
    teamSize: string;
    stage: string;
    testWindow: string;
  };
  challenge: {
    headline: string;
    problem: string;
  };
  deployment: {
    headline: string;
    summary: string;
    sessions: number;
    focus: string[];
  };
  findings: Array<{
    id: string;
    severity: Severity;
    title: string;
    summary: string;
    evidence: "video" | "screenshot" | "log";
  }>;
  results: Array<{
    metric: string;
    before: string;
    after: string;
    delta: string;
  }>;
  quote: {
    body: string;
    author: string;
    title: string;
    initials: string;
  };
};
