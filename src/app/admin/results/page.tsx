import { adminGetAllResults } from "@/actions/admin";
import { getCategories } from "@/actions/courses";
import { AdminResultsClient } from "@/components/admin/AdminResultsClient";

export default async function AdminResultsPage() {
  let results: any[] = [];
  let categories: any[] = [];
  try {
    results = await adminGetAllResults();
    categories = await getCategories();
  } catch (error) {
    console.error("Admin results fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Selections
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure student selections, toppers, ranks, exams, and highlights.</p>
      </div>

      <AdminResultsClient initialResults={results} categories={categories} />
    </div>
  );
}
