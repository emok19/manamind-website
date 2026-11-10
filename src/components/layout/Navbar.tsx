"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoLinear } from "@/components/brand/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

function OpenRolesBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-5 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-background ring-2 ring-background shadow-[0_0_10px_rgba(138,233,208,0.4)]">
      {count}
    </span>
  );
}

// A link is active on its own page and on any page below it (e.g. /careers/founders-associate).
function isActive(path: string | null, href: string) {
  if (!path) return false;
  const p = path.replace(/\/$/, "") || "/";
  return href === "/" ? p === "/" : p === href || p.startsWith(href + "/");
}

export function Navbar({ openRoles = 0, showBlog = true }: { openRoles?: number; showBlog?: boolean }) {
  const links = NAV_LINKS.filter((l) => showBlog || l.href !== "/blog");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" aria-label="ManaMind home">
          <LogoLinear className="h-[18px] w-auto text-wisp md:h-5" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-7 whitespace-nowrap xl:flex">
          {links.filter((l) => l.label !== "Home").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive(pathname, link.href) ? "text-primary" : "text-text-muted"
              }`}
            >
              {link.label}
              {link.label === "Careers" && <OpenRolesBadge count={openRoles} />}
              {isActive(pathname, link.href) && (
                <span aria-hidden="true" className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary shadow-[0_0_10px_rgba(138,233,208,0.7)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 whitespace-nowrap xl:flex">
          <a
            href="https://cc.manamind.app/studio"
            title="Sign in to the ManaMind Command Centre"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-text-muted transition-all hover:border-primary/40 hover:text-primary"
          >
            Dashboard
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background transition-all hover:shadow-[0_0_20px_rgba(138,233,208,0.3)]"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-background/95 backdrop-blur-md xl:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`relative inline-flex items-center gap-3 self-start text-lg font-medium transition-colors hover:text-primary ${
                    isActive(pathname, link.href) ? "text-primary" : "text-text-muted"
                  }`}
                >
                  {isActive(pathname, link.href) && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />}
                  {link.label}
                  {link.label === "Careers" && <OpenRolesBadge count={openRoles} />}
                </Link>
              ))}
              <a
                href="https://cc.manamind.app/studio"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-text-muted"
              >
                Dashboard (sign in)
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-background"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
