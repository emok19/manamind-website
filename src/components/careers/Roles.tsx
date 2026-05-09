"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

type Role = {
  title: string;
  location: string;
  type: string;
  level: string;
  tags: string[];
  summary: string;
  href: string;
};

// MOCK DATA - replace with real openings
const roles: Role[] = [
  {
    title: "Founding ML Engineer",
    location: "Hybrid · London",
    type: "Full-time",
    level: "Senior",
    tags: ["Vision models", "RL", "Zero-shot"],
    summary:
      "Train and deploy vision-driven agents that explore unfamiliar games end to end.",
    href: "/careers/founding-ml-engineer",
  },
  {
    title: "Founding Software Engineer",
    location: "Hybrid · London",
    type: "Full-time",
    level: "Senior",
    tags: ["Distributed systems", "Game integrations", "TypeScript"],
    summary:
      "Build the systems that turn raw game inputs into actionable test results at scale.",
    href: "/careers/founding-software-engineer",
  },
  {
    title: "Research Engineer",
    location: "Hybrid · London",
    type: "Full-time",
    level: "Mid / Senior",
    tags: ["Agents", "World models", "Eval design"],
    summary:
      "Push the frontier of zero-shot agent behaviour in interactive 3D worlds.",
    href: "/careers/research-engineer",
  },
];

export function Roles() {
  return (
    <section
      id="open-roles"
      className="relative scroll-mt-24 border-t border-white/5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {roles.length} Open Roles
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              Join the fun side
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-text-muted md:text-lg">
              We&rsquo;re a small team, so every hire has a huge impact on what
              we build and how we build it.
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-16 max-w-5xl space-y-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-card/40 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.03]"
            >
              {/* Left accent bar */}
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/80" />

              <Link
                href={role.href}
                className="grid items-center gap-6 p-6 md:grid-cols-[1fr,auto] md:gap-10 md:p-8"
              >
                <div className="flex-1">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5">
                      {role.location}
                    </span>
                    <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5">
                      {role.type}
                    </span>
                    <span className="rounded-full border border-primary/30 bg-primary/[0.05] px-2.5 py-0.5 text-primary">
                      {role.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-2xl font-bold text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {role.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
                    {role.summary}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA arrow */}
                <div className="flex shrink-0 items-center gap-3 self-end md:self-center">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    View Role
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/[0.05] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:shadow-[0_0_24px_rgba(0,255,150,0.4)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* "Don't see a fit" footer */}
        <FadeInView delay={0.3}>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
            <p className="text-sm text-text-muted">
              Don&rsquo;t see a role that fits but think you&rsquo;d be a great
              addition?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Reach out anyway
              </Link>
              .
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
