import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ArrowLeft, Download, Lock, FileText, Eye } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await db.resource.findUnique({
    where: { id, isActive: true },
    select: { title: true, description: true },
  }).catch(() => null);
  if (!note) return { title: "Note Not Found" };
  return {
    title: `${note.title} — Notes | Academica Institute`,
    description: note.description ?? undefined,
  };
}

export default async function NoteDetailPage({ params }: Props) {
  const { id } = await params;

  const [note, session, allNotes] = await Promise.all([
    db.resource.findUnique({
      where: { id, isActive: true },
      include: { category: { select: { name: true } } },
    }).catch(() => null),
    auth(),
    db.resource.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: { id: true },
    }).catch(() => []),
  ]);

  if (!note) notFound();

  const isLoggedIn = !!session?.user;

  // Determine if this note is free (first 3 by order or isFree flag)
  const noteIndex = allNotes.findIndex((n) => n.id === id);
  const isFree = note.isFree || noteIndex < 3;
  const canDownload = isFree; // Paid download requires purchase (not implemented yet)

  const discount =
    note.mrp && note.price && note.mrp > note.price
      ? Math.round(((note.mrp - note.price) / note.mrp) * 100)
      : 0;

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-6 transition-colors font-semibold"
          >
            <ArrowLeft size={14} /> Back to Notes
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Note icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <FileText size={36} className="text-white" />
            </div>

            <div className="flex-1">
              {isFree ? (
                <span className="badge badge-accent text-xs mb-3 inline-block">FREE</span>
              ) : (
                <span className="badge badge-brand text-xs mb-3 inline-block">PAID</span>
              )}

              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {note.title}
              </h1>

              {note.description && (
                <p className="text-blue-100 text-base max-w-2xl leading-relaxed mb-4">
                  {note.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {note.subject && (
                  <span className="badge badge-muted text-xs">{note.subject}</span>
                )}
                {note.course && (
                  <span className="badge badge-muted text-xs">{note.course}</span>
                )}
                {note.category && (
                  <span className="badge badge-muted text-xs">{note.category.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Preview Panel */}
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Preview
              </h2>

              {note.previewUrl ? (
                <div
                  className="card overflow-hidden"
                  style={{ height: "600px" }}
                >
                  {isFree || isLoggedIn ? (
                    <iframe
                      src={`${note.previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full border-0"
                      title={`Preview: ${note.title}`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[var(--bg-muted)]">
                      <Lock size={40} style={{ color: "var(--text-muted)" }} />
                      <div className="text-center">
                        <p className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                          Login to Preview
                        </p>
                        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                          Sign in to preview the first few pages of this note.
                        </p>
                        <Link href="/auth" className="btn-primary">
                          Sign In
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="card p-10 flex flex-col items-center justify-center text-center"
                  style={{ minHeight: "300px", background: "var(--bg-muted)" }}
                >
                  <Eye size={40} className="mb-4" style={{ color: "var(--text-muted)" }} />
                  <p className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    Preview Not Available
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    No preview available for this note. Download the full PDF to read it.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Download Card */}
              <div className="card p-6 space-y-4">
                <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                  Get This Note
                </h3>

                {/* Price */}
                {!isFree && (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-black"
                        style={{ color: "var(--brand-secondary)" }}
                      >
                        ₹{note.price?.toLocaleString("en-IN")}
                      </span>
                      {note.mrp && note.mrp > (note.price ?? 0) && (
                        <span className="text-sm line-through" style={{ color: "var(--text-muted)" }}>
                          ₹{note.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        {discount}% off
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                {isFree && note.fileUrl ? (
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="btn-primary w-full justify-center font-bold flex items-center gap-2"
                    id="note-download-btn"
                  >
                    <Download size={16} /> Download Free PDF
                  </a>
                ) : isFree && !note.fileUrl ? (
                  <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
                    Download link coming soon.
                  </p>
                ) : !isLoggedIn ? (
                  <Link
                    href="/auth"
                    className="btn-primary w-full justify-center font-bold flex items-center gap-2"
                  >
                    <Lock size={16} /> Login to Purchase
                  </Link>
                ) : (
                  <button
                    className="btn-secondary w-full justify-center font-bold flex items-center gap-2 opacity-60 cursor-not-allowed"
                    disabled
                    id="note-coming-soon-btn"
                  >
                    Purchase Coming Soon
                  </button>
                )}

                <Link
                  href="/contact"
                  className="btn-secondary w-full justify-center text-sm"
                >
                  Contact for Bulk Orders
                </Link>
              </div>

              {/* Details */}
              <div className="card p-5">
                <h3 className="font-bold mb-4 text-sm" style={{ color: "var(--text-primary)" }}>
                  Note Details
                </h3>
                <div className="space-y-2.5">
                  {note.subject && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "var(--text-muted)" }}>Subject</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{note.subject}</span>
                    </div>
                  )}
                  {note.course && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "var(--text-muted)" }}>Course</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{note.course}</span>
                    </div>
                  )}
                  {note.category && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "var(--text-muted)" }}>Category</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{note.category.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--text-muted)" }}>Access</span>
                    <span className="font-semibold" style={{ color: isFree ? "#059669" : "var(--brand-secondary)" }}>
                      {isFree ? "Free" : "Paid"}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
