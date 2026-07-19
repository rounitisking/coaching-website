"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, ClipboardList, FileText,
  ShoppingCart, User, ShieldAlert, LogOut, KeyRound, Menu, X,
  Heart, Download, Bookmark, Video, Bell
} from "lucide-react";

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
  unreadCount: number;
  logoutAction: () => Promise<void>;
}

export function DashboardSidebar({ user, unreadCount, logoutAction }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { label: "Test Series", href: "/dashboard/test-series", icon: ClipboardList },
    { label: "Purchased Notes", href: "/dashboard/resources", icon: FileText },
    { label: "My Downloads", href: "/dashboard/downloads", icon: Download },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { label: "Saved Blogs", href: "/dashboard/saved-blogs", icon: Bookmark },
    { label: "Demo Classes", href: "/dashboard/demos", icon: Video },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Change Password", href: "/dashboard/change-password", icon: KeyRound },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 w-full shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            {user.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{user.name}</h2>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar aside panel */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex w-full md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex-col justify-between shrink-0 transition-all duration-300 ease-in-out`}
      >
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)] md:max-h-none">
          <div className="hidden md:flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{user.name}</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[140px]">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50/80 text-blue-600 dark:bg-blue-950/20 dark:text-blue-450"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-slate-100"
                  }`}
                >
                  <link.icon size={18} />
                  <span className="flex-1">{link.label}</span>
                  {link.badge ? (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
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
          <button
            onClick={() => logoutAction()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
