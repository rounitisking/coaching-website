import { faculty as staticFaculty } from "@/data/faculty";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import { institute } from "@/data/institute";
import { db } from "@/lib/db";
import FacultyClient from "@/components/faculty/FacultyClient";

export const metadata: Metadata = {
  title: "Our Faculty | Academica Institute",
  description: `Meet the expert faculty at ${institute.name}. Qualified Chartered Accountants and Company Secretaries with years of teaching experience.`,
};

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  let dbFaculty: any[] = [];
  try {
    dbFaculty = await db.faculty.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch faculty from database:", error);
  }

  const hasDbFaculty = dbFaculty && dbFaculty.length > 0;

  const displayFaculty = hasDbFaculty
    ? dbFaculty.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        subjects: f.subjects,
        qualification: f.designation,
        experience: `${f.experience}+ Years`,
        bio: f.bio || "Expert educator committed to student growth.",
        photo: f.photo || null,
      }))
    : staticFaculty.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        subjects: f.subjects,
        qualification: f.qualification,
        experience: f.experience,
        bio: f.bio,
        photo: f.photo,
      }));

  return (
    <div className="section bg-[var(--bg-primary)] py-12 text-left">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Educators"
          title="Meet Our"
          titleHighlight="Expert Faculty"
          subtitle="Every faculty member at Academica Institute is a qualified professional with a passion for teaching and a proven track record of student success."
          className="mb-12"
        />

        <FacultyClient faculty={displayFaculty} />
      </div>
    </div>
  );
}
