import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Clock, Users, CheckCircle, BookOpen, ArrowLeft, Lock, Star, Award, Globe } from "lucide-react";
import { courses as staticCourses, getCourseBySlug as getStaticCourseBySlug } from "@/data/courses";
import { faculty as allFaculty } from "@/data/faculty";
import { institute } from "@/data/institute";
import type { Metadata } from "next";
import { getCourseBySlug } from "@/actions/courses";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  let course: any = null;
  try { course = await getCourseBySlug(slug); } catch {}
  if (!course) course = getStaticCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | ${institute.name}`,
    description: course.description?.slice(0, 160) || "",
    openGraph: {
      title: `${course.title} | ${institute.name}`,
      description: course.description || "",
      images: course.thumbnail ? [{ url: course.thumbnail }] : [],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const session = await auth();

  let course: any = null;
  let isDbCourse = false;
  let isEnrolled = false;

  try {
    course = await getCourseBySlug(slug);
    if (course) isDbCourse = true;
  } catch {}

  if (!course) course = getStaticCourseBySlug(slug);
  if (!course) notFound();

  // Check enrollment
  if (session?.user?.id && isDbCourse) {
    try {
      const enr = await db.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      });
      isEnrolled = !!enr?.isActive;
    } catch {}
  }

  const displayCourse = isDbCourse
    ? {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        price: course.price,
        mrp: course.mrp,
        thumbnail: course.thumbnail,
        duration: course.duration || "Self-Paced",
        level: course.level || "All Levels",
        language: course.language || "Hindi / English",
        categoryName: course.category?.name || "Commerce",
        faculty: course.faculty || null,
        modules: course.modules || [],
      }
    : {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        price: parseInt(course.fee?.replace(/[^0-9]/g, "") || "9999") || 9999,
        mrp: (parseInt(course.fee?.replace(/[^0-9]/g, "") || "9999") || 9999) + 4000,
        thumbnail: course.image,
        duration: course.duration,
        level: course.eligibility,
        language: "Hindi / English",
        categoryName: course.category,
        faculty: allFaculty.find((f: any) => course.facultyIds?.includes(f.id)) || null,
        modules: (course.syllabus || []).map((s: any, idx: number) => ({
          id: String(idx),
          title: s.title,
          lessons: (s.topics || []).map((t: string, lessonIdx: number) => ({
            id: `${idx}-${lessonIdx}`,
            title: t,
            duration: 45,
          })),
        })),
      };

  const discount = displayCourse.mrp > displayCourse.price
    ? Math.round(((displayCourse.mrp - displayCourse.price) / displayCourse.mrp) * 100)
    : 0;

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: displayCourse.title,
    description: displayCourse.description,
    provider: {
      "@type": "Organization",
      name: institute.name,
      url: "https://academica.in",
    },
    offers: {
      "@type": "Offer",
      price: displayCourse.price,
      priceCurrency: "INR",
    },
    ...(displayCourse.faculty ? { instructor: { "@type": "Person", name: displayCourse.faculty.name } } : {}),
  };

  const highlights = [
    "Structured syllabus aligned with ICAI/board curriculum",
    "Regular tests & mock papers with solutions",
    "Expert faculty with 10+ years of teaching experience",
    "Live doubt-solving sessions",
    "Study materials & notes included",
    "Small batch sizes for personalized attention",
  ];

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen text-left">
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden flex items-end"
        style={{
          minHeight: "340px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)",
        }}
      >
        {displayCourse.thumbnail && (
          <Image
            src={displayCourse.thumbnail}
            alt={displayCourse.title}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        <div className="container-custom relative z-10 pb-12 pt-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Courses
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-accent text-xs">{displayCourse.categoryName}</span>
            {displayCourse.level && (
              <span className="badge badge-muted text-xs">{displayCourse.level}</span>
            )}
          </div>
          <h1
            className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)", letterSpacing: "-0.02em" }}
          >
            {displayCourse.title}
          </h1>
          <p className="text-blue-200 text-base max-w-2xl leading-relaxed">{displayCourse.description?.slice(0, 200)}</p>
          {displayCourse.faculty && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                {displayCourse.faculty.name?.charAt(0)}
              </div>
              <span className="text-white/70 text-sm font-medium">
                By <strong className="text-white">{displayCourse.faculty.name}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ─── Left: Content Panels ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <section className="card p-7 bg-white dark:bg-slate-950">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                <BookOpen size={20} className="text-blue-500" /> About This Program
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{displayCourse.description}</p>

              <h3 className="font-bold text-[var(--text-primary)] mt-6 mb-3 text-sm">What You Will Learn</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </section>

            {/* Course Details */}
            <section className="card p-7 bg-white dark:bg-slate-950">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                Program Details
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: "Duration", value: displayCourse.duration },
                  { icon: Users, label: "Eligibility", value: displayCourse.level },
                  { icon: Globe, label: "Language", value: displayCourse.language },
                  { icon: Award, label: "Certification", value: "Institute Certificate" },
                  { icon: Star, label: "Batch Size", value: "25–30 Students" },
                  { icon: CheckCircle, label: "Study Material", value: "Included" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="card p-7 bg-white dark:bg-slate-950">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                Curriculum Syllabus
              </h2>
              {displayCourse.modules.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen size={36} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="text-sm text-slate-400">Detailed curriculum is being updated. Contact us for the complete syllabus.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayCourse.modules.map((mod: any, idx: number) => (
                    <details key={mod.id} className="group border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden" open={idx === 0}>
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-bold text-sm text-[var(--text-primary)] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <span className="flex items-center gap-2">
                          <BookOpen size={14} className="text-blue-500" />
                          {mod.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{mod.lessons?.length || 0} Topics</span>
                      </summary>
                      <div className="px-4 pb-4 space-y-1">
                        {(mod.lessons || []).map((les: any) => (
                          <div key={les.id} className="flex justify-between items-center text-xs text-[var(--text-secondary)] py-1.5 border-b last:border-0 border-slate-50 dark:border-slate-900">
                            <span className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-blue-400" />
                              {les.title}
                            </span>
                            {les.duration && <span className="text-slate-400 font-semibold">{les.duration} Min</span>}
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>

            {/* Faculty */}
            {displayCourse.faculty && (
              <section className="card p-7 bg-white dark:bg-slate-950">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                  Your Instructor
                </h2>
                <div className="flex items-start gap-5 p-5 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0" style={{ background: "var(--gradient-brand)" }}>
                    {displayCourse.faculty.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">{displayCourse.faculty.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{displayCourse.faculty.designation}</p>
                    {displayCourse.faculty.experience && (
                      <span className="inline-block mt-2 text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full font-bold">
                        {displayCourse.faculty.experience}+ Years Experience
                      </span>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ─── Right: Sticky Purchase Sidebar ─── */}
          <aside>
            <div className="card p-6 bg-white dark:bg-slate-950 sticky top-24 space-y-5">
              {/* Pricing */}
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-1">Course Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                    ₹{displayCourse.price.toLocaleString("en-IN")}
                  </span>
                  {displayCourse.mrp > displayCourse.price && (
                    <span className="text-sm line-through text-slate-400">
                      ₹{displayCourse.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-1 text-xs font-bold text-green-700 bg-green-50 dark:bg-green-950/30 dark:text-green-400 px-2.5 py-0.5 rounded-full">
                    {discount}% Off — Save ₹{(displayCourse.mrp - displayCourse.price).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2.5 border-y border-slate-100 dark:border-slate-900 py-4">
                {[
                  { label: "Duration", value: displayCourse.duration },
                  { label: "Language", value: displayCourse.language },
                  { label: "Level", value: displayCourse.level },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-semibold">{label}</span>
                    <span className="text-[var(--text-primary)] font-bold">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {isEnrolled ? (
                <Link
                  href={`/dashboard/courses/${displayCourse.slug}`}
                  className="btn-primary w-full justify-center font-bold py-3"
                >
                  <CheckCircle size={16} /> Go to My Course
                </Link>
              ) : session?.user ? (
                <Link
                  href={`/checkout?type=course&id=${displayCourse.id}`}
                  className="btn-primary w-full justify-center font-bold py-3"
                >
                  Enroll Now
                </Link>
              ) : (
                <Link
                  href={`/auth?callbackUrl=/courses/${displayCourse.slug}`}
                  className="btn-primary w-full justify-center font-bold py-3"
                >
                  <Lock size={16} /> Login to Enroll
                </Link>
              )}

              <Link
                href="/contact"
                className="btn-secondary w-full justify-center text-sm py-2.5"
              >
                Ask a Question
              </Link>

              <p className="text-[10px] text-center text-[var(--text-muted)]">
                🔒 Secure checkout · 100% encrypted
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
