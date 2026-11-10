"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { SALES_EMAIL, BOOKING_URL } from "@/lib/constants";
import { LogoSymbol } from "@/components/brand/Logo";
import Link from "next/link";
import { bots, services } from "@/data/bots";

// Where the form is delivered (Formspree). If it is missing or the request fails,
// the visitor is shown the email address instead. We never show "sent" unless the
// endpoint confirmed it.
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "https://formspree.io/f/xyeeaqal";

type ChannelId = "studios" | "press" | "general";

type Channel = {
  id: ChannelId;
  label: string;
  blurb: string;
  subject: string;
  accent: string;
  rolePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
};

const CHANNELS: Channel[] = [
  {
    id: "studios",
    label: "Studios & partners",
    blurb: "Using ManaMind on your game, a pilot, or a partnership.",
    subject: "Studios & partners enquiry",
    accent: "#8AE9D0",
    rolePlaceholder: "e.g. QA lead, Producer",
    emailPlaceholder: "you@studio.com",
    companyPlaceholder: "Studio",
  },
  {
    id: "press",
    label: "Press & media",
    blurb: "Interviews, speaking opportunities and media enquiries.",
    subject: "Press & media enquiry",
    accent: "#FFFEBA",
    rolePlaceholder: "e.g. Journalist, Editor",
    emailPlaceholder: "you@outlet.com",
    companyPlaceholder: "Organisation",
  },
  {
    id: "general",
    label: "Anything else",
    blurb: "Not sure where it fits? Send it anyway, we read everything.",
    subject: "General enquiry",
    accent: "#DA97FF",
    rolePlaceholder: "e.g. Researcher, Student",
    emailPlaceholder: "you@example.com",
    companyPlaceholder: "Organisation",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_BG = { backgroundColor: "rgba(14,0,56,.6)" };

function Field({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 px-4 py-3 text-[15px] text-foreground placeholder:text-text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        style={FIELD_BG}
      />
    </label>
  );
}

const EMPTY = { name: "", email: "", role: "", company: "", message: "", website: "", platforms: "", engine: "", stage: "" };

const NEXT_STEPS: [string, string][] = [
  ["We reply within one business day", "A real person from the team, not an autoresponder."],
  ["A 30 minute call", "We learn about your game, platforms and what slows your QA down."],
  ["A demo on your kind of game", "You see the bots play, find issues and write the reports."],
];

export function ContactConsole() {
  const [status, setStatus] = useState<Status>("idle");
  const [channelId, setChannelId] = useState<ChannelId>("studios");
  const [form, setForm] = useState(EMPTY);
  const [party, setParty] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);

  // Services picked on /services arrive as ?services=functional,localisation.
  // The older ?bots=wayfinder,rosetta links still work. Both are sent with the
  // enquiry, so the team knows what to prepare and which services are in demand.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const list = (key: string) => params.get(key)?.split(",").filter(Boolean) ?? [];
    const serviceIds = list("services");
    const ALIASES: Record<string, string> = { wayfinder: "trailblazer" }; // Wayfinder retired 9 Nov 2026
    const botIds = list("bots").map((id) => ALIASES[id] ?? id);
    const chosen = services.filter((s) => serviceIds.includes(s.id) || bots.some((b) => botIds.includes(b.id) && b.category === s.id));
    const team = bots.filter((b) => botIds.includes(b.id) || serviceIds.includes(b.category)).map((b) => b.name);
    if (chosen.length) {
      const labels = chosen.map((s) => s.label);
      setPicked(labels);
      setParty(team);
      setForm((f) => ({ ...f, message: f.message || `We are interested in ${labels.join(", ")}. Our game is...` }));
    }
  }, []);

  const channel = CHANNELS.find((c) => c.id === channelId) ?? CHANNELS[0];
  const update = (key: keyof typeof form) => (v: string) => setForm((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill hidden fields, people do not
    setStatus("sending");
    try {
      if (!CONTACT_ENDPOINT) throw new Error("No contact endpoint configured");
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          channel: channel.label,
          _subject: `[manamind.ai] ${channel.subject}: ${form.name}`,
          name: form.name,
          email: form.email,
          role: form.role,
          company: form.company,
          message: form.message,
          platforms: form.platforms,
          engine: form.engine,
          game_stage: form.stage,
          services_selected: picked.join(", "),
          bots_selected: party.join(", "),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      if (window.gtag) window.gtag("event", "generate_lead", { channel: channel.id });
    } catch {
      setStatus("error");
      if (window.gtag) window.gtag("event", "contact_form_error", { channel: channel.id });
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm(EMPTY);
  };

  return (
    <section id="message" className="relative scroll-mt-24 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Form */}
          <div data-form-card className="overflow-hidden rounded-3xl border border-white/10 bg-bg-card/80 backdrop-blur-sm">
            <div className="border-b border-white/10 px-6 pt-6 md:px-10 md:pt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">What is it about?</p>
              <div className="flex flex-wrap gap-2 pb-6" role="radiogroup" aria-label="Enquiry type">
                {CHANNELS.map((c) => {
                  const active = c.id === channelId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setChannelId(c.id)}
                      className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                      style={{
                        borderColor: active ? c.accent : "rgba(255,255,255,.15)",
                        background: active ? c.accent : "transparent",
                        color: active ? "#170055" : "var(--text-muted)",
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 text-center" role="status">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-void">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-foreground">Message received.</h3>
                    <p className="mx-auto mt-3 max-w-md text-text-muted">
                      Thanks{form.name ? ` ${form.name.split(" ")[0]}` : ""}. It is with the team now and we will reply to {form.email} within one business day.
                    </p>
                    <button type="button" onClick={reset} className="mt-8 text-sm font-medium text-text-muted underline-offset-4 hover:text-primary hover:underline">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    <p className="text-sm text-text-muted">{channel.blurb}</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Name" name="name" required value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" />
                      <Field label="Work email" name="email" type="email" required value={form.email} onChange={update("email")} placeholder={channel.emailPlaceholder} autoComplete="email" />
                      <Field label="Role" name="role" value={form.role} onChange={update("role")} placeholder={channel.rolePlaceholder} autoComplete="organization-title" />
                      <Field label="Company" name="company" value={form.company} onChange={update("company")} placeholder={channel.companyPlaceholder} autoComplete="organization" />
                    </div>

                    {channelId === "studios" ? (
                      <details className="group rounded-xl border border-white/10 px-4 py-3">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                          <span className="mr-2 inline-block transition-transform group-open:rotate-90">&rsaquo;</span>
                          About your game <span className="font-normal text-text-muted">(optional, helps us prepare)</span>
                        </summary>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <Field label="Platforms" name="platforms" value={form.platforms} onChange={update("platforms")} placeholder="PC, Android, iOS..." />
                          <Field label="Engine" name="engine" value={form.engine} onChange={update("engine")} placeholder="Unity, Unreal, Godot..." />
                          <Field label="Stage" name="stage" value={form.stage} onChange={update("stage")} placeholder="Alpha, beta, live..." />
                        </div>
                      </details>
                    ) : null}

                    {channelId === "studios" && picked.length ? (
                      <div className="rounded-xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-sm">
                        <p className="text-text-muted">
                          Services you picked: <b className="text-foreground">{picked.join(", ")}</b>
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          Delivered by {party.join(", ")}. <Link href="/services" className="font-semibold text-primary hover:underline">Change</Link>
                        </p>
                      </div>
                    ) : null}

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-muted">
                        Message <span className="ml-1 text-primary">*</span>
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message")(e.target.value)}
                        placeholder="Tell us about your game, your platforms and what you would like to test."
                        className="w-full resize-none rounded-xl border border-white/15 px-4 py-3 text-[15px] text-foreground placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                        style={FIELD_BG}
                      />
                    </label>

                    {/* Honeypot, hidden from people */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website")(e.target.value)} className="hidden" aria-hidden="true" />

                    {status === "error" ? (
                      <div role="alert" className="rounded-2xl border border-lumen/60 bg-lumen/10 p-4 text-sm">
                        <p className="font-semibold text-lumen">Sorry, your message did not go through.</p>
                        <p className="mt-1 text-text-muted">Nothing is lost: copy our address and email us directly, we reply within one business day.</p>
                        <div className="mt-3"><CopyEmail email={SALES_EMAIL} /></div>
                      </div>
                    ) : null}

                    <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="text-xs text-text-muted">We reply within one business day.</p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03] disabled:opacity-60"
                      >
                        {status === "sending" ? (
                          <>
                            <LogoSymbol className="mm-sending h-3 w-auto" title="" />
                            Sending
                          </>
                        ) : (
                          <>
                            Send message
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Direct options, always visible */}
          <aside className="space-y-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (window.gtag) window.gtag("event", "book_demo_click", { location: "contact" }); }}
              className="group block rounded-3xl bg-primary p-6 text-void transition-transform hover:scale-[1.02]"
            >
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">Fastest way</p>
              <p className="mt-2 font-display text-xl font-bold">Book a 30 minute demo</p>
              <p className="mt-1 text-sm opacity-80">Pick a time that suits you. We&rsquo;ll show ManaMind on your kind of game.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                Choose a time <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </a>

            <div className="rounded-3xl border border-white/10 bg-bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Prefer email?</p>
              <h3 className="mt-2 text-lg font-bold text-foreground">Write to us directly</h3>
              <p className="mt-2 text-sm text-text-muted">Studios, publishers, partners and press:</p>
              <div className="mt-2"><CopyEmail email={SALES_EMAIL} /></div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">What happens next</p>
              <ol className="mt-4 space-y-4">
                {NEXT_STEPS.map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-void">{i + 1}</span>
                    <span className="text-sm"><b className="block text-foreground">{t}</b><span className="text-text-muted">{d}</span></span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-white/10 bg-bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">ManaMind Limited</p>
              <p className="mt-2 text-sm text-text-muted">London, United Kingdom</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
