"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type Principle = {
  tag: string;
  title: string;
  body: string;
  closing?: string;
  color: string;
};

const principles: Principle[] = [
  {
    tag: "Fun",
    title: "Enjoy the work",
    body: "We take our work seriously, but not ourselves. We're building an environment where people enjoy showing up each day because they're solving interesting problems with people they respect.",
    closing:
      "Our goal is simple: to make ManaMind the most fun place to work on the planet (and eventually beyond it).",
    color: "#00FF96",
  },
  {
    tag: "Challenge",
    title: "Choose Hard Problems",
    body: "We deliberately play on hard mode. We work in a competitive space and we lean into that. Pressure isn't something we avoid, it's something we use to get better.",
    color: "#A78BFA",
  },
  {
    tag: "Integrity",
    title: "Win the Right Way",
    body: "Results matter, but so does how we get there. We hold ourselves to high standards, act ethically, and step in to help teammates when they need it.",
    color: "#38BDF8",
  },
  {
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
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl">
              {`// HOW_WE_WORK`}
            </h2>
            <p className="mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              The principles that guide our team and decisions
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-14 max-w-4xl border-t border-white/[0.06]">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
              className="grid grid-cols-[64px_minmax(0,1fr)] gap-x-6 border-b border-white/[0.06] py-8 md:grid-cols-[120px_minmax(0,1fr)] md:gap-x-10 md:py-10"
            >
              <div className="flex flex-col">
                <span
                  className="font-mono text-3xl font-bold leading-none md:text-4xl"
                  style={{ color: p.color }}
                >
                  0{i + 1}
                </span>
                <span className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  {p.tag}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                  {p.body}
                </p>
                {p.closing && (
                  <p
                    className="mt-3 text-sm italic leading-relaxed md:text-base"
                    style={{ color: p.color }}
                  >
                    {p.closing}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
