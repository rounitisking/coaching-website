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
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          General Settings
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Configure global details like contact phone, address, and social links.</p>
      </div>

      <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl">
        <AdminSettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
