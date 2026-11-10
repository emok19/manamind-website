import { CopyEmail } from "@/components/contact/CopyEmail";
import { GENERAL_EMAIL } from "@/lib/constants";

// Press kit: official logos, boilerplate and press contact. Copy reuses existing approved site text.
const BOILERPLATE =
  "ManaMind is a London-based AI company building vision-driven agents that automate quality assurance in video games. Its game-native AI model, HiveMind, powers a team of specialist bots that play games through the screen, like real players, and report verified bugs, with no SDK, no scripts and no source code access. ManaMind is the model for games QA.";

const FILES = [
  { label: "Logo, Wisp (for dark backgrounds)", href: "/press-kit/manamind-logo-wisp.png", thumb: "/press-kit/preview-logo-wisp.png", preview: "bg-void" },
  { label: "Logo, Void (for light backgrounds)", href: "/press-kit/manamind-logo-void.png", thumb: "/press-kit/preview-logo-void.png", preview: "bg-white" },
];

export function PressKit() {
  return (
    <section id="press-kit" className="scroll-mt-20 border-t border-white/5 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Press kit</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Writing about ManaMind?</h2>
          <p className="mt-4 text-text-muted">Everything you need in one place: our logo, a short description and who to contact.</p>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Press contact</p>
            <CopyEmail email={GENERAL_EMAIL} />
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-bg-card/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">About ManaMind (boilerplate)</p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">{BOILERPLATE}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FILES.map((f) => (
              <a key={f.href} href={f.href} download className="group overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-primary/60">
                <span className={`flex h-24 items-center justify-center px-6 ${f.preview}`}>
                  <img src={f.thumb ?? f.href} alt="" loading="lazy" className="h-6 w-auto" />
                </span>
                <span className="block bg-bg-card/80 px-4 py-3 text-sm text-text-muted group-hover:text-foreground">{f.label} ↓</span>
              </a>
            ))}
          </div>
          <a href="/press-kit/manamind-logos.zip" download className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10">
            Download all logos (SVG and PNG)
          </a>
        </div>
      </div>
    </section>
  );
}
