export type RoleResponsibility = { label: string; body: string };
export type RoleFitBox = { label: string; body: string };

export type Role = {
  slug: string;
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

const ABOUT_PARAGRAPHS = [
  "We're an early-stage startup built on a simple belief: game developers should be building worlds, not chasing bugs.",
  "We're replacing manual QA with autonomous agents that truly understand gameplay.",
  "Our small, focused team combines deep machine learning research with strong commercial execution, driven to solve some of the hardest problems in game development.",
  "Just over a year in, we've built category-leading technology, gained real traction, and partnered with some of the world's most storied game studios.",
  "We're backed by top-tier investors and incubators, including SVV and EWOR.",
];

const BONUS = {
  label: "Bonus: You enjoy games or complex interactive systems",
  body: "You don't have to be a hardcore gamer, but you're genuinely curious about how interactive experiences are built, broken, and tested; and you like the idea of agents learning to navigate them.",
};

export const roles: Role[] = [
  {
    slug: "founding-ai-engineer",
    title: "Founding AI Engineer",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    tags: ["VLMs", "Fine-tuning", "Video models"],
    summary:
      "Architect our agents' cognition. Fine-tune VLMs that turn raw video pixels into semantic game logic.",
    date: "Jan 2026",
    hookQuestions: [
      "Do you want to work on one of the hardest problems in AI, building systems that can reason and act in complex, open ended digital worlds?",
      "Do you want your work to ship quickly and sit at the core of a product used by major game studios, with a clear and visible impact on real games?",
      "And do you want genuine ownership, the freedom to choose the stack, design the architecture end to end, and take ideas from first principles through to production without layers of approval?",
    ],
    about: ABOUT_PARAGRAPHS,
    roleParagraphs: [
      "We are looking for a Founding AI Engineer to be the architect of our agents' cognition. You will be the builder who transforms raw video pixels into semantic game logic. You will own the entire model lifecycle, from curating specialized datasets to fine-tuning VLMs that run with extreme efficiency. This role demands a blend of research-grade intuition and rigorous engineering discipline. You are constructing the proprietary brain that gives our agents the agency to play.",
    ],
    responsibilities: [
      {
        label: "Train the Brain",
        body: "Fine-tune and optimize Vision-Language Models (VLMs) on custom game footage, enabling our agents to interpret complex UI, animations, and temporal game states.",
      },
      {
        label: "Solve for Time",
        body: "Architect model inputs to handle video sequences rather than static frames, giving agents the memory and context required to understand gameplay progression.",
      },
      {
        label: "Deploy for Speed",
        body: "Optimize and deploy models to run with the latency and throughput real-time gameplay demands, balancing accuracy against inference cost.",
      },
      {
        label: "Define the Data",
        body: "Design and automate the data collection pipelines that turn raw gameplay into high-quality, annotated training sets for specific game genres.",
      },
      {
        label: "Define the Benchmarks",
        body: "Create and maintain internal eval suites that measure what actually matters.",
      },
    ],
    fitIntro:
      "You have spent serious time fine tuning Vision Language Models, not just reading about them, and you are comfortable working with video data where understanding temporal context over time matters more than a single frame. You can take research ideas and turn them into systems that actually run in production, bridging the gap between experimentation and real world deployment.",
    fitBoxes: [
      {
        label: "Live in the Weights",
        body: "You have hands-on experience training or fine-tuning multi-modal models (e.g., LLaVA, CLIP, Flamingo) from scratch or checkpoints. You know exactly what happens inside the transformer block.",
      },
      {
        label: "Build for the Real World",
        body: "You have successfully deployed deep learning models into production environments where latency and cost matter. You understand the brutal reality of trade-offs between model size and inference speed.",
      },
      {
        label: "Think in Time",
        body: 'You understand that a video game is a temporal sequence, not a photo album. You have worked with video data, optical flow, or temporal attention mechanisms and know how to give a model a sense of "what happened before."',
      },
      {
        label: "Thrive in Chaos",
        body: "You are a self-starter who prefers the ambiguity of a zero-to-one startup environment over the structured comfort of a big tech research lab. You want your code to ship, not just be published.",
      },
    ],
    bonus: BONUS,
    applyHref:
      "https://docs.google.com/forms/d/e/1FAIpQLScHqEHUdaJVXO_Nf2rhmLADo8I5X4808fJGtYVzIhtupGP9Vg/viewform",
  },
  {
    slug: "founding-applied-ai-systems-engineer",
    title: "Founding Applied AI/Systems Engineer",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    tags: ["Agents", "Automation", "Cross-device"],
    summary:
      "Take multi-modal models from prediction to production. Build reliable agents that act on Android, iOS, and PC.",
    date: "Jan 2026",
    hookQuestions: [
      "Do you build agents that take real actions in live systems, where reliability and recovery matter more than perfect demos?",
      "Do you want to work close to the metal, deep systems, infrastructure as code, bot and scraping platforms, and low level video streaming?",
    ],
    about: ABOUT_PARAGRAPHS,
    roleParagraphs: [
      "We are looking for a Founding Applied ML Engineer to own the moment where our models stop predicting and start acting in real games. You'll be the person who takes the multi-modal model and turns it into reliable agents that tap, swipe, navigate, and verify flows across real devices; Android, iOS, PC.",
      "This role sits at the intersection of ML, automation, and systems engineering: you'll design how bots observe the screen, decide what to do next, and recover when the real world doesn't behave like a demo. If you want your work to live in production, catch real bugs, and influence how an entire industry tests games, this is the seat.",
    ],
    responsibilities: [
      {
        label: "Design End-to-End Game Agents",
        body: "Build systems that connect perception (pixels, UI, simple state) to concrete actions (taps, swipes, clicks), so agents can reliably drive real games on mobile and desktop.",
      },
      {
        label: "Build Cross-Device Automation",
        body: "Develop mechanisms to replay complex user flows across a wide range of devices, OS versions, and aspect ratios without relying on brittle coordinates or hard-coded timings.",
      },
      {
        label: "Automate Critical User Journeys",
        body: "Turn core flows; tutorials, core loops, purchases, and other high-value behaviors, into repeatable automated tests that can run on every build or on demand.",
      },
      {
        label: "Harden Agents for Production",
        body: "Instrument, debug, and improve reliability under real-world conditions (slow networks, inconsistent load times, flaky SDKs), and own the quality bar until QA teams trust running these unsupervised.",
      },
      {
        label: "Own the Production Standard",
        body: "Create and maintain internal eval suites that measure what actually matters.",
      },
      {
        label: "Collaborate with Customers",
        body: "Work with QA and engineering leads at game studios to understand their workflows, prioritize what to automate next, and incorporate their feedback into the roadmap.",
      },
    ],
    fitIntro:
      "You've built vision driven or multimodal agents using video, not just text or images, with a strong computer vision foundation across models. You're hands on with vision agents and VLMs such as LLaVA, CLIP, and Flamingo, and you've applied them in messy, real world environments like automation, robotics, autonomy, AV, or complex UI driven systems. You're comfortable working closely with QA and testing leads, and you've done this in an AI product startup, ideally at the zero to one stage.",
    fitBoxes: [
      {
        label: "Build things that actually touch the real world",
        body: "You've shipped non-trivial automation in messy environments; mobile apps, UI automation, robotics, browser automation, device farms, where timing, state, and flakiness were real problems you had to engineer around, not hand-wave away.",
      },
      {
        label: "Think in loops, not scripts",
        body: "You're more interested in building agents that observe → decide → act → recover than recording click macros. You know how to combine simple perception (what's on screen) with control logic (what to do next) so systems stay robust when UIs, timings, or devices change.",
      },
      {
        label: "Care obsessively about reliability",
        body: "You've owned a system where other teams depended on your automation, and you felt the pain when it was flaky. You instrument, log, and debug until it's something you'd trust to run overnight without babysitting.",
      },
      {
        label: "Like talking to users as much as to your IDE",
        body: 'You\'re comfortable jumping on calls with QA / engineering leads, asking blunt questions about their workflows, and turning vague complaints ("this flow keeps breaking") into concrete automation that saves them time.',
      },
    ],
    bonus: BONUS,
    applyHref:
      "https://docs.google.com/forms/d/e/1FAIpQLScHqEHUdaJVXO_Nf2rhmLADo8I5X4808fJGtYVzIhtupGP9Vg/viewform",
  },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
