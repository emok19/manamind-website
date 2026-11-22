// Founder profile pages (/team/<slug>) for Google's Knowledge Graph.
// Copy and schema follow the "Google Knowledge Panel To do" doc (Yagiz, Nov 2026) word for word.
// Only truncated URLs in the doc's code were completed, using the full links given elsewhere in the same doc.
export const SITE = "https://manamind.ai";
export const ORG_ID = SITE;

export type FounderLink = { label: string; url?: string };

export type Founder = {
  slug: string;
  name: string;
  jobTitle: string;
  /** Visible role line under the name. */
  roleLine: string;
  photo: string;
  photoAlt: string;
  /** Visible bio paragraphs. */
  bio: string[];
  /** Visible list heading. */
  linksHeading: string;
  links: FounderLink[];
  schema: {
    description: string;
    alumniOf: string;
    knowsAbout: string[];
    sameAs: string[];
  };
  seoDescription: string;
};

const FORBES =
  "https://www.forbes.com/sites/charliefink/2025/11/17/manamind-introduces-game-playing-ai-to-test-titles-in-production/";

export const FOUNDERS: Founder[] = [
  {
    slug: "emil-kostadinov",
    name: "Emil Kostadinov",
    jobTitle: "Co-Founder & CEO",
    roleLine: "Co-Founder & CEO, ManaMind",
    photo: "/team/emil-kostadinov.jpg",
    photoAlt: "Emil Kostadinov, Co-Founder & CEO of ManaMind",
    bio: [
      "Emil Kostadinov is the Co-Founder and Chief Executive Officer of ManaMind, an AI-powered autonomous game testing and quality assurance platform. At ManaMind, he leads company strategy, commercial partnerships, and product vision by helping game studios automate functional, compliance, compatibility, localisation, and network QA using vision-based AI agents that play builds without SDKs or source code access.",
      "Before co-founding ManaMind, Emil built and scaled ventures at the intersection of artificial intelligence, gaming, and enterprise software. He holds an MBA from Saïd Business School, University of Oxford.",
    ],
    linksHeading: "Selected Press & Profiles",
    links: [
      { label: "Forbes: ManaMind Introduces Game-Playing AI To Test Titles In Production", url: FORBES },
      {
        label: "Capital.bg: Emil Kostadinov and ManaMind's New Generation of AI",
        url: "https://www.capital.bg/en/business/2026/02/16/4883084_emil_kostadinov_and_manaminds_new_generation_of_ai/",
      },
      { label: "LinkedIn: Emil Kostadinov", url: "https://uk.linkedin.com/in/emilkostadinov" },
      { label: "X: @ek_019", url: "https://x.com/ek_019" },
    ],
    schema: {
      description: "Emil Kostadinov is the Co-Founder and CEO of ManaMind, an AI-powered autonomous game QA company.",
      alumniOf: "Saïd Business School, University of Oxford",
      knowsAbout: ["Artificial Intelligence", "Video Game Quality Assurance", "Game Development", "Autonomous AI Agents"],
      sameAs: [
        "https://uk.linkedin.com/in/emilkostadinov",
        FORBES,
        "https://www.capital.bg/en/business/2026/02/16/4883084_emil_kostadinov_and_manaminds_new_generation_of_ai/",
        "https://pulse2.com/manamind-1-5-million-raised-to-build-ai-powered-autonomous-game-testing-platform/",
        "https://x.com/ek_019",
      ],
    },
    seoDescription: "Emil Kostadinov is the Co-Founder and CEO of ManaMind, an AI-powered autonomous game QA company.",
  },
  {
    slug: "sabtain-ahmad",
    name: "Sabtain Ahmad",
    jobTitle: "Co-Founder & CTO",
    roleLine: "Co-Founder & CTO, ManaMind",
    photo: "/team/sabtain-ahmad.jpg",
    photoAlt: "Sabtain Ahmad, Co-Founder & CTO of ManaMind",
    bio: [
      "Sabtain Ahmad is the Co-Founder and Chief Technology Officer of ManaMind, where he leads AI research, engineering, and the development of HiveMind: ManaMind's game-native model for autonomous game testing. Under his technical leadership, ManaMind's AI agents perceive game screens, reason about player objectives, and log reproducible bug reports across engines without requiring engine integration.",
      "Prior to co-founding ManaMind, Sabtain conducted machine learning and computer vision research at TU Wien (Vienna University of Technology), focusing on autonomous systems and applied artificial intelligence.",
    ],
    linksHeading: "Selected Press, Research & Profiles",
    links: [
      { label: "Forbes: ManaMind Introduces Game-Playing AI To Test Titles In Production", url: FORBES },
      { label: "Research Publications on alphaXiv", url: "https://www.alphaxiv.org/zh-TW/@sabtain-ahmad" },
      { label: "LinkedIn: Sabtain Ahmad", url: "https://www.linkedin.com/in/sabtainahmad" },
      { label: "GitHub: Sabtainahmad", url: "https://github.com/Sabtainahmad" },
      { label: "X: @amirsabtain", url: "http://x.com/amirsabtain" },
      { label: "Google Scholar profile", url: "https://scholar.google.com/citations?user=Wgo8ndUAAAAJ&hl=en" },
    ],
    schema: {
      description:
        "Sabtain Ahmad is the Co-Founder and CTO of ManaMind, leading the development of game-native AI models for autonomous game testing.",
      alumniOf: "TU Wien",
      knowsAbout: ["Machine Learning", "Computer Vision", "Autonomous AI Agents", "Automated Game Testing"],
      // The doc's checklist asks to add Google Scholar, X and GitHub to sameAs when they exist.
      sameAs: [
        "https://at.linkedin.com/in/sabtainahmad",
        FORBES,
        "https://www.alphaxiv.org/zh-TW/@sabtain-ahmad",
        "https://scholar.google.com/citations?user=Wgo8ndUAAAAJ&hl=en",
        "https://github.com/Sabtainahmad",
        "https://x.com/amirsabtain",
      ],
    },
    seoDescription:
      "Sabtain Ahmad is the Co-Founder and CTO of ManaMind, leading the development of game-native AI models for autonomous game testing.",
  },
];

export function getFounder(slug: string): Founder | undefined {
  return FOUNDERS.find((f) => f.slug === slug);
}

export function founderUrl(f: Founder): string {
  return `${SITE}/team/${f.slug}`;
}

/** Person schema for a founder page, as in the doc. */
export function founderJsonLd(f: Founder): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${founderUrl(f)}/#person`,
    name: f.name,
    jobTitle: f.jobTitle,
    url: founderUrl(f),
    image: `${SITE}${f.photo}`,
    description: f.schema.description,
    worksFor: { "@type": "Organization", "@id": ORG_ID, name: "ManaMind", url: SITE },
    alumniOf: { "@type": "CollegeOrUniversity", name: f.schema.alumniOf },
    knowsAbout: f.schema.knowsAbout,
    sameAs: f.schema.sameAs,
  };
}
