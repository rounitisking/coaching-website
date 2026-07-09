"use client";

import Image from "next/image";
import { getFeaturedResults } from "@/data/results";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const examColors: Record<string, string> = {
  CA: "linear-gradient(135deg, #6366f1, #4f46e5)",
  CS: "linear-gradient(135deg, #a855f7, #7c3aed)",
  CMA: "linear-gradient(135deg, #10b981, #059669)",
  CUET: "linear-gradient(135deg, #f97316, #ea580c)",
  Boards: "linear-gradient(135deg, #ec4899, #db2777)",
};

export function ResultsSection() {
  const featuredResults = getFeaturedResults();
  // Duplicate for seamless infinite scroll — two copies so translateX(-50%) loops perfectly
  const marqueeItems = [...featuredResults, ...featuredResults];

  return (
    <section className="section bg-[var(--bg-secondary)] overflow-hidden py-10 sm:py-12 md:py-16">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Achievers"
            title="Academica's Top"
            titleHighlight="Toppers"
            subtitle="Meet our national rank holders, board toppers, and successful students from CA, CS, CMA, CUET & school boards."
            className="mb-8 sm:mb-10"
          />
        </ScrollReveal>
      </div>

      {/* Infinite Marquee — lives OUTSIDE container-custom so it spans full width */}
      {/*
        KEY FIX: We use CSS mask-image for the edge fade instead of colored gradient
        overlays. This works on ANY background (light/dark/any color) because it
        uses alpha transparency, not a color fill. No white flash, no color mismatch.
      */}
      <div
        className="relative mt-4 overflow-hidden marquee-container marquee-mask"
        aria-label="Scrolling results showcase"
      >
        <div
          className="flex gap-4 sm:gap-6 marquee-track py-4"
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((result, i) => (
            <div
              key={`${result.id}-${i}`}
              className="flex-shrink-0 w-60 sm:w-72 card p-4 sm:p-6 cursor-default hover:border-[var(--brand-400)] transition-all duration-300 bg-[var(--bg-card)] shadow-md"
            >
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[var(--brand-300)] flex-shrink-0">
                  <Image
                    src={result.photo}
                    alt={result.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-[var(--text-primary)] truncate">
                    {result.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">Class of {result.year}</p>
                </div>
              </div>

              {/* Exam badge */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                  style={{ background: examColors[result.exam] || examColors.CA }}
                >
                  {result.exam}
                </div>
                {result.rank && (
                  <span className="text-xs font-black text-[var(--accent-500)] bg-[var(--brand-50)] dark:bg-purple-950/30 px-2 py-0.5 rounded-lg border border-[var(--brand-100)] dark:border-purple-900/40">
                    {result.rank}
                  </span>
                )}
              </div>

              {/* Score */}
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-xl font-black gradient-text"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {result.score}
                </span>
              </div>

              {/* Selection */}
              <div className="text-xs text-[var(--text-secondary)] font-medium leading-tight mb-2">
                🏆 {result.selectionBadge}
              </div>

              {result.successStory && (
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic border-t border-[var(--border)] pt-2 line-clamp-2">
                  &quot;{result.successStory}&quot;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
