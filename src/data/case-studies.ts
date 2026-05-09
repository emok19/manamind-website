export type Platform = "PC" | "PS5" | "Xbox Series" | "Switch" | "Mobile" | "Android" | "iOS" | "VR";

export type Severity = "Critical" | "High" | "Medium" | "Low";

export type CaseStudy = {
  slug: string;
  studio: {
    name: string;
    initials: string;
    accent: string;
  };
  game: {
    title: string;
    codename: string;
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "included-games-heroes-of-fortune",
    studio: {
      name: "Included Games",
      initials: "IG",
      accent: "#00FF96",
    },
    game: {
      title: "Heroes of Fortune",
      codename: "HOF-LIVE",
    },
    platforms: ["Android", "iOS"],
    genres: ["RPG", "Live-service"],
    country: { code: "GB", flag: "GB", name: "United Kingdom" },
    challengeOneLiner:
      "Device fragmentation and a weekly content cadence were outpacing manual QA.",
    headlineMetric: { value: "5x", label: "device coverage per release" },
    snapshot: {
      type: "Mobile / Live-service",
      teamSize: "Small team",
      stage: "Live operations",
      testWindow: "Ongoing",
    },
    challenge: {
      headline: "Every new event risked breaking a device the team had not tested.",
      problem:
        "Heroes of Fortune ships content weekly across hundreds of Android and iOS device variants. The QA team could only manually verify a handful of reference devices per release, so regressions on older Android builds and edge-case iOS hardware were slipping into production and surfacing through player support tickets instead of pre-release testing.",
    },
    deployment: {
      headline: "Continuous coverage across the device matrix.",
      summary:
        "ManaMind was integrated into the release pipeline and ran parallel sessions across a representative set of Android and iOS devices, replaying core gameplay loops, store flows, and event-specific content for every build.",
      sessions: 80,
      focus: [
        "Core gameplay loop",
        "In-app purchase flow",
        "Event progression",
        "Account / cloud save",
      ],
    },
    findings: [
      {
        id: "HOF-0001",
        severity: "Critical",
        title: "Purchase confirmation hangs on older Android devices",
        summary:
          "On Android 10 devices with limited memory, the purchase confirmation overlay failed to dismiss after a successful transaction, leaving players unsure whether the purchase had completed.",
        evidence: "video",
      },
      {
        id: "HOF-0002",
        severity: "High",
        title: "Event banner overflows on smaller iPhone screens",
        summary:
          "The new seasonal event banner overflowed the layout on iPhone SE-class screens, hiding the call-to-action button and blocking entry into the event.",
        evidence: "screenshot",
      },
      {
        id: "HOF-0003",
        severity: "Medium",
        title: "Frame drops in the boss arena on mid-tier Android",
        summary:
          "A specific particle effect in the new boss arena caused sustained frame drops on a cluster of mid-tier Android devices. Reproduced consistently across multiple runs.",
        evidence: "log",
      },
    ],
    results: [
      { metric: "Devices tested per release", before: "6", after: "30+", delta: "+5x" },
      { metric: "Critical bugs caught pre-release", before: "Reactive", after: "Pre-release", delta: "Shift left" },
      { metric: "Player-reported crash rate", before: "Higher", after: "Lower", delta: "Reduced" },
      { metric: "QA time per release", before: "Days", after: "Hours", delta: "Faster" },
    ],
    quote: {
      body:
        "ManaMind gives us coverage we could never reach by hand. We can ship weekly content with confidence that the experience holds up across the device range our players actually use.",
      author: "Included Games team",
      title: "Included Games",
      initials: "IG",
    },
  },
  {
    slug: "bitwave-outpost-zero",
    studio: {
      name: "Bitwave Interactive",
      initials: "BW",
      accent: "#38BDF8",
    },
    game: {
      title: "Outpost Zero",
      codename: "OPZ-LIVE",
    },
    platforms: ["PC", "Xbox Series", "PS5"],
    genres: ["FPS", "Multiplayer"],
    country: { code: "DE", flag: "DE", name: "Germany" },
    challengeOneLiner:
      "Coverage could not keep up with a four-week live-service patch cadence.",
    headlineMetric: { value: "12x", label: "test coverage per patch window" },
    snapshot: {
      type: "AA / Live-service",
      teamSize: "180 (24 QA)",
      stage: "Post-launch / Live",
      testWindow: "Ongoing",
    },
    challenge: {
      headline: "Every patch cracked something the last patch fixed.",
      problem:
        "The live-service patch cadence demanded weekly content drops, but the QA team could only fully regress the top three game modes between patches. Long-tail modes drifted out of coverage, and the support inbox absorbed the difference. Player-facing crash rate had crept up three patches in a row.",
    },
    deployment: {
      headline: "Continuous regression across every game mode, every patch.",
      summary:
        "ManaMind ran 200 concurrent sessions distributed across all 11 game modes, three platform configurations, and four matchmaking scenarios. Every PR to the release branch triggered a focused regression sweep.",
      sessions: 200,
      focus: [
        "Match flow",
        "Loadout persistence",
        "Cross-platform invites",
        "Anti-cheat boundaries",
      ],
    },
    findings: [
      {
        id: "OPZ-1107",
        severity: "Critical",
        title: "Loadout reset on cross-platform party",
        summary:
          "Players joining cross-platform parties had loadouts reset to default. Affected ~3% of all sessions in the 4.2 build.",
        evidence: "video",
      },
      {
        id: "OPZ-1129",
        severity: "High",
        title: "Spectator camera clips through new map geometry",
        summary:
          "On the new Cargo Bay map, spectator cameras clip into walls in two locations, breaking competitive replays.",
        evidence: "video",
      },
      {
        id: "OPZ-1144",
        severity: "Medium",
        title: "Audio ducking misfires on revive",
        summary:
          "Reviving an ally during a vehicle sequence ducks all audio for 2-3 seconds longer than designed.",
        evidence: "log",
      },
    ],
    results: [
      { metric: "Modes under regression coverage", before: "3 / 11", after: "11 / 11", delta: "100%" },
      { metric: "Tests per patch window", before: "1x baseline", after: "12x baseline", delta: "+1100%" },
      { metric: "Player-facing crash rate", before: "0.42%", after: "0.09%", delta: "-78%" },
      { metric: "Live hotfixes per patch", before: "4.3 avg", after: "1.1 avg", delta: "-74%" },
    ],
    quote: {
      body:
        "Our patch confidence is night and day. We used to ship and brace for the support spike. Now we ship and watch the dashboard stay flat.",
      author: "Lukas Brenner",
      title: "Live Operations Director, Bitwave Interactive",
      initials: "LB",
    },
  },
  {
    slug: "lumen-labs-echoes",
    studio: {
      name: "Lumen Labs",
      initials: "LL",
      accent: "#A78BFA",
    },
    game: {
      title: "Echoes of Atrium",
      codename: "EOA-1.0",
    },
    platforms: ["Switch", "PC", "Mobile"],
    genres: ["Puzzle", "Narrative"],
    country: { code: "SE", flag: "SE", name: "Sweden" },
    challengeOneLiner:
      "Localisation QA across nine languages was a three-week bottleneck per build.",
    headlineMetric: { value: "3 wks -> 18 hrs", label: "loc QA cycle time" },
    snapshot: {
      type: "Indie / Publisher-funded",
      teamSize: "11 (1 QA)",
      stage: "Pre-cert -> launch",
      testWindow: "5 weeks",
    },
    challenge: {
      headline: "Nine languages. One QA lead. Three weeks per pass.",
      problem:
        "Echoes of Atrium ships with nine fully voiced and translated languages. Each loc pass required a manual playthrough per language to catch text overflow, missing strings, and cert-blocking encoding issues. The single QA lead became the bottleneck for every cert submission.",
    },
    deployment: {
      headline: "Every language, every build, every night.",
      summary:
        "ManaMind ran nine parallel localised sessions per nightly build, replaying a scripted golden-path traversal in each language and flagging any visual or string anomaly against a baseline.",
      sessions: 9,
      focus: [
        "Text overflow",
        "Missing strings",
        "Encoding (CJK, Cyrillic)",
        "Voiceover sync",
      ],
    },
    findings: [
      {
        id: "EOA-0233",
        severity: "Critical",
        title: "JP build crashes on chapter 4 cinematic",
        summary:
          "A specific kanji glyph in the chapter 4 subtitle string caused a hard crash on Switch JP builds. Cert-blocking.",
        evidence: "video",
      },
      {
        id: "EOA-0241",
        severity: "High",
        title: "DE strings overflow journal panel",
        summary:
          "14 journal entries overflow the panel in German. Panel does not scroll, so closing entries are unreadable.",
        evidence: "screenshot",
      },
      {
        id: "EOA-0258",
        severity: "Medium",
        title: "PT-BR voiceover desync after pause",
        summary:
          "Pausing during a dialog beat in PT-BR resumes voiceover one line ahead of subtitles.",
        evidence: "log",
      },
    ],
    results: [
      { metric: "Loc QA cycle time", before: "3 weeks", after: "18 hours", delta: "-96%" },
      { metric: "Cert-blocking issues caught pre-submission", before: "60%", after: "100%", delta: "+40 pts" },
      { metric: "Cert resubmissions", before: "2 avg", after: "0", delta: "-100%" },
      { metric: "Languages tested per build", before: "2", after: "9", delta: "+350%" },
    ],
    quote: {
      body:
        "We hit cert on the first submission for every platform. For an 11-person team, that is the difference between launching on time and slipping a quarter.",
      author: "Astrid Lindqvist",
      title: "Studio Lead, Lumen Labs",
      initials: "AL",
    },
  },
];
