import Link from "next/link";
import { FileText, Download, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Notes & Study Material — Academica Institute",
  description: "Download free study notes, reference manuals, and chapter files for CA, CS, CMA, JEE, NEET, and school coaching classes.",
};

interface CategoryInfo {
  slug: string;
  title: string;
  desc: string;
}

const CATEGORIES: CategoryInfo[] = [
  {
    slug: "ca",
    title: "Chartered Accountancy (CA)",
    desc: "Comprehensive study material, revision notes, and exam practice resources for CA Foundation, Intermediate, and Final.",
  },
  {
    slug: "cs",
    title: "Company Secretary (CS) Preparation",
    desc: "Complete CS Executive, Professional, and Entrance exam study guides, books, and reference notes.",
  },
  {
    slug: "cma",
    title: "Cost and Management Accountancy (CMA) Preparation",
    desc: "Costing worksheets, management accountancy manuals, and revision summaries.",
  },
  /*
  {
    slug: "jee",
    title: "JEE Preparation",
    desc: "Physics, Chemistry, and Mathematics revision sheets, formulas, and past papers.",
  },
  {
    slug: "neet",
    title: "NEET Preparation",
    desc: "Biology, Chemistry, and Physics notes, diagrams, and mock tests.",
  },
  */
  {
    slug: "tuition",
    title: "Tuition / Secondary School Coaching",
    desc: "Subject notes, assignments, and class sheets for secondary and high school board students.",
  },
];

export default async function NotesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3 animate-pulse">
            Study Material
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Notes &amp; Resources
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-xl mx-auto mb-6">
            Access organized chapter notes, practice worksheets, and reference guides designed by expert faculty.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90">
              <FileText size={14} className="text-[#D4AF37]" /> Organized chapters
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90">
              <Download size={14} className="text-[#D4AF37]" /> Instant PDF download
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
                href={`/notes/${cat.slug}`}
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
