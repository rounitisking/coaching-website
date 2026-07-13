import { adminGetAllOrders } from "@/actions/admin";
import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || "1");
  let data = { orders: [] as any[], total: 0, totalPages: 1 };

  try {
    data = await adminGetAllOrders(page, 20);
  } catch (error) {
    console.error("Admin orders fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Student Orders
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Review receipts, statuses, and transaction details from learners.</p>
      </div>

      <AdminOrdersClient initialData={data} page={page} />
    </div>
  );
}
