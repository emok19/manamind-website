import Link from "next/link";
import { Glow } from "@/components/brand/Graphics";
import { TiltCard } from "@/components/brand/TiltCard";
import { bots } from "@/data/bots";

// Compact roster: the six official character cards, each linking to its service on /services.
export function BotTeaser({
  label = "Our services",
  title = "Five specialist bots, one for every kind of QA",
  description = "Functional, compliance, compatibility, localisation and network QA, each delivered by specialist bots that play your build like real players.",
  cta = "Explore our services",
}: {
  label?: string;
  title?: string;
  description?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      <Glow accent="arcane" position="bottom" strength={0.4} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">{label}</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-text-muted">{description}</p>
        </div>
        <ul className="mt-12 grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-5">
          {bots.map((bot) => (
            <li key={bot.id}>
              <Link href={`/services#${bot.category}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <TiltCard>
                  <div className="relative aspect-[1332/1644] overflow-hidden" style={{ boxShadow: `0 18px 40px -20px ${bot.color}` }}>
                    <img src={`/bots/cards/sm/${bot.id}.webp`} alt={`${bot.name}, ${bot.categoryLabel}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <img src={`/bots/cards/sm/${bot.id}-hover.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </TiltCard>
                <span className="mt-2 block font-display text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs" style={{ color: bot.color }}>{bot.categoryLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href="/services" className="rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
            {cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
