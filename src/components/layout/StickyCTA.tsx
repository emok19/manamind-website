"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// A small "Book a Demo" pill that appears once the visitor has scrolled past the first screen
// on long pages, and hides again near the footer. Not shown on the contact page.
export function StickyCTA() {
  const path = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 700;
      setShow(y > window.innerHeight * 1.1 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  if (path?.startsWith("/contact")) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 sm:bottom-6 sm:right-6 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      aria-hidden={!show}
    >
      <Link
        href="/contact"
        tabIndex={show ? 0 : -1}
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-void shadow-xl shadow-black/40 transition-transform hover:scale-[1.04]"
      >
        Book a Demo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}
