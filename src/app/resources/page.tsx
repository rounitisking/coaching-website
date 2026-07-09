"use client";

import { useState } from "react";
import { Download, FileText, BookOpen, ClipboardList, Clock } from "lucide-react";
import { resources, resourceTypes } from "@/data/resources";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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

export default function ResourcesPage() {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all"
      ? resources
      : resources.filter((r) => r.type === activeType);

  return (
    <div className="section bg-[var(--bg-primary)]">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Study Material"
          title="Student"
          titleHighlight="Resources"
          subtitle="Download free notes, DPPs, previous year papers, and test series. Access all study materials to help you succeed."
          className="mb-10"
        />

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeType === type ? "var(--gradient-brand)" : "var(--bg-card)",
                color: activeType === type ? "white" : "var(--text-secondary)",
                border: activeType === type ? "none" : "1px solid var(--border)",
              }}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((resource) => {
            const Icon = typeIcons[resource.type] || FileText;
            return (
              <div key={resource.id} className="card p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text-primary)] text-sm mb-1 line-clamp-2">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-success text-[10px]">
                        ✅ Free
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">{resource.fileSize}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="tag text-[10px]">{resource.subject}</span>
                  <span className="tag text-[10px]">{resource.course}</span>
                </div>

                <a
                  href={resource.fileUrl}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                  download
                >
                  <Download size={15} />
                  Download Free
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 text-center text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <h2
            className="text-2xl md:text-3xl font-black mb-3"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Looking for More Study Materials?
          </h2>
          <p className="mb-6 opacity-90 max-w-xl mx-auto">
            Enrolled students get access to our complete library of 500+ resources including comprehensive worksheets, test series, and live recorded classes.
          </p>
          <a
            href={buildWhatsAppUrl(
              "Hi, I'd like to enroll at Academica Institute and get access to the complete student study resources."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-white text-[var(--brand-700)] hover:bg-white/90 transition-colors"
          >
            Enroll Now for Complete Access
          </a>
        </div>
      </div>
    </div>
  );
}

