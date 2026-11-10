import Link from "next/link";
import { Glow, Tiles } from "@/components/brand/Graphics";

export const metadata = {
  title: "Page not found | ManaMind",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Glow accent="elixir" position="bottom" strength={0.25} />
      <Tiles seed={404} outlined fade="radial" opacity={0.5} />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-36 md:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground md:text-6xl">Trailblazer couldn&rsquo;t find this page</h1>
          <p className="mt-6 max-w-xl text-lg text-text-muted">
            Trailblazer plays every path a player can take, and this one leads nowhere. The page may have moved or never existed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]">Back to home</Link>
            <Link href="/product" className="rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary hover:bg-primary/10">See the product</Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-foreground hover:border-white/40">Contact us</Link>
          </div>
        </div>
        <img src="/bots/cards/trailblazer.webp" alt="Trailblazer, ManaMind's functional QA bot" className="mx-auto hidden w-full max-w-[320px] shadow-2xl shadow-black/40 md:block" />
      </div>
    </section>
  );
}
