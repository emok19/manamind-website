import Image from "next/image";

// Social proof directly under the hero. Only names already public on manamind.ai.
const PARTNERS = [
  { name: "NVIDIA Inception", src: "/partners/nvidia-inception.svg", w: 116, h: "h-11" },
  { name: "Microsoft for Startups", src: "/partners/microsoft-for-startups.png", w: 120, h: "h-10" },
  { name: "Google for Startups", src: "/partners/google-for-startups.svg", w: 150, h: "h-5" },
  { name: "Ukie", src: "/partners/ukie.svg", w: 60, h: "h-8" },
];

export function ProofBar() {
  return (
    <section aria-label="Customers and partners" className="relative border-y border-white/10 bg-bg-card/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-10 lg:flex-row lg:justify-between lg:gap-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Trusted by</p>
          <div className="flex items-center gap-3">
            <span className="flex h-12 items-center rounded-lg bg-white px-3">
              <Image src="/case-studies/husk-protocol/fireshine-games-logo.png" alt="Fireshine Games" width={96} height={32} className="h-7 w-auto" />
            </span>
            <span className="flex h-12 items-center rounded-lg border border-white/15 bg-void px-2">
              <Image src="/case-studies/husk-protocol/oddsub-logo.png" alt="OddSub" width={40} height={44} className="h-10 w-auto" />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Supported by</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <Image src={p.src} alt={p.name} width={p.w} height={32} className={`${p.h} w-auto object-contain opacity-85 brightness-0 invert`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
