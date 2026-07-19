import { FacultyListPage } from "@/components/faculty/FacultyListPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Science Faculty — Academica Institute",
  description: "Meet our expert Science faculty teaching IIT JEE, NEET, Physics, Chemistry, Mathematics and Biology.",
};

export default function ScienceFacultyPage() {
  return (
    <FacultyListPage
      category="SCIENCE"
      title="Science Faculty"
      eyebrow="Expert Educators"
      description="Our Science faculty are experienced IIT and NEET coaches dedicated to helping students crack competitive engineering and medical entrance exams."
    />
  );
}
