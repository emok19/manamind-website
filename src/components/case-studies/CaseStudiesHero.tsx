"use client";

import { Glow, Tiles } from "@/components/brand/Graphics";

import { motion } from "framer-motion";

export function CaseStudiesHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Radial glow */}
      <Glow accent="elixir" position="top" strength={0.18} />
      <Tiles seed={29} outlined fade="radial" opacity={0.45} />

      {/* Faint scan grid */}

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ top: "10%" }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Case Studies
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Game QA case studies:{" "}
          <br className="hidden md:block" />
          real games,{" "}
          <span className="relative inline-block">
            <span className="text-highlight">real bugs,</span>
            <motion.span
              className="absolute inset-x-0 bottom-1 h-[3px] bg-highlight/70"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            />
          </span>{" "}
          <br className="hidden md:block" />
          measurable impact
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          Each case study is a real game, tested by our bots on a real build, with
          every finding verified and the evidence attached. See what{" "}
          <a href="/product" className="font-semibold text-primary hover:underline">automated game testing</a>{" "}
          found, how long it took and what the studio and publisher said about it.
        </motion.p>
      </div>
    </section>
  );
}
