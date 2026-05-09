"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type Principle = {
  filename: string;
  tag: string;
  title: string;
  body: string;
  closing?: string;
  color: string;
};

const principles: Principle[] = [
  {
    filename: "01_fun.principle",
    tag: "Fun",
    title: "Enjoy the work",
    body: "We take our work seriously, but not ourselves. We're building an environment where people enjoy showing up each day because they're solving interesting problems with people they respect.",
    closing:
      "Our goal is simple: to make ManaMind the most fun place to work on the planet (and eventually beyond it).",
    color: "#00FF96",
  },
  {
    filename: "02_challenge.principle",
    tag: "Seek out challenge",
    title: "Choose Hard Problems",
    body: "We deliberately play on hard mode. We work in a competitive space and we lean into that. Pressure isn't something we avoid, it's something we use to get better.",
    color: "#A78BFA",
  },
  {
    filename: "03_integrity.principle",
    tag: "Integrity",
    title: "Win the Right Way",
    body: "Results matter, but so does how we get there. We hold ourselves to high standards, act ethically, and step in to help teammates when they need it.",
    color: "#38BDF8",
  },
  {
    filename: "04_obsession.principle",
    tag: "Customer Obsession",
    title: "Build for Real Users",
    body: "Everything we do is grounded in the needs of game studios and QA teams. We care about shipping systems that actually help people, even when that means taking the more difficult path technically.",
    color: "#F59E0B",
  },
];

export function HowWeWork() {
  return (
    <section className="relative border-t border-white/5 bg-bg-card py-24 md:py-32">
      {/* Subtle dotted background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00FF96 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              {`// HOW_WE_WORK`}
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              The principles that guide our team and decisions
            </h2>
          </div>
        </FadeInView>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <motion.div
              key={p.filename}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Window-style header bar */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
                <div className="flex gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `${p.color}80` }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `${p.color}40` }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `${p.color}20` }}
                  />
                </div>
                <span className="font-mono text-[10px] font-medium tracking-wider text-text-muted">
                  {p.filename}
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-text-muted/60">
                  Active
                </span>
              </div>

              {/* Body */}
              <div className="relative p-7 md:p-8">
                {/* Tag annotation */}
                <p
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: p.color }}
                >
                  {`// ${p.tag.toUpperCase()}`}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
                  {p.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  {p.body}
                </p>

                {p.closing && (
                  <p
                    className="mt-4 border-l-2 pl-4 text-base font-medium leading-relaxed"
                    style={{
                      color: p.color,
                      borderColor: `${p.color}80`,
                    }}
                  >
                    {p.closing}
                  </p>
                )}

                {/* Corner decoration */}
                <span
                  className="absolute right-5 top-5 font-mono text-[9px] tracking-widest opacity-40"
                  style={{ color: p.color }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Bottom hover line */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${p.color}99, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
