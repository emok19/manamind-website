import { Glow, Tiles } from "@/components/brand/Graphics";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactConsole } from "@/components/contact/ContactConsole";

export const metadata = {
  title: "Book an AI Game Testing Demo | ManaMind",
  description:
    "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book an AI Game Testing Demo | ManaMind",
    description:
      "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
    url: "/contact",
    images: [
      {
        url: "/og/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "ManaMind, the model for games QA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an AI Game Testing Demo | ManaMind",
    description:
      "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
    images: ["/og/og-contact.jpg"],
  },
};

export default function ContactPage() {
  return (
    // One background for the whole page, so the pattern no longer cuts off where the form starts.
    <div className="relative overflow-hidden">
      <Glow accent="elixir" position="top" strength={0.22} />
      <Tiles seed={23} outlined fade="none" rows={30} opacity={0.32} />
      <div className="relative">
        <ContactHero />
        <ContactConsole />
      </div>
    </div>
  );
}
