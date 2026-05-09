"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Flags from "country-flag-icons/react/3x2";
import type { CaseStudy } from "@/data/case-studies";
import { PlatformIcon } from "./PlatformIcon";

function FlagBadge({ code }: { code: string }) {
  const Flag = (Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[code.toUpperCase()];
  if (!Flag) return null;
  return (
    <span
      className="inline-flex h-4 w-6 overflow-hidden rounded-sm ring-1 ring-white/10"
      aria-hidden
    >
      <Flag className="h-full w-full object-cover" />
    </span>
  );
}

export function DetailHero({ study }: { study: CaseStudy }) {
  const accent = study.studio.accent;

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${accent}14 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All case studies
        </Link>

        {/* Codename strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          <span className="h-px w-8" style={{ background: accent }} />
          Dossier // {study.game.codename}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {study.game.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 text-lg text-text-muted"
        >
          by <span className="text-foreground">{study.studio.name}</span>
        </motion.p>

        {/* Tag row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          <span className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-text-muted">
            <FlagBadge code={study.country.code} /> {study.country.name}
          </span>
          {study.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.03] p-2"
              title={p}
            >
              <PlatformIcon
                platform={p}
                className={`h-4 w-4 ${p === "Android" ? "text-[#3DDC84]" : "text-white"}`}
              />
            </span>
          ))}
        </motion.div>

        {/* Snapshot grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm md:grid-cols-4"
        >
          {[
            { label: "Studio Type", value: study.snapshot.type },
            { label: "Team Size", value: study.snapshot.teamSize },
            { label: "Stage", value: study.snapshot.stage },
            { label: "Test Window", value: study.snapshot.testWindow },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {s.label}
              </p>
              <p className="mt-1.5 text-sm font-medium text-foreground">{s.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
