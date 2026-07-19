"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  subjects: string[];
  photo?: string | null;
  experience: number;
}

interface FacultyMarqueeProps {
  faculty: FacultyMember[];
}

const FALLBACK_FACULTY: FacultyMember[] = [
  { id: "f1", name: "CA Rajesh Kumar", slug: "rajesh-kumar", designation: "CA Foundation Expert", subjects: ["Accounts", "Law"], photo: null, experience: 15 },
  { id: "f2", name: "Prof. Priya Sharma", slug: "priya-sharma", designation: "Economics Specialist", subjects: ["Economics", "Stats"], photo: null, experience: 12 },
  { id: "f3", name: "CA Amit Verma", slug: "amit-verma", designation: "Tax & Audit Faculty", subjects: ["Tax", "Audit"], photo: null, experience: 10 },
  { id: "f4", name: "Dr. Sunita Rao", slug: "sunita-rao", designation: "Science & Math Expert", subjects: ["Physics", "Math"], photo: null, experience: 14 },
  { id: "f5", name: "Prof. Vikram Singh", slug: "vikram-singh", designation: "Commerce & CUET Coach", subjects: ["BST", "Economics"], photo: null, experience: 11 },
  { id: "f6", name: "CA Meena Gupta", slug: "meena-gupta", designation: "CS & CMA Expert", subjects: ["Company Law", "Costing"], photo: null, experience: 9 },
];

const SUBJECT_COLORS: Record<string, string> = {
  Accounts: "#2563eb", Law: "#7c3aed", Economics: "#059669",
  Stats: "#d97706", Tax: "#dc2626", Audit: "#0891b2",
  Physics: "#7c3aed", Math: "#2563eb", BST: "#059669",
  "Company Law": "#7c3aed", Costing: "#d97706", default: "#6b7280"
};

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Link
      href={`/faculty/${member.slug}`}
      className="group flex-shrink-0 w-48 card p-4 flex flex-col items-center text-center hover:border-[var(--brand-secondary)] transition-all duration-300 no-underline"
      aria-label={`${member.name} — ${member.designation}`}
    >
      {/* Avatar / Photo */}
      <div
        className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-xl font-black text-white overflow-hidden flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300"
        style={{ background: "var(--gradient-brand)" }}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          member.name.charAt(0)
        )}
      </div>

      {/* Name */}
      <h3 className="text-sm font-bold mb-0.5 leading-snug" style={{ color: "var(--text-primary)" }}>
        {member.name}
      </h3>

      {/* Designation */}
      <p className="text-xs mb-2 leading-snug" style={{ color: "var(--brand-secondary)" }}>
        {member.designation}
      </p>

      {/* Experience */}
      <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
        {member.experience}+ yrs
      </p>

      {/* Subject pills */}
      <div className="flex flex-wrap gap-1 justify-center">
        {member.subjects.slice(0, 2).map((s) => (
          <span
            key={s}
            className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold text-white"
            style={{ background: SUBJECT_COLORS[s] ?? SUBJECT_COLORS.default }}
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function FacultyMarquee({ faculty }: FacultyMarqueeProps) {
  const display = faculty.length > 0 ? faculty : FALLBACK_FACULTY;
  // Duplicate for seamless infinite loop
  const track = [...display, ...display, ...display];

  return (
    <section className="section-padding overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow">Meet Our Team</p>
            <h2 className="section-title">Expert Faculty</h2>
          </div>
          <Link href="/faculty" className="btn-secondary btn-sm hidden sm:flex items-center gap-1">
            All Faculty <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      {/* Full-width marquee — outside container for edge-to-edge */}
      <div
        className="relative"
        style={{
          // CSS mask for smooth fade edges
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-label="Faculty showcase"
      >
        <div
          className="flex gap-4 py-3 faculty-marquee-track"
          style={{ width: "max-content" }}
        >
          {track.map((member, i) => (
            <FacultyCard key={`${member.id}-${i}`} member={member} />
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="text-center mt-8 sm:hidden container-custom">
        <Link href="/faculty" className="btn-secondary">View All Faculty</Link>
      </div>
    </section>
  );
}
