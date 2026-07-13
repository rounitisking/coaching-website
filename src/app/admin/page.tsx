import { getAdminStats } from "@/actions/admin";
import { Users, BookOpen, ShoppingCart, IndianRupee } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  let stats = {
    totalStudents: 0,
    totalCourses: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [] as any[],
    recentStudents: [] as any[],
  };

  try {
    stats = await getAdminStats();
  } catch (error) {
    console.error("Admin stats fetch error:", error);
  }

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-600 bg-blue-100 dark:bg-blue-950/40" },
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "text-amber-600 bg-amber-100 dark:bg-amber-950/40" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-purple-600 bg-purple-100 dark:bg-purple-950/40" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Console Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time statistics and administrative actions.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</p>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1" style={{ fontFamily: "Outfit, sans-serif" }}>{card.value}</h3>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}>
              <card.icon size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed overview */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent orders */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Recent Purchase Activities</h2>
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-slate-400">No recent transactions.</td>
                    </tr>
                  ) : (
                    stats.recentOrders.map((order: any) => (
                      <tr key={order.id}>
                        <td className="font-semibold text-slate-700 dark:text-slate-300">
                          #{order.id.slice(-6).toUpperCase()}
                        </td>
                        <td>{order.user?.name || "Student"}</td>
                        <td className="font-bold">₹{order.amount}</td>
                        <td>
                          <span
                            className={`badge text-[10px] font-bold ${
                              order.status === "PAID" ? "badge-success" : "badge-accent"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent student registrations */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">New Registrations</h2>
          <div className="p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            {stats.recentStudents.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-4">No recent students.</p>
            ) : (
              stats.recentStudents.map((stud: any) => (
                <div key={stud.id} className="flex items-center justify-between text-xs py-2 border-b last:border-0 border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{stud.name || "Unnamed"}</p>
                    <p className="text-slate-400 dark:text-slate-500 mt-0.5">{stud.email}</p>
                  </div>
                  <span className="text-slate-400">
                    {new Date(stud.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
