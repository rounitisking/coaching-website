"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Result {
  id: string;
  name: string;
  photo: string | null;
  exam: string;
  rank?: string | null;
  score?: string | null;
  year: number;
}

interface ResultsClientProps {
  initialResults: Result[];
}

const exams = ["All", "CA", "CS", "CMA", "CUET", "Boards"];
const years = ["All", "2024", "2023"];

export function ResultsClient({ initialResults }: ResultsClientProps) {
  const [examFilter, setExamFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = initialResults.filter((r) => {
    const matchExam = examFilter === "All" || r.exam.toUpperCase().includes(examFilter.toUpperCase());
    const matchYear = yearFilter === "All" || r.year.toString() === yearFilter;
    const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase());
    return matchExam && matchYear && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
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
        <div className="flex gap-2 flex-wrap items-center">
          {exams.map((e) => (
            <button
              key={e}
              onClick={() => setExamFilter(e)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border"
              style={{
                background: examFilter === e ? "var(--gradient-brand)" : "var(--bg-card)",
                color: examFilter === e ? "white" : "var(--text-secondary)",
                borderColor: examFilter === e ? "transparent" : "var(--border)",
              }}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Year filter */}
        <div className="flex gap-2 flex-wrap items-center">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border"
              style={{
                background: yearFilter === y ? "var(--gradient-brand)" : "var(--bg-card)",
                color: yearFilter === y ? "white" : "var(--text-secondary)",
                borderColor: yearFilter === y ? "transparent" : "var(--border)",
              }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm">
            No selections found matching criteria.
          </div>
        ) : (
          filtered.map((r) => (
            <div key={r.id} className="card p-5 text-center flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/20 bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
                  {r.photo ? (
                    <Image
                      src={r.photo}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <Trophy size={32} className="text-blue-500 opacity-30" />
                  )}
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] leading-tight">{r.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">{r.exam} ({r.year})</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900 w-full flex flex-col gap-1">
                {r.rank && (
                  <span className="badge badge-accent text-[10px] font-bold py-0.5 mx-auto">
                    {r.rank}
                  </span>
                )}
                {r.score && (
                  <span className="badge badge-brand text-[10px] font-bold py-0.5 mx-auto">
                    {r.score}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
