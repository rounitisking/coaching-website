"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Trophy } from "lucide-react";

interface Topper {
  id: string;
  studentName: string;
  photo?: string | null;
  exam: string;
  rank?: string | null;
  score?: string | null;
  course?: string | null;
  batch?: string | null;
  year: number;
  achievement?: string | null;
  quote?: string | null;
}

interface ToppersCarouselProps {
  toppers: Topper[];
}

const EXAM_GRADIENTS: Record<string, string> = {
  "CA":     "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  "CA Foundation":   "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  "CA Intermediate": "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
  "CA Final":        "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
  "CS":     "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
  "CMA":    "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  "CUET":   "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  "Boards": "linear-gradient(135deg, #db2777 0%, #ec4899 100%)",
  "IIT":    "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
  "NEET":   "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
};

function getGradient(exam: string): string {
  for (const [key, val] of Object.entries(EXAM_GRADIENTS)) {
    if (exam.toUpperCase().includes(key.toUpperCase())) return val;
  }
  return "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)";
}

// Static fallback data if DB is empty
const FALLBACK_TOPPERS: Topper[] = [
  { id: "1", studentName: "Aman Sen", exam: "CA Foundation", rank: "AIR 1", score: "365/400", course: "CA Foundation Program", year: 2024, achievement: "All India Rank 1 — Top performer in the country", quote: "Academica Institute gave me the structured guidance and motivation I needed to achieve this rank." },
  { id: "2", studentName: "Karan Gupta", exam: "CUET", rank: "100%ile", score: "800/800", course: "CUET Prep Program", year: 2024, achievement: "Perfect score — Admitted to SRCC, Delhi University", quote: "The mock tests and CBT practice gave me real exam confidence." },
  { id: "3", studentName: "Meera Nair", exam: "CS Foundation", rank: "AIR 12", score: "348/400", course: "CS Preparation Program", year: 2024, achievement: "Top CS Foundation rank holder", quote: "The law notes and structured study plan made a huge difference." },
  { id: "4", studentName: "Deepak Rawat", exam: "CMA Foundation", rank: "AIR 8", score: "358/400", course: "CMA Preparation Program", year: 2024, achievement: "Single-digit national rank in CMA", quote: "Daily worksheets and costing workshops built my speed and accuracy." },
];

export function ToppersCarousel({ toppers }: ToppersCarouselProps) {
  const displayToppers = toppers.length > 0 ? toppers : FALLBACK_TOPPERS;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState<"left" | "right" | null>(null);
  const [visible, setVisible] = useState(true);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number, direction: "left" | "right") => {
    if (animating) return;
    setAnimating(direction);
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
      setAnimating(null);
    }, 300);
  }, [animating]);

  const next = useCallback(() => {
    const idx = (current + 1) % displayToppers.length;
    goTo(idx, "right");
  }, [current, displayToppers.length, goTo]);

  const prev = useCallback(() => {
    const idx = (current - 1 + displayToppers.length) % displayToppers.length;
    goTo(idx, "left");
  }, [current, displayToppers.length, goTo]);

  // Auto-slide every 5s
  useEffect(() => {
    autoRef.current = setTimeout(next, 5000);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [current, next]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  const topper = displayToppers[current];
  const gradient = getGradient(topper.exam);

  return (
    <section className="section-padding overflow-hidden" style={{ background: "var(--bg-muted)" }}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-eyebrow">Our Achievers</p>
          <h2 className="section-title">Top Selections &amp; Toppers</h2>
          <p className="section-subtitle mx-auto mt-3">
            Our students consistently achieve national ranks and top results across CA, CS, CMA, CUET and school boards.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Toppers carousel"
          aria-live="polite"
        >
          {/* Card */}
          <div
            className="card overflow-hidden transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : animating === "right" ? "translateY(16px)" : "translateY(-16px)",
            }}
          >
            {/* Top gradient banner */}
            <div className="relative h-2 w-full" style={{ background: gradient }} />

            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
                {/* Photo */}
                <div className="flex-shrink-0 text-center">
                  <div
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden mx-auto flex items-center justify-center text-3xl font-black text-white shadow-lg"
                    style={{ background: gradient }}
                  >
                    {topper.photo ? (
                      <Image
                        src={topper.photo}
                        alt={topper.studentName}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      topper.studentName.charAt(0)
                    )}
                  </div>
                  {/* AIR Badge */}
                  {topper.rank && (
                    <div
                      className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black text-white shadow"
                      style={{ background: gradient }}
                    >
                      <Trophy size={11} />
                      {topper.rank}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  {/* Institute branding */}
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Academica Institute · Est. 2013
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}>
                    {topper.studentName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: gradient }}
                    >
                      {topper.exam}
                    </span>
                    {topper.year && (
                      <span className="badge badge-muted text-xs">Class of {topper.year}</span>
                    )}
                    {topper.batch && (
                      <span className="badge badge-muted text-xs">{topper.batch}</span>
                    )}
                  </div>

                  {/* Marks */}
                  {topper.score && (
                    <div className="flex items-baseline gap-2 justify-center sm:justify-start mb-3">
                      <span className="text-3xl font-black gradient-text" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {topper.score}
                      </span>
                      <span className="text-sm text-[var(--text-muted)] font-medium">marks scored</span>
                    </div>
                  )}

                  {/* Course */}
                  {topper.course && (
                    <p className="text-sm mb-3 font-medium" style={{ color: "var(--text-secondary)" }}>
                      📚 {topper.course}
                    </p>
                  )}

                  {/* Achievement */}
                  {topper.achievement && (
                    <p className="text-sm font-semibold mb-4" style={{ color: "var(--brand-secondary)" }}>
                      🏆 {topper.achievement}
                    </p>
                  )}

                  {/* Quote */}
                  {topper.quote && (
                    <div className="flex items-start gap-2 p-4 rounded-xl" style={{ background: "var(--bg-muted)" }}>
                      <Quote size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--brand-secondary)" }} />
                      <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
                        {topper.quote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous topper"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow-md flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:border-[var(--brand-secondary)] transition-all z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next topper"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow-md flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:border-[var(--brand-secondary)] transition-all z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Carousel pages">
            {displayToppers.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Go to topper ${idx + 1}`}
                onClick={() => goTo(idx, idx > current ? "right" : "left")}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: idx === current ? "24px" : "8px",
                  height: "8px",
                  background: idx === current ? "var(--brand-secondary)" : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
