import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FOUNDERS, founderJsonLd, getFounder } from "@/data/founders";

// Founder profile pages for Google's Knowledge Graph (copy from the "Google Knowledge Panel To do" doc).
export function generateStaticParams() {
  return FOUNDERS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFounder(slug);
  if (!f) return { title: "Team | ManaMind" };
  const title = `${f.name}, ${f.jobTitle} of ManaMind`;
  return {
    title,
    description: f.seoDescription,
    alternates: { canonical: `/team/${f.slug}` },
    openGraph: {
      type: "profile",
      title,
      description: f.seoDescription,
      url: `/team/${f.slug}`,
      siteName: "ManaMind",
      images: [{ url: f.photo, alt: f.photoAlt }],
    },
    twitter: { card: "summary", title, description: f.seoDescription, images: [f.photo] },
  };
}

const linkClass =
  "text-text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60";

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFounder(slug);
  if (!f) notFound();

  return (
    <>
      <JsonLd data={founderJsonLd(f)} />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-text-muted">
            <Link href="/about" className="hover:text-primary">About</Link>
            <span className="mx-2 text-text-muted/50" aria-hidden>/</span>
            <span className="text-foreground">{f.name}</span>
          </nav>

          <header className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="h-40 w-40 flex-none overflow-hidden rounded-2xl border border-white/[0.07] bg-background/60">
              <Image src={f.photo} alt={f.photoAlt} width={160} height={160} priority className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{f.name}</h1>
              <p className="mt-2 text-lg font-semibold text-primary">{f.roleLine}</p>
            </div>
          </header>

          <div className="mt-12 space-y-5 text-lg leading-relaxed text-text-muted">
            {f.bio.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="text-base font-bold text-foreground">{f.linksHeading}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-primary">
              {f.links.map((l) => (
                <li key={l.label}>
                  {l.url ? (
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{l.label}</a>
                  ) : (
                    <span className="text-text-muted">{l.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-16 text-sm text-text-muted">
            <Link href="/about" className="hover:text-primary">← The whole ManaMind team</Link>
          </p>
        </div>
      </section>
    </>
  );
}
