import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import {
  LayoutDashboard, Image, BookOpen, Tag, Users, Trophy, Star,
  FileText, ClipboardList, Bell, HelpCircle, MessageSquare,
  UserCheck, ShoppingCart, Settings, LogOut, ShieldAlert
} from "lucide-react";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Banners", href: "/admin/banners", icon: Image },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Faculty", href: "/admin/faculty", icon: Users },
    { label: "Results", href: "/admin/results", icon: Trophy },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Resources", href: "/admin/resources", icon: FileText },
    { label: "Test Series", href: "/admin/test-series", icon: ClipboardList },
    { label: "Notices", href: "/admin/notices", icon: Bell },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Popup", href: "/admin/popup", icon: MessageSquare },
    { label: "Students", href: "/admin/students", icon: UserCheck },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-950 text-slate-400 border-r border-slate-850 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-900">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
              AI
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-100 truncate max-w-[140px]">Academica Admin</h2>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-0.5">Control Panel</p>
            </div>
          </div>

          <nav className="space-y-0.5 max-h-[70vh] overflow-y-auto">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-900 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-950 text-blue-300 hover:bg-blue-900 transition-colors"
          >
            <ShieldAlert size={16} />
            Student View
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/20 transition-colors"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
