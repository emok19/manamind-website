"use client";

import { useState } from "react";
import { BugReportModal } from "@/components/product/BugReportModal";

// What every report contains, with the sample report (real Husk Protocol finding) one click away.
const PARTS = [
  { t: "The evidence", d: "The exact frame the bot saw when it caught the issue." },
  { t: "What went wrong", d: "A plain-language title and description, written for your team." },
  { t: "How to reproduce it", d: "Step by step, plus the expected and actual result." },
  { t: "Where it happened", d: "Game, build, platform and the task the bot was running." },
];

export function ReportShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-t border-white/5 bg-bg-card py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Every finding, reported</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">A bug report your team can act on</h2>
          <p className="mt-4 text-lg text-text-muted">
            When a bot finds something, it does not just flag it. It writes the report a good tester would write.
          </p>
          <button type="button" onClick={() => setOpen(true)} className="mt-8 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]">
            Open a real report
          </button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {PARTS.map((p, i) => (
            <li key={p.t} className="rounded-2xl border border-white/10 bg-background/60 p-6">
              <span className="font-display text-sm font-bold text-aether">0{i + 1}</span>
              <p className="mt-3 font-display text-lg font-bold text-foreground">{p.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
      <BugReportModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
