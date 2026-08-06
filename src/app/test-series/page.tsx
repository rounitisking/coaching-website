import Link from "next/link";
import { FileText, Download, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Test Series & Exam Practice — Academica Institute",
  description: "Assess your preparation with free test series, mock exams, and practice papers for CA, CS, CMA, and school coaching.",
};

interface CategoryInfo {
  slug: string;
  title: string;
  desc: string;
}

const CATEGORIES: CategoryInfo[] = [
  {
    slug: "ca",
    title: "Chartered Accountant (CA)",
    desc: "Practice mock tests, revision papers, and test series for CA Foundation, Intermediate, and Final.",
  },
  {
    slug: "cs",
    title: "Company Secretary (CS)",
    desc: "Executive and Professional program test series, compliance law test papers, and revision mocks.",
  },
  {
    slug: "cma",
    title: "Cost & Management Accountant (CMA)",
    desc: "CMA Foundation, Intermediate, and Final test series, costing exam models, and strategic mocks.",
  },
  {
    slug: "school",
    title: "School Coaching",
    desc: "Mock tests, term assessments, and unit test papers for Class 9, 10, 11, and 12 board students.",
  },
];

export default async function TestSeriesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3 animate-pulse">
            Practice Series
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Test Series &amp; Mocks
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-xl mx-auto mb-6">
            Assess your preparation, refine your time management, and improve your speed with premium mock exam series.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90">
              <FileText size={14} className="text-[#D4AF37]" /> Expert Evaluation
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90">
              <Download size={14} className="text-[#D4AF37]" /> Download PDF Papers
            </div>
          </div>
        </div>
      </section>

      {/* Categories Listing */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/test-series/${cat.slug}`}
                className="group block card p-6 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ color: "var(--text-primary)" }}>
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {cat.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--brand-secondary)] group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] group-hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 flex-shrink-0">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
