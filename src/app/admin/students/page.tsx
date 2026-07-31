import { adminGetAllStudents } from "@/actions/admin";
import { AdminStudentsClient } from "@/components/admin/AdminStudentsClient";

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || "1");
  let data = { students: [] as any[], total: 0, totalPages: 1 };

  try {
    data = await adminGetAllStudents(page, 20);
  } catch (error) {
    console.error("Admin students fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Registered Students
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Suspend access, edit profiles, and view statistics for registered learners.</p>
      </div>

      <AdminStudentsClient initialData={data} page={page} />
    </div>
  );
}
