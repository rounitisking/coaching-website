"use client";

import { useState } from "react";
import { Download, FileText, BookOpen, ClipboardList, Clock, Lock } from "lucide-react";
import Link from "next/link";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  subject: string;
  course: string;
  fileUrl: string | null;
  fileSize: string;
  free: boolean;
  price?: number;
}

interface ResourcesClientProps {
  initialResources: Resource[];
  resourceTypes: string[];
  isLoggedIn?: boolean;
  purchasedIds?: string[];
}

const typeIcons: Record<string, React.ElementType> = {
  notes: BookOpen,
  dpp: ClipboardList,
  assignment: FileText,
  pyq: Clock,
  test: FileText,
};

const typeLabels: Record<string, string> = {
  all: "All",
  notes: "Notes",
  dpp: "DPP",
  assignment: "Assignments",
  pyq: "Previous Year Papers",
  test: "Test Series",
};

export function ResourcesClient({ initialResources, resourceTypes, isLoggedIn = false, purchasedIds = [] }: ResourcesClientProps) {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all"
      ? initialResources
      : initialResources.filter((r) => r.type.toLowerCase() === activeType.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {resourceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border"
            style={{
              background: activeType === type ? "var(--gradient-brand)" : "var(--bg-card)",
              color: activeType === type ? "white" : "var(--text-secondary)",
              borderColor: activeType === type ? "transparent" : "var(--border)",
            }}
          >
            {typeLabels[type] || type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm">
            No study materials found under this category.
          </div>
        ) : (
          filtered.map((res) => {
            const Icon = typeIcons[res.type.toLowerCase()] || FileText;
            return (
              <div
                key={res.id}
                className="card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        {res.subject}
                      </span>
                      <span className="badge badge-brand text-[9px] font-semibold py-0 px-2 mt-0.5">
                        {res.course}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[var(--text-primary)] mb-2 leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between mt-auto">
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    {res.fileSize}
                  </span>

                  {res.free ? (
                    res.fileUrl ? (
                      <a
                        href={res.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-sm rounded-lg flex items-center gap-1.5 no-underline"
                      >
                        Download <Download size={14} />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="btn-secondary btn-sm opacity-60 flex items-center gap-1.5 cursor-not-allowed"
                      >
                        Coming Soon <Lock size={12} />
                      </button>
                    )
                  ) : purchasedIds.includes(res.id) ? (
                    res.fileUrl ? (
                      <a
                        href={res.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-sm rounded-lg flex items-center gap-1.5 no-underline"
                      >
                        Download <Download size={14} />
                      </a>
                    ) : (
                      <button disabled className="btn-secondary btn-sm opacity-60 cursor-not-allowed flex items-center gap-1.5">
                        Processing <Lock size={12} />
                      </button>
                    )
                  ) : isLoggedIn ? (
                    <Link
                      href={`/checkout?type=resource&id=${res.id}`}
                      className="btn-primary btn-sm rounded-lg flex items-center gap-1.5"
                    >
                      Buy Now <Download size={12} />
                    </Link>
                  ) : (
                    <Link
                      href={`/auth?callbackUrl=/resources`}
                      className="btn-secondary btn-sm rounded-lg flex items-center gap-1.5"
                    >
                      Login to Buy <Lock size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
