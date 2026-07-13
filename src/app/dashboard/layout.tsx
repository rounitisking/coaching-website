import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import {
  LayoutDashboard, BookOpen, ClipboardList, FileText,
  ShoppingCart, User, ShieldAlert, LogOut, KeyRound, Menu
} from "lucide-react";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth");
  }

  const user = session.user;

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { label: "Test Series", href: "/dashboard/test-series", icon: ClipboardList },
    { label: "Resources", href: "/dashboard/resources", icon: FileText },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Change Password", href: "/dashboard/change-password", icon: KeyRound },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{user.name}</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[140px]">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-slate-100 transition-colors"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
            >
              <ShieldAlert size={18} />
              Admin Portal
            </Link>
          )}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
