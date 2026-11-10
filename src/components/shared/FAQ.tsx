import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";

export type FaqItem = {
  q: string;
  /** Visible answer. May contain links. */
  a: ReactNode;
  /** Plain-text answer for FAQPage schema. */
  text: string;
};

/**
 * Crawlable FAQ: native <details> so every answer is in the page source,
 * plus FAQPage structured data built from the same items.
 */
export function FAQ({
  id = "faq",
  eyebrow = "FAQ",
  title,
  intro,
  items,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: FaqItem[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  };

  return (
    <section id={id} className="relative scroll-mt-24 border-t border-white/5 py-20 md:py-28">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
          {intro ? <p className="mx-auto mt-4 max-w-xl text-text-muted">{intro}</p> : null}
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-2xl border border-white/10 bg-bg-card/70 transition-colors open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-bold text-foreground md:text-lg [&::-webkit-details-marker]:hidden">
                <h3 className="text-base md:text-lg">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-[15px] leading-relaxed text-text-muted [&_a]:font-semibold [&_a]:text-primary [&_a:hover]:underline">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
