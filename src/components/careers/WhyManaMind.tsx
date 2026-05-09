"use client";

import { motion } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";

const reasons = [
  "Work on some of the hardest unsolved AI technical problems",
  "Help shape a product from day one, not maintain something that's already finished",
  "Have real influence over both research and product direction",
  "Build technology that doesn't exist anywhere else",
  "Be part of an incredible team of ambitious and high-achieving people that actually ships",
];

export function WhyManaMind() {
  return (
    <section className="relative border-t border-white/5 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,150,0.03)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl">
              {`// WHY_MANAMIND`}
            </h2>
            <p className="mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Bring sci-fi into reality
            </p>
            <p className="mt-3 text-sm text-text-muted md:text-base">
              Work on the kind of technology you grew up dreaming about.
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-2 md:grid-cols-2">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group flex items-baseline gap-5 border-b border-white/[0.06] py-5 ${
                i === 4 ? "md:col-span-2" : ""
              }`}
            >
              <span className="shrink-0 font-mono text-sm font-bold text-primary/50 transition-colors duration-300 group-hover:text-primary">
                0{i + 1}
              </span>
              <p className="text-sm font-medium leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-base">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
