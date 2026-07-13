import { db } from "@/lib/db";
import { AdminNoticesClient } from "@/components/admin/AdminNoticesClient";

export default async function AdminNoticesPage() {
  let notices: any[] = [];
  try {
    notices = await db.notice.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Admin notices fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Notices
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure scrolling notice board messages, urgency banners, and redirection links.</p>
      </div>

      <AdminNoticesClient initialNotices={notices} />
    </div>
  );
}
