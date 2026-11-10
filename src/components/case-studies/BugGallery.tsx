import Image from "next/image";
import Link from "next/link";
import { Glow } from "@/components/brand/Graphics";
import type { CaseStudy } from "@/data/case-studies";

// "Bugs our bots found": verified findings from published case studies, with their evidence.
export function BugGallery({ studies }: { studies: CaseStudy[] }) {
  const items = studies.flatMap((study) =>
    study.findings
      .filter((f) => f.status === "Verified finding")
      .map((f) => ({ study, f, media: study.media.find((m) => f.mediaIds.includes(m.id) && m.kind === "image") }))
      .filter((x) => x.media),
  );
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      <Glow accent="lumen" position="bottom" strength={0.14} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Bugs our bots found</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Real findings, with the evidence</h2>
          <p className="mt-4 text-lg text-text-muted">Every finding comes with the frame it was caught on and a plain-language explanation.</p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ study, f, media }) => (
            <li key={f.id} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card/80">
              <Image src={media!.src} alt={media!.alt} width={media!.width} height={media!.height} className="aspect-[16/10] w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-aether px-2.5 py-1 font-semibold text-void">{f.category}</span>
                  <span className="rounded-full border border-elixir/60 px-2.5 py-1 font-semibold text-elixir">Wayfinder</span>
                </div>
                <p className="mt-3 font-display text-lg font-bold text-foreground">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.summary}</p>
                <Link href={`/case-studies/${study.slug}`} className="mt-auto pt-4 text-sm font-semibold text-primary hover:underline">
                  {study.game.title} case study →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
