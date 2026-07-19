import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound, redirect } from "next/navigation";
import { Clock, ArrowLeft, Lock, CheckCircle, Globe, Award, Star, Users } from "lucide-react";
import { courses as staticCourses, getCourseBySlug as getStaticCourseBySlug } from "@/data/courses";
import { faculty as allFaculty } from "@/data/faculty";
import { institute } from "@/data/institute";
import type { Metadata } from "next";
import { getCourseBySlug } from "@/actions/courses";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CourseTabs } from "@/components/courses/CourseTabs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "class-9-tuition") {
    redirect("/courses/class-9");
  }
  if (slug === "class-10-tuition") {
    redirect("/courses/class-10");
  }
  let course: any = null;
  try { course = await getCourseBySlug(slug); } catch {}
  if (!course) course = getStaticCourseBySlug(slug);
  if (!course) return {};
  const ogImage = course.thumbnail || course.image;
  return {
    title: `${course.title} | ${institute.name}`,
    description: course.description?.slice(0, 160) || "",
    openGraph: {
      title: `${course.title} | ${institute.name}`,
      description: course.description || "",
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "class-9-tuition") {
    redirect("/courses/class-9");
  }
  if (slug === "class-10-tuition") {
    redirect("/courses/class-10");
  }
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
        overview: course.overview,
        eligibility: course.eligibility,
        mentorship: course.mentorship,
        price: course.price,
        mrp: course.mrp,
        thumbnail: course.thumbnail,
        duration: course.duration || "Self-Paced",
        level: course.level || "All Levels",
        language: course.language || "Hindi / English",
        categoryName: course.category?.name || "Commerce",
        faculty: course.faculty || null,
        modules: course.modules || [],
        faculties: course.faculties || [],
      }
    : {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        overview: course.description,
        eligibility: course.eligibility,
        mentorship: null,
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
        faculties: [],
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

  // Combine primary faculty and multi-faculty list for CourseTabs
  const facultiesMap = new Map<string, any>();
  if (displayCourse.faculty) {
    facultiesMap.set(displayCourse.faculty.id, {
      id: displayCourse.faculty.id,
      name: displayCourse.faculty.name,
      slug: displayCourse.faculty.slug,
      designation: displayCourse.faculty.designation,
      photo: displayCourse.faculty.photo || null,
      experience: displayCourse.faculty.experience || 0,
    });
  }
  if (displayCourse.faculties) {
    displayCourse.faculties.forEach((join: any) => {
      if (join.faculty) {
        facultiesMap.set(join.faculty.id, {
          id: join.faculty.id,
          name: join.faculty.name,
          slug: join.faculty.slug,
          designation: join.faculty.designation,
          photo: join.faculty.photo || null,
          experience: join.faculty.experience || 0,
        });
      }
    });
  }
  const facultiesList = Array.from(facultiesMap.values());

  // Fetch FAQs
  const faqs = await db.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  }).catch(() => []);

  // Filter FAQs matching this category name (case-insensitive) or general FAQs
  const filteredFaqs = faqs.filter(
    (faq) =>
      !faq.category ||
      faq.category.toLowerCase() === displayCourse.categoryName.toLowerCase()
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/courses`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": displayCourse.title,
        "item": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/courses/${displayCourse.slug}`
      }
    ]
  };

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen text-left">
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
          {/* Styled Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-4 uppercase tracking-wider font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white/80">{displayCourse.categoryName}</span>
            <span>/</span>
            <span className="text-[var(--brand-secondary)] font-bold">{displayCourse.title}</span>
          </nav>

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
          <div className="lg:col-span-2">
            <CourseTabs
              overview={displayCourse.overview}
              content={displayCourse.description}
              eligibility={displayCourse.eligibility}
              mentorship={displayCourse.mentorship}
              highlights={highlights}
              modules={displayCourse.modules}
              faculties={facultiesList}
              faqs={filteredFaqs.length > 0 ? filteredFaqs : faqs.slice(0, 5)}
            />
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
