import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const userId = session.user.id;
  let orders: any[] = [];

  try {
    orders = await db.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Dashboard orders query error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Order &amp; Billing History
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Review receipts, statuses, and transaction details.</p>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <ShoppingBag className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No transactions found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            You haven't purchased any preparatory materials or courses yet.
          </p>
          <Link href="/courses" className="btn-primary">
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Purchased Items</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-bold text-slate-800 dark:text-slate-200">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        {order.items.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">No details</span>
                        ) : (
                          order.items.map((item: any) => (
                            <div key={item.id} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              • {item.title || "Study Program"}
                            </div>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="font-bold text-slate-800 dark:text-slate-100">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`badge font-bold uppercase ${
                          order.status === "PAID"
                            ? "badge-success"
                            : order.status === "PENDING"
                            ? "badge-accent"
                            : "badge-error"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
