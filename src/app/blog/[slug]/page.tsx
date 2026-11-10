import Link from "next/link";
import { notFound } from "next/navigation";
import { Glow } from "@/components/brand/Graphics";
import { Markdown } from "@/components/blog/Markdown";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { BOOKING_URL } from "@/lib/constants";
import { getPost, getPosts, formatDate } from "@/lib/content/blog";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog | ManaMind" };
  const image = post.image ?? "/og/og-default.jpg";
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: image, alt: post.imageAlt ?? post.title }],
    },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.description, images: [image] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://manamind.ai/blog/${post.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    image: `https://manamind.ai${post.image ?? "/og/og-default.jpg"}`,
    author: { "@type": "Organization", name: post.author, url: "https://manamind.ai" },
    publisher: {
      "@type": "Organization",
      name: "ManaMind",
      url: "https://manamind.ai",
      logo: { "@type": "ImageObject", url: "https://manamind.ai/manamind-logo.png" },
    },
    keywords: post.keywords?.join(", "),
    wordCount: post.words,
  };
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={article} />
      <article>
        <header className="relative overflow-hidden pt-36 pb-10 md:pt-44">
          <Glow accent="arcane" position="top" strength={0.25} />
          <div className="relative mx-auto max-w-3xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-muted">
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground/80">{post.title}</span>
            </nav>
            {post.status === "draft" ? (
              <p className="mb-5 inline-block rounded-full border border-[#FFFEBA]/50 bg-[#FFFEBA]/10 px-3 py-1 text-xs font-semibold text-[#FFFEBA]">
                Preview only: team draft, not yet approved for publishing
              </p>
            ) : null}
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg text-text-muted">{post.description}</p>
            <p className="mt-6 text-sm text-text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author} · {Math.max(1, Math.round(post.words / 220))} min read
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-16">
          {post.image ? (
            <figure className="mb-12">
              <img src={post.image} alt={post.imageAlt ?? ""} className="w-full rounded-2xl bg-white p-4" />
              {post.imageCaption ? <figcaption className="mt-3 text-xs leading-relaxed text-text-muted">{post.imageCaption}</figcaption> : null}
            </figure>
          ) : null}
          <Markdown source={post.body} />
        </div>
      </article>

      {post.faq?.length ? (
        <FAQ
          title="Frequently asked questions"
          items={post.faq.map((f) => ({ q: f.q, a: <p>{f.a}</p>, text: f.a }))}
        />
      ) : null}

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-bg-card/80 p-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">See ManaMind on your game</h2>
              <p className="mt-2 text-text-muted">A 30 minute demo with our team. We&rsquo;ll show you what the bots would test first.</p>
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]">
              Book a 30 min demo
            </a>
          </div>
          {others.length ? (
            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">Keep reading</p>
              <div className="grid gap-4 md:grid-cols-2">
                {others.map((o) => (
                  <Link key={o.slug} href={`/blog/${o.slug}`} className="rounded-2xl border border-white/10 bg-bg-card/60 p-6 hover:border-primary/50">
                    <p className="text-lg font-bold text-foreground">{o.title}</p>
                    <p className="mt-2 text-sm text-text-muted">{o.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
