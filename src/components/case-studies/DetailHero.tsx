"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Flags from "country-flag-icons/react/3x2";
import type { CaseStudy } from "@/data/case-studies";
import { PlatformIcon } from "./PlatformIcon";

function FlagBadge({ code, name }: { code: string; name: string }) {
  const Flag = (Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[code.toUpperCase()];
  if (!Flag) return null;
  return (
    <span
      className="inline-flex h-4 w-6 overflow-hidden rounded-sm ring-1 ring-white/10"
      title={name}
      aria-label={name}
    >
      <Flag className="h-full w-full object-cover" />
    </span>
  );
}

function StudioAttribution({
  initials,
  accent,
  logo,
  name,
}: {
  initials: string;
  accent: string;
  logo?: string;
  name: string;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${name} logo`}
        width={220}
        height={44}
        className="h-9 w-auto object-contain md:h-10"
      />
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold"
        style={{
          backgroundColor: `${accent}10`,
          borderColor: `${accent}40`,
          color: accent,
        }}
      >
        {initials}
      </span>
      <p className="truncate text-base font-semibold text-foreground md:text-lg">
        {name}
      </p>
    </div>
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

        {/* Studio attribution + country */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4"
        >
          <StudioAttribution
            initials={study.studio.initials}
            accent={accent}
            logo={study.studio.logo}
            name={study.studio.name}
          />
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-muted">
            <FlagBadge code={study.country.code} name={study.country.name} />
            {study.country.name}
          </span>
        </motion.div>

        {/* Game logo / title block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex h-44 items-center justify-center rounded-2xl border border-white/10 bg-black/40 px-8 py-6 md:h-56"
        >
          {study.game.logo ? (
            <Image
              src={study.game.logo}
              alt={`${study.game.title} logo`}
              width={520}
              height={220}
              priority
              className="max-h-full w-auto object-contain"
            />
          ) : (
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {study.game.codename}
              </p>
              <p
                className="mt-2 text-4xl font-bold leading-tight md:text-5xl"
                style={{ color: accent }}
              >
                {study.game.title}
              </p>
            </div>
          )}
        </motion.div>

        {/* SEO/a11y h1 — visual title comes from logo wordmark or fallback box above */}
        <h1 className="sr-only">{study.game.title}</h1>

        {/* Genres + platforms */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {study.genres.map((g) => (
            <span
              key={g}
              className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted"
            >
              {g}
            </span>
          ))}
          {study.genres.length > 0 && (
            <span className="mx-1 h-3 w-px bg-white/10" aria-hidden />
          )}
          {study.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.03] p-2"
              title={p}
            >
              <PlatformIcon platform={p} className="h-4 w-4 text-white" />
            </span>
          ))}
        </motion.div>

        {/* Challenge + headline metric */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-stretch"
        >
          <div className="rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              The challenge
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground md:text-lg">
              {study.challengeOneLiner}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm md:min-w-[220px]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Headline result
            </p>
            <p
              className="mt-2 font-mono text-3xl font-bold leading-none md:text-4xl"
              style={{ color: accent }}
            >
              {study.headlineMetric.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {study.headlineMetric.label}
            </p>
          </div>
        </motion.div>

        {/* Snapshot grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-bg-card/60 p-5 backdrop-blur-sm md:grid-cols-4"
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
