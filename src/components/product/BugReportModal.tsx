"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACCENT = "#A78BFA";

const metadata: { label: string; value: string }[] = [
  { label: "Report ID", value: "BR-2026-0017" },
  { label: "Date", value: "22/04/2026" },
  { label: "Game / Project", value: "Project Titan (v0.8.2)" },
  { label: "Platform", value: "Mobile" },
  { label: "Session ID", value: "OV-TITAN-MOB-220426-022" },
  { label: "Bot", value: "Overseer" },
  { label: "Build Number", value: "2026.04.21-rc2" },
  { label: "Environment", value: "Staging" },
];

const categories = [
  { label: "Visual / Rendering", on: false },
  { label: "Geometry / Clipping", on: true },
  { label: "Physics", on: false },
  { label: "Animation", on: false },
  { label: "UI / UX", on: true },
  { label: "Gameplay Logic", on: true },
  { label: "Contextual / Semantic", on: false },
];

const severities = [
  { label: "Critical", on: false, color: "#FF4C54" },
  { label: "Major", on: true, color: "#FBBF24" },
  { label: "Minor", on: false, color: "#FDE68A" },
  { label: "Cosmetic", on: false, color: "#86EFAC" },
];

const detectionLayers = [
  { label: "Layer 1 (State / Logs)", on: false },
  { label: "Layer 2 (Video)", on: true },
  { label: "Layer 3 (Screenshot)", on: true },
];

const reproducibility = [
  { label: "Always", on: false },
  { label: "Often", on: false },
  { label: "Sometimes", on: true },
  { label: "Rarely", on: false },
];

const regression = [
  { label: "Yes", on: false },
  { label: "No", on: false },
  { label: "Unknown", on: true },
];

const evidence = [
  "The player character is shown in a raised-arm combat pose.",
  "The arm overlaps/intersects the face region instead of aligning naturally around the head.",
  "The clipping is clearly visible in the centre of the screen on the player model.",
  "The issue appears on the character's upper body, specifically where the arm crosses the face/hood line.",
];

const steps = [
  "Launch Project Titan on build 2026.04.21-rc2.",
  "Enter a combat encounter.",
  "Wait for the player character to enter the raised-arm combat/idle pose.",
  "Observe the upper body and head area of the character model.",
  "Check whether the arm intersects the face during the pose.",
];

const attachments: { label: string; value: string }[] = [
  { label: "Screenshot / Frame", value: "/sessions/BR-2026-0017/frame_01432.png" },
  { label: "Video Clip", value: "/sessions/BR-2026-0017/clip_02m14s_02m32s.mp4" },
  { label: "Log Reference", value: "session OV-TITAN-PC-220426-014 | timestamp 00:02:21.481–00:02:29.903" },
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
                style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.05))" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted/70">
                  Internal · Sample Output
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
                  Detected by <span className="font-semibold text-foreground">Overseer</span>
                  <span className="mx-2 opacity-50">|</span>
                  Powered by <span className="font-semibold text-foreground">Hivemind VLM</span>
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
                    <FieldRow label="Severity">
                      <div className="flex flex-wrap gap-1.5">
                        {severities.map((s) => (
                          <CheckPill key={s.label} label={s.label} on={s.on} accent={s.color} />
                        ))}
                      </div>
                    </FieldRow>
                    <FieldRow label="Detection Layer">
                      <div className="flex flex-wrap gap-1.5">
                        {detectionLayers.map((l) => (
                          <CheckPill key={l.label} {...l} />
                        ))}
                      </div>
                    </FieldRow>
                    <FieldRow label="Confidence">
                      <span className="font-mono text-sm font-semibold text-foreground">0.96</span>
                    </FieldRow>
                  </div>
                </Section>

                {/* Section 3 */}
                <Section number="3" title="Bug Details">
                  <div className="space-y-3">
                    <FieldRow label="Bug Title">
                      <p className="text-[15px] font-semibold leading-relaxed text-foreground">
                        Player character arm clips through face during combat pose
                      </p>
                    </FieldRow>
                    <FieldRow label="Location">
                      <p className="text-[14px] leading-relaxed text-foreground/90">
                        Player character model — upper body / head / raised arm area
                      </p>
                    </FieldRow>
                    <FieldRow label="Description">
                      <div className="space-y-2 text-[14px] leading-relaxed text-text-muted">
                        <p>
                          During combat, the player character enters a pose where the raised arm
                          intersects the character&apos;s face/head instead of sitting cleanly in
                          front of or beside the head. In the captured frame, the forearm/hand
                          visually passes through the face area, creating obvious model clipping.
                        </p>
                        <p>
                          This appears to be a character pose, rigging, or animation issue
                          affecting the upper-body combat stance. The arm placement breaks the
                          silhouette of the character and makes the pose look anatomically
                          incorrect.
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
                        This does not appear to block gameplay, but it noticeably reduces visual
                        quality and polish during combat. It can make character animation look
                        broken or unfinished and may distract players during encounters.
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
                    <FieldRow label="Regression?">
                      <div className="flex flex-wrap gap-1.5">
                        {regression.map((r) => (
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
                        The character&apos;s arm should animate naturally and remain properly
                        separated from the face/head model, with no visible clipping.
                      </p>
                    </FieldRow>
                    <FieldRow label="Actual Result">
                      <p className="text-[14px] leading-relaxed text-text-muted">
                        The raised arm clips through the character&apos;s face/head area during the
                        combat pose.
                      </p>
                    </FieldRow>
                  </div>
                </Section>

                {/* Section 5 */}
                <Section number="5" title="Evidence & Attachments">
                  <div className="overflow-hidden rounded-xl border border-white/[0.07]">
                    {attachments.map((a, i) => (
                      <KeyValue
                        key={a.label}
                        label={a.label}
                        value={a.value}
                        mono
                        borderBottom={i < attachments.length - 1}
                      />
                    ))}
                  </div>
                </Section>

                <p className="border-t border-white/5 pt-5 text-center text-[12px] italic text-text-muted/70">
                  Generated by ManaMind Command Centre · Questions? Contact the CTO.
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
