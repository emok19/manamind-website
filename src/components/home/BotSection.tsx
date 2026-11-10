"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Glow } from "@/components/brand/Graphics";
import { bots, categories, services, serviceById, type Bot, type BotAbility, type BotCategory } from "@/data/bots";

// Services first, bots second: pick a QA service, read what it means, then meet the bots
// that deliver it. Bot status ("in training") is deliberately not shown: every bot is
// presented as a product, and demo requests tell us which ones to prioritise.

// Full-size cards for the profile modal, 320px versions (cards/sm) for the small thumbnails.
const cardSrc = (bot: Bot, hover = false, small = false) => `/bots/cards/${small ? "sm/" : ""}${bot.id}${hover ? "-hover" : ""}.webp`;
const MAX_CHIPS = 5;

type Filter = "all" | BotCategory;
const isFilter = (v: string): v is Filter => categories.some((c) => c.id === v);

export function BotSection() {
  const [filter, setFilter] = useState<Filter>("functional");
  const [selected, setSelected] = useState<Bot | null>(null);
  const filtered = useMemo(() => (filter === "all" ? bots : bots.filter((bot) => bot.category === filter)), [filter]);
  const service = filter === "all" ? null : serviceById(filter);

  // Deep links such as /services#localisation open that service.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (isFilter(id)) setFilter(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const choose = (id: Filter) => {
    setFilter(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-background py-20 md:py-24">
      <Glow accent="arcane" position="top" strength={0.3} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our services</span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">Five game QA services, delivered by specialist bots</h2>
          <p className="mt-4 text-lg text-text-muted">
            Pick the kind of QA you need to see what it covers. Underneath, meet the bots that do the work.
          </p>
          <p className="mt-3 text-sm text-text-muted/80">
            Some services are in early access: tell us what you need and we&rsquo;ll scope it with you.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2" role="tablist" aria-label="QA services">
          {categories.map((category) => {
            const color = category.id === "all" ? "#8AE9D0" : serviceById(category.id)?.color ?? "#8AE9D0";
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => choose(category.id)}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-void" : "border-white/10 bg-white/[0.02] text-text-muted hover:border-white/25 hover:text-foreground"}`}
                style={active ? { background: color, borderColor: color } : undefined}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-8"
          >
            {service ? (
              <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                <ServiceIntro serviceId={service.id} />
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-text-muted">
                    Delivered by:
                  </p>
                  <div className="grid gap-4">
                    {filtered.map((bot) => <BotCard key={bot.id} bot={bot} onOpen={() => setSelected(bot)} />)}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="mx-auto mb-6 max-w-2xl text-center text-text-muted">
                  All five bots across the five services. Open a profile for everything a bot checks.
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((bot) => <BotCard key={bot.id} bot={bot} onOpen={() => setSelected(bot)} showService />)}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BotModal bot={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ServiceIntro({ serviceId }: { serviceId: BotCategory }) {
  const s = services.find((x) => x.id === serviceId)!;
  return (
    <article className="rounded-3xl border bg-bg-card/80 p-6 md:p-8" style={{ borderColor: `${s.color}55` }}>
      <p className="font-display text-sm font-bold uppercase tracking-[0.16em]" style={{ color: s.color }}>{s.label}</p>
      <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">{s.question}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{s.definition}</p>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-widest text-text-muted">What it covers</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {s.covers.map((item) => (
          <li key={item} className="flex gap-2 text-[14px] leading-snug text-foreground/90">
            <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-white/10 pt-4 text-[14px] leading-relaxed text-text-muted">
        <b className="text-foreground">Why it matters:</b> {s.whyItMatters}
      </p>
      {s.proof ? (
        <Link href={s.proof.href} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">{s.proof.text} →</Link>
      ) : null}
      <div className="mt-6">
        <Link href={`/contact?services=${s.id}`} className="inline-flex rounded-full px-6 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-[1.03]" style={{ background: s.color }}>
          Talk to us about {s.label}
        </Link>
      </div>
    </article>
  );
}

function BotCard({ bot, onOpen, showService = false }: { bot: Bot; onOpen: () => void; showService?: boolean }) {
  const abilities = bot.abilityGroups?.flatMap((group) => group.abilities) ?? [];
  const chips = abilities.length ? abilities.length : bot.capabilities?.length ?? 0;

  return (
    <article className="group relative flex gap-4 rounded-2xl border border-white/10 bg-bg-card/70 p-3 transition-colors hover:border-white/25 sm:gap-5 sm:p-4">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${bot.name} profile`}
        className="relative aspect-[1332/1644] w-[104px] shrink-0 overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-[128px]"
        style={{ boxShadow: `0 14px 34px -18px ${bot.color}` }}
      >
        <img src={cardSrc(bot, false, true)} alt="" loading="lazy" width={128} height={158} className="absolute inset-0 h-full w-full object-cover" />
        <img src={cardSrc(bot, true, true)} alt="" loading="lazy" width={128} height={158} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">{bot.name}</h3>
            {showService ? <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: bot.color }}>{bot.categoryLabel}</p> : null}
          </div>
          <button type="button" onClick={onOpen} className="shrink-0 text-sm font-semibold text-text-muted transition-colors hover:text-primary">
            Profile →
          </button>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-snug text-text-muted">{bot.specialisesIn}</p>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label={`What ${bot.name} does`}>
          {abilities.length
            ? abilities.slice(0, MAX_CHIPS).map((item) => <AbilityChip key={item.name} ability={item} accent={bot.color} />)
            : bot.capabilities?.slice(0, MAX_CHIPS).map((c) => (
                <span key={c.label} title={c.detail} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11.5px] text-foreground/85">{c.label}</span>
              ))}
          {chips > MAX_CHIPS ? (
            <button type="button" onClick={onOpen} className="rounded-full border border-dashed border-white/20 px-2.5 py-1 text-[11.5px] text-text-muted hover:text-foreground">
              +{chips - MAX_CHIPS} more
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function HexIcon({ ability, accent, size = 18 }: { ability: BotAbility; accent: string; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" fill="none" className="shrink-0" dangerouslySetInnerHTML={{ __html: ability.icon }} style={{ color: accent }} />;
}

// Plain-English chip; the RPG hero name only appears in the tooltip.
function AbilityChip({ ability, accent }: { ability: BotAbility; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="group/ability relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${ability.label}: show details`}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center gap-1.5 rounded-full border bg-white/[0.03] px-2.5 py-1 text-[11.5px] text-foreground/90 transition-colors hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        style={{ borderColor: ability.ultimate ? `${accent}99` : "rgba(255,255,255,.12)" }}
      >
        <HexIcon ability={ability} accent={accent} size={14} />
        {ability.label}
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-30 w-[240px] rounded-xl border bg-[#0E0038] p-3 text-left opacity-0 shadow-2xl transition-opacity duration-150 group-hover/ability:opacity-100 max-md:fixed max-md:bottom-4 max-md:left-4 max-md:right-4 max-md:w-auto ${open ? "opacity-100" : ""}`}
        style={{ borderColor: `${accent}80` }}
      >
        <span className="flex items-center gap-2">
          <HexIcon ability={ability} accent={accent} size={22} />
          <span className="text-[13px] font-bold text-foreground">{ability.label}</span>
        </span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
          Hero ability: {ability.name}{ability.ultimate ? " · Ultimate" : ""}
        </span>
        <span className="mt-2 block text-[11.5px] leading-relaxed text-[#D9D2F0]">{ability.desc}</span>
      </span>
    </span>
  );
}

function BotModal({ bot, onClose }: { bot: Bot | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {bot ? (
        <motion.div key="bot-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close bot details" className="absolute inset-0 cursor-default bg-black/75" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={`${bot.name} details`} className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .22, ease: "easeOut" }}>
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-text-muted hover:border-white/20 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">×</button>
            <div className="grid min-h-0 grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)]">
              <div className="relative flex h-[34vh] min-h-[260px] max-h-[360px] items-center justify-center overflow-hidden border-b border-white/[0.06] md:aspect-[666/822] md:h-[min(calc(90vh-3px),640px)] md:min-h-0 md:max-h-none md:border-b-0 md:border-r" style={{ background: "#21086A" }}>
                <img src={cardSrc(bot, true)} alt={`${bot.name} character card`} className="absolute inset-0 h-full w-full object-contain md:object-cover" />
              </div>
              <div className="flex min-h-0 max-h-[calc(90vh-34vh)] flex-col gap-5 overflow-y-auto p-6 sm:p-8 md:max-h-[min(calc(90vh-3px),640px)]">
                <div className="pr-10">
                  <Link href={`/services#${bot.category}`} onClick={onClose} className="text-xs font-bold uppercase tracking-widest hover:underline" style={{ color: bot.color }}>{bot.categoryLabel}</Link>
                  <h3 className="mt-1 text-2xl font-bold text-foreground">{bot.name}</h3>
                </div>
                <DetailBlock label="Specialises in" text={bot.specialisesIn} />
                <DetailBlock label="Bio" text={bot.bio} muted />
                {bot.scopeNote ? <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-[13px] leading-relaxed text-text-muted"><b className="text-foreground">{bot.name}</b>: {bot.scopeNote}</div> : null}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: bot.color }}>{bot.abilityGroups ? "Abilities" : "What it checks"}</p>
                  {bot.abilityGroups ? (
                    <div className="space-y-5">
                      {bot.abilityGroups.map((group) => (
                        <div key={group.groupLabel ?? "abilities"}>
                          {group.groupLabel ? <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted/70">{group.groupLabel}</p> : null}
                          <div className="grid gap-3 sm:grid-cols-2">{group.abilities.map((item) => <AbilityDetail key={item.name} ability={item} accent={bot.color} />)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {bot.capabilities?.map((c) => (
                        <li key={c.label} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3">
                          <p className="text-[13.5px] font-bold text-foreground">{c.label}</p>
                          <p className="mt-1 text-[12.5px] leading-relaxed text-text-muted">{c.detail}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4"><p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">Impact</p><p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: bot.color }}>{bot.impact}</p></div>
                <Link href={`/contact?services=${bot.category}&bots=${bot.id}`} className="w-fit rounded-full px-6 py-2.5 text-sm font-semibold text-void" style={{ background: bot.color }}>
                  Ask about {bot.name}
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DetailBlock({ label, text, muted = false }: { label: string; text: string; muted?: boolean }) {
  return <div><p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60">{label}</p><p className={`mt-1.5 text-[14px] leading-relaxed ${muted ? "text-text-muted" : "text-foreground/90"}`}>{text}</p></div>;
}

function AbilityDetail({ ability, accent }: { ability: BotAbility; accent: string }) {
  return (
    <div className={`rounded-xl border p-3 ${ability.ultimate ? "bg-white/[0.04]" : "bg-white/[0.02]"}`} style={{ borderColor: ability.ultimate ? `${accent}80` : "rgba(255,255,255,.09)" }}>
      <div className="mb-1.5 flex items-center gap-2">
        <HexIcon ability={ability} accent={accent} />
        <span className="text-[13.5px] font-bold text-foreground">{ability.label}</span>
      </div>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }} title="Hero ability name">{ability.name}{ability.ultimate ? " · Ultimate" : ""}</p>
      <p className="text-[12.5px] leading-relaxed text-text-muted">{ability.desc}</p>
      <p className="mt-2 border-t border-white/[0.06] pt-2 text-[11.5px] leading-relaxed text-text-muted/80"><b style={{ color: accent }}>Example</b> {ability.example}</p>
    </div>
  );
}
