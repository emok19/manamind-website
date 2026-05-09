"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { FadeInView } from "@/components/animations/FadeInView";

export function CaseStudyCTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,150,0.08)_0%,transparent_60%)]" />

      {/* Animated dotted target reticle */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-[420px] w-[420px] rounded-full border border-dashed border-primary/15"
          aria-hidden
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-[260px] w-[260px] rounded-full border border-dashed border-primary/10"
          aria-hidden
        />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeInView>
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Your build, next
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            See what ManaMind would find in your build
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/contact">Book a Demo</CTAButton>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
