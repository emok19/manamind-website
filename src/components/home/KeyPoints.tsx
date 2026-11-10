import Link from "next/link";
import { FadeInView } from "@/components/animations/FadeInView";

// Three key points right under the hero: what ManaMind is, in one glance.
const POINTS = [
  {
    n: "01",
    t: "Plays like a player",
    d: "Our bots play your build through the screen, the way your players do. No scripted paths.",
    href: "/how-it-works",
    link: "How it works",
    color: "#8AE9D0",
  },
  {
    n: "02",
    t: "Finds and reports verified bugs",
    d: "Every finding comes with the frame, the steps and a clear explanation, ready for your team.",
    href: "/how-it-works",
    link: "See a real finding",
    color: "#DA97FF",
  },
  {
    n: "03",
    t: "Safe for unreleased builds",
    d: "One build and your reference material is all we need. Built for teams working under strict NDAs.",
    href: "/product#security",
    link: "Security",
    color: "#FFFEBA",
  },
];

export function KeyPoints() {
  return (
    <section className="relative border-t border-white/5 bg-bg-card py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <FadeInView key={p.t} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-background/60 p-7">
                <span className="font-display text-sm font-bold" style={{ color: p.color }}>{p.n}</span>
                <h2 className="mt-4 text-xl font-bold text-foreground md:text-2xl">{p.t}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{p.d}</p>
                <Link href={p.href} className="mt-auto pt-5 text-sm font-semibold text-primary hover:underline">
                  {p.link} →
                </Link>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
