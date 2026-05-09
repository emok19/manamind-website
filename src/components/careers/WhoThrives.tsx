"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const traits = [
  "Like working on problems that don't have clear answers",
  "Are comfortable jumping between research, engineering, and product",
  "Care about the long-term impact of what you build",
  "Focus on getting things done rather than explaining why something can't be done",
];

export function WhoThrives() {
  return (
    <section className="relative border-t border-white/5 bg-bg-card py-24 md:py-32">
      {/* Diagonal accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(167,139,250,0.05)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[minmax(0,5fr),minmax(0,7fr)] md:gap-12">
          {/* Left: heading column */}
          <FadeInView>
            <div className="md:sticky md:top-24">
              <span className="mb-4 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {`// WHO_THRIVES_HERE`}
              </span>
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
                You&rsquo;ll feel at home if you<span className="text-primary">...</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted">
                We&rsquo;re not looking for everyone. We&rsquo;re looking for
                the few who recognise themselves in this list.
              </p>
            </div>
          </FadeInView>

          {/* Right: terminal-style checklist */}
          <div className="relative">
            <FadeInView delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60">
                {/* Window header */}
                <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/20" />
                  </div>
                  <span className="font-mono text-[10px] font-medium tracking-wider text-text-muted">
                    candidate.profile
                  </span>
                </div>

                {/* Checklist body */}
                <div className="divide-y divide-white/[0.05]">
                  {traits.map((trait, i) => (
                    <motion.div
                      key={trait}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                      className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-primary/[0.03]"
                    >
                      <span className="font-mono text-xs font-bold text-primary/60">
                        0{i + 1}
                      </span>

                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/10">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="h-3 w-3 text-primary"
                        >
                          <motion.path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          />
                        </svg>
                      </div>

                      <p className="flex-1 text-base leading-relaxed text-foreground">
                        {trait}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Footer prompt */}
                <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-4">
                  <p className="font-mono text-xs text-text-muted">
                    <span className="text-primary">{`>`}</span> match: ready to
                    apply
                    <motion.span
                      className="ml-1 inline-block text-primary"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
