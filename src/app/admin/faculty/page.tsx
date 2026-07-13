import { adminGetAllFaculty } from "@/actions/admin";
import { AdminFacultyClient } from "@/components/admin/AdminFacultyClient";

export default async function AdminFacultyPage() {
  let faculty: any[] = [];
  try {
    faculty = await adminGetAllFaculty();
  } catch (error) {
    console.error("Admin faculty fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Faculty
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure teacher profiles, subjects, experience, and bios.</p>
      </div>

      <AdminFacultyClient initialFaculty={faculty} />
    </div>
  );
}
