import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { db } from "@/lib/db";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth");
  }

  const user = session.user;

  // Query unread notifications count
  const unreadCount = await db.notification
    .count({
      where: { userId: user.id, isRead: false },
    })
    .catch(() => 0);

  // Server action to log out
  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900">
      {/* Responsive Sidebar */}
      <DashboardSidebar user={user} unreadCount={unreadCount} logoutAction={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
