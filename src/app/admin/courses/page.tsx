import { adminGetAllCourses } from "@/actions/admin";
import { getCategories } from "@/actions/courses";
import { AdminCoursesClient } from "@/components/admin/AdminCoursesClient";


export default async function AdminCoursesPage() {
  const [courses, categories] = await Promise.all([
    adminGetAllCourses ? adminGetAllCourses() : Promise.resolve([]),
    getCategories ? getCategories() : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Courses
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Add, update, or remove coaching classes and curriculum modules.</p>
      </div>

      <AdminCoursesClient initialCourses={courses} categories={categories} />
    </div>
  );
}
