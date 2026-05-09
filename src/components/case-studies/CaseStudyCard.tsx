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

function StudioBadge({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl border text-base font-bold"
      style={{
        backgroundColor: `${accent}10`,
        borderColor: `${accent}40`,
        color: accent,
      }}
    >
      {initials}
    </div>
  );
}

export function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,255,150,0.08)]"
      >
        {/* Top status bar - mimics a test session header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-black/20 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,150,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Session // {study.game.codename}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/70">
            CASE.{String(index + 1).padStart(3, "0")}
          </span>
        </div>

        <div className="p-6">
          {/* Studio + Game */}
          <div className="flex items-start gap-4">
            <StudioBadge initials={study.studio.initials} accent={study.studio.accent} />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-widest text-text-muted">
                {study.studio.name}
              </p>
              <h3 className="mt-1 truncate text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {study.game.title}
              </h3>
            </div>
            <FlagBadge code={study.country.code} />
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {study.platforms.map((p) => (
              <span
                key={p}
                className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.03] p-1.5"
                title={p}
              >
                <PlatformIcon
                  platform={p}
                  className={`h-4 w-4 ${p === "Android" ? "text-[#3DDC84]" : "text-white"}`}
                />
              </span>
            ))}
          </div>

          {/* Challenge */}
          <p className="mt-5 text-sm leading-relaxed text-text-muted">
            {study.challengeOneLiner}
          </p>

          {/* Metric block */}
          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Headline result
            </p>
            <p
              className="mt-1.5 font-mono text-2xl font-bold leading-none md:text-3xl"
              style={{ color: study.studio.accent }}
            >
              {study.headlineMetric.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {study.headlineMetric.label}
            </p>
          </div>

          {/* CTA hint */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted">
              Read the dossier
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-text-muted transition-all group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Hover accent stripe */}
        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: study.studio.accent }}
        />
      </Link>
    </motion.div>
  );
}
