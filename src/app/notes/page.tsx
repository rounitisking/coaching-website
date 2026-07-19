import Link from "next/link";
import { FileText, Lock, Download, Search } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NotesClient } from "@/components/notes/NotesClient";

export const metadata = {
  title: "Notes & Study Material — Academica Institute",
  description: "Download free and premium study notes for CA Foundation, CA Intermediate, CS, CMA, Class 11-12 Commerce and Science from Academica Institute.",
};

export default async function NotesPage() {
  const [notes, session] = await Promise.all([
    db.resource.findMany({
      where: { isActive: true },
      include: { category: { select: { name: true, type: true } } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }).catch(() => []),
    auth(),
  ]);

  const isLoggedIn = !!session?.user;

  const purchases = session?.user?.id
    ? await db.resourcePurchase.findMany({
        where: { userId: session.user.id },
        select: { resourceId: true },
      }).catch(() => [])
    : [];
  const purchasedIds = purchases.map((p) => p.resourceId);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            Study Material
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Notes &amp; Resources
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-6">
            Access free and premium study notes for CA, CS, CMA, CUET and School Coaching subjects.
            First 3 notes are free for everyone.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white">
              <FileText size={14} /> Free notes available
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white">
              <Download size={14} /> Instant download
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white">
              <Lock size={14} /> PDF format
            </div>
          </div>
        </div>
      </section>

      {/* Notes listing — client component handles filter + search */}
      <NotesClient notes={notes} isLoggedIn={isLoggedIn} purchasedIds={purchasedIds} />

      {/* Not logged in CTA */}
      {!isLoggedIn && (
        <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
          <div className="container-custom text-center">
            <Lock size={32} className="mx-auto mb-4" style={{ color: "var(--brand-secondary)" }} />
            <h2 className="section-title mb-3">Login to Access Premium Notes</h2>
            <p className="section-subtitle mx-auto mb-6">
              Create a free account to save notes to your wishlist and get notified when new material is added.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/auth" className="btn-primary btn-lg font-bold">Sign In / Register</Link>
              <Link href="/courses" className="btn-secondary btn-lg">Browse Courses</Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
