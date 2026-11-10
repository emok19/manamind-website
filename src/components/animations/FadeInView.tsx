"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Quick, uniform fade (0.25s). The delay prop is accepted for compatibility but ignored:
// cascading delays made content feel slow to appear.
export function FadeInView({
  children,
  delay: _delay = 0,
  duration = 0.25,
  className = "",
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
