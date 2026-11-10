---
title: "From seeing the game to playing it: how HiveMind has evolved"
seoTitle: "From Seeing the Game to Playing It: HiveMind | ManaMind"
description: "HiveMind has gone from reading game screens to playing games. Here's what each version added, what it does for studios today, and what comes next."
date: "2026-12-14"
author: "ManaMind"
status: draft
source: "06 Marketing/Content/BlogPosts/Week 4 Hivemind From Seeing the Game to Playing It"
keywords: ["ai game testing", "ai tools for game development"]
excerpt: "What each HiveMind version added, what it does for studios today, and what comes next."
image: "/blog/hivemind-progress.webp"
imageAlt: "Chart: HiveMind's interface-reading score rose from 50% to 87% across HiRes, Checkpoint 2601 and v5, past its 80% target for 2026."
imageCaption: "HiRes, Checkpoint 2601 and v5 results on the game-QA suite, with each component's 2026 target. v5 is the perception model inside HiveMind + LFM."
---
An autonomous QA agent needs two things: it has to see the game correctly, and it has to act on what it sees. We've spent the past year getting the first one right. Now we're connecting it to the second.

## Five versions, one direction

- **HiRes:** our first game-specific vision model. It learned to read screens, interfaces and basic game state.
- **Checkpoint 2601:** added answering questions about the current game: what's happening, what the player is trying to do, and where things are.
- **v5:** the big jump in perception. It combines strong visual understanding with reasoning about game situations, space and change over time.
- **xg3:** specialised in recognising interface elements, characters and scene layouts, for screen inspection and game-state analysis.
- **HiveMind + LFM:** connects v5's understanding to an action system, so the agent can interact with the game, not only describe it.

Across three versions, HiveMind's score for reading game interfaces went from 50% to 87%, past our 80% target for the year. Our overall game-understanding score has roughly doubled from our starting reference and is now within one point of our 2026 target. See [how HiveMind compares with frontier AI](/blog/hivemind-vs-frontier-ai-game-qa-benchmarks) on 11 game-QA skills.

## What it does for studios today

With Fireshine Games and OddSub on Husk Protocol, our Wayfinder agent validated 60 cards across eight sessions and found five verified issues in 50 minutes. That's work that usually takes a tester a lot longer to get through by hand. Read the [game localization testing](/case-studies/husk-protocol) case study.

## What comes next

- **Better glitch detection.** Spotting visual bugs directly from frames is our top model priority.
- **Games it has never seen.** We want HiveMind to perform on a new title from day one, without extra training.
- **Playing, not just watching.** The LFM action layer is early. We're training it to handle longer, more complex play.
- **A world model.** Our research team is building a model that predicts how a game will respond to an action, so agents can plan multi-step tests on any game.

We'll keep publishing results as each version ships. [Book a pilot](/contact) to put HiveMind on your game.
