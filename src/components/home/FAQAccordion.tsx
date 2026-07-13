"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-xl overflow-hidden"
          style={{
            border: `1.5px solid ${open === faq.id ? "var(--brand-secondary)" : "var(--border)"}`,
            transition: "border-color 0.2s",
          }}
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left"
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
          >
            <span
              className="font-semibold text-sm pr-4"
              style={{ color: "var(--text-primary)" }}
            >
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: open === faq.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown
                size={18}
                style={{
                  color:
                    open === faq.id
                      ? "var(--brand-secondary)"
                      : "var(--text-muted)",
                }}
              />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
