"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACCENT = "#DA97FF";

// Sample report rebuilt from a real, published finding (Husk Protocol case study, verified by Wayfinder).
// Only facts stated in the approved case study are used.
const metadata: { label: string; value: string }[] = [
  { label: "Game", value: "Husk Protocol (OddSub / Fireshine Games)" },
  { label: "Platform", value: "Windows (Steam)" },
  { label: "Build", value: "Steam branch, alpha" },
  { label: "Bot", value: "Wayfinder" },
  { label: "Task", value: "Validate compendium cards" },
  { label: "Reference", value: "Team card and tooltip sheet" },
];

const categories = [
  { label: "UI / UX", on: true },
  { label: "Text / Localisation", on: true },
  { label: "Gameplay Logic", on: false },
  { label: "Visual / Rendering", on: false },
];

const reproducibility = [
  { label: "Always (3 of 3 sweeps)", on: true },
  { label: "Sometimes", on: false },
  { label: "Rarely", on: false },
];

const evidence = [
  "The Grapple card text reads \u201cpurge 1 random Buff\u201d.",
  "Hovering the card shows a tooltip explaining Buff.",
  "No tooltip explains Purge, unlike every other keyword in the catalogue.",
  "The same keyword is explained correctly on a different card.",
];

const steps = [
  "Launch Husk Protocol from the Steam branch.",
  "Open the card compendium.",
  "Hover the Grapple card and read its keyword tooltips.",
  "Compare the on-screen text with the reference sheet.",
];

export function BugReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="bug-report-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Sample bug report"
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[3px] w-full shrink-0" style={{ background: ACCENT }} />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-text-muted transition-colors hover:border-white/20 hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="overflow-y-auto">
              {/* Header */}
              <div
                className="px-6 py-7 sm:px-10 sm:py-9"
                style={{ background: "linear-gradient(135deg, rgba(218,151,255,0.18), rgba(218,151,255,0.05))" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted/70">
                  Sample report · Real finding
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    BUG REPORT
                  </h2>
                  <span className="text-base font-semibold" style={{ color: ACCENT }}>
                    · ManaMind Command Centre
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-text-muted">
                  Detected by <span className="font-semibold text-foreground">Wayfinder</span>
                  <span className="mx-2 opacity-50">|</span>
                  Powered by <span className="font-semibold text-foreground">HiveMind</span>
                </p>
              </div>

              <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
                {/* Section 1 */}
                <Section number="1" title="Report Metadata">
                  <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/[0.07] sm:grid-cols-2">
                    {metadata.map((m, i) => (
                      <KeyValue
                        key={m.label}
                        label={m.label}
                        value={m.value}
                        borderRight={i % 2 === 0}
                        borderBottom={i < metadata.length - 2}
                      />
                    ))}
                  </div>
                </Section>

                {/* Section 2 */}
                <Section number="2" title="Bug Classification">
                  <div className="space-y-3">
                    <FieldRow label="Bug Category">
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((c) => (
                          <CheckPill key={c.label} {...c} />
                        ))}
                      </div>
                    </FieldRow>
                  </div>
                </Section>

                {/* Section 3 */}
                <Section number="3" title="Bug Details">
                  <div className="space-y-3">
                    <FieldRow label="Bug Title">
                      <p className="text-[15px] font-semibold leading-relaxed text-foreground">
                        Grapple invokes Purge without explaining it
                      </p>
                    </FieldRow>
                    <FieldRow label="Location">
                      <p className="text-[14px] leading-relaxed text-foreground/90">
                        Card compendium, Grapple card tooltip
                      </p>
                    </FieldRow>
                    <FieldRow label="Description">
                      <div className="space-y-2 text-[14px] leading-relaxed text-text-muted">
                        <p>
                          Grapple says &ldquo;purge 1 random Buff&rdquo;. Its Buff tooltip renders correctly, but no Purge tooltip
                          appears. A first-time player has no way to know what Purge does to their deck.
                        </p>
                      </div>
                    </FieldRow>
                    <FieldRow label="Evidence">
                      <ul className="space-y-1.5 text-[14px] leading-relaxed text-foreground/90">
                        {evidence.map((e) => (
                          <li key={e} className="flex gap-2.5">
                            <span style={{ color: ACCENT }} className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </FieldRow>
                    <FieldRow label="Player Impact">
                      <p className="text-[14px] leading-relaxed text-text-muted">
                        New players are left guessing what the card does. The team already knew the keyword, so it was easy to miss in-house.
                      </p>
                    </FieldRow>
                  </div>
                </Section>

                {/* Section 4 */}
                <Section number="4" title="Reproduction">
                  <div className="space-y-3">
                    <FieldRow label="Reproducibility">
                      <div className="flex flex-wrap gap-1.5">
                        {reproducibility.map((r) => (
                          <CheckPill key={r.label} {...r} />
                        ))}
                      </div>
                    </FieldRow>
                    <FieldRow label="Steps to Reproduce">
                      <ol className="space-y-1.5 text-[14px] leading-relaxed text-foreground/90">
                        {steps.map((s, i) => (
                          <li key={s} className="flex gap-3">
                            <span className="font-mono text-xs font-semibold text-text-muted/70">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </FieldRow>
                    <FieldRow label="Expected Result">
                      <p className="text-[14px] leading-relaxed text-text-muted">
                        Purge shows a tooltip explaining it, like every other keyword.
                      </p>
                    </FieldRow>
                    <FieldRow label="Actual Result">
                      <p className="text-[14px] leading-relaxed text-text-muted">
                        Only the Buff tooltip appears. Purge is left unexplained.
                      </p>
                    </FieldRow>
                  </div>
                </Section>

                {/* Section 5 */}
                <Section number="5" title="Evidence & Attachments">
                  <div className="overflow-hidden rounded-xl border border-white/[0.07]">
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-white/[0.05] px-4 py-3">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted/70">
                        Screenshot / Frame
                      </span>
                      <div className="flex items-center justify-center overflow-hidden rounded-md border border-white/[0.07] bg-black/40 p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/case-studies/husk-protocol/grapple.webp"
                          alt="Husk Protocol Grapple card showing a Buff tooltip while the Purge keyword has no tooltip."
                          className="block max-h-[320px] w-auto rounded"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-4 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/70">Source</span>
                      <a href="/case-studies/husk-protocol" className="text-[14px] font-semibold text-primary hover:underline">
                        Husk Protocol case study: all five verified findings
                      </a>
                    </div>
                  </div>
                </Section>

                <p className="border-t border-white/5 pt-5 text-center text-[12px] italic text-text-muted/70">
                  Generated by ManaMind Command Centre
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-2">
        <span
          className="font-mono text-xs font-bold tracking-widest"
          style={{ color: ACCENT }}
        >
          {number}
        </span>
        <h3 className="text-base font-bold uppercase tracking-widest text-foreground">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.015] p-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/70">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

function KeyValue({
  label,
  value,
  mono,
  borderRight,
  borderBottom,
}: {
  label: string;
  value: string;
  mono?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-4 py-3 ${
        borderRight ? "sm:border-r sm:border-white/[0.05]" : ""
      } ${borderBottom ? "border-b border-white/[0.05]" : ""}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted/70">
        {label}
      </span>
      <span
        className={`text-[13px] text-foreground/90 ${mono ? "break-all font-mono text-[12px]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function CheckPill({ label, on, accent }: { label: string; on: boolean; accent?: string }) {
  const color = accent ?? ACCENT;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors ${
        on
          ? "text-foreground"
          : "border-white/10 bg-white/[0.02] text-text-muted/70"
      }`}
      style={
        on
          ? { borderColor: `${color}55`, backgroundColor: `${color}18`, color }
          : undefined
      }
    >
      <span
        className={`flex h-3 w-3 items-center justify-center rounded-[3px] border ${
          on ? "border-current" : "border-white/20"
        }`}
        style={on ? { backgroundColor: `${color}30` } : undefined}
      >
        {on ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4.2L3 6L7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      {label}
    </span>
  );
}
