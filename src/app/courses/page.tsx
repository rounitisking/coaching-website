import { db } from "@/lib/db";
import { getCategories } from "@/actions/courses";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import { institute } from "@/data/institute";
import CoursesClient from "@/components/courses/CoursesClient";

export const metadata: Metadata = {
  title: "All Courses | Academica Institute",
  description: `Explore all CA Foundation, CS, CMA, CUET, and School Board Commerce/Science courses at ${institute.name}. Expert faculty, proven results.`,
};

export const dynamic = "force-dynamic";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  let courses: any[] = [];
  let categories: any[] = [];
  let faculty: any[] = [];

  try {
    courses = await db.course.findMany({
      where: { isActive: true, isPublished: true },
      include: { category: true, faculty: true },
      orderBy: { order: "asc" },
    });
    categories = await db.category.findMany({ where: { isActive: true } });
    faculty = await db.faculty.findMany({ where: { isActive: true } });
  } catch (err) {
    console.error("Failed to fetch courses data:", err);
  }

  // Fallbacks if database is empty
  const FALLBACK_CATEGORIES = [
    { id: "c_comm", name: "Commerce", type: "COMMERCE" },
    { id: "c_sci", name: "Science", type: "SCIENCE" },
    { id: "c_sch", name: "School Coaching", type: "SCHOOL" },
  ];

  const FALLBACK_FACULTY = [
    { id: "f1", name: "CA Rajesh Kumar" },
    { id: "f2", name: "Prof. Priya Sharma" },
    { id: "f3", name: "CA Amit Verma" },
  ];

  const FALLBACK_COURSES = [
    { id: "1", title: "CA Foundation", slug: "ca-foundation", description: "Complete preparation for CA Foundation exams with concept clarity.", price: 12000, mrp: 18000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "f1", name: "CA Rajesh Kumar" }, duration: "6 months", level: "Beginner" },
    { id: "2", title: "CA Intermediate", slug: "ca-intermediate", description: "Master CA Intermediate with structured modules and mock tests.", price: 18000, mrp: 25000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "f3", name: "CA Amit Verma" }, duration: "12 months", level: "Intermediate" },
    { id: "3", title: "IIT JEE Main & Advanced", slug: "iit-jee", description: "Cracking JEE Mains and Advanced with specialized math & physics coaches.", price: 45000, mrp: 60000, thumbnail: null, category: { type: "SCIENCE", name: "Science" }, faculty: { id: "f2", name: "Prof. Priya Sharma" }, duration: "2 years", level: "Advanced" },
    { id: "4", title: "Class 12 Commerce Boards", slug: "class-12-commerce", description: "Class 12 board preparation for Accountancy, Economics & Business Studies.", price: 15000, mrp: 20000, thumbnail: null, category: { type: "SCHOOL", name: "School Coaching" }, faculty: { id: "f1", name: "CA Rajesh Kumar" }, duration: "1 year", level: "Boards" },
  ];

  const displayCourses = courses.length ? courses : FALLBACK_COURSES;
  const displayCategories = categories.length ? categories : FALLBACK_CATEGORIES;
  const displayFaculty = faculty.length ? faculty : FALLBACK_FACULTY;

  return (
    <div className="section bg-[var(--bg-primary)] py-12 text-left">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Programs"
          title="All"
          titleHighlight="Courses"
          subtitle="Every course is designed by Chartered Accountants and subject matter experts to build strong concepts, improve academic performance, and help every student achieve their career goals."
          className="mb-12"
        />

        <CoursesClient
          initialCourses={displayCourses}
          categories={displayCategories}
          faculty={displayFaculty}
          initialCategory={searchParams.category}
          initialSearch={searchParams.q}
        />
      </div>
    </div>
  );
}
