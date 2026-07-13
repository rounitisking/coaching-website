import { getSiteSettings } from "@/actions/admin";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  let settings: any[] = [];
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error("Admin settings fetch error:", error);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          General Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure global details like contact phone, address, and social links.</p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <AdminSettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
