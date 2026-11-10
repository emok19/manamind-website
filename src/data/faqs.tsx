import Link from "next/link";
import type { FaqItem } from "@/components/shared/FAQ";

// FAQ bank from "ManaMind SEO v1" (section 6). Each question is used once on the site.
// Answers reuse facts already published on manamind.ai. Items marked CONFIRM need the product team's check.

export const HOME_FAQ: FaqItem[] = [
  {
    q: "What is game QA?",
    text: "Game QA (quality assurance) is the work of playing a game before release to find bugs, broken flows and anything that spoils the player's experience. It is usually done by hand, build after build. ManaMind automates the repetitive part: our bots play each build through the screen like real players and turn what they find into verified bug reports your team can act on.",
    a: (
      <p>
        Game QA (quality assurance) is the work of playing a game before release to find bugs, broken flows and anything that spoils the player&rsquo;s experience. It is usually done by hand, build after build. ManaMind automates the repetitive part: our bots play each build through the screen like real players and turn what they find into verified bug reports your team can act on.
      </p>
    ),
  },
  {
    q: "What is AI game testing?",
    text: "AI game testing uses AI agents, not scripts, to play a game and check it. ManaMind's bots watch the screen, understand menus, HUDs and the game world through HiveMind, our game-native model, decide what to do next and log issues automatically. Every finding comes with the frame, the steps to reproduce it and a clear explanation.",
    a: (
      <p>
        AI game testing uses AI agents, not scripts, to play a game and check it. ManaMind&rsquo;s bots watch the screen, understand menus, HUDs and the game world through HiveMind, our game-native model, decide what to do next and log issues automatically. Every finding comes with the frame, the steps to reproduce it and a clear explanation. See the <Link href="/product">automated game testing</Link> platform.
      </p>
    ),
  },
  {
    q: "How does QA testing for games work with ManaMind?",
    text: "It works in four steps. The bot sees the screen, reasons about what is happening in the game, plans its next action like a player would, then logs and reports any issue it finds. You share a build and your reference material, the bots play it, and your team receives verified bug reports with the evidence attached.",
    a: (
      <p>
        It works in four steps. The bot sees the screen, reasons about what is happening in the game, plans its next action like a player would, then logs and reports any issue it finds. You share a build and your reference material, the bots play it, and your team receives verified bug reports with the evidence attached. <Link href="/how-it-works">See how it works</Link>.
      </p>
    ),
  },
  {
    q: "Does ManaMind need our source code or an SDK?",
    text: "No. ManaMind tests through the screen, the same way a player does, so there is no source code access, no SDK and no engine integration. You share a build and your reference material, such as a design document or a card sheet. That keeps setup fast and makes ManaMind suitable for unreleased games under NDA.",
    a: (
      <p>
        No. ManaMind tests through the screen, the same way a player does, so there is no source code access, no SDK and no engine integration. You share a build and your reference material, such as a design document or a card sheet. That keeps setup fast and makes ManaMind suitable for <Link href="/product#security">unreleased games under NDA</Link>.
      </p>
    ),
  },
  {
    // CONFIRM: platform and engine list with the product team before going live.
    q: "Which platforms and engines does ManaMind support?",
    text: "Because the bots work from what is on screen, ManaMind is not tied to a particular engine: Unity, Unreal, Godot and custom engines are tested the same way. Our published case study ran on a Windows build on Steam. If you are testing for mobile or console, tell us about your setup and we will confirm what we can run today.",
    a: (
      <p>
        Because the bots work from what is on screen, ManaMind is not tied to a particular engine: Unity, Unreal, Godot and custom engines are tested the same way. Our published <Link href="/case-studies/husk-protocol">case study</Link> ran on a Windows build on Steam. If you are testing for mobile or console, <Link href="/contact">tell us about your setup</Link> and we will confirm what we can run today.
      </p>
    ),
  },
  {
    q: "Can AI replace manual game testers?",
    text: "No, and that is not the goal. We believe automation should elevate human testers, not replace them. ManaMind's bots take on the repetitive coverage, such as replaying menus, flows and builds, so your QA team can spend its time on the judgement calls that need people: feel, fun, balance and the player's experience.",
    a: (
      <p>
        No, and that is not the goal. We believe automation should elevate human testers, not replace them. ManaMind&rsquo;s bots take on the repetitive coverage, such as replaying menus, flows and builds, so your QA team can spend its time on the judgement calls that need people: feel, fun, balance and the player&rsquo;s experience.
      </p>
    ),
  },
];

export const PRODUCT_FAQ: FaqItem[] = [
  {
    q: "How does automated game testing work?",
    text: "ManaMind has three layers. HiveMind, our game-native AI model, watches the screen and decides what each bot should do next. Command Centre is where your team describes tests in plain language; it picks the bots, runs and monitors the sessions, and collects the findings. Services are the specialist bots, one team per kind of QA, that play the game through the screen and report what they find.",
    a: (
      <p>
        ManaMind has three layers. HiveMind, our game-native AI model, watches the screen and decides what each bot should do next. Command Centre is where your team describes tests in plain language; it picks the bots, runs and monitors the sessions, and collects the findings. <Link href="/services">Services</Link> are the specialist bots, one team per kind of QA, that play the game through the screen and report what they find.
      </p>
    ),
  },
  {
    q: "How long does it take to start testing?",
    text: "There is no scripting and no training on your game, so the bots can start on a build as soon as it is shared, together with your reference material. As an example, on Husk Protocol Wayfinder validated 60 cards across eight sessions and found five verified issues in 50 minutes.",
    a: (
      <p>
        There is no scripting and no training on your game, so the bots can start on a build as soon as it is shared, together with your reference material. As an example, on <Link href="/case-studies/husk-protocol">Husk Protocol</Link> Wayfinder validated 60 cards across eight sessions and found five verified issues in 50 minutes.
      </p>
    ),
  },
  {
    q: "What is AI playtesting?",
    text: "AI playtesting means agents that behave like real players instead of following a fixed script. They read the screen, choose what to do next and react to what the game does, so they reach the paths and situations a scripted test never covers. ManaMind's bots playtest this way and report every issue they find.",
    a: (
      <p>
        AI playtesting means agents that behave like real players instead of following a fixed script. They read the screen, choose what to do next and react to what the game does, so they reach the paths and situations a scripted test never covers. ManaMind&rsquo;s bots playtest this way and report every issue they find.
      </p>
    ),
  },
  {
    // CONFIRM: per-build / continuous runs with the product team.
    q: "Can ManaMind run build verification tests on every build?",
    text: "Yes. Because the bots do not rely on scripts tied to your UI, the same tests can run again on each new build without being rewritten. Replicator replays sessions across devices and builds, reproduces reported bugs and finds the exact build where a regression first appeared.",
    a: (
      <p>
        Yes. Because the bots do not rely on scripts tied to your UI, the same tests can run again on each new build without being rewritten. <Link href="/services#compatibility">Replicator</Link> replays sessions across devices and builds, reproduces reported bugs and finds the exact build where a regression first appeared.
      </p>
    ),
  },
  {
    q: "How is ManaMind different from other game testing software?",
    text: "Three things. ManaMind needs no source code or SDK, because it tests through the screen. It is zero-shot, so there is no scripting or per-game training before the first run. And it is built for unreleased builds under strict NDAs. Underneath is HiveMind, a model trained specifically to understand games.",
    a: (
      <p>
        Three things. ManaMind needs no source code or SDK, because it tests through the screen. It is zero-shot, so there is no scripting or per-game training before the first run. And it is built for unreleased builds under strict NDAs. Underneath is HiveMind, a model trained specifically to understand games.
      </p>
    ),
  },
  {
    q: "Can ManaMind work alongside our game testing services vendor?",
    text: "Yes. ManaMind is complementary to human QA, in-house or outsourced. The bots take on repetitive coverage across builds, and your testers or vendor focus on the judgement calls and the issues that need a person to assess. Many teams use automated game testing to free their QA budget for that higher-value work.",
    a: (
      <p>
        Yes. ManaMind is complementary to human QA, in-house or outsourced. The bots take on repetitive coverage across builds, and your testers or vendor focus on the judgement calls and the issues that need a person to assess. That way automated game testing frees QA time for higher-value work.
      </p>
    ),
  },
];

export const HUSK_FAQ: FaqItem[] = [
  {
    q: "Can AI handle game localization testing?",
    text: "Yes, for text validation. On Husk Protocol, Wayfinder read every card the way a first-time player would and checked its on-screen text against the team's card sheet. It validated 60 cards across eight sessions and found five verified issues in 50 minutes, including a keyword with no tooltip explanation.",
    a: (
      <p>
        Yes, for text validation. On Husk Protocol, Wayfinder read every card the way a first-time player would and checked its on-screen text against the team&rsquo;s card sheet. It validated 60 cards across eight sessions and found five verified issues in 50 minutes, including a keyword with no tooltip explanation. Read more about <Link href="/blog/who-is-manamind">who we are</Link> or <Link href="/contact">book a demo</Link>.
      </p>
    ),
  },
];
