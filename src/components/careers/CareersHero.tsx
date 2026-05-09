"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";

const glyphs = ["◇", "◆", "◈", "△", "○", "◯", "+", "×", "❯", "❮"];

export function CareersHero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Layered radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,150,0.08)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.05)_0%,transparent_55%)]" />

      {/* Faint scan lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #00FF96 0px, #00FF96 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Floating glyphs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-xs text-primary/20"
            style={{
              left: `${(i * 53) % 96}%`,
              top: `${(i * 37) % 92}%`,
            }}
            animate={{
              y: [0, -28, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
            }}
          >
            {glyphs[i % glyphs.length]}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.06] px-4 py-1.5 backdrop-blur-sm"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
            We&rsquo;re Hiring
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl"
        >
          Help us build the future of{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">autonomous testing</span>
            <motion.span
              className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-primary/15 blur-sm"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            />
          </span>
          <motion.span
            className="ml-1 inline-block text-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            _
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-text-muted md:text-xl"
        >
          If you&rsquo;re an outlier who is excited by hard problems at the
          intersection of AI, systems, and games, you&rsquo;ll feel at home
          here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <CTAButton href="#open-roles">View Open Roles</CTAButton>
          <CTAButton href="/contact" variant="outline">
            Get in Touch
          </CTAButton>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
