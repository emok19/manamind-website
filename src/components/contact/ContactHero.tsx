"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,150,0.08)_0%,transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
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
          Channel open
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Get in <span className="text-primary">touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          Whether you&rsquo;re a studio exploring autonomous testing, a
          researcher interested in our work, or someone who just wants to learn
          more, we&rsquo;d love to hear from you.
        </motion.p>
      </div>
    </section>
  );
}
