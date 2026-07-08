import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { faculty } from "@/data/faculty";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import { institute } from "@/data/institute";

export const metadata: Metadata = {
  title: "Our Faculty",
  description: `Meet the expert faculty at ${institute.name}. Qualified Chartered Accountants and Company Secretaries with years of teaching experience.`,
};

export default function FacultyPage() {
  return (
    <div className="section bg-[var(--bg-primary)]">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Educators"
          title="Meet Our"
          titleHighlight="Expert Faculty"
          subtitle="Every faculty member at Academica Institute is a qualified professional with a passion for teaching and a proven track record of student success."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <div key={f.id} className="card overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold">{f.name}</p>
                  <p className="text-white/70 text-xs">{f.designation}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-[var(--text-muted)] mb-2">{f.qualification}</p>
                <p className="text-sm font-semibold text-[var(--brand-600)] mb-3">{f.experience} Experience</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.subjects.slice(0, 3).map((s) => (
                    <span key={s} className="tag text-[10px]">{s}</span>
                  ))}
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-4 line-clamp-2">{f.bio}</p>

                <div className="flex gap-3">
                  <Link
                    href={`/faculty/${f.slug}`}
                    className="flex-1 btn-secondary text-sm py-2 justify-center"
                  >
                    Profile
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={buildWhatsAppUrl(`Hi, I would like to speak with ${f.name} for guidance.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-whatsapp text-sm py-2 justify-center"
                  >
                    <MessageCircle size={14} />
                    Chat
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
