export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Investor/partner logos and press mentions now live as markdown in
// content/investors, content/partners, and content/press, loaded at build time
// by src/lib/content/backers.ts and src/lib/content/press.ts (editable via /admin).

export type PressMention = {
  title: string;
  type: "article" | "podcast" | "mention";
  url: string;
  source?: string;
  thumbnail?: string;
};

export const BOTS = [
  {
    name: "Wayfinder",
    description: "Systematically charts game worlds, uncovering hidden paths, unreachable areas, and navigation inconsistencies to ensure no corner goes untested.",
  },
  {
    name: "Gladiator",
    description: "Stress-tests combat systems, weapon combos, and game mechanics to find balance issues, exploits, and edge cases.",
  },
  {
    name: "Replicator",
    description: "Reproduces reported issues thousands of times with variations, confirming reproducibility and identifying exact failure conditions.",
  },
  {
    name: "Rosetta",
    description: "Validates localisation across every supported language - catching text overflow, missing translations, and encoding issues automatically.",
  },
  {
    name: "Merchant",
    description: "Tests in-game economies, shop systems, loot tables, and transaction flows to find pricing exploits and economic imbalances.",
  },
  {
    name: "Trailblazer",
    description: "Goes where no tester has gone before - combining unusual actions and sequence-breaking to discover bugs that scripted tests never catch.",
  },
  {
    name: "Stressor",
    description: "Applies extreme load, rapid inputs, and resource pressure to find performance bottlenecks, memory leaks, and crash conditions.",
  },
];

export const VALUE_PROPS = [
  {
    title: "Zero Integration",
    description: "No code access, no SDK, no API keys. Our bots interact with your game exactly like a human player would.",
  },
  {
    title: "Infinite Scale",
    description: "Run hundreds of autonomous testing sessions simultaneously. Cover more ground in hours than manual QA does in weeks.",
  },
  {
    title: "Zero-Shot Testing",
    description: "No training data required. Drop our bots into any game and they start testing immediately with human-like intelligence.",
  },
];

export const ARCHITECTURE = {
  hivemind: {
    name: "Hivemind",
    description: "Hivemind is our proprietary vLMM and the perception and reasoning layer that interprets game frames, understands UI, and decides what each bot should do next.",
  },
  commandCentre: {
    name: "Command Centre",
    description: "The Command Centre is where teams configure, monitor, and manage every aspect of their AI-driven QA pipeline - from launching sessions to reviewing critical findings.",
  },
  legion: {
    name: "Legion",
    description: "Launches, coordinates, and scales hundreds of bot instances across machines and test sessions.",
  },
  bots: {
    name: "Bots",
    description: "Autonomous agents that interact with your game through the screen - just like human testers.",
  },
};

export const FEATURES = [
  {
    title: "Exploration",
    description: "Bots autonomously navigate game worlds, discovering areas, interacting with objects, and testing boundaries - just like a real player.",
  },
  {
    title: "Detection",
    description: "Visual anomalies, physics glitches, UI bugs, crash triggers - our bots identify issues across every layer of the game.",
  },
  {
    title: "Reporting",
    description: "Every bug comes with video evidence, reproduction steps, severity classification, and contextual metadata - ready for your team.",
  },
];

export const GA_MEASUREMENT_ID = "G-PP9ZLMJTTH";
