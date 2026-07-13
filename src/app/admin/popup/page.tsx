import { db } from "@/lib/db";
import { AdminPopupClient } from "@/components/admin/AdminPopupClient";

export default async function AdminPopupPage() {
  let popup: any = null;
  try {
    popup = await db.popup.findFirst();
    if (!popup) {
      popup = await db.popup.create({
        data: {
          title: "Admissions Open 2025-26",
          content: "Special early-bird pricing is now available for all CA, CS, and CUET coaching batches. Register today to lock in lower fees!",
          ctaText: "Enroll Now",
          ctaUrl: "/auth",
          isActive: false,
        },
      });
    }
  } catch (error) {
    console.error("Admin popup query/creation error:", error);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Campaign Popups
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure the early registration campaign modal shown to users after 10 seconds.</p>
      </div>

      {popup && <AdminPopupClient popup={popup} />}
    </div>
  );
}
