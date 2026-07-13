"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PopupData {
  id: string;
  title: string;
  content: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  image: string | null;
  isActive: boolean;
}

export function EnrollPopup({ popup }: { popup: PopupData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in last 24 hours
    const dismissedAt = localStorage.getItem("popup_dismissed_at");
    if (dismissedAt) {
      const now = Date.now();
      const elapsed = now - parseInt(dismissedAt);
      if (elapsed < 24 * 60 * 60 * 1000) {
        return; // Don't show
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("popup_dismissed_at", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden p-6 md:p-8 shadow-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {/* Close Button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full border transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-amber-500/10 text-amber-500">
                <Sparkles size={22} fill="currentColor" />
              </div>
              
              <h3 className="text-xl font-black mb-2" style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}>
                {popup.title}
              </h3>
              
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                {popup.content || "Special admissions are now open for all CA, CS, and CUET batches. Limited seats available!"}
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href={popup.ctaUrl || "/auth"}
                  onClick={dismiss}
                  className="btn-primary w-full py-3 text-sm font-semibold justify-center gap-2"
                >
                  {popup.ctaText || "Enroll Now"} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={dismiss}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: "var(--text-muted)" }}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
