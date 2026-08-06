import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Download, Eye, ChevronRight, Folder } from "lucide-react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const CATEGORY_TITLES: Record<string, string> = {
  ca: "Chartered Accountant (CA)",
  cs: "Company Secretary (CS)",
  cma: "Cost & Management Accountant (CMA)",
  school: "School Coaching",
};

function getCategoryDisplayName(slug: string): string {
  const norm = slug.toLowerCase();
  return CATEGORY_TITLES[norm] || slug.toUpperCase();
}

function resolvePathAndNames(segments: string[]): { resolvedPath: string; displayNames: string[] } | null {
  let current = path.join(process.cwd(), "public", "test-series");
  const displayNames: string[] = [];
  
  for (const segment of segments) {
    if (!fs.existsSync(current)) return null;
    const files = fs.readdirSync(current);
    const decodedSegment = decodeURIComponent(segment);
    const matched = files.find(f => f.toLowerCase() === decodedSegment.toLowerCase());
    if (!matched) return null;
    current = path.join(current, matched);
    displayNames.push(matched);
  }
  return { resolvedPath: current, displayNames };
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolvePathAndNames(slug);
  if (!resolved) return { title: "Test Series Not Found" };

  const { displayNames } = resolved;
  const currentTitle = displayNames[displayNames.length - 1];
  const breadcrumbTitle = displayNames.length === 1 
    ? getCategoryDisplayName(currentTitle) 
    : currentTitle;

  return {
    title: `${breadcrumbTitle} — Test Series | Academica Institute`,
    description: `Practice papers, mock tests, and worksheets for ${breadcrumbTitle} at Academica Institute.`,
  };
}

export default async function DynamicTestSeriesPage({ params }: Props) {
  const { slug } = await params;
  
  const resolved = resolvePathAndNames(slug);
  if (!resolved) notFound();

  const { resolvedPath, displayNames } = resolved;

  let items: fs.Dirent[] = [];
  try {
    items = fs.readdirSync(resolvedPath, { withFileTypes: true });
  } catch (e) {
    console.error("Error reading folder items", e);
  }

  const folders = items
    .filter(item => item.isDirectory() && !item.name.startsWith("."))
    .map(item => item.name);
    
  const pdfs = items
    .filter(item => item.isFile() && item.name.toLowerCase().endsWith(".pdf") && !item.name.startsWith("."))
    .map(item => item.name);

  folders.sort(naturalSort);
  pdfs.sort(naturalSort);

  const breadcrumbs = [
    { label: "Test Series", href: "/test-series" }
  ];
  
  let currentHref = "/test-series";
  displayNames.forEach((name, index) => {
    currentHref += `/${encodeURIComponent(name)}`;
    const displayLabel = index === 0 ? getCategoryDisplayName(name) : name;
    breadcrumbs.push({ label: displayLabel, href: currentHref });
  });

  const pageTitle = breadcrumbs[breadcrumbs.length - 1].label;
  const isLeafLevel = folders.length === 0;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero / Header */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom">
          {/* Breadcrumbs Navigation */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-blue-300 mb-6 bg-white/5 backdrop-blur-sm py-2.5 px-4 rounded-xl border border-white/10 w-fit max-w-full">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={crumb.href} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-white/40">/</span>}
                  {isLast ? (
                    <span className="text-white select-none max-w-[200px] sm:max-w-xs truncate">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {pageTitle}
          </h1>
          <p className="text-blue-100/70 text-sm md:text-base mt-2 max-w-2xl">
            {isLeafLevel ? "Available test papers and mocks inside this folder." : "Select a folder below to explore test papers."}
          </p>
        </div>
      </section>

      {/* Folders and PDFs Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Subfolders list */}
          {!isLeafLevel && (
            <div className="space-y-4 mb-10">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
                Folders
              </h2>
              <div className="grid gap-4">
                {folders.map((folder) => {
                  const linkPath = `/test-series/${displayNames.map(encodeURIComponent).join("/")}/${encodeURIComponent(folder)}`;
                  return (
                    <Link
                      key={folder}
                      href={linkPath}
                      className="group block card p-5 hover:-translate-y-0.5 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center text-[var(--brand-secondary)] group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-all duration-300">
                            <Folder size={18} />
                          </div>
                          <span className="font-bold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>
                            {folder}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--brand-secondary)] group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-all duration-300 flex-shrink-0">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* PDF Files list */}
          {pdfs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
                PDF Files
              </h2>
              <div className="grid gap-4">
                {pdfs.map((pdf) => {
                  const fileUrl = `/test-series/${displayNames.map(encodeURIComponent).join("/")}/${encodeURIComponent(pdf)}`;
                  const cleanTitle = pdf.replace(/\.pdf$/i, "");
                  
                  return (
                    <div
                      key={pdf}
                      className="group card p-5 hover:border-[#D4AF37]/35 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 flex-shrink-0 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.2)] transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base leading-snug" style={{ color: "var(--text-primary)" }}>
                            {cleanTitle}
                          </h3>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-red-500/80 bg-red-50 dark:bg-red-950/20 px-1.5 py-0.5 rounded-md mt-1.5 inline-block">
                            PDF Mock Paper
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary btn-sm flex items-center gap-1.5 text-xs"
                        >
                          <Eye size={13} /> View
                        </a>
                        
                        <a
                          href={fileUrl}
                          download={pdf}
                          className="btn-primary btn-sm flex items-center gap-1.5 text-xs"
                        >
                          <Download size={13} /> Download
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {folders.length === 0 && pdfs.length === 0 && (
            <div className="text-center py-12 card p-8" style={{ background: "var(--bg-muted)" }}>
              <FileText size={40} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
                This Folder is Empty
              </h3>
              <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--text-muted)" }}>
                No folders or PDFs were found in this test series subdirectory. Add PDF test papers inside <code>public/test-series/{slug.join("/")}/</code> to start displaying them dynamically.
              </p>
              <Link href="/test-series" className="btn-secondary">
                Back to Test Series Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
