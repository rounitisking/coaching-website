import { getAllHeroBanners } from "@/actions/admin";
import { AdminBannersClient } from "@/components/admin/AdminBannersClient";

export default async function AdminBannersPage() {
  let banners: any[] = [];
  try {
    banners = await getAllHeroBanners();
  } catch (error) {
    console.error("Admin banners fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Hero Banners
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage slides, headlines, CTAs, and advertisements shown on the front homepage.</p>
      </div>

      <AdminBannersClient initialBanners={banners} />
    </div>
  );
}
