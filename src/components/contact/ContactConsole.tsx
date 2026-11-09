"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { CONTACT_ENDPOINT, SALES_EMAIL } from "@/lib/constants";

type ChannelId = "studios" | "press" | "general";

type Channel = {
  id: ChannelId;
  label: string;
  blurb: string;
  cta: string;
  subject: string;
  email: string;
  accent: string;
  rolePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  icon: React.ReactNode;
};

type Status = "idle" | "sending" | "sent" | "error";

const CHANNELS: Channel[] = [
  {
    id: "studios",
    label: "Studios & partners",
    blurb: "Interested in using ManaMind or exploring a partnership?",
    cta: "Talk to us",
    subject: "Studios & partners enquiry",
    email: SALES_EMAIL,
    accent: "#00FF96",
    rolePlaceholder: "e.g. QA lead, Producer",
    emailPlaceholder: "you@abstergo.com",
    companyPlaceholder: "Studio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path
          d="M9 11V7a3 3 0 016 0v4M5 11h14l-1 9H6l-1-9z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "press",
    label: "Press & media",
    blurb: "For interviews, speaking opportunities, or media enquiries.",
    cta: "Contact press",
    subject: "Press & media enquiry",
    email: SALES_EMAIL,
    accent: "#FF4C54",
    rolePlaceholder: "e.g. Journalist, Editor",
    emailPlaceholder: "you@outlet.com",
    companyPlaceholder: "Organisation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path
          d="M3 11l18-7v16l-18-7v-2zM7 17v3a1 1 0 001 1h2a1 1 0 001-1v-1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "general",
    label: "General enquiries",
    blurb: "Not sure where your message fits? That’s fine, just send it through.",
    cta: "Send a message",
    subject: "General enquiry",
    email: SALES_EMAIL,
    accent: "#A78BFA",
    rolePlaceholder: "e.g. Researcher, Student",
    emailPlaceholder: "you@example.com",
    companyPlaceholder: "Organisation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function ChannelCard({
  channel,
  active,
  onSelect,
}: {
  channel: Channel;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="group relative block w-full overflow-hidden rounded-2xl border bg-bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      style={{
        borderColor: active ? channel.accent : "rgba(255,255,255,0.1)",
        boxShadow: active ? `0 0 30px ${channel.accent}33` : "none",
      }}
      onMouseEnter={(e) => {
        if (active) return;
        e.currentTarget.style.borderColor = channel.accent;
        e.currentTarget.style.boxShadow = `0 0 30px ${channel.accent}22`;
      }}
      onMouseLeave={(e) => {
        if (active) return;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border"
          style={{
            color: channel.accent,
            borderColor: `${channel.accent}40`,
            backgroundColor: `${channel.accent}10`,
          }}
        >
          {channel.icon}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Channel
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-foreground">{channel.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{channel.blurb}</p>

      <div className="mt-5 flex items-center justify-between text-sm font-medium">
        <span style={{ color: channel.accent }}>{channel.cta}</span>
        {active ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-4 w-4"
            style={{ color: channel.accent }}
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            style={{ color: channel.accent }}
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <span
        className="absolute inset-x-0 bottom-0 h-px transition-transform duration-500"
        style={{
          background: channel.accent,
          transformOrigin: "left",
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </button>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  accent,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  accent: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-text-muted">
        {label}
        {required && <span className="ml-1 text-highlight">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 transition-colors focus:outline-none"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = accent;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}1A`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </label>
  );
}

export function ContactConsole() {
  const [status, setStatus] = useState<Status>("idle");
  const [activeChannelId, setActiveChannelId] = useState<ChannelId>("studios");
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    message: "",
    website: "",
  });

  const activeChannel =
    CHANNELS.find((c) => c.id === activeChannelId) ?? CHANNELS[0];
  const formAccent = activeChannel.accent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill hidden fields, people do not
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          channel: activeChannel.label,
          _subject: `[manamind.ai] ${activeChannel.subject}: ${form.name}`,
          name: form.name,
          email: form.email,
          role: form.role,
          company: form.company,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      if (window.gtag) window.gtag("event", "generate_lead", { channel: activeChannel.id });
    } catch {
      setStatus("error");
      if (window.gtag) window.gtag("event", "contact_form_error", { channel: activeChannel.id });
    }
  };

  const update = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <section className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
            What are you reaching out about?
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {CHANNELS.map((c) => (
              <ChannelCard
                key={c.id}
                channel={c}
                active={c.id === activeChannelId}
                onSelect={() => setActiveChannelId(c.id)}
              />
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4 text-text-muted">
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Or send a detailed message
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div
            className="overflow-hidden rounded-3xl border bg-bg-card transition-colors duration-500"
            style={{ borderColor: `${formAccent}30` }}
          >
            <div className="flex items-center justify-between border-b border-white/5 bg-black/30 px-6 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor: formAccent,
                    boxShadow: `0 0 8px ${formAccent}`,
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Transmission // {activeChannel.label}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="py-8 text-center"
                  >
                    <div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${formAccent}50`,
                        backgroundColor: `${formAccent}14`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={formAccent}
                        strokeWidth="2"
                        className="h-7 w-7"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-foreground">
                      Message received.
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-text-muted">
                      Thanks{form.name ? ` ${form.name.split(" ")[0]}` : ""}. It is with
                      the team now and we&rsquo;ll reply to {form.email} within one
                      business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setForm({ name: "", email: "", role: "", company: "", message: "", website: "" });
                      }}
                      className="mt-8 text-sm font-medium text-text-muted underline-offset-4 hover:text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField
                        label="Name"
                        name="name"
                        required
                        value={form.name}
                        onChange={update("name")}
                        accent={formAccent}
                        placeholder="Your name"
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        accent={formAccent}
                        placeholder={activeChannel.emailPlaceholder}
                      />
                      <FormField
                        label="Role"
                        name="role"
                        value={form.role}
                        onChange={update("role")}
                        accent={formAccent}
                        placeholder={activeChannel.rolePlaceholder}
                      />
                      <FormField
                        label="Company"
                        name="company"
                        value={form.company}
                        onChange={update("company")}
                        accent={formAccent}
                        placeholder={activeChannel.companyPlaceholder}
                      />
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                        Message <span className="ml-1 text-highlight">*</span>
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message")(e.target.value)}
                        placeholder="Tell us what's on your mind. We read everything."
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 transition-colors focus:outline-none"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = formAccent;
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${formAccent}1A`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </label>

                    {/* Honeypot, hidden from people */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => update("website")(e.target.value)}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {status === "error" && (
                      <div role="alert" className="rounded-xl border border-highlight/40 bg-highlight/10 p-4 text-sm">
                        <p className="font-semibold text-foreground">Sorry, your message did not go through.</p>
                        <p className="mt-1 text-text-muted">
                          Nothing is lost: copy our address and email us directly. We reply within one business day.
                        </p>
                        <div className="mt-3">
                          <CopyEmail email={SALES_EMAIL} />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                        We reply within one business day
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex disabled:opacity-60 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: formAccent,
                          color: "#1E0D26",
                          boxShadow: `0 0 24px ${formAccent}33`,
                        }}
                      >
                        {status === "sending" ? "Sending..." : "Send transmission"}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-text-muted sm:flex-row">
            <span>Prefer email? Write to us directly:</span>
            <CopyEmail email={SALES_EMAIL} />
          </div>
        </div>
      </div>
    </section>
  );
}
