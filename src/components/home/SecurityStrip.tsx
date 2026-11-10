import Link from "next/link";
import { FadeInView } from "@/components/animations/FadeInView";

// Short trust strip for publishers. Copy taken from the existing Security section on /product.
const POINTS = [
  { t: "No source code access", d: "Our bots work through rendered frames and standard inputs. No engine hooks, no SDK." },
  { t: "Only what testing needs", d: "We capture frames and interaction logs for issue reproduction, nothing else." },
  { t: "Deployed your way", d: "Secure cloud, isolated environments or controlled infrastructure for NDA projects." },
];

export function SecurityStrip() {
  return (
    <section className="border-t border-white/5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Built for unreleased builds</span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Safe for games under NDA</h2>
              <Link href="/product#security" className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">How we handle your build →</Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {POINTS.map((p, i) => (
                <li key={p.t} className="rounded-2xl border border-white/10 bg-bg-card/70 p-6">
                  <span className="font-display text-sm font-bold text-aether">0{i + 1}</span>
                  <p className="mt-3 font-display text-lg font-bold text-foreground">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
