import { ContactHero } from "@/components/contact/ContactHero";
import { ContactConsole } from "@/components/contact/ContactConsole";

export const metadata = {
  title: "Contact | ManaMind",
  description:
    "Get in touch with the ManaMind team about studios, partnerships, press, or general enquiries.",
  alternates: {
    canonical: "/contact",
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
