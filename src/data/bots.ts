export type BotModelAsset = { path: string; glb: string };
export type BotStatus = "online" | "spawning" | "training";
export type BotCategory = "functional" | "compliance" | "compatibility" | "localisation" | "network";

export type BotAbility = {
  /** Plain-English name shown on cards and in the profile. */
  label: string;
  /** Original RPG-style hero name, kept as a small tag and tooltip only. */
  name: string;
  desc: string;
  example: string;
  icon: string;
  ultimate?: boolean;
};

export type BotCheck = { label: string; detail: string };

export type BotAbilityGroup = { groupLabel?: string; abilities: BotAbility[] };

export type Bot = {
  id: string;
  name: string;
  role: string;
  category: BotCategory;
  categoryLabel: string;
  specialisesIn: string;
  bio: string;
  impact: string;
  color: string;
  status: BotStatus;
  model: BotModelAsset;
  scopeNote?: string;
  /** What the bot checks, for bots whose hero abilities are not published yet. */
  capabilities?: BotCheck[];
  abilityGroups?: BotAbilityGroup[];
};

export const categories: { id: "all" | BotCategory; label: string }[] = [
  { id: "functional", label: "Functional QA" },
  { id: "compliance", label: "Compliance QA" },
  { id: "compatibility", label: "Compatibility QA" },
  { id: "localisation", label: "Localisation QA" },
  { id: "network", label: "Network QA" },
  { id: "all", label: "All bots" },
];

const svg = (content: string) => content;
const ability = (label: string, name: string, desc: string, example: string, icon: string, ultimate = false): BotAbility => ({ label, name, desc, example, icon: svg(icon), ...(ultimate ? { ultimate } : {}) });



// Trailblazer is the single functional QA bot (Wayfinder retired on 9 Nov 2026: Trailblazer now does
// everything Wayfinder did). Ability tree and order follow the MM Technical Vision, FQA section.
const trailblazerAbilities: BotAbility[] = [
  ability("Settings check", "Tuning Sigil", "Identifies every setting in the front-end and in-game menus and checks that all sliders, values and options are selectable, logically described and persistent after leaving the menu or reloading a save.", "Sets vsync to on, restarts the game, and checks it is still enabled on relaunch.", '<path d="M12 22 H52 M12 42 H52" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="22" r="6.5" fill="currentColor"/><circle cx="43" cy="42" r="6.5" fill="currentColor"/>'),
  ability("Text and UI states", "Truesight", "Reads every label, tooltip, dialog and error string on contact, verifying each renders correctly in every state: selected, hovered, disabled and locked.", "Hovers a greyed-out button and confirms its tooltip explains why it is locked.", '<path d="M8 28 C18 17 46 17 56 28 C46 39 18 39 8 28 Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M26 28 l4.5 4.5 L40 23" fill="none" stroke="currentColor" stroke-width="3"/><path d="M16 49 H48 M16 57 H40" stroke="currentColor" stroke-width="2.6" opacity=".65"/>'),
  ability("Progression check", "Ascent", "Advances through levels, stages and chapters, confirming XP, rank, checkpoints and progress markers all climb correctly as they are earned.", "Clears a stage and checks the XP bar, level number and checkpoint flag all update.", '<path d="M11 53 H21 V41 H31 V29 H41 V17 H53 M46 17 L53 17 L53 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
  ability("First-time user flow", "Threshold", "Walks the first-time-user flow cold, from the very first screen through to the core experience, exactly as a brand new player meets it.", "Runs the tutorial from a fresh save and confirms every prompt fires in the right order, with options unlocking and content presented to the player.", '<path d="M34 11 H51 V53 H34 M44 32 H11 M22 21 L11 32 L22 43" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>'),
  ability("Full play-through", "Trail’s End", "Plays the whole game in one continuous run, from the opening to the credits, along the route a real player would take. Its job is to catch any blocker on the main path that leaves the player permanently stuck and unable to finish.", "Hits a story gate that never opens, flags it as a launch-blocking soft-lock, and reports where the run died.", '<path d="M5 55 L25 17 L39 39 L47 26 L59 55 Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25 17 V8 M25 8 L35 11 L25 14" fill="none" stroke="currentColor" stroke-width="3"/>'),
  ability("Core systems check", "Gambit", "Navigates through the title performing the general actions expected of a player, and in doing so checks the systems at the core of the gameplay design.", "Explores the building menu, validates that it has enough resources to build a specific item, then checks that the item works.", '<path d="M32 8 L37 15 L32 21 L27 15 Z" fill="currentColor"/><path d="M32 19 V44 M22 44 H42 M32 44 V53 M28 53 H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
  ability("Unlock and trigger check", "Prophetic Perception", "Recognises progression trackers and previously unavailable options, using earlier test data, to make sure state-based requirements are connected to the player's actions.", "Reaches a dialogue option that was not there on an earlier run, and checks the design documentation or prior run data to confirm what should have triggered it.", '<path d="M10 26 C20 15 44 15 54 26 C44 37 20 37 10 26 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="26" r="5" fill="currentColor"/><path d="M12 44 H52 M12 53 H52 M24 39 V57 M40 39 V57" stroke="currentColor" stroke-width="2.4" opacity=".65"/>'),
  ability("Bug retest", "Remembrance", "Uses data from previous sessions to check whether open or previously reported issues are still present in the version being tested. Partial fixes and new issues found along the steps to reproduce are flagged or reported.", "Repeats the steps behind a previously reported bug and finds that, although the original behaviour has changed, the result is still defective.", '<path d="M16 32 a16 16 0 1 0 5-11.6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M13 14 L21 20.5 L12.5 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M32 23 V32 L38 36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
  ability("Skills across games", "Muscle Memory", "Learns an action in one game and carries it into the next, with no retraining needed.", "Learns how to aim and fire a weapon, then checks the rate of fire, the impact and the ammunition spent.", '<path d="M32 8 L37 17 L46 22 L37 27 L32 36 L27 27 L18 22 L27 17 Z" fill="currentColor"/><path d="M27 33 L18 44 M37 33 L46 44" stroke="currentColor" stroke-width="2.6"/><rect x="9" y="45" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6"/><rect x="39" y="45" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6"/>', true),
];

const replicatorAbilities: BotAbilityGroup[] = [
  {
    groupLabel: "Replay & Compatibility",
    abilities: [
      ability("Session replay", "Echo", "Replays a recorded session exactly, same path and same inputs, and reaches the very same end state.", "Re-runs a captured ten-minute session and lands on the identical final screen.", '<path d="M20 19 L39 32 L20 45 Z" fill="currentColor"/><path d="M45 22 a14 14 0 0 1 0 20 M51 15 a23 23 0 0 1 0 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
      ability("Bug repro and fix check", "Bounty Hunter", "Tracks down a reported bug from its repro steps and confirms whether it still fires, then re-runs it many times to learn whether it strikes every time or only sometimes, and at what rate. Re-runs a claimed fix to confirm the bug is dead.", "Reproduces a crash 100 times, finds it hits 12% of runs, then verifies the patch drops it to zero.", '<circle cx="27" cy="27" r="14" fill="none" stroke="currentColor" stroke-width="3"/><path d="M37 37 L52 52" stroke="currentColor" stroke-width="4"/><circle cx="27" cy="27" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="27" cy="27" r="2.4" fill="currentColor"/>'),
      ability("Device matrix", "Spectrum", "Runs the same test across the full range of devices and configs, covering resolution, aspect ratio, OS, GPU tier and input method, and flags anything that passes on one but breaks on another.", "Runs a menu test on 20 device profiles and catches a button that falls off-screen at 21:9.", '<rect x="11" y="11" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="11" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="11" y="35" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="35" width="18" height="18" fill="currentColor" opacity=".85"/>'),
      ability("Build comparison", "Regression", "Runs the same test across two or more builds and compares the results, catching anything that worked in the previous build but breaks in the new one, plus any drift from the known-good reference build.", "Passes a save flow on build 41 but fails it on build 42, pinpointing a fresh regression.", '<rect x="9" y="16" width="20" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><rect x="35" y="16" width="20" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><path d="M27 32 H39 M35 27 l5 5 l-5 5" fill="none" stroke="currentColor" stroke-width="3"/>'),
      ability("Bug isolation", "Triangulate", "Takes a bug another hero found and pins it down precisely. It scopes the bug across the full device and build grid, then walks back through the build history to find the exact build that introduced it.", "Confirms a bug appears only on low-end Android at 16:9, then traces it to the build where it first showed up.", '<rect x="11" y="11" width="42" height="42" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25 11 V53 M39 11 V53 M11 25 H53 M11 39 H53" stroke="currentColor" stroke-width="1.8" opacity=".45"/><circle cx="46" cy="46" r="6.5" fill="none" stroke="currentColor" stroke-width="3"/>'),
    ],
  },
  {
    groupLabel: "Performance & Regression Intelligence",
    abilities: [
      ability("Performance metrics", "Heartbeat", "Reads the game’s pulse frame by frame, measuring frame time, FPS, startup and load times, CPU and GPU work, memory and VRAM, draw calls and garbage collection, from outside the build or through deeper engine sight.", "Shows a frame-time spike, GPU-thread cost, rising VRAM and the exact level-load duration together on one timeline.", '<path d="M7 34 H17 L23 19 L31 47 L39 26 L45 34 H57" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="32" cy="34" r="22" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".55"/>'),
      ability("Hitch and crash capture", "Faultmark", "Marks every hitch, crash and hang at the instant it strikes, pinning its severity to the timeline and preserving the surrounding video, system state and world position as evidence.", "A 186 ms stutter hits in the city plaza, so the surrounding clip is saved and the exact hotspot is marked on the tour.", '<circle cx="29" cy="29" r="18" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="29" cy="29" r="7" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M29 6 V15 M29 43 V52 M6 29 H15 M43 29 H52 M41 41 L55 55" stroke="currentColor" stroke-width="2.6"/>'),
      ability("Overnight build runs", "Endless Vigil", "Guards every new build without supervision, recording and replaying tours, running every scenario, preset and machine combination, and holding hours-long soaks, while rejecting diverged or contaminated runs and repeating them clean.", "A build lands overnight, so the full matrix runs, a CPU-contaminated attempt is rejected and re-run, and results are refreshed before morning.", '<path d="M8 31 C18 19 46 19 56 31 C46 43 18 43 8 31 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="31" r="7" fill="currentColor"/><path d="M14 16 C22 8 42 8 50 16 M50 47 C42 55 22 55 14 47" fill="none" stroke="currentColor" stroke-width="2.6"/>'),
      ability("Regression alerts", "Omen", "Studies each route’s natural noise and accepted baseline, then raises a confidence-scored alert when a build breaks budget, slows down, stutters more, leaks memory, regresses on min-spec or begins a slow creep.", "Detects a small frame-time loss accumulating across six builds and raises it before the slow creep becomes a launch-day crisis.", '<path d="M9 48 H55 M12 42 L23 34 L31 38 L43 21 L53 25 M43 21 H51 V29" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'),
      ability("Root-cause report", "Sentinel’s Verdict", "Names the guilty build and the system behind it, tracing top engine-marker deltas, thread timings and spatial hotspots, bisecting the suspect changelist window, and forging a case file the dashboard, CI and issue tracker can act on.", "Names a level at +3.1 ms, marks the heavy zone, traces the break to a specific build and hands the team a ready-to-file case.", '<path d="M32 7 L49 14 V29 C49 41 42 50 32 56 C22 50 15 41 15 29 V14 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="29" r="11" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M26 48 L32 54 L43 42" fill="none" stroke="currentColor" stroke-width="3.2"/>', true),
    ],
  },
];

const check = (label: string, detail: string): BotCheck => ({ label, detail });

const shared = {
  arbiter: [
    check("Platform requirements", "Platform compliance verification against first-party requirements"),
    check("Certification checklist", "Certification checklist execution"),
    check("Submission readiness", "Submission-readiness validation"),
    check("Platform-holder guidelines", "System behaviour checks against platform-holder guidelines"),
    check("Edge-case scenarios", "Edge-case and submission-critical scenario testing"),
  ],
  rosetta: [
    check("Translation accuracy", "Translation accuracy checks against source strings"),
    check("Text overflow", "Text layout and truncation / overflow validation"),
    check("Subtitle sync", "Subtitle presence, timing and sync checks"),
    check("Regional formats", "Regional formatting (dates, currency, units)"),
    check("Cultural accuracy", "Cultural accuracy review across supported locales"),
  ],
  stressor: [
    check("Performance under load", "Performance-under-load testing"),
    check("Breaking points", "Stress testing to find breaking points"),
    check("Long-run stability", "Stability-limit and long-running / high-load scenario testing"),
    check("Multiplayer under load", "Multiplayer systems validation under load"),
    check("Chat and invites", "Chat, invites and social-feature testing"),
    check("Multi-user flows", "Multi-user interaction flow testing"),
  ],
};

export const bots: Bot[] = [
  {
    id: "trailblazer", name: "Trailblazer", role: "The Adventurer", category: "functional", categoryLabel: "Functional QA", specialisesIn: "Menus, settings, onboarding, progression, quests and complete play-throughs.",
    bio: "Trailblazer is ManaMind's functional QA bot. It plays your game from the first menu to the credits, checking settings, interface text, onboarding, progression, saves and unlocks along the way, and makes sure the journey is always completable.", impact: "Catches the functional bugs players notice first, and the blockers that stop them finishing your game.", color: "#8AE9D0", status: "online", model: { path: "/models/Trailblazer", glb: "trailblazer.glb" }, abilityGroups: [{ abilities: trailblazerAbilities }],
  },
  {
    id: "arbiter", name: "Arbiter", role: "The Certifier", category: "compliance", categoryLabel: "Compliance QA", specialisesIn: "Platform compliance, certification and submission checks.",
    bio: "Arbiter performs automated compliance checks against platform requirements, validating system behaviour, edge cases, and submission-critical scenarios.", impact: "Reduces the risk of certification failure and costly resubmissions to platform holders.", color: "#DBFFF6", status: "training", model: { path: "/models/Arbiter", glb: "arbiter.glb" }, capabilities: shared.arbiter,
  },
  {
    id: "replicator", name: "Replicator", role: "The Perfectionist", category: "compatibility", categoryLabel: "Compatibility QA", specialisesIn: "Cross-device and multi-build replay, compatibility validation, performance monitoring and regression detection.",
    bio: "Replicator turns one test into thousands, replaying scenarios across devices, builds, and configurations to guarantee consistent behaviour everywhere. Its role now also covers continuous performance monitoring — tracking frame rate, load times and system resource use to catch regressions as they emerge.", impact: "Ensures bugs stay fixed and features behave consistently across platforms, while giving the team clear visibility into performance regressions before players ever notice them.", color: "#FFFEBA", status: "online", model: { path: "/models/Replicator", glb: "replicator.glb" }, scopeNote: "Expanded scope: this bot’s capability set now combines test replication / cross-device compatibility work with performance monitoring and regression detection, previously split across two bots. It is presented here as a single, unified Compatibility QA agent.", abilityGroups: replicatorAbilities,
  },
  {
    id: "rosetta", name: "Rosetta", role: "The Translator", category: "localisation", categoryLabel: "Localisation QA", specialisesIn: "Localisation, translations, subtitles and cultural accuracy.",
    bio: "Rosetta ensures your game works in every language by validating translations, text layout, subtitles, and regional formatting across all supported locales.", impact: "Ensures global players receive a polished, natural experience in their own language.", color: "#F3DEFF", status: "training", model: { path: "/models/Rosetta", glb: "rosetta.glb" }, capabilities: shared.rosetta,
  },
  {
    id: "stressor", name: "Stressor", role: "The Workhorse", category: "network", categoryLabel: "Network QA", specialisesIn: "Load, stress, stability and multiplayer-system validation.",
    bio: "Stressor pushes your game beyond normal limits by flooding systems with inputs, entities, and load to expose performance and stability weaknesses. Its scope now also covers multiplayer and social systems, testing chat, invites and connectivity under the same demanding, high-load conditions.", impact: "Reveals crashes, slowdowns and social/multiplayer breakdowns that only appear under real-world scale and concurrent player load.", color: "#DA97FF", status: "training", model: { path: "/models/Stressor", glb: "stressor.glb" }, scopeNote: "Expanded scope: this bot’s capability set now combines load, stress and stability testing with multiplayer and social-system validation, previously split across two bots. It is presented here as a single, unified Network QA agent.", capabilities: shared.stressor,
  },
];

export const STATUS_CONFIG: Record<BotStatus, { label: string; color: string; dot: string }> = {
  online: { label: "Online", color: "text-emerald-400", dot: "bg-emerald-400" },
  spawning: { label: "Spawning", color: "text-amber-400", dot: "bg-amber-400" },
  training: { label: "Training", color: "text-blue-400", dot: "bg-blue-400" },
};

// The five QA services. Each one is explained first, then delivered by the bots
// in its category (services first, bots second, as agreed with Yagiz on 9 Nov 2026).
export type Service = {
  id: BotCategory;
  label: string;
  color: string;
  question: string;
  definition: string;
  covers: string[];
  whyItMatters: string;
  proof?: { text: string; href: string };
};

export const services: Service[] = [
  {
    id: "functional",
    label: "Functional QA",
    color: "#8AE9D0",
    question: "Does every part of the game work the way a player expects?",
    definition:
      "Functional QA checks that each feature of your game does what it is supposed to do, from the first menu to the final credits. That covers menus, settings and onboarding, and also progression, quests, unlocks and saves. The game is played the way a real player would play it, looking for anything that blocks, breaks or confuses them. With ManaMind, bots play your build through the screen, with no scripts and no SDK.",
    // Yagiz, 9 Nov 2026: current proven features from the MM Technical Vision (FQA, Current Version Features).
    covers: [
      "Progression system viability",
      "Controls and user inputs",
      "Menus and settings",
      "Text formatting and typography",
      "Linguistic checks",
      "IAP testing",
      "External link validation",
      "Freeform text input validation",
    ],
    whyItMatters: "Functional bugs are the first ones players notice, and the ones that stop them playing.",
    proof: { text: "See functional and text checks on a shipped game in the Husk Protocol case study", href: "/case-studies/husk-protocol" },
  },
  {
    id: "compliance",
    label: "Compliance QA",
    color: "#DBFFF6",
    question: "Will the build pass platform certification first time?",
    definition:
      "Every platform holder has technical requirements a game must meet before it can be released on its store or console. Compliance QA checks your build against those requirements and the certification checklist before you submit, including system behaviour, edge cases and submission-critical scenarios. A failure found before submission costs far less than a rejection and a resubmission.",
    covers: [
      "Checks against first-party platform requirements",
      "Certification checklist runs",
      "Submission-readiness validation",
      "Edge cases and submission-critical scenarios",
    ],
    whyItMatters: "Fewer failed certifications and fewer costly resubmissions to platform holders.",
  },
  {
    id: "compatibility",
    label: "Compatibility QA",
    color: "#FFFEBA",
    question: "Does the game behave the same on every device and every build?",
    definition:
      "Compatibility QA makes sure your game behaves the same everywhere: across devices, resolutions, aspect ratios, operating systems, GPU tiers and input methods, and from one build to the next. The same tests are replayed across many configurations and builds. Performance such as frame rate, load times and memory is tracked over time, so regressions are caught as soon as they appear.",
    covers: [
      "Replays of the same session across devices and builds",
      "Device and configuration matrix runs",
      "Bug reproduction and fix verification",
      "Build-to-build regression checks",
      "Performance tracking and regression alerts",
    ],
    whyItMatters: "Bugs stay fixed, and performance problems are caught before players notice them.",
  },
  {
    id: "localisation",
    label: "Localisation QA",
    color: "#F3DEFF",
    question: "Does the game read correctly in every language you ship?",
    definition:
      "Localisation QA checks that your game works in every language you release it in. It verifies translations against the source strings, catches text that overflows or gets cut off, checks that subtitles are present and in sync, and confirms that dates, currencies and units follow each region's format. It also reviews cultural accuracy across your supported locales.",
    covers: [
      "Translation accuracy against source strings",
      "Text overflow and truncation",
      "Subtitle presence, timing and sync",
      "Regional formats for dates, currency and units",
      "Cultural accuracy across locales",
    ],
    whyItMatters: "Players everywhere get a polished, natural experience in their own language.",
    proof: { text: "Read how on-screen text was checked against the card sheet in the Husk Protocol case study", href: "/case-studies/husk-protocol" },
  },
  {
    id: "network",
    label: "Network QA",
    color: "#DA97FF",
    question: "Does the game hold up with many players and heavy load?",
    definition:
      "Network QA tests how your game holds up under real-world pressure: many players, heavy load and long sessions. Systems are pushed to their breaking point to find crashes, slowdowns and stability issues. Multiplayer and social features such as chat, invites and connectivity are checked while the game is under that same load.",
    covers: [
      "Performance under load",
      "Stress tests that find breaking points",
      "Long-running stability",
      "Multiplayer, chat and invites under load",
      "Multi-user interaction flows",
    ],
    whyItMatters: "Crashes and slowdowns that only appear at real-world scale are found before launch, not after.",
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

export const ALL_MODEL_PATHS = bots.map((bot) => `${bot.model.path}/${bot.model.glb}`);
