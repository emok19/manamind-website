---
title: "Why we built our own AI model to test games"
seoTitle: "Why We Built a Game-Native AI Model for Game QA | ManaMind"
description: "General AI models weren't built to read game screens. Here's why ManaMind trained HiveMind, our game-native vision model, to power autonomous QA."
date: "2026-11-16"
author: "ManaMind"
status: published
source: "06 Marketing/Content/BlogPosts/Week 2: Hivemind / Why we built a game-native AI model (LinkedIn post not included)"
keywords: ["ai game testing", "game qa", "autonomous qa", "game-native ai model", "hivemind"]
cover: "/blog/covers/why-we-built-a-game-native-ai-model.jpg"
excerpt: "General AI models weren't built to read game screens, so we trained HiveMind on games."
---
When we started building autonomous QA agents, the obvious move was to plug into one of the big general-purpose AI models. Most tools in this space do exactly that. It was not enough, so we decided to build our own model instead.

## Games have their own visual language

General AI models learn from the web: documents, photos, charts and screenshots of websites. A game screen is something else. It mixes a world with a HUD layered on top. It uses health bars, cooldown rings, minimaps and card frames that mean nothing outside games. Objects obey physics that the player is expected to predict.

A QA agent has to read all of that correctly, every frame, before it can decide what to do or notice that something is wrong. Misreading a HUD element isn't a small error. It could mean a missed bug or a false report.

## So we trained HiveMind on games

HiveMind is our vision-language model, trained specifically to understand game screens. On our game-QA test suite it leads the best of the leading frontier AI models on the skills that matter most for reading a game:

- **Separating the interface from the game world:** 90% vs 65%
- **Reasoning about in-game physics and cause and effect:** 50% vs 37%
- **Spatial reasoning** (where things are and how they relate): 52% vs 40%
- **Reading HUDs and sprites:** 85% vs 79%

*We'll publish the full benchmarks in a future post.*

## Small enough to run anywhere, fast enough to play

HiveMind has 9 billion parameters and runs on a single GPU. One GPU serves 8–10 QA bots at once. That matters for three reasons:

1. **Speed.** Our agents play in real time, so every decision has to come back fast. A model we host and tune ourselves keeps that loop tight.
2. **Predictable cost.** We pay for GPU time, not per call to someone else's API. Costs don't jump when a provider changes its prices, and running more tests doesn't mean a surprise bill.
3. **Your build stays with you.** Unreleased game builds are some of the most sensitive files a studio has. With HiveMind, frames from your game are never sent to a third-party AI provider.

## It also means we can keep improving

Owning the model means we decide what it learns next. Every QA session teaches us where the agents struggle, and that feeds straight into the next version of HiveMind. Across three versions, our score for reading game interfaces has gone from 50% to 87%. We'll share that journey in a later post.

## What this means for studios

You get QA agents that understand games the way a tester does, at a predictable cost, without your builds going to a third-party AI service. [Book a pilot](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0izswtDLMGDN6w_d7cNkj1_7UvaFjEiwFJcBngTPfuMmRa2PupF6pJHTF97qiTSSHaCyXnGRG6) to see how ManaMind tests your game.
