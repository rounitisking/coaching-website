"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Users } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Teacher = {
  id: string;
  name: string;
  slug: string;
  designation: string;
  subjects: string[];
  qualification: string;
  experience: string;
  bio: string;
  photo: string | null;
  whatsappNumber?: string;
};

const TABS = ["All", "Commerce", "Science", "School Coaching"];

// Classification helper
function getFacultyCategory(subjects: string[]): string {
  const commerceKeywords = ["accountancy", "accounts", "economics", "business", "law", "audit", "tax", "ca", "cs", "cma", "commerce", "b.com", "finance", "corporate"];
  const scienceKeywords = ["physics", "chemistry", "mathematics", "math", "biology", "jee", "neet", "science"];

  const subjectsStr = subjects.join(" ").toLowerCase();
  
  if (commerceKeywords.some(k => subjectsStr.includes(k))) return "COMMERCE";
  if (scienceKeywords.some(k => subjectsStr.includes(k))) return "SCIENCE";
  return "SCHOOL"; // Default fallback
}

export default function FacultyClient({ faculty }: { faculty: Teacher[] }) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = faculty.filter((f) => {
    if (activeTab === "All") return true;
    const cat = getFacultyCategory(f.subjects);
    if (activeTab === "Commerce") return cat === "COMMERCE";
    if (activeTab === "Science") return cat === "SCIENCE";
    if (activeTab === "School Coaching") return cat === "SCHOOL";
    return true;
  });

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filtered.map((f) => (
          <div key={f.id} className="card overflow-hidden group flex flex-col justify-between bg-white dark:bg-slate-950">
            <div>
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <Users size={48} className="text-blue-500 opacity-30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{f.name}</p>
                  <p className="text-white/70 text-xs">{f.designation}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">{f.qualification}</p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{f.experience} Experience</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.subjects.slice(0, 3).map((s: string) => (
                    <span key={s} className="tag text-[10px]">{s}</span>
                  ))}
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">{f.bio}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-50 dark:border-slate-900 mt-auto flex gap-3">
              <Link
                href={`/faculty/${f.slug}`}
                className="flex-1 btn-secondary text-sm py-2 px-3 justify-center rounded-xl font-bold"
              >
                Profile <ArrowRight size={14} />
              </Link>
              <a
                href={buildWhatsAppUrl(`Hello, I would like to query about batches taught by ${f.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp text-sm py-2 px-3 justify-center rounded-xl font-bold"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Users size={48} className="mx-auto text-[var(--text-muted)] opacity-30 mb-4" />
          <p className="text-[var(--text-muted)]">No faculty members found in this category.</p>
        </div>
      )}
    </div>
  );
}
