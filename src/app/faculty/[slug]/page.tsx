import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, MessageCircle, Star, Users, FileText, CheckCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { institute } from "@/data/institute";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getFacultyBySlug } from "@/data/faculty";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let f = await db.faculty.findUnique({ where: { slug } }).catch(() => null);
  if (!f) {
    const fallback = getFacultyBySlug(slug) || getFacultyBySlug(slug.replace("ca-", "").replace("cs-", "").replace("cma-", "").replace("dr-", "").replace("mr-", "").replace("mrs-", ""));
    if (fallback) {
      f = {
        name: fallback.name,
        bio: fallback.bio,
        photo: fallback.photo || null
      } as any;
    }
  }
  if (!f) return {};
  return {
    title: `${f.name} — Expert Faculty | Academica Institute`,
    description: f.bio?.slice(0, 160) || "",
    openGraph: {
      title: `${f.name} | ${institute.name}`,
      images: f.photo ? [{ url: f.photo }] : [],
    },
  };
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let f = await db.faculty.findUnique({
    where: { slug },
    include: {
      courses: {
        include: {
          course: {
            select: { id: true, title: true, slug: true, duration: true }
          }
        }
      },
      coursesPrimary: {
        select: { id: true, title: true, slug: true, duration: true }
      }
    },
  }).catch(() => null);

  if (!f) {
    const fallback = getFacultyBySlug(slug) || getFacultyBySlug(slug.replace("ca-", "").replace("cs-", "").replace("cma-", "").replace("dr-", "").replace("mr-", "").replace("mrs-", ""));
    if (fallback) {
      f = {
        id: fallback.id,
        name: fallback.name,
        slug: fallback.slug,
        designation: fallback.designation,
        photo: fallback.photo || null,
        bio: fallback.bio || "Expert educator committed to student growth.",
        experience: parseInt(fallback.experience) || 10,
        featured: fallback.featured || false,
        qualification: fallback.qualification || "Highly Qualified Educator",
        achievements: fallback.achievements || [],
        specialization: fallback.subjects[0] || null,
        languages: ["Hindi", "English"],
        socialLinkedIn: null,
        socialYoutube: null,
        resumeUrl: null,
        category: "COMMERCE",
        courses: [],
        coursesPrimary: []
      } as any;
    }
  }

  if (!f) notFound();

  // Combine primary courses and multi-faculty courses
  const relatedCoursesMap = new Map<string, { id: string; title: string; slug: string; duration: string | null }>();
  f.coursesPrimary.forEach((c) => {
    relatedCoursesMap.set(c.id, c);
  });
  f.courses.forEach((join) => {
    if (join.course) {
      relatedCoursesMap.set(join.course.id, join.course);
    }
  });
  const relatedCourses = Array.from(relatedCoursesMap.values());

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen pb-12">
      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] py-8">
        <div className="container-custom">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--brand-secondary)] text-sm mb-6 transition-colors no-underline font-semibold"
          >
            <ArrowLeft size={14} /> Back to Faculty
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            {/* Photo */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-[var(--brand-secondary)]/20 bg-[var(--bg-muted)] flex items-center justify-center flex-shrink-0 shadow-lg">
              {f.photo ? (
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="192px"
                />
              ) : (
                <Users size={64} style={{ color: "var(--brand-secondary)", opacity: 0.3 }} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
                {f.name}
              </h1>
              <p className="text-sm font-bold text-[var(--brand-secondary)]">{f.designation}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {f.qualification && (
                  <span className="badge badge-brand text-xs font-bold">{f.qualification}</span>
                )}
                <span className="badge badge-accent text-xs font-bold">{f.experience}+ Years Experience</span>
                {f.specialization && (
                  <span className="badge badge-muted text-xs font-bold">{f.specialization}</span>
                )}
              </div>

              {/* Social and Resume Links */}
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-2">
                <a
                  href={buildWhatsAppUrl(`Hello, I would like to consult about batches taught by ${f.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-4 justify-center flex items-center gap-1.5"
                >
                  <MessageCircle size={14} /> Consult on WhatsApp
                </a>

                {f.socialLinkedIn && (
                  <a
                    href={f.socialLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-9 h-9 p-0 flex items-center justify-center"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="shrink-0" />
                  </a>
                )}

                {f.socialYoutube && (
                  <a
                    href={f.socialYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-9 h-9 p-0 flex items-center justify-center"
                    title="YouTube Channel"
                  >
                    <YoutubeIcon className="shrink-0" />
                  </a>
                )}

                {f.resumeUrl && (
                  <a
                    href={f.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                    title="Download Profile Resume"
                  >
                    <FileText size={14} /> Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <section className="card p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                About the Instructor
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {f.bio || `${f.name} is a highly qualified professional educator at Academica Institute specializing in ${f.subjects.join(", ")}.`}
              </p>
            </section>

            {/* Languages and Specialization */}
            <section className="card p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Teaching Preferences
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {f.languages.map((lang) => (
                      <span key={lang} className="badge badge-muted text-xs font-semibold">{lang}</span>
                    ))}
                  </div>
                </div>
                {f.specialization && (
                  <div>
                    <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Specialization</h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{f.specialization}</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {/* Subjects Taught */}
            <div className="card p-6">
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Subjects Taught</h3>
              <div className="flex flex-wrap gap-2">
                {f.subjects.map((sub: string) => (
                  <span key={sub} className="badge badge-muted text-xs font-semibold">{sub}</span>
                ))}
              </div>
            </div>

            {/* Courses sidebar list */}
            {relatedCourses.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Assigned Batches</h3>
                <div className="space-y-3">
                  {relatedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="block p-3 border border-[var(--border)] rounded-xl hover:bg-[var(--bg-muted)] transition-all no-underline"
                    >
                      <h4 className="font-semibold text-xs text-[var(--text-primary)] leading-tight">{course.title}</h4>
                      {course.duration && (
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">{course.duration}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements & Awards */}
            {f.achievements.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Key Achievements</h3>
                <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                  {f.achievements.map((ach: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <Award size={14} style={{ color: "var(--brand-secondary)" }} className="shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
