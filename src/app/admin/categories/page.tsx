import { getCategories } from "@/actions/courses";
import { AdminCategoriesClient } from "@/components/admin/AdminCategoriesClient";

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Admin categories fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Categories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure subjects, syllabus groupings (Commerce, Science, School) and sorting orders.</p>
      </div>

      <AdminCategoriesClient initialCategories={categories} />
    </div>
  );
}
