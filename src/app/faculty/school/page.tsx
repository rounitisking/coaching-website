import { FacultyListPage } from "@/components/faculty/FacultyListPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Coaching Faculty — Academica Institute",
  description: "Meet our school coaching faculty for Class 9, 10, 11 and 12 students — expert teachers for CBSE Commerce and Science subjects.",
};

export default function SchoolFacultyPage() {
  return (
    <FacultyListPage
      category="SCHOOL"
      title="School Coaching Faculty"
      eyebrow="Expert Educators"
      description="Our dedicated school faculty help Class 9-12 students build strong foundations and score top marks in CBSE board examinations."
    />
  );
}
