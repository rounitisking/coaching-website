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
    { id: "vijay-sharma", name: "Vijay Sir" }
  ];

  const FALLBACK_COURSES = [
    { id: "1", title: "CA Foundation", slug: "ca-foundation", description: "Complete preparation for CA Foundation exams with conceptual clarity.", price: 12000, mrp: 18000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "6 months", level: "Beginner" },
    { id: "2", title: "CA Intermediate", slug: "ca-intermediate", description: "Master CA Intermediate with structured modules and mock tests.", price: 18000, mrp: 25000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "12 months", level: "Intermediate" },
    { id: "3", title: "CS (CSEET)", slug: "cs-foundation", description: "All-in-one prep package for Company Secretary Executive Entrance Test.", price: 10000, mrp: 15000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "4 months", level: "Beginner" },
    { id: "4", title: "CS Executive", slug: "cs-executive", description: "Step up your career with comprehensive CS Executive modules.", price: 22000, mrp: 30000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "10 months", level: "Intermediate" },
    { id: "5", title: "CMA Foundation", slug: "cma-foundation", description: "Learn fundamentals of costing and financial accounting.", price: 11000, mrp: 16000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "5 months", level: "Beginner" },
    { id: "6", title: "CMA Intermediate", slug: "cma-intermediate", description: "Prepare for CMA Intermediate with top faculty guidance.", price: 19000, mrp: 26000, thumbnail: null, category: { type: "COMMERCE", name: "Commerce" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "12 months", level: "Intermediate" },
    { id: "7", title: "Class 11 Commerce", slug: "class-11-commerce", description: "Concept-building for class 11 Commerce boards & final exams.", price: 15000, mrp: 20000, thumbnail: null, category: { type: "SCHOOL", name: "School Coaching" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "1 year", level: "School" },
    { id: "8", title: "Class 12 Commerce", slug: "class-12-commerce", description: "Excellence batch for Class 12 board exams preparation.", price: 16000, mrp: 22000, thumbnail: null, category: { type: "SCHOOL", name: "School Coaching" }, faculty: { id: "vijay-sharma", name: "Vijay Sir" }, duration: "1 year", level: "Boards" },
  ];

  // Original assignments commented out:
  // const displayCourses = courses.length ? courses : FALLBACK_COURSES;
  // const displayCategories = categories.length ? categories : FALLBACK_CATEGORIES;
  const displayCourses = (courses.length ? courses : FALLBACK_COURSES).filter(
    (c: any) => (c.category?.type ?? c.categoryType) !== "SCIENCE" && !c.slug?.includes("science")
  );
  const displayCategories = (categories.length ? categories : FALLBACK_CATEGORIES).filter(
    (c: any) => c.type !== "SCIENCE"
  );
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
