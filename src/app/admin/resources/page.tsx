import { adminGetAllResources } from "@/actions/admin";
import { getCategories } from "@/actions/courses";
import { AdminResourcesClient } from "@/components/admin/AdminResourcesClient";

export default async function AdminResourcesPage() {
  let resources: any[] = [];
  let categories: any[] = [];
  try {
    resources = await adminGetAllResources();
    categories = await getCategories();
  } catch (error) {
    console.error("Admin resources fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Study Materials
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Configure notes, DPPs, pyqs and study resources available for free download or purchase.</p>
      </div>

      <AdminResourcesClient initialResources={resources} categories={categories} />
    </div>
  );
}
