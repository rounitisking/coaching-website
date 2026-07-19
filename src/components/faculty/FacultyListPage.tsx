import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ChevronRight, Award } from "lucide-react";
import type { Metadata } from "next";
import { faculty as staticFaculty } from "@/data/faculty";

interface FacultyListPageProps {
  category: "COMMERCE" | "SCIENCE" | "SCHOOL";
  title: string;
  description: string;
  eyebrow: string;
}

function getStaticFacultyByCategory(category: "COMMERCE" | "SCIENCE" | "SCHOOL") {
  if (category === "COMMERCE") {
    return staticFaculty.filter(f => ["rajesh-kumar", "priya-sharma", "amit-verma", "sneha-gupta"].includes(f.slug));
  }
  if (category === "SCIENCE") {
    return staticFaculty.filter(f => ["vikram-singh"].includes(f.slug));
  }
  if (category === "SCHOOL") {
    return staticFaculty.filter(f => ["vikram-singh", "anita-mehta", "rajesh-kumar", "amit-verma", "sneha-gupta"].includes(f.slug));
  }
  return [];
}

export async function FacultyListPage({ category, title, description, eyebrow }: FacultyListPageProps) {
  const dbFaculty = await db.faculty.findMany({
    where: { isActive: true, category },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  }).catch(() => []);

  const displayFaculty = dbFaculty.length > 0
    ? dbFaculty.map(f => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        photo: f.photo || null,
        bio: f.bio || "",
        experience: f.experience,
        featured: f.featured,
        subjects: f.subjects,
        qualification: f.qualification
      }))
    : getStaticFacultyByCategory(category).map(f => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        photo: f.photo || null,
        bio: f.bio || "",
        experience: parseInt(f.experience) || 10,
        featured: f.featured || false,
        subjects: f.subjects,
        qualification: f.qualification
      }));

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-8">{description}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/faculty" className="btn-accent btn-lg font-bold">All Faculty</Link>
            <Link href="/apply-for-job" className="btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "0.75rem" }}>
              Apply For Job
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          {displayFaculty.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-muted)] text-lg">No faculty members listed yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayFaculty.map((f) => (
                <Link
                  key={f.id}
                  href={`/faculty/${f.slug}`}
                  className="group card p-6 text-center no-underline hover:border-[var(--brand-secondary)] transition-all duration-300"
                >
                  {/* Photo */}
                  <div
                    className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {f.photo ? (
                      <Image src={f.photo} alt={f.name} width={96} height={96} className="object-cover w-full h-full" />
                    ) : (
                      f.name.charAt(0)
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold mb-0.5 group-hover:text-[var(--brand-secondary)] transition-colors" style={{ color: "var(--text-primary)" }}>
                    {f.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "var(--brand-secondary)" }}>{f.designation}</p>

                  {/* Qualification */}
                  {f.qualification && (
                    <p className="text-xs mb-3 font-medium" style={{ color: "var(--text-muted)" }}>{f.qualification}</p>
                  )}

                  {/* Experience */}
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                    {f.experience}+ years experience
                  </p>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                    {(f.subjects as string[]).slice(0, 3).map((s) => (
                      <span key={s} className="badge badge-muted text-xs">{s}</span>
                    ))}
                  </div>

                  {/* Featured badge */}
                  {f.featured && (
                    <div className="flex items-center justify-center gap-1 text-xs font-semibold" style={{ color: "var(--brand-secondary)" }}>
                      <Award size={12} /> Top Faculty
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1 text-xs font-semibold mt-3" style={{ color: "var(--brand-secondary)" }}>
                    View Profile <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
