"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";
import { results } from "@/data/results";
import { SectionHeading } from "@/components/ui/SectionHeading";

const exams = ["All", "CA", "CS", "CMA", "CUET", "Boards"];
const years = ["All", "2024", "2023"];

export default function ResultsPage() {
  const [examFilter, setExamFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = results.filter((r) => {
    const matchExam = examFilter === "All" || r.exam === examFilter;
    const matchYear = yearFilter === "All" || r.year.toString() === yearFilter;
    const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase());
    return matchExam && matchYear && matchSearch;
  });

  return (
    <div className="section bg-[var(--bg-primary)]">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Student Achievements"
          title="Our Top"
          titleHighlight="Results"
          subtitle="Every result here represents a dream fulfilled. Explore selections across CA, CS, CMA, CUET, and school boards."
          className="mb-10"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--brand-400)] transition-colors"
            />
          </div>

          {/* Exam filter */}
          <div className="flex gap-2 flex-wrap">
            {exams.map((e) => (
              <button
                key={e}
                onClick={() => setExamFilter(e)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: examFilter === e ? "var(--gradient-brand)" : "var(--bg-card)",
                  color: examFilter === e ? "white" : "var(--text-secondary)",
                  border: examFilter === e ? "none" : "1px solid var(--border)",
                }}
              >
                {e}
              </button>
            ))}
          </div>

          {/* Year filter */}
          <div className="flex gap-2 flex-wrap">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: yearFilter === y ? "var(--gradient-brand)" : "var(--bg-card)",
                  color: yearFilter === y ? "white" : "var(--text-secondary)",
                  border: yearFilter === y ? "none" : "1px solid var(--border)",
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((result) => (
            <div key={result.id} className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--brand-300)] flex-shrink-0">
                  <Image
                    src={result.photo}
                    alt={result.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--text-primary)]">{result.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{result.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {result.exam}
                </span>
                {result.rank && (
                  <span className="text-xs font-bold text-[var(--accent-500)]">{result.rank}</span>
                )}
              </div>

              <p className="text-2xl font-black gradient-text mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                {result.score}
              </p>

              <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">
                ✅ {result.selectionBadge}
              </p>

              {result.successStory && (
                <p className="text-xs text-[var(--text-muted)] italic line-clamp-3 border-t border-[var(--border)] pt-3">
                  &quot;{result.successStory}&quot;
                </p>
              )}

              <div className="mt-3">
                <span className="tag text-[10px]">{result.course}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[var(--text-muted)]">No results found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
