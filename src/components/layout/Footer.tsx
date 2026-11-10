import Link from "next/link";
import { LogoLinear } from "@/components/brand/Logo";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { SALES_EMAIL } from "@/lib/constants";

const footerLinks = {
  Product: [
    { label: "Overview", href: "/product" },
    { label: "Services", href: "/services" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Connect: [
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/contact" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/manamind",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ManaMindAI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer({ showBlog = true }: { showBlog?: boolean }) {
  const sections = Object.entries(footerLinks).map(([title, links]) => [title, links.filter((l) => showBlog || l.href !== "/blog")] as const);
  return (
    <footer className="border-t border-white/10 bg-bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="ManaMind home">
              <LogoLinear className="h-5 w-auto text-wisp" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              The model for games QA.
            </p>
            <div className="mt-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">Talk to us</p>
              <CopyEmail email={SALES_EMAIL} />
            </div>

            {/* Social channels */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-text-muted transition-colors hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {sections.map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trademark notice */}
        <p className="mt-12 text-xs text-text-muted">
          MANAMIND&reg; is a registered trade mark of ManaMind Limited.
        </p>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-text-muted sm:flex-row">
          <p>&copy; 2025&ndash;{new Date().getFullYear()} ManaMind. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-primary transition-colors hover:text-primary/80">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-primary transition-colors hover:text-primary/80">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-primary transition-colors hover:text-primary/80">
              Cookie Policy
            </Link>
            <button
              id="cookie-settings-trigger"
              className="text-primary transition-colors hover:text-primary/80"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
