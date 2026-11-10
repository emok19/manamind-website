"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CookieConsent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      setVisible(true);
    } else {
      setConsent(stored as CookieConsent);
    }
  }, []);

  // Listen for "Cookie Settings" button click in footer
  useEffect(() => {
    function handleOpenSettings() {
      setVisible(true);
    }
    const trigger = document.getElementById("cookie-settings-trigger");
    trigger?.addEventListener("click", handleOpenSettings);
    return () => trigger?.removeEventListener("click", handleOpenSettings);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setVisible(false);
    // Enable GA if it was deferred
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function handleReject() {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
    setVisible(false);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-3 left-3 right-3 z-50 rounded-2xl border border-white/15 bg-bg-card shadow-2xl shadow-black/40 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm"
        >
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            <p className="text-[13px] leading-relaxed text-text-muted">
              We use cookies to analyse site usage and improve your experience.
              See our{" "}
              <a
                href="/cookies"
                className="underline transition-colors hover:text-primary"
              >
                Cookie Policy
              </a>{" "}
              for details.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                className="flex-1 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-white/20 hover:text-foreground"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background transition-all hover:shadow-[0_0_20px_rgba(138,233,208,0.3)]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
