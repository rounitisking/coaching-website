import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookOpen, ClipboardList, FileText, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const userId = session.user.id;

  // DB queries with graceful fallbacks
  let stats = {
    coursesCount: 0,
    testsCount: 0,
    resourcesCount: 0,
    ordersCount: 0,
  };
  let recentEnrollments: any[] = [];
  let recentOrders: any[] = [];

  try {
    const [coursesCount, testsCount, resourcesCount, ordersCount] = await Promise.all([
      db.enrollment.count({ where: { userId, isActive: true } }),
      db.testPurchase.count({ where: { userId, isActive: true } }),
      db.resourcePurchase.count({ where: { userId } }),
      db.order.count({ where: { userId } }),
    ]);

    stats = { coursesCount, testsCount, resourcesCount, ordersCount };

    recentEnrollments = await db.enrollment.findMany({
      where: { userId, isActive: true },
      take: 3,
      include: {
        course: {
          select: { title: true, slug: true, thumbnail: true },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    recentOrders = await db.order.findMany({
      where: { userId },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
  }

  const statItems = [
    { label: "My Courses", value: stats.coursesCount, icon: BookOpen, href: "/dashboard/courses", color: "text-blue-600 bg-blue-100 dark:bg-blue-950/40" },
    { label: "Test Series", value: stats.testsCount, icon: ClipboardList, href: "/dashboard/test-series", color: "text-amber-600 bg-amber-100 dark:bg-amber-950/40" },
    { label: "Resources", value: stats.resourcesCount, icon: FileText, href: "/dashboard/resources", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40" },
    { label: "Total Orders", value: stats.ordersCount, icon: ShoppingBag, href: "/dashboard/orders", color: "text-purple-600 bg-purple-100 dark:bg-purple-950/40" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Welcome back, {session.user.name || "Student"}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your classes, exams, resources and progress here.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all no-underline"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 group-hover:scale-105 transition-transform" style={{ fontFamily: "Outfit, sans-serif" }}>{item.value}</h3>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
          </Link>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Active Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">My Recent Courses</h2>
            <Link href="/dashboard/courses" className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnrollments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                <BookOpen className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={40} />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">No active enrollments</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-4">Browse our available coaching programs to begin learning.</p>
                <Link href="/courses" className="btn-primary btn-sm">Browse Courses</Link>
              </div>
            ) : (
              recentEnrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{enr.course.title}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Enrolled on {new Date(enr.enrolledAt).toLocaleDateString("en-IN")}</p>
                    </div>
                  </div>
                  <Link href={`/dashboard/courses/${enr.course.slug}`} className="btn-secondary btn-sm">
                    Study
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Recent Activity / Orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
              History <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                <ShoppingBag className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={40} />
                <p className="text-xs text-slate-400 dark:text-slate-500">No order history found.</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">Order #{order.id.slice(-6).toUpperCase()}</h4>
                    <p className="text-slate-400 dark:text-slate-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">₹{order.amount}</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold uppercase mt-1 ${
                        order.status === "PAID"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
