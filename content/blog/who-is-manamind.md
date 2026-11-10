---
title: "Who is ManaMind? The model for games QA"
seoTitle: "Who Is ManaMind? AI Game QA That Plays Like Your Players"
description: "ManaMind's AI agents play your game like real players and report bugs automatically. Meet the team and the story behind the model for game QA."
date: "2026-11-10"
author: "ManaMind"
status: published
source: "06 Marketing/Content/BlogPosts/Week 1 Who Is ManaMind Blog and LinkedIn Post (Yagiz's version of 9 Nov 2026, aligned with the new website)"
keywords: ["game qa", "qa testing for games", "ai game testing", "video game qa", "automated game testing"]
excerpt: "Who we are, what our bots do, and the story behind the name and the logo."
faq:
  - q: "What does ManaMind do?"
    a: "ManaMind builds AI agents that test video games the way a real player would. The bots watch and play a game through the screen, work out what to do next and turn what they find into structured bug reports. They need no source code, SDK or scripting, so studios can run automated game QA on the builds they already have."
  - q: "Who founded ManaMind, and where is it based?"
    a: "ManaMind was founded in 2025 by Emil Kostadinov, CEO, and Sabtain Ahmad, CTO. The company is based in London and raised a $1.5M pre-seed round led by Sure Valley Ventures. Its mission is to build autonomous testing infrastructure for interactive worlds, starting with video games."
  - q: "What does the name ManaMind mean?"
    a: "In games, mana is the energy that powers a character's abilities, and mind is the intelligence that decides how to use them. ManaMind combines the two: an AI that understands games well enough to play and test them. The logo reflects this, with two mirrored \"M\"s for Mana and Mind and a hidden \"AI\" in the wordmark."
  - q: "Which QA services does ManaMind offer?"
    a: "ManaMind covers five areas of video game QA. Functional QA is delivered by Trailblazer, which plays through menus, settings, onboarding, progression and quests to catch soft-locks. Compatibility QA is delivered by Replicator, which replays sessions across devices and builds to reproduce bugs and find regressions. Compliance, localisation and network QA are in early access: tell us what you need and we'll scope it with you."
---
Games have grown into vast, living worlds. The way they're tested has barely changed. Game QA still depends on people clicking through the same menus, replaying the same levels and filing the same reports: repetitive tasks, build after build.

ManaMind exists to change that. We're a London-based AI company building agents that play your game the way a real player does, discover bugs, and report on what needs attention. This is who we are, what we've built and why we called it ManaMind.

## The problem with game QA today

We grew up with games. QA teams work long hours under tight deadlines, and they're very good at what they do. Bugs still slip through. Not because testers lack skill, but because the scale of modern video games has outpaced traditional testing.

Players notice. A broken menu, a quest that won't complete or a game that crashes on one phone model are the moments that turn into refund requests and one-star reviews. Every studio knows the feeling of shipping a patch for a bug that a tester would have caught, if only there had been time to test that path.

There are more devices, more builds, more languages and more content to cover than any team can check by hand. Traditional test automation doesn't solve it either: scripted tests break whenever the UI changes, and they need engineers to write and maintain them.

## What we do: AI game testing that plays like your players

ManaMind's bots watch and play a game through the screen, just like a human tester, and turn what they find into structured bug reports. That means:

- **No source code access.** The bots test the build you already have, and your IP and data stay safe.
- **No SDK or engine integration.** Nothing to implement inside your game.
- **No scripting.** You describe the test in plain language, and the bots work out how to do it.

The bots test through the screen, and they can move from one game to the next without being rebuilt for each project. That's what makes [autonomous game testing](/) different from scripted automation: it adapts to your game, easily.

## How automated game testing works at ManaMind

Our platform has three layers that work together like a coordinated QA team:

- **HiveMind** handles perception and reasoning. It's our own vision-language model, trained to understand game screens: HUDs, menus, characters and the game world behind them.
- **Command Centre** handles test planning and control. You launch tests in plain language, it picks the right bots and runs them, and you follow the results as they come in.
- **Services** are our specialist bots, one team for each kind of QA, playing your game through the screen.

You can see the full architecture on our [automated game testing](/product) page.

## Meet the bots

Each ManaMind bot is an autonomous tester with a specific role, strategy and set of abilities.

- **Trailblazer** navigates menus, settings, onboarding flows and end-to-end player journeys, checking that every screen is reachable and every setting works. It also plays through progression systems and quests, making sure the game can always be completed. Its job is to catch the worst bug of all: a soft-lock that leaves a player stuck for good.
- **Replicator** replays sessions across devices and builds, reproduces reported bugs and finds the exact build where a regression first appeared. It makes sure your game behaves the same everywhere: across devices, resolutions, aspect ratios, operating systems, GPU tiers and input methods, and from one build to the next. The same tests are replayed across many configurations and builds. Performance such as frame rate, load times and memory is tracked over time, so regressions are caught as soon as they appear.

Together, our bots are designed to cover five areas of video game QA: functional, compliance, compatibility, localisation and network. Compliance, localisation and network QA are in early access. [Explore our services](/services).

The approach is already working with studios. On Husk Protocol, developed by OddSub and published by Fireshine Games, our functional QA bot validated 60 cards across eight sessions and found five verified issues in 50 minutes. Read the full [game localization testing](/case-studies/husk-protocol) case study.

## Why "ManaMind"? The story behind the name and logo

![The ManaMind symbol: one M for Mana and one M for Mind, combining into one larger M](/blog/manamind-logo-mana-mind.gif)

In games, mana is the energy that powers a character's abilities. Mind is the intelligence that decides how to use them. ManaMind puts the two together: an AI that understands games well enough to play them, and to test them.

The gaming roots run through the whole brand. Our bots have Hero Abilities, not features. Our colours are named after the fantasy genre: Void, our deep purple, alongside Arcane, Aether, Elixir and Lumen.

## What we believe

One idea guides how we build: automation should elevate human testers, not replace them. Great games are shaped by human judgement: intuition, taste and empathy for players. Our bots take on the scale and repetition, so QA teams can focus on the creative, high-judgement work machines can't do.

We also believe games need a different kind of testing from ordinary software, and that one general intelligence beats building new tooling for every project.

Inside the company we work by four values: fun (we take the work seriously, not ourselves), challenge (we deliberately play on hard mode), integrity (results matter, and so does how we get them) and leaving a mark on everyone we work with.

## The team and where we're heading

ManaMind was founded in 2025 by Emil Kostadinov (CEO) and Sabtain Ahmad (CTO), and raised a $1.5M pre-seed round led by Sure Valley Ventures. [Meet the team](/about).

We're building in stages. Today: autonomous game testing. Next: general software testing for apps and websites. In the long term, the same core systems extend from game worlds to real-world robotics. But games come first, because they're the hardest and most demanding environments to understand.

## Try ManaMind on your game

If your team is stretched by QA testing for games, we'd like to show you what our bots can do with your build. [Book a demo](/contact) and we'll run them on your game.
