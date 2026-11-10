import Link from "next/link";
import { Glow } from "@/components/brand/Graphics";

// A compact section that summarises a topic and links to the page that covers it in full.
export function LinkBand({ label, title, text, href, cta }: { label: string; title: string; text: string; href: string; cta: string }) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-card py-20 md:py-24">
      <Glow accent="elixir" position="bottom-right" strength={0.16} />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">{label}</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-text-muted">{text}</p>
        </div>
        <Link href={href} className="shrink-0 rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
          {cta} →
        </Link>
      </div>
    </section>
  );
}
