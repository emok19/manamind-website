"use client";

import { motion } from "framer-motion";
import type { CaseStudy, Severity } from "@/data/case-studies";
import { FadeInView } from "@/components/animations/FadeInView";

function SectionLabel({
  index,
  label,
  accent,
}: {
  index: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md border text-[11px]"
        style={{
          color: accent,
          borderColor: `${accent}40`,
          backgroundColor: `${accent}10`,
        }}
      >
        {index}
      </span>
      <span className="text-text-muted">{label}</span>
    </div>
  );
}

const SEVERITY_STYLES: Record<Severity, { color: string; bg: string; border: string }> = {
  Critical: { color: "#FF4C54", bg: "rgba(255,76,84,0.12)", border: "rgba(255,76,84,0.4)" },
  High: { color: "#FBBF24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.4)" },
  Medium: { color: "#38BDF8", bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.4)" },
  Low: { color: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.4)" },
};

function EvidenceIcon({ type }: { type: "video" | "screenshot" | "log" }) {
  const paths = {
    video: "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
    screenshot:
      "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM3.5 16.5l4-4 3 3 5-5 5 5",
    log: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
      <path d={paths[type]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DetailSections({ study }: { study: CaseStudy }) {
  const accent = study.studio.accent;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      {/* 01 - Challenge */}
      <FadeInView className="mt-20">
        <SectionLabel index="01" label="The Challenge" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {study.challenge.headline}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
          {study.challenge.problem}
        </p>
      </FadeInView>

      {/* 02 - Deployment */}
      <FadeInView className="mt-24">
        <SectionLabel index="02" label="How ManaMind Was Deployed" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {study.deployment.headline}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
          {study.deployment.summary}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-bg-card p-5 md:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Concurrent Sessions
            </p>
            <p
              className="mt-2 font-mono text-4xl font-bold leading-none"
              style={{ color: accent }}
            >
              {study.deployment.sessions}
            </p>
            <p className="mt-2 text-xs text-text-muted">parallel bot instances</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-bg-card p-5 md:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Test Focus Areas
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {study.deployment.focus.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInView>

      {/* 03 - Findings */}
      <FadeInView className="mt-24">
        <SectionLabel index="03" label="What Our Bots Found" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {study.findings.length} representative findings.
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          A small slice of the bug pile, ranked by severity. Every finding shipped
          with reproduction steps and evidence attached.
        </p>

        <div className="mt-8 space-y-3">
          {study.findings.map((bug, i) => {
            const sev = SEVERITY_STYLES[bug.severity];
            return (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-bg-card p-4 transition-colors hover:border-white/20 sm:flex-row sm:items-center"
              >
                {/* Evidence preview placeholder */}
                <div className="relative flex h-20 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black/40 sm:w-32">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${accent}10 0 6px, transparent 6px 12px)`,
                    }}
                  />
                  <div className="relative flex flex-col items-center gap-1 text-text-muted">
                    <EvidenceIcon type={bug.evidence} />
                    <span className="font-mono text-[9px] uppercase tracking-widest">
                      {bug.evidence}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: sev.color, backgroundColor: sev.bg, borderColor: sev.border }}
                    >
                      {bug.severity}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                      {bug.id}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-foreground">
                    {bug.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {bug.summary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </FadeInView>

      {/* 04 - Results */}
      <FadeInView className="mt-24">
        <SectionLabel index="04" label="Results & Metrics" accent={accent} />
        <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          The numbers, before and after.
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Metric
                </th>
                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Before
                </th>
                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  After
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Delta
                </th>
              </tr>
            </thead>
            <tbody>
              {study.results.map((row, i) => (
                <tr
                  key={row.metric}
                  className={i !== study.results.length - 1 ? "border-b border-white/5" : ""}
                >
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {row.metric}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-text-muted">
                    {row.before}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-foreground">
                    {row.after}
                  </td>
                  <td
                    className="px-5 py-4 text-right font-mono text-sm font-semibold"
                    style={{ color: accent }}
                  >
                    {row.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInView>

      {/* 05 - Quote */}
      <FadeInView className="mt-24">
        <SectionLabel index="05" label="Team Feedback" accent={accent} />

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-bg-card p-8 md:p-12">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(ellipse at 20% 0%, ${accent}10 0%, transparent 50%)`,
            }}
          />
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 opacity-30"
              style={{ color: accent }}
            >
              <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V9a2 2 0 00-2-2zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V9a2 2 0 00-2-2z" />
            </svg>

            <blockquote className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
              &ldquo;{study.quote.body}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold"
                style={{
                  color: accent,
                  borderColor: `${accent}40`,
                  backgroundColor: `${accent}14`,
                }}
              >
                {study.quote.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{study.quote.author}</p>
                <p className="text-xs text-text-muted">{study.quote.title}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
