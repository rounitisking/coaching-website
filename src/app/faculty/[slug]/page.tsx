import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, MessageCircle, Star } from "lucide-react";
import { faculty, getFacultyBySlug } from "@/data/faculty";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { StarRating } from "@/components/ui/StarRating";
import { institute } from "@/data/institute";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return faculty.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const f = getFacultyBySlug(slug);
  if (!f) return {};
  return {
    title: f.name,
    description: f.bio.slice(0, 160),
    openGraph: {
      title: `${f.name} | ${institute.name}`,
      images: [{ url: f.photo }],
    },
  };
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const f = getFacultyBySlug(slug);
  if (!f) notFound();

  return (
    <article>
      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="container-custom py-12">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--brand-600)] text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            All Faculty
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-[var(--brand-300)] flex-shrink-0 shadow-xl">
              <Image
                src={f.photo}
                alt={f.name}
                fill
                className="object-cover"
                priority
                sizes="192px"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1
                className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-1"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {f.name}
              </h1>
              <p className="text-[var(--brand-600)] font-semibold mb-1">{f.designation}</p>
              <p className="text-sm text-[var(--text-muted)] mb-4">{f.qualification}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {f.subjects.map((s) => (
                  <span key={s} className="badge badge-brand">{s}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-5 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="text-yellow-500 fill-current" />
                  <span className="font-semibold">{f.experience} Experience</span>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl(`Hi, I would like to speak with ${f.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex"
              >
                <MessageCircle size={18} />
                Chat with {f.name.split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Bio */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">About</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{f.bio}</p>
            </section>

            {/* Teaching Style */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Teaching Style</h2>
              <div className="card p-6 border-l-4" style={{ borderColor: "var(--brand-500)" }}>
                <p className="text-[var(--text-secondary)] leading-relaxed italic">{f.teachingStyle}</p>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {f.achievements.map((a) => (
                  <div key={a} className="card p-4 flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      <Award size={14} className="text-white" />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            {f.awards.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Awards & Recognition</h2>
                <div className="space-y-2">
                  {f.awards.map((award) => (
                    <div key={award} className="flex items-center gap-3 card p-4">
                      <span className="text-yellow-500 text-lg">🏆</span>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{award}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Student Reviews */}
            {f.reviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Student Reviews</h2>
                <div className="space-y-4">
                  {f.reviews.map((review, i) => (
                    <div key={i} className="card p-5">
                      <StarRating rating={review.rating} className="mb-3" />
                      <p className="text-[var(--text-secondary)] italic mb-3">&quot;{review.comment}&quot;</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{review.name}</p>
                        <span className="tag text-xs">{review.course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--brand-300)] mx-auto mb-3">
                  <Image src={f.photo} alt={f.name} fill className="object-cover" sizes="80px" />
                </div>
                <p className="font-bold text-[var(--text-primary)]">{f.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{f.experience} of Teaching</p>
              </div>

              <a
                href={buildWhatsAppUrl(`Hi, I would like to speak with ${f.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center mb-3"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <Link href="/courses" className="btn-secondary w-full justify-center">
                View Courses
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
