"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  course?: string | null;
  avatar?: string | null;
}

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl p-8 md:p-12 border overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="absolute top-6 right-8 opacity-10 pointer-events-none">
          <Quote size={120} className="text-blue-500" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center md:text-left md:flex-row md:items-start gap-8"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-md" style={{ background: "var(--gradient-brand)" }}>
                {current.name.charAt(0)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-center md:justify-start gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < current.rating ? "#f59e0b" : "none"}
                    stroke={i < current.rating ? "#f59e0b" : "#cbd5e1"}
                  />
                ))}
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-6 italic" style={{ color: "var(--text-primary)" }}>
                &ldquo;{current.text}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{current.name}</h4>
                {current.course && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--brand-secondary)" }}>{current.course}</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-center md:justify-end gap-3 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
