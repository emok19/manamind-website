import Link from "next/link";
import { Glow, Tiles } from "@/components/brand/Graphics";
import { getPosts, formatDate } from "@/lib/content/blog";

const TITLE = "Game QA & AI Testing Blog | ManaMind";
const DESCRIPTION =
  "Guides, benchmarks and stories from ManaMind on game QA, AI game testing and automated game testing.";

// SEO v1 fix 4: the blog stays noindex until three posts are live.
const LIVE = getPosts().length >= 3;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  robots: LIVE ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: "ManaMind, the model for games QA." }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/og-default.jpg"] },
};

export default function BlogPage() {
  const posts = [...getPosts()].reverse();
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
        <Glow accent="aether" position="top" strength={0.22} />
        <Tiles seed={31} outlined fade="radial" opacity={0.45} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Blog</p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Game QA and <span className="text-primary">AI testing</span> blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
            How we build AI that plays games, what it finds, and what we are learning about game QA along the way.
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-bg-card/80 transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[1200/630] overflow-hidden bg-void">
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" className="h-full w-full bg-white object-contain p-3" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(218,151,255,0.45),transparent_60%)]">
                    <span className="font-display text-2xl font-bold text-foreground">The model for games QA</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  {p.status === "draft" ? (
                    <span className="rounded-full border border-[#FFFEBA]/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#FFFEBA]">Draft</span>
                  ) : null}
                </div>
                <h2 className="mt-3 text-xl font-bold text-foreground group-hover:text-primary">{p.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{p.excerpt}</p>
                <span className="mt-auto pt-5 text-sm font-semibold text-primary">Read the post →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
