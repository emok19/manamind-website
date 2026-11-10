import { CTAButton } from "@/components/shared/CTAButton";
import { Glow, TheCut, Tiles } from "@/components/brand/Graphics";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Brand backdrop: The Cut on desktop, a softer Glow + Tiles on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <TheCut x={0.64} y={0.66} />
      </div>
      <div className="absolute inset-0 md:hidden">
        <Glow accent="aether" position="bottom" strength={0.35} />
        <Tiles seed={5} outlined fade="bottom" opacity={0.6} />
      </div>
      {/* Readability veil over the left side */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(23,0,85,0.92)_0%,rgba(23,0,85,0.6)_45%,rgba(23,0,85,0)_70%)] md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 md:pt-40">
        <p aria-hidden="true" className="mb-6 flex items-center gap-3 whitespace-nowrap font-display text-sm font-light uppercase tracking-[0.14em] text-text-muted sm:gap-4 sm:text-lg sm:tracking-[0.18em] md:text-xl">
          <span className="animate-strikethrough">Manual QA</span>
          <span className="h-px w-10 bg-white/30" />
          <span className="text-primary">Autonomous QA</span>
        </p>

        <h1 className="max-w-3xl text-[2.6rem] font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
          AI game testing that <span className="mm-spectrum-text">plays like your players</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted md:text-xl">
          ManaMind is the model for games QA. Our bots play your build through the screen, like real players, and report verified bugs. No SDK, no scripts, no source code.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/contact">Book a Demo</CTAButton>
          <CTAButton href="/how-it-works" variant="outline">
            See How It Works
          </CTAButton>
        </div>

      </div>
    </section>
  );
}
