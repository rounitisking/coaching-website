import { adminGetAllTestSeries } from "@/actions/admin";
import { getCategories } from "@/actions/courses";
import { AdminTestSeriesClient } from "@/components/admin/AdminTestSeriesClient";

export default async function AdminTestSeriesPage() {
  let testSeries: any[] = [];
  let categories: any[] = [];
  try {
    testSeries = await adminGetAllTestSeries();
    categories = await getCategories();
  } catch (error) {
    console.error("Admin test series fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Test Series
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure evaluation papers, mock test compilations, prices, and settings.</p>
      </div>

      <AdminTestSeriesClient initialTestSeries={testSeries} categories={categories} />
    </div>
  );
}
