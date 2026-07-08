import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { courses, getCourseBySlug } from "@/data/courses";
import { faculty as allFaculty } from "@/data/faculty";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { institute } from "@/data/institute";
import type { Metadata } from "next";

// Next.js 15: params is a Promise
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description.slice(0, 160),
    openGraph: {
      title: `${course.title} | ${institute.name}`,
      description: course.tagline,
      images: [{ url: course.image }],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const courseFaculty = allFaculty.filter((f) => course.facultyIds.includes(f.id));
  const relatedCourses = courses.filter((c) => course.relatedCourseIds.includes(c.id));

  return (
    <article>
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(15,23,42,0.9) 40%, rgba(15,23,42,0.4))" }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={14} />
              All Courses
            </Link>
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-2"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {course.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">{course.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">About This Program</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{course.description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Course Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 card p-4">
                    <CheckCircle size={18} className="text-[var(--success-500)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--text-secondary)]">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Syllabus Overview</h2>
              <div className="space-y-4">
                {course.syllabus.map((section) => (
                  <div key={section.title} className="card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen size={18} className="text-[var(--brand-500)]" />
                      <h3 className="font-bold text-[var(--text-primary)]">{section.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {section.topics.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Faculty */}
            {courseFaculty.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Your Faculty</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseFaculty.map((f) => (
                    <Link key={f.id} href={`/faculty/${f.slug}`} className="card p-5 flex items-center gap-4 group">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--brand-300)]">
                        <Image src={f.photo} alt={f.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-600)] transition-colors">
                          {f.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{f.designation}</p>
                        <p className="text-xs text-[var(--brand-600)] font-medium mt-0.5">{f.experience} exp.</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {course.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">FAQs</h2>
                <div className="space-y-3">
                  {course.faqs.map((faq, i) => (
                    <div key={i} className="card p-5">
                      <p className="font-semibold text-[var(--text-primary)] mb-2">{faq.question}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Enrollment Card */}
            <div className="card p-6 sticky top-24">
              <div className="mb-5">
                <span className="text-xs text-[var(--text-muted)]">Fee Starting From</span>
                <p
                  className="text-3xl font-black gradient-text mt-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {course.fee}
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Clock size={15} className="text-[var(--brand-500)]" />
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">Duration:</span> {course.duration}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <Users size={15} className="text-[var(--brand-500)] mt-0.5" />
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">Eligibility:</span>{" "}
                    {course.eligibility}
                  </div>
                </div>
              </div>

              {/* Batch Timings */}
              <div className="mb-5">
                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Batch Timings
                </p>
                <ul className="space-y-1.5">
                  {course.batchTimings.map((b) => (
                    <li key={b} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppUrl(course.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center mb-3"
              >
                <MessageCircle size={18} />
                Enroll on WhatsApp
              </a>

              <Link href="/contact" className="btn-secondary w-full justify-center">
                Visit Our Center
              </Link>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Related Courses</h3>
                <div className="space-y-3">
                  {relatedCourses.map((rc) => (
                    <Link
                      key={rc.id}
                      href={`/courses/${rc.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={rc.image} alt={rc.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-600)] transition-colors line-clamp-1">
                          {rc.title}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{rc.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
