import { Glow, Tiles } from "@/components/brand/Graphics";
import { FadeInView } from "@/components/animations/FadeInView";
import { CTAButton } from "@/components/shared/CTAButton";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { BOOKING_URL, SALES_EMAIL } from "@/lib/constants";

// Demo section. The video reel will come later: for now a clean call to action.
export function DemoReel() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-card py-24 md:py-32">
      <Glow accent="aether" position="bottom" strength={0.25} />
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInView>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-background px-6 py-16 text-center md:px-16 md:py-20">
            <Glow accent="elixir" position="bottom" strength={0.28} />
            <Tiles seed={83} outlined fade="radial" opacity={0.4} />
            <div className="relative">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">See it in action</span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Watch ManaMind test a live game build</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-text-muted">
                Book a demo and watch our bots play a real build: exploring, finding bugs and writing the reports, with no scripts and no human input.
              </p>
              <div className="mt-9 flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105">
                    Book a 30 min demo
                  </a>
                  <CTAButton href="/contact" variant="outline">Send us a message</CTAButton>
                </div>
                <div className="flex flex-col items-center gap-2 text-sm text-text-muted sm:flex-row sm:gap-3">
                  <span>or email us directly</span>
                  <CopyEmail email={SALES_EMAIL} />
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
