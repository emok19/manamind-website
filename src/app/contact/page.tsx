import { ContactHero } from "@/components/contact/ContactHero";
import { ContactConsole } from "@/components/contact/ContactConsole";

export const metadata = {
  title: "Contact | ManaMind",
  description:
    "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | ManaMind",
    description:
      "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
    url: "/contact",
    images: [
      {
        url: "/manamind-logo.png",
        width: 179,
        height: 33,
        alt: "ManaMind logo.",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact | ManaMind",
    description:
      "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
    images: ["/manamind-logo.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactConsole />
    </>
  );
}
