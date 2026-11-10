"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Glow } from "@/components/brand/Graphics";

// Interactive "how it works" on a real, published finding from the Husk Protocol case study.
// The visitor tries to spot the bug, then sees how Wayfinder found and reported it.

// Hit area around the Grapple tooltip text ("purge 1 random Buff"), in % of the frame.
const TARGET = { x1: 16, x2: 47, y1: 51, y2: 68 };

const STEPS = [
  { k: "See", t: "Wayfinder plays the real Steam build and hovers every card, exactly like a new player." },
  { k: "Read", t: "It reads the tooltip: “purge 1 random Buff”. Buff gets an explanation. Purge does not." },
  { k: "Check", t: "It compares what is on screen with the team’s reference sheet, word by word." },
  { k: "Report", t: "It files a verified finding with the screenshot, ready for the team to fix." },
];

export function SpotTheBug() {
  const [state, setState] = useState<"play" | "miss" | "found" | "revealed">("play");
  const [miss, setMiss] = useState<{ x: number; y: number } | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "found" || state === "revealed") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    if (x >= TARGET.x1 && x <= TARGET.x2 && y >= TARGET.y1 && y <= TARGET.y2) {
      setState("found");
    } else {
      setMiss({ x, y });
      setState("miss");
    }
  };

  const done = state === "found" || state === "revealed";

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      <Glow accent="elixir" position="bottom-right" strength={0.18} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Spot the bug</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Can you find what Wayfinder found?</h2>
          <p className="mt-4 text-lg text-text-muted">
            A real frame from Husk Protocol. One card has a text bug a new player would trip over. Click where you think it is.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <button
              type="button"
              onClick={onClick}
              aria-label="Husk Protocol card catalogue. Click where you think the bug is."
              className="relative block w-full cursor-crosshair overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Image src="/case-studies/husk-protocol/grapple.webp" alt="" width={1400} height={875} className="w-full" />
              {done ? (
                <motion.span
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pointer-events-none absolute rounded-md border-2 border-lumen shadow-[0_0_0_9999px_rgba(23,0,85,0.45)]"
                  style={{ left: `${TARGET.x1}%`, top: `${TARGET.y1}%`, width: `${TARGET.x2 - TARGET.x1}%`, height: `${TARGET.y2 - TARGET.y1}%` }}
                />
              ) : null}
              {state === "miss" && miss ? (
                <motion.span
                  key={`${miss.x}-${miss.y}`}
                  initial={{ opacity: 1, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  transition={{ duration: 0.7 }}
                  className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-aether"
                  style={{ left: `${miss.x}%`, top: `${miss.y}%` }}
                />
              ) : null}
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-text-muted" aria-live="polite">
                {state === "play" && "Hint: look closely at the card tooltips."}
                {state === "miss" && "Not quite. Look at the words in the tooltips."}
                {state === "found" && "Spot on. That is the bug."}
                {state === "revealed" && "Here it is."}
              </p>
              {!done ? (
                <button type="button" onClick={() => setState("revealed")} className="font-semibold text-primary hover:underline">
                  Show me
                </button>
              ) : (
                <button type="button" onClick={() => { setState("play"); setMiss(null); }} className="font-semibold text-text-muted hover:text-foreground">
                  Play again
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-bg-card/80 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="report" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-3">
                    <Image src="/bots/cards/sm/wayfinder.webp" alt="" width={44} height={54} className="h-14 w-auto rounded" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Wayfinder · Verified finding</p>
                      <p className="font-display text-lg font-bold text-foreground">Grapple invokes Purge without explaining it</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] text-text-muted">
                    Grapple says &ldquo;purge 1 random Buff&rdquo;. Its Buff tooltip renders correctly, but no Purge tooltip appears. Flagged consistently across all three Husk sweeps.
                  </p>
                  <ol className="mt-6 space-y-3">
                    {STEPS.map((s, i) => (
                      <li key={s.k} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-void">{i + 1}</span>
                        <p className="text-sm text-text-muted"><b className="text-foreground">{s.k}.</b> {s.t}</p>
                      </li>
                    ))}
                  </ol>
                  <Link href="/case-studies/husk-protocol" className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline">See all five findings →</Link>
                </motion.div>
              ) : (
                <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Wayfinder&rsquo;s report</p>
                  <p className="mt-3 font-display text-xl font-bold text-foreground">Locked until you find it</p>
                  <p className="mt-3 text-[15px] text-text-muted">
                    Wayfinder checked 60 cards like this one, across eight sessions, in 50 minutes of autonomous play. A person would need to hover every card and compare it with the sheet, every build.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
