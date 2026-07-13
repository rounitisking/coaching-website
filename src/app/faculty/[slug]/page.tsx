import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, MessageCircle, Star, Users } from "lucide-react";
import { faculty as staticFaculty, getFacultyBySlug as getStaticFacultyBySlug } from "@/data/faculty";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { StarRating } from "@/components/ui/StarRating";
import { institute } from "@/data/institute";
import type { Metadata } from "next";
import { db } from "@/lib/db";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  let f: any = null;
  try {
    f = await db.faculty.findUnique({ where: { slug } });
  } catch {}
  if (!f) {
    f = getStaticFacultyBySlug(slug);
  }
  if (!f) return {};
  return {
    title: f.name,
    description: f.bio?.slice(0, 160) || "",
    openGraph: {
      title: `${f.name} | ${institute.name}`,
      images: f.photo ? [{ url: f.photo }] : [],
    },
  };
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const { slug } = params;
  let f: any = null;
  let isDbFaculty = false;

  try {
    f = await db.faculty.findUnique({
      where: { slug },
      include: { courses: true },
    });
    if (f) isDbFaculty = true;
  } catch (err) {
    console.error("Failed to fetch faculty details from database:", err);
  }

  // Fallback to static mock faculty
  if (!f) {
    f = getStaticFacultyBySlug(slug);
  }

  if (!f) notFound();

  // Map to unified display shape
  const displayFaculty = isDbFaculty
    ? {
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        subjects: f.subjects,
        qualification: f.designation, // Use designation as fallback qualification
        experience: `${f.experience}+ Years`,
        bio: f.bio || "Qualified professional educator dedicated to excellence.",
        photo: f.photo || null,
        achievements: ["Successfully guided multiple batches of commerce students"],
        teachingStyle: "Interactive, conceptual clarity with real-life case studies",
        awards: [],
        reviews: [] as any[],
        courses: f.courses || [],
      }
    : {
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        subjects: f.subjects,
        qualification: f.qualification,
        experience: f.experience,
        bio: f.bio,
        photo: f.photo,
        achievements: f.achievements,
        teachingStyle: f.teachingStyle,
        awards: f.awards,
        reviews: f.reviews,
        courses: [] as any[],
      };

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen pb-12">
      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] py-8">
        <div className="container-custom">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--brand-600)] text-sm mb-6 transition-colors no-underline"
          >
            <ArrowLeft size={14} /> Back to Faculty
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            {/* Photo */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-blue-500/20 bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg">
              {displayFaculty.photo ? (
                <Image
                  src={displayFaculty.photo}
                  alt={displayFaculty.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="192px"
                />
              ) : (
                <Users size={64} className="text-blue-500 opacity-30" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
                {displayFaculty.name}
              </h1>
              <p className="text-sm font-semibold text-[var(--brand-600)]">{displayFaculty.designation}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="badge badge-brand text-xs font-bold">{displayFaculty.qualification}</span>
                <span className="badge badge-accent text-xs font-bold">{displayFaculty.experience} Experience</span>
              </div>

              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl(`Hello, I would like to query about batches taught by ${displayFaculty.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs py-2.5 px-4 justify-center"
                >
                  <MessageCircle size={14} /> Consult on WhatsApp
                </a>
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
            <section className="card p-6 bg-white dark:bg-slate-950">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Professional Bio</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{displayFaculty.bio}</p>
            </section>

            {/* Teaching style */}
            <section className="card p-6 bg-white dark:bg-slate-950">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Teaching Philosophy</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{displayFaculty.teachingStyle}</p>
            </section>

            {/* Reviews */}
            {displayFaculty.reviews && displayFaculty.reviews.length > 0 && (
              <section className="card p-6 bg-white dark:bg-slate-950">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Student Reviews</h2>
                <div className="space-y-4">
                  {displayFaculty.reviews.map((rev: any, idx: number) => (
                    <div key={idx} className="border-b last:border-0 border-slate-100 dark:border-slate-900 pb-4 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-sm text-[var(--text-primary)]">{rev.name}</h4>
                        <StarRating rating={rev.rating} />
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Course: {rev.course}</p>
                      <p className="text-xs text-[var(--text-secondary)] italic">&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {/* Subjects Taught */}
            <div className="card p-6 bg-white dark:bg-slate-950">
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Subjects Specialization</h3>
              <div className="flex flex-wrap gap-2">
                {displayFaculty.subjects.map((sub: string) => (
                  <span key={sub} className="badge badge-muted text-xs font-semibold">{sub}</span>
                ))}
              </div>
            </div>

            {/* Courses sidebar list */}
            {displayFaculty.courses && displayFaculty.courses.length > 0 && (
              <div className="card p-6 bg-white dark:bg-slate-950">
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Assigned Programs</h3>
                <div className="space-y-3">
                  {displayFaculty.courses.map((course: any) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="block p-3 border border-slate-100 dark:border-slate-900 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all no-underline"
                    >
                      <h4 className="font-semibold text-xs text-[var(--text-primary)]">{course.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{course.duration}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements & Awards */}
            {displayFaculty.achievements && displayFaculty.achievements.length > 0 && (
              <div className="card p-6 bg-white dark:bg-slate-950">
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-4">Key Achievements</h3>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {displayFaculty.achievements.map((ach: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <Award size={14} className="text-blue-500 shrink-0 mt-0.5" />
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
