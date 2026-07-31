import { adminGetAllFaculty, adminGetAllCourses } from "@/actions/admin";
import { AdminFacultyClient } from "@/components/admin/AdminFacultyClient";

export default async function AdminFacultyPage() {
  let faculty: any[] = [];
  let courses: any[] = [];
  try {
    const res = await Promise.all([
      adminGetAllFaculty(),
      adminGetAllCourses(),
    ]);
    faculty = res[0] as any[];
    courses = res[1] as any[];
  } catch (error) {
    console.error("Admin faculty fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Faculty
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Configure teacher profiles, subjects, experience, and bios.</p>
      </div>

      <AdminFacultyClient initialFaculty={faculty} courses={courses} />
    </div>
  );
}
