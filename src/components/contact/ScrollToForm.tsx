"use client";

import type { ReactNode } from "react";

/** Smooth-scrolls to the contact form, focuses the first field and briefly highlights the form. */
export function ScrollToForm({ className, children }: { className?: string; children: ReactNode }) {
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("message");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#message");
    const card = target.querySelector<HTMLElement>("[data-form-card]");
    if (card) {
      card.classList.remove("mm-flash");
      void card.offsetWidth;
      card.classList.add("mm-flash");
    }
    window.setTimeout(() => {
      target.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    }, 450);
  };
  return (
    <a href="#message" onClick={go} className={className}>
      {children}
    </a>
  );
}
