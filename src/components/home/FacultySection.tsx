"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getFeaturedFaculty } from "@/data/faculty";
import { ScrollReveal, StaggerContainer, fadeUpVariant } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FacultySection() {
  const featuredFaculty = getFeaturedFaculty();

  return (
    <section className="section bg-[var(--bg-secondary)]" id="faculty">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Educators"
            title="Learn from the"
            titleHighlight="Best"
            subtitle="Our faculty members include qualified Chartered Accountants, Company Secretaries, and subject experts with a passion for commerce education."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12"
        >
          {featuredFaculty.map((f) => (
            <motion.div
              key={f.id}
              variants={fadeUpVariant}
              className="card overflow-hidden group text-center"
            >
              {/* Photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(99,102,241,0.85) 0%, transparent 100%)",
                  }}
                />

                {/* Hover overlay — chat button */}
                <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={buildWhatsAppUrl(`Hi, I would like to speak with ${f.name} for guidance.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle size={14} />
                    Chat
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-600)] transition-colors">
                  {f.name}
                </h3>
                <p className="text-xs text-[var(--brand-600)] font-semibold mb-1">
                  {f.designation}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  {f.experience} Experience
                </p>

                {/* Subjects */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {f.subjects.slice(0, 2).map((s: string) => (
                    <span key={s} className="tag text-[10px]">{s}</span>
                  ))}
                </div>

                <Link
                  href={`/faculty/${f.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)] transition-colors"
                >
                  View Profile
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/faculty" className="btn-secondary inline-flex">
              Meet All Faculty
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
