"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-gray-100 animate-pulse",
          className
        )}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "relative w-10 h-10 rounded-xl flex items-center justify-center",
        "transition-all duration-300 cursor-pointer",
        "border border-[var(--border)] bg-[var(--bg-secondary)]",
        "hover:border-[var(--brand-400)] hover:bg-[var(--brand-50)]",
        "dark:hover:bg-[rgba(99,102,241,0.1)]",
        className
      )}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? (
        <Sun size={18} className="text-[var(--accent-400)]" />
      ) : (
        <Moon size={18} className="text-[var(--brand-600)]" />
      )}
    </button>
  );
}
