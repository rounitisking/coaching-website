"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { generalFaqs } from "@/data/faq";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-[var(--bg-primary)]" id="faq">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            subtitle="Everything you need to know about Academica Institute, our programs, and the enrollment process."
          />
        </ScrollReveal>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {generalFaqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-[var(--text-primary)] text-[0.95rem]">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: openIndex === i ? "var(--gradient-brand)" : "var(--bg-secondary)",
                    }}
                  >
                    <ChevronDown
                      size={16}
                      className={openIndex === i ? "text-white" : "text-[var(--text-muted)]"}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 md:px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
