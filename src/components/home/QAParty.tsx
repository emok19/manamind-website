"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Glow, Tiles } from "@/components/brand/Graphics";
import { bots, services } from "@/data/bots";

// "Choose your services": pick the QA services your game needs, then open the contact
// form pre-filled. Services come first because QA leads know the categories, not the
// bot names; each tile still shows which bots deliver it.
export function QAParty() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const href = picked.length ? `/contact?services=${picked.join(",")}` : "/contact";
  const names = services.filter((s) => picked.includes(s.id)).map((s) => s.label);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-card py-20 md:py-24">
      <Glow accent="arcane" position="top" strength={0.35} />
      <Tiles seed={71} outlined fade="bottom" opacity={0.3} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Choose your services</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">What does your game need tested?</h2>
          <p className="mt-4 text-lg text-text-muted">
            Pick one or more services. We will build your test plan around them and come to the call prepared.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => {
            const on = picked.includes(s.id);
            const team = bots.filter((b) => b.category === s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.id)}
                  className="relative flex h-full w-full flex-col rounded-2xl border bg-background/60 p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  style={{ borderColor: on ? s.color : "rgba(255,255,255,.1)", boxShadow: on ? `0 0 0 1px ${s.color}, 0 18px 40px -22px ${s.color}` : "none" }}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-base font-bold" style={{ color: s.color }}>{s.label}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: on ? s.color : "rgba(255,255,255,.25)", background: on ? s.color : "transparent" }}
                    >
                      {on ? (
                        <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 24 24" fill="none" stroke="#170055" strokeWidth="3" className="h-3.5 w-3.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></motion.svg>
                      ) : null}
                    </span>
                  </span>
                  <span className="mt-2 block text-[13.5px] leading-snug text-text-muted">{s.question}</span>
                  <span className="mt-auto flex items-center gap-2 pt-4">
                    {team.map((b) => (
                      <img key={b.id} src={`/bots/cards/sm/${b.id}.webp`} alt="" width={30} height={37} loading="lazy" className="h-[37px] w-[30px] rounded-[3px] object-cover" />
                    ))}
                    <span className="text-[11.5px] text-text-muted">{team.map((b) => b.name).join(" + ")}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="min-h-[1.5rem] text-sm text-text-muted" aria-live="polite">
            {names.length ? <>You picked: <b className="text-foreground">{names.join(", ")}</b></> : "Tap the services you need."}
          </p>
          <Link href={href} className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]">
            {names.length ? "Build my test plan" : "Talk to us about your game"}
          </Link>
        </div>
      </div>
    </section>
  );
}
