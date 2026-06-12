import Script from "next/script";

export const metadata = {
  title: "Apply (test) | ManaMind",
  robots: { index: false, follow: false },
};

export default function ApplyTestPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Apply to ManaMind</h1>
        <p className="text-text-muted mb-12">
          Tally embed test. This page is noindex.
        </p>

        <iframe
          data-tally-src="https://tally.so/embed/RGvRz9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height={1653}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Job application"
        />

        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      </div>
    </main>
  );
}
