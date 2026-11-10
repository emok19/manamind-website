"use client";

import { useState } from "react";

// Shows an email address as plain, selectable text with a copy button.
// Works for everyone, including webmail users and people without a mail app.
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const range = document.createRange();
      const node = document.getElementById(`email-${email}`);
      if (node) {
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        document.execCommand("copy");
      }
    }
    setCopied(true);
    if (typeof window !== "undefined" && window.gtag) window.gtag("event", "email_copied", { email_address: email });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-4 pr-1.5 ${className}`}>
      <a id={`email-${email}`} href={`mailto:${email}`} className="select-all text-sm font-medium text-foreground hover:text-primary">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-void transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
