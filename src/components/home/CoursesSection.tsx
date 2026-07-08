"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight, MessageCircle } from "lucide-react";
import { getFeaturedCourses } from "@/data/courses";
import { ScrollReveal, StaggerContainer, fadeUpVariant } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const categoryColors: Record<string, string> = {
  commerce: "var(--gradient-brand)",
  academic: "linear-gradient(135deg, #10b981, #059669)",
  subject: "linear-gradient(135deg, #f97316, #ea580c)",
};

export function CoursesSection() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section className="section bg-[var(--bg-secondary)]" id="courses">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Programs"
            title="Courses Designed for"
            titleHighlight="Excellence"
            subtitle="Each program is crafted by experienced Chartered Accountants, Company Secretaries, and economics faculty to build concepts and exam success."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={fadeUpVariant}
              className="card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                  style={{ background: categoryColors[course.category] || categoryColors.commerce }}
                >
                  {course.category}
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs">
                  <Clock size={12} />
                  {course.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-600)] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">
                  {course.tagline}
                </p>

                {/* Eligibility */}
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-4">
                  <Users size={13} />
                  {course.eligibility}
                </div>

                {/* Highlights */}
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

                {/* Fee */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs text-[var(--text-muted)]">Course Fee</span>
                    <p className="font-black text-lg gradient-text" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {course.fee}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
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
            </motion.div>
          ))}
        </StaggerContainer>

        {/* View All */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/courses" className="btn-primary inline-flex">
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
