import Image from "next/image";
import Link from "next/link";
import { Glow } from "@/components/brand/Graphics";
import { FadeInView } from "@/components/animations/FadeInView";

// Headline result from the published Husk Protocol case study (approved numbers and quote).
const STATS = [
  { value: "60", label: "cards validated" },
  { value: "50 min", label: "of autonomous play" },
  { value: "5", label: "verified issues" },
];

export function ResultHighlight() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Glow accent="aether" position="bottom-left" strength={0.25} />
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-bg-card/80 lg:grid-cols-[1.05fr_1fr]">
            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Case study · Husk Protocol</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">One build, one spreadsheet, five verified issues</h2>
              <p className="mt-4 text-lg text-text-muted">
                Fireshine Games and OddSub gave Wayfinder a Steam branch and their card sheet. No SDK, no scripts, no engine access.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl font-bold text-foreground md:text-4xl">{s.value}</dd>
                    <dd className="mt-1 text-sm text-text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/case-studies/husk-protocol" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Read the case study <span aria-hidden="true">→</span>
              </Link>
            </div>
            <figure className="relative flex flex-col justify-between border-t border-white/10 p-8 md:p-12 lg:border-l lg:border-t-0" style={{ background: "linear-gradient(160deg, rgba(126,77,185,.25), rgba(14,0,56,.4))" }}>
              <Image src="/case-studies/husk-protocol/husk-protocol-art.webp" alt="Husk Protocol key art" width={460} height={215} className="w-full rounded-xl object-cover" />
              <blockquote className="mt-8 text-lg leading-relaxed text-foreground">
                &ldquo;We want to find any issues early - before they even become issues. We do not want to find out about them in a Steam review or live stream.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image src="/case-studies/husk-protocol/tony-evans.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <span className="text-sm">
                  <span className="block font-semibold text-foreground">Tony Evans</span>
                  <span className="text-text-muted">Producer, Fireshine Games</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
