"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  itemType: string;
  itemId: string;
  title: string;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  razorpayOrderId?: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  items: OrderItem[];
}

interface AdminOrdersClientProps {
  initialData: {
    orders: Order[];
    totalPages: number;
    total: number;
  };
  page: number;
}

export function AdminOrdersClient({ initialData, page }: AdminOrdersClientProps) {
  const [orders] = useState<Order[]>(initialData.orders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const handlePageChange = (p: number) => {
    router.push(`/admin/orders?page=${p}`);
  };

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.user.email.toLowerCase().includes(search.toLowerCase()) ||
      (order.user.name && order.user.name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            className="input pl-10 py-2.5"
            placeholder="Search Order ID or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["all", "PAID", "PENDING", "FAILED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                statusFilter === status
                  ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400"
                  : "border-slate-200 dark:border-slate-800 text-slate-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list table */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Student</th>
                <th>Purchased Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id}>
                    <td className="font-bold text-slate-800 dark:text-slate-200">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      <div>
                        <h4 className="font-semibold text-slate-850 dark:text-slate-200">
                          {order.user.name || "Student"}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{order.user.email}</p>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                            • {item.title}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="font-bold">₹{order.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <span
                        className={`badge text-[10px] font-bold uppercase ${
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
                    <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination control footer */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <p className="text-xs text-slate-500">
            Page {page} of {initialData.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="btn-secondary btn-sm rounded-lg"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= initialData.totalPages}
              className="btn-secondary btn-sm rounded-lg"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
