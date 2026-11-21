// Founder profile pages (/team/<slug>) for Google's Knowledge Graph (Google Knowledge Panel plan, Nov 2026).
// Every fact in the schema must also be visible on the page, or Google ignores it. Keep both in step.
export const SITE = "https://manamind.ai";
export const ORG_ID = `${SITE}/#organization`;

export type FounderLink = { label: string; url: string };

export type Founder = {
  slug: string;
  name: string;
  /** Short title, as on the About page and in the press. */
  jobTitle: string;
  /** Visible role line under the name. */
  roleLine: string;
  photo: string;
  photoAlt: string;
  /** Visible bio paragraphs. */
  bio: string[];
  education: { degree: string; school: string }[];
  knowsAbout: string[];
  /** Profiles of the person (schema sameAs). */
  profiles: FounderLink[];
  /** Press and research about the person (schema subjectOf), shown as "Selected press". */
  press: FounderLink[];
  seoDescription: string;
};

export const FOUNDERS: Founder[] = [
  {
    slug: "emil-kostadinov",
    name: "Emil Kostadinov",
    jobTitle: "Co-Founder & CEO",
    roleLine: "Co-Founder & CEO, ManaMind",
    photo: "/team/emil-kostadinov.webp",
    photoAlt: "Emil Kostadinov, Co-Founder & CEO of ManaMind",
    bio: [
      "Emil Kostadinov is the Co-Founder and Chief Executive Officer of ManaMind, the London company building AI agents that test video games the way real players do, with no source code, SDK or engine access. At ManaMind he leads strategy, partnerships and fundraising.",
      "Emil holds an MBA from Saïd Business School, University of Oxford, and a BSc in Business Management from the University of Essex, and is an EWOR Fellow. Before founding ManaMind he led sustainability and operations programmes in industry.",
      "A lifelong gamer and racing driver, he also serves on the board of RC Vision, helping underrepresented young people access motorsport and STEM.",
    ],
    education: [
      { degree: "MBA", school: "Saïd Business School, University of Oxford" },
      { degree: "BSc Business Management", school: "University of Essex" },
    ],
    knowsAbout: ["Artificial intelligence", "Video game quality assurance", "Game development", "Autonomous AI agents"],
    profiles: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/emilkostadinov/" },
      { label: "X (@ek_019)", url: "https://x.com/ek_019" },
    ],
    press: [
      {
        label: "Forbes: ManaMind Introduces Game-Playing AI To Test Titles In Production",
        url: "https://www.forbes.com/sites/charliefink/2025/11/17/manamind-introduces-game-playing-ai-to-test-titles-in-production/",
      },
      {
        label: "Capital: Emil Kostadinov and ManaMind's new generation of AI",
        url: "https://www.capital.bg/en/business/2026/02/16/4883084_emil_kostadinov_and_manaminds_new_generation_of_ai/",
      },
      {
        label: "Pulse 2.0: ManaMind raises $1.5 million to build an AI-powered autonomous game testing platform",
        url: "https://pulse2.com/manamind-1-5-million-raised-to-build-ai-powered-autonomous-game-testing-platform/",
      },
      {
        label: "Tech Finds Tech Podcast: The End of Manual QA, ft. Emil Kostadinov",
        url: "https://www.youtube.com/watch?v=QCSOwrarwFU",
      },
    ],
    seoDescription:
      "Emil Kostadinov is the Co-Founder and CEO of ManaMind, the London company building AI agents that test video games like real players. Oxford MBA, EWOR Fellow.",
  },
  {
    slug: "sabtain-ahmad",
    name: "Sabtain Ahmad",
    jobTitle: "Co-Founder & CTO",
    roleLine: "Co-Founder & CTO, ManaMind",
    photo: "/team/sabtain-ahmad.webp",
    photoAlt: "Sabtain Ahmad, Co-Founder & CTO of ManaMind",
    bio: [
      "Sabtain Ahmad is the Co-Founder and Chief Technology Officer of ManaMind, where he leads AI research and engineering, including HiveMind, ManaMind's own vision-language model for game testing. ManaMind's agents read the game screen, decide what to do next and report reproducible bugs, without engine integration or source code access.",
      "Sabtain holds a PhD in machine learning from TU Wien (Vienna University of Technology), where his research focused on distributed machine learning and edge intelligence.",
    ],
    education: [{ degree: "PhD, Machine Learning", school: "TU Wien (Vienna University of Technology)" }],
    knowsAbout: ["Machine learning", "Computer vision", "Distributed machine learning", "Autonomous AI agents", "Automated game testing"],
    profiles: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sabtainahmad/" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=Wgo8ndUAAAAJ" },
      { label: "GitHub", url: "https://github.com/Sabtainahmad" },
      { label: "X (@amirsabtain)", url: "https://x.com/amirsabtain" },
      { label: "alphaXiv", url: "https://www.alphaxiv.org/@sabtain-ahmad" },
    ],
    press: [
      {
        label: "Forbes: ManaMind Introduces Game-Playing AI To Test Titles In Production",
        url: "https://www.forbes.com/sites/charliefink/2025/11/17/manamind-introduces-game-playing-ai-to-test-titles-in-production/",
      },
    ],
    seoDescription:
      "Sabtain Ahmad is the Co-Founder and CTO of ManaMind, leading AI research and HiveMind, its vision-language model for game testing. PhD in machine learning, TU Wien.",
  },
];

export function getFounder(slug: string): Founder | undefined {
  return FOUNDERS.find((f) => f.slug === slug);
}

export function founderUrl(f: Founder): string {
  return `${SITE}/team/${f.slug}`;
}

/** Person schema for a founder page. */
export function founderJsonLd(f: Founder): Record<string, unknown> {
  const url = founderUrl(f);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: `${f.name}, ${f.jobTitle} of ManaMind`,
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name: f.name,
      jobTitle: f.jobTitle,
      url,
      image: `${SITE}${f.photo}`,
      description: f.bio[0],
      worksFor: { "@type": "Organization", "@id": ORG_ID, name: "ManaMind", url: SITE },
      alumniOf: f.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      knowsAbout: f.knowsAbout,
      sameAs: f.profiles.map((p) => p.url),
      subjectOf: f.press.map((p) => ({ "@type": "CreativeWork", name: p.label, url: p.url })),
    },
  };
}
