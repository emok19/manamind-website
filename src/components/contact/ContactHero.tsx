// Compact contact header (9 Nov 2026): the form and the "Book a 30 minute demo" card sit in the
// first screen, so the old hero with its two buttons is gone. The H1 stays for SEO (fix 2).
export function ContactHero() {
  return (
    <header className="relative mx-auto max-w-6xl px-6 pt-32 pb-8 md:pt-36 md:pb-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
      <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        Book a demo or <span className="text-primary">get in touch</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
        Send us a message, or book a 30 minute demo straight into our calendar. A real person replies within one business day.
      </p>
    </header>
  );
}
