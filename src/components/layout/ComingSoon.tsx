"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,150,0.10) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center"
      >
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-md text-lg text-text-muted">
            {description}
          </p>
        )}

        <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.06] px-5 py-2 text-sm text-primary">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
          Coming soon
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-text-muted transition-colors hover:text-primary"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
