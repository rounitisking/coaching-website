"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Download, Lock, Search } from "lucide-react";

type TestSeries = {
  id: string;
  title: string;
  description: string;
  price: number;
  mrp: number;
  category: { type: string; name: string };
  fileUrl?: string | null;
  totalTests?: number;
  duration?: string;
};

type Props = {
  testSeries: TestSeries[];
  userPurchases: string[];
  isLoggedIn: boolean;
};

const TABS = ["All", "Commerce", "Science", "School"];

const categoryColors: Record<string, string> = {
  COMMERCE: "linear-gradient(135deg, #1e40af, #2563eb)",
  SCIENCE: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  SCHOOL: "linear-gradient(135deg, #059669, #047857)",
};

export default function TestSeriesClient({ testSeries, userPurchases, isLoggedIn }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = testSeries.filter((ts) => {
    const matchCategory = activeTab === "All" || ts.category.type === activeTab.toUpperCase();
    const matchSearch = ts.title.toLowerCase().includes(search.toLowerCase()) ||
      ts.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-pill ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            className="input pl-9"
            placeholder="Search test series..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ts) => {
          const isPurchased = userPurchases.includes(ts.id);
          const discount = ts.mrp > ts.price ? Math.round(((ts.mrp - ts.price) / ts.mrp) * 100) : 0;

          return (
            <div key={ts.id} className="card overflow-hidden flex flex-col text-left">
              {/* Header */}
              <div
                className="p-5 flex items-start gap-4"
                style={{ background: categoryColors[ts.category.type] || categoryColors.COMMERCE }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardList size={22} className="text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{ts.category.name}</span>
                  <h3 className="font-bold text-white text-sm mt-0.5 leading-snug">{ts.title}</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{ts.description}</p>

                {(ts.totalTests || ts.duration) && (
                  <div className="flex gap-4 mb-4 text-xs font-semibold text-[var(--text-secondary)]">
                    {ts.totalTests && <span>📝 {ts.totalTests} Tests</span>}
                    {ts.duration && <span>⏱️ {ts.duration}</span>}
                  </div>
                )}

                <div className="mt-auto">
                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black text-[var(--brand-secondary)]">₹{ts.price.toLocaleString("en-IN")}</span>
                    {ts.mrp > ts.price && (
                      <>
                        <span className="text-xs line-through text-[var(--text-muted)]">₹{ts.mrp.toLocaleString("en-IN")}</span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded-full">{discount}% off</span>
                      </>
                    )}
                  </div>

                  {isPurchased ? (
                    <a
                      href={ts.fileUrl || "#"}
                      className="btn-primary w-full justify-center text-sm font-bold flex items-center gap-1.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={15} /> Download Test PDF
                    </a>
                  ) : isLoggedIn ? (
                    <Link
                      href={`/checkout?type=test-series&id=${ts.id}`}
                      className="btn-primary w-full justify-center text-sm font-bold flex items-center gap-1.5"
                    >
                      Buy Now
                    </Link>
                  ) : (
                    <Link
                      href={`/auth?callbackUrl=/test-series`}
                      className="btn-primary w-full justify-center text-sm font-bold flex items-center gap-1.5"
                    >
                      <Lock size={14} /> Login to Buy
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <ClipboardList size={48} className="mx-auto text-[var(--text-muted)] opacity-30 mb-4" />
          <p className="text-[var(--text-muted)]">No test series found matching your search.</p>
        </div>
      )}
    </div>
  );
}
