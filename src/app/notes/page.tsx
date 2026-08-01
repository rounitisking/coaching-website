import Link from "next/link";
import { FileText, Download, Lock, ChevronRight } from "lucide-react";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Notes & Study Material — Academica Institute",
  description: "Download free study notes, reference manuals, and chapter files for CA, CS, CMA, and commerce coaching classes.",
};

interface CategoryMeta {
  title: string;
  desc: string;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  ca: {
    title: "Chartered Accountancy (CA)",
    desc: "Comprehensive study material, revision notes, and exam practice resources for CA Foundation, Intermediate, and Final.",
  },
  cs: {
    title: "Company Secretary (CS) Preparation",
    desc: "Complete CS Executive, Professional, and Entrance exam study guides, books, and reference notes.",
  },
  cma: {
    title: "Cost and Management Accountancy (CMA) Preparation",
    desc: "Costing worksheets, management accountancy manuals, and revision summaries.",
  },
  cuet: {
    title: "CUET Preparation",
    desc: "Specialized commerce and science preparation test notes, worksheets, and syllabus guides.",
  },
};

function ensureMockStructure() {
  const notesDir = path.join(process.cwd(), "public", "notes");
  const caDir = path.join(notesDir, "ca");
  const paper1Dir = path.join(caDir, "Paper 1 - Principles and Practice of Accounting");
  const ch1Dir = path.join(paper1Dir, "Chapter 1 - Theoretical Framework");
  const ch2Dir = path.join(paper1Dir, "Chapter 2 - Accounting Process");

  if (!fs.existsSync(ch1Dir)) {
    fs.mkdirSync(ch1Dir, { recursive: true });
    fs.writeFileSync(path.join(ch1Dir, "1. Meaning and Scope of Accounting.pdf"), "%PDF-1.4 mock content...");
    fs.writeFileSync(path.join(ch1Dir, "2. Accounting Concepts and Principles.pdf"), "%PDF-1.4 mock content...");
  }
  if (!fs.existsSync(ch2Dir)) {
    fs.mkdirSync(ch2Dir, { recursive: true });
    fs.writeFileSync(path.join(ch2Dir, "1. Journal Ledger and Trial Balance.pdf"), "%PDF-1.4 mock content...");
  }

  const paper2Dir = path.join(caDir, "Paper 2 - Business Laws");
  const p2ch1Dir = path.join(paper2Dir, "Chapter 1 - The Indian Contract Act, 1872");
  if (!fs.existsSync(p2ch1Dir)) {
    fs.mkdirSync(p2ch1Dir, { recursive: true });
    fs.writeFileSync(path.join(p2ch1Dir, "1. Nature of Contracts.pdf"), "%PDF-1.4 mock content...");
  }
}

export default async function NotesPage() {
  ensureMockStructure();

  const notesDir = path.join(process.cwd(), "public", "notes");
  let categories: string[] = [];
  try {
    categories = fs.readdirSync(notesDir).filter((file) => {
      const fullPath = path.join(notesDir, file);
      return fs.statSync(fullPath).isDirectory() && !file.startsWith(".");
    });
  } catch (e) {
    console.error("Error reading notes directory", e);
  }

  // Sort categories prioritizing CA
  const order = ["ca", "cs", "cma", "cuet"];
  categories.sort((a, b) => {
    const idxA = order.indexOf(a.toLowerCase());
    const idxB = order.indexOf(b.toLowerCase());
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

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
            {categories.map((cat) => {
              const normCat = cat.toLowerCase();
              const meta = CATEGORY_MAP[normCat] || {
                title: cat.toUpperCase(),
                desc: `Study materials and revision notes for ${cat.toUpperCase()}.`,
              };

              return (
                <Link
                  key={cat}
                  href={`/notes/${normCat}`}
                  className="group block card p-6 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ color: "var(--text-primary)" }}>
                        {meta.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {meta.desc}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--brand-secondary)] group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] group-hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 flex-shrink-0">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {categories.length === 0 && (
              <div className="text-center py-12 card p-8" style={{ background: "var(--bg-muted)" }}>
                <p style={{ color: "var(--text-muted)" }}>
                  No categories found. Create category folders inside <code>public/notes/</code> to automatically display them.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
