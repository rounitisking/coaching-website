import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users, MessageCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import { institute } from "@/data/institute";

export const metadata: Metadata = {
  title: "All Courses",
  description: `Explore all CA Foundation, CS, CMA, CUET, and School Board Commerce courses at ${institute.name}. Expert faculty, proven results.`,
};

const categoryColors: Record<string, string> = {
  commerce: "var(--gradient-brand)",
  academic: "linear-gradient(135deg, #10b981, #059669)",
  subject: "linear-gradient(135deg, #f97316, #ea580c)",
};

export default function CoursesPage() {
  return (
    <div className="section bg-[var(--bg-primary)]">
      <div className="container-custom">
        <SectionHeading
          eyebrow="All Programs"
          title="Our"
          titleHighlight="Courses"
          subtitle="Every course is designed by Chartered Accountants and commerce experts to build strong concepts, improve academic performance, and help every student achieve their career goals."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                  style={{ background: categoryColors[course.category] || categoryColors.commerce }}
                >
                  {course.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs">
                  <Clock size={12} />
                  {course.duration}
                </div>
              </div>

              <div className="p-6">
                <h2 className="font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-600)] transition-colors">
                  {course.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{course.tagline}</p>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-4">
                  <Users size={13} />
                  {course.eligibility}
                </div>

                <ul className="space-y-1.5 mb-5">
                  {course.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: "var(--gradient-brand)" }}>
                        <span className="text-white text-[9px]">✓</span>
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs text-[var(--text-muted)]">Course Fee</span>
                    <p className="font-black text-lg gradient-text" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {course.fee}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 btn-secondary text-sm py-2.5 px-4 justify-center"
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={buildWhatsAppUrl(course.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-whatsapp text-sm py-2.5 px-4 justify-center"
                  >
                    <MessageCircle size={14} />
                    Enroll
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
