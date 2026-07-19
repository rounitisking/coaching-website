"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { BookOpen, CheckCircle, GraduationCap, Trophy, HelpCircle, FileText, User } from "lucide-react";
import { FAQAccordion } from "@/components/home/FAQAccordion";

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  photo: string | null;
  experience: number;
}

interface CourseTabsProps {
  overview: string | null;
  content: string | null;
  eligibility: string | null;
  mentorship: string | null;
  highlights: string[];
  modules: any[];
  faculties: FacultyMember[];
  faqs: any[];
}

export function CourseTabs({
  overview,
  content,
  eligibility,
  mentorship,
  highlights,
  modules,
  faculties,
  faqs,
}: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "syllabus" | "eligibility" | "mentorship" | "faculty" | "faqs">("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "syllabus", label: "Syllabus" },
    { id: "eligibility", label: "Eligibility" },
    { id: "mentorship", label: "Mentorship" },
    { id: "faculty", label: "Faculty" },
    { id: "faqs", label: "FAQs" },
  ] as const;

  return (
    <div className="space-y-6 text-left">
      {/* Tabs navigation */}
      <div className="flex border-b border-[var(--border)] overflow-x-auto no-scrollbar scroll-smooth gap-1 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "border-[var(--brand-secondary)] text-[var(--brand-secondary)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab contents */}
      <div className="min-h-[300px]">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Program Overview
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {overview || content || "Detailed program description is being updated. Enroll today to access full course features."}
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                What You Will Learn
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={15} style={{ color: "#059669" }} className="mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Syllabus */}
        {activeTab === "syllabus" && (
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <BookOpen size={18} style={{ color: "var(--brand-secondary)" }} />
              Curriculum Syllabus
            </h3>
            {modules.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen size={36} className="mx-auto text-[var(--text-muted)] opacity-50 mb-3" />
                <p className="text-sm text-[var(--text-muted)]">Detailed curriculum is being updated. Contact us for the complete syllabus.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {modules.map((mod: any, idx: number) => (
                  <details
                    key={mod.id}
                    className="group border border-[var(--border)] rounded-xl overflow-hidden"
                    open={idx === 0}
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors">
                      <span className="flex items-center gap-2">
                        <BookOpen size={14} style={{ color: "var(--brand-secondary)" }} />
                        {mod.title}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-semibold">{mod.lessons?.length || 0} Topics</span>
                    </summary>
                    <div className="px-4 pb-4 space-y-1">
                      {(mod.lessons || []).map((les: any) => (
                        <div
                          key={les.id}
                          className="flex justify-between items-center text-xs text-[var(--text-secondary)] py-2 border-b last:border-0 border-[var(--border)]"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-secondary)]" />
                            {les.title}
                          </span>
                          {les.duration && <span className="text-[var(--text-muted)] font-semibold">{les.duration} Min</span>}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Eligibility */}
        {activeTab === "eligibility" && (
          <div className="card p-6 space-y-4">
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Eligibility Criteria
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {eligibility || "This program is suitable for students pursuing professional commerce/science tracks or aiming for top school board scores."}
            </p>
          </div>
        )}

        {/* Mentorship */}
        {activeTab === "mentorship" && (
          <div className="card p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Personal Mentorship &amp; Support
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {mentorship || "Get regular doubt-solving sessions, 1-on-1 mentorship with experts, and weekly practice worksheets tailored to your learning pace."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                  <GraduationCap size={16} style={{ color: "var(--brand-secondary)" }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Doubt Support</h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Ask doubts anytime and get answers within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                  <Trophy size={16} style={{ color: "var(--brand-secondary)" }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Performance Tracking</h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Weekly tests and detailed reports shared with parents.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Faculty */}
        {activeTab === "faculty" && (
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Faculty Instructors
            </h3>
            {faculties.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] text-center py-6">Faculty team details are being updated.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {faculties.map((f) => (
                  <NextLink
                    key={f.id}
                    href={`/faculty/${f.slug}`}
                    className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-xl hover:bg-[var(--bg-muted)] transition-all no-underline group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-black text-xl overflow-hidden shrink-0 shadow-sm"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      {f.photo ? (
                        <Image
                          src={f.photo}
                          alt={f.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        f.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-secondary)] transition-colors">
                        {f.name}
                      </h4>
                      <p className="text-xs text-[var(--brand-secondary)] mt-0.5">{f.designation}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">{f.experience}+ yrs experience</p>
                    </div>
                  </NextLink>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FAQs */}
        {activeTab === "faqs" && (
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <HelpCircle size={18} style={{ color: "var(--brand-secondary)" }} />
              Program FAQs
            </h3>
            {faqs.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] text-center py-6">FAQs are being updated.</p>
            ) : (
              <FAQAccordion faqs={faqs} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
