import { Glow, Tiles } from "@/components/brand/Graphics";

// Shared hero for inner pages: label, H1, intro, optional actions. Brand Glow + Tiles backdrop.
export function PageHero({
  label,
  title,
  accent,
  intro,
  children,
  glow = "arcane",
  seed = 19,
}: {
  label: string;
  title: string;
  accent?: string;
  intro: string;
  children?: React.ReactNode;
  glow?: "arcane" | "aether" | "elixir" | "lumen";
  seed?: number;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
      <Glow accent={glow} position="top" strength={glow === "arcane" ? 0.45 : 0.22} />
      <Tiles seed={seed} outlined fade="radial" opacity={0.45} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{label}</p>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {title} {accent ? <span className="mm-spectrum-text">{accent}</span> : null}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">{intro}</p>
        {children ? <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div> : null}
      </div>
    </section>
  );
}
