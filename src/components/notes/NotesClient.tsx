"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FileText, Lock, Download, Search, Filter, ExternalLink, BookOpen, ClipboardList, Clock, Video } from "lucide-react";

interface Note {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  course: string | null;
  price: number;
  mrp: number;
  isFree: boolean;
  fileUrl: string | null;
  previewUrl: string | null;
  thumbnail: string | null;
  category: { name: string; type: string } | null;
  type: "PDF" | "VIDEO" | "NOTES" | "BROCHURE" | "OTHER";
}

interface NotesClientProps {
  notes: Note[];
  isLoggedIn: boolean;
  purchasedIds?: string[];
}

// First 3 notes in the sorted list are free for everyone (by order in DB)
const FREE_COUNT = 3;

function NoteCard({
  note,
  index,
  isLoggedIn,
  isPurchased,
}: {
  note: Note;
  index: number;
  isLoggedIn: boolean;
  isPurchased: boolean;
}) {
  const isFreeByOrder = index < FREE_COUNT;
  const isFree = note.isFree || isFreeByOrder;
  const canDownload = isFree || isPurchased;

  // Render original card/tile icons based on type
  const typeIcons: Record<string, React.ElementType> = {
    NOTES: BookOpen,
    PDF: FileText,
    BROCHURE: FileText,
    VIDEO: Video,
    OTHER: FileText,
  };
  const IconComponent = typeIcons[note.type] || FileText;

  // Login redirect logic for Buy Now
  const checkoutUrl = `/checkout?type=resource&id=${note.id}`;
  const buyNowUrl = isLoggedIn
    ? checkoutUrl
    : `/auth?callbackUrl=${encodeURIComponent(checkoutUrl)}`;

  return (
    <div key={note.id} className="card p-5 flex flex-col justify-between" id={`note-${note.id}`}>
      <div>
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isFree
                ? "var(--gradient-brand, linear-gradient(135deg, #2563eb, #1d4ed8))"
                : "linear-gradient(135deg, #64748b, #475569)",
            }}
          >
            <IconComponent size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--text-primary)] text-sm mb-1 line-clamp-2">
              {note.title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`badge text-[10px] ${
                  isFree
                    ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                }`}
              >
                {isFree ? "✅ Free" : "🔒 Premium"}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">PDF Format</span>
            </div>
          </div>
        </div>

        {note.description && (
          <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed line-clamp-2">
            {note.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {note.subject && <span className="tag text-[10px]">{note.subject}</span>}
          {note.course && <span className="tag text-[10px]">{note.course}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            {isFree ? (
              <span className="text-sm font-bold" style={{ color: "var(--brand-secondary)" }}>
                Free
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="price-tag text-base">₹{note.price.toLocaleString("en-IN")}</span>
                {note.mrp > note.price && (
                  <span className="price-original text-xs">₹{note.mrp.toLocaleString("en-IN")}</span>
                )}
              </div>
            )}
          </div>

          {canDownload ? (
            note.fileUrl ? (
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-sm flex items-center gap-1"
                download
              >
                <Download size={13} /> Download
              </a>
            ) : (
              <span className="text-xs text-[var(--text-muted)] font-semibold">Coming soon</span>
            )
          ) : (
            <Link
              href={buyNowUrl}
              className="btn-primary btn-sm flex items-center gap-1"
              style={{ background: "var(--gradient-brand)" }}
            >
              Buy Now
            </Link>
          )}
        </div>

        {note.previewUrl && (
          <a
            href={note.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-center py-1.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors text-slate-500"
          >
            Preview Note →
          </a>
        )}
      </div>
    </div>
  );
}

export function NotesClient({ notes, isLoggedIn, purchasedIds = [] }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Extract unique filter options
  const courses = useMemo(() => {
    const set = new Set(notes.map((n) => n.course).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [notes]);

  const subjects = useMemo(() => {
    const set = new Set(notes.map((n) => n.subject).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [notes]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, courseFilter, subjectFilter]);

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchSearch =
        !search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.subject?.toLowerCase().includes(search.toLowerCase()) ||
        n.course?.toLowerCase().includes(search.toLowerCase()) ||
        n.description?.toLowerCase().includes(search.toLowerCase());

      const matchCourse = courseFilter === "all" || n.course === courseFilter;
      const matchSubject = subjectFilter === "all" || n.subject === subjectFilter;

      return matchSearch && matchCourse && matchSubject;
    });
  }, [notes, search, courseFilter, subjectFilter]);

  const pageSize = 12;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-custom">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search notes by title, subject or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
              id="notes-search"
            />
          </div>

          {/* Course filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            id="notes-course-filter"
            aria-label="Filter by course"
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Courses" : c}
              </option>
            ))}
          </select>

          {/* Subject filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            id="notes-subject-filter"
            aria-label="Filter by subject"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Subjects" : s}
              </option>
            ))}
          </select>
        </div>

        {/* Free access notice */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-8 border border-[var(--border)]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        >
          <FileText size={18} style={{ color: "var(--brand-secondary)" }} />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <strong>First {FREE_COUNT} notes are completely free</strong> for all visitors.
            {!isLoggedIn && " Sign in to save notes and access your downloads history."}
          </p>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Showing {filtered.length} of {notes.length} notes
        </p>

        {/* Grid */}
        {paginated.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((note, i) => {
                const indexInFilteredList = (page - 1) * pageSize + i;
                return (
                  <NoteCard
                    key={note.id}
                    note={note}
                    index={indexInFilteredList}
                    isLoggedIn={isLoggedIn}
                    isPurchased={purchasedIds.includes(note.id)}
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-[var(--border)]">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 font-semibold text-sm transition-colors text-[var(--text-primary)] cursor-pointer disabled:cursor-not-allowed"
                  style={{ borderColor: "var(--border)" }}
                >
                  Previous
                </button>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 font-semibold text-sm transition-colors text-[var(--text-primary)] cursor-pointer disabled:cursor-not-allowed"
                  style={{ borderColor: "var(--border)" }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Filter size={32} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <p className="text-[var(--text-muted)]">No notes match your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
