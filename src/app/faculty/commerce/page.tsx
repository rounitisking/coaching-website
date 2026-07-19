import { FacultyListPage } from "@/components/faculty/FacultyListPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerce Faculty — Academica Institute",
  description: "Meet our expert Commerce faculty — CAs, CSs and finance professionals teaching CA Foundation, CA Intermediate, CA Final, CS, CMA and more.",
};

export default function CommerceFacultyPage() {
  return (
    <FacultyListPage
      category="COMMERCE"
      title="Commerce Faculty"
      eyebrow="Expert Educators"
      description="Meet our experienced Commerce faculty — chartered accountants, company secretaries, and finance professionals dedicated to your success."
    />
  );
}
