import { adminGetAllFAQs } from "@/actions/admin";
import { AdminFAQsClient } from "@/components/admin/AdminFAQsClient";

export default async function AdminFAQsPage() {
  let faqs: any[] = [];
  try {
    faqs = await adminGetAllFAQs();
  } catch (error) {
    console.error("Admin FAQs fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage FAQs
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure questions and answers shown in accordion boxes on the front page.</p>
      </div>

      <AdminFAQsClient initialFAQs={faqs} />
    </div>
  );
}
