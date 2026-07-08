"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { institute } from "@/data/institute";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "CA Foundation", href: "/courses/ca-foundation" },
      { label: "CS Preparation", href: "/courses/cs" },
      { label: "CMA Preparation", href: "/courses/cma" },
      { label: "CUET Prep", href: "/courses/cuet" },
      { label: "Class 11 Commerce", href: "/courses/class-11-commerce" },
      { label: "Class 12 Commerce", href: "/courses/class-12-commerce" },
      { label: "Class 9 & 10 Tuition", href: "/courses/class-10-tuition" },
    ],
  },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[var(--gradient-brand)] text-white text-xs font-medium py-2 px-4 text-center hidden md:block"
           style={{ background: "var(--gradient-brand)" }}>
        🎉 <span className="font-bold">CA Foundation 2024 Result:</span> Academica Institute produces{" "}
        <span className="font-bold">AIR 1</span>! Admissions open for 2025-26.{" "}
        <a href={buildWhatsAppUrl("Hi, I want to inquire about admissions at Academica Institute.")}
           target="_blank" rel="noopener noreferrer"
           className="underline font-bold hover:text-yellow-200 transition-colors">
          Enroll Now →
        </a>
      </div>


      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "navbar-scrolled border-b border-[var(--border)]"
            : "bg-[var(--bg-primary)]"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: "var(--gradient-brand)" }}>
                <span className="text-white font-black text-sm">A</span>
              </div>
              <div className="leading-none">
                <span className="font-black text-lg tracking-tight text-[var(--text-primary)]"
                      style={{ fontFamily: "Outfit, sans-serif" }}>
                  Academica
                </span>
                <span className="gradient-text font-black text-lg ml-1"
                      style={{ fontFamily: "Outfit, sans-serif" }}>
                  Institute
                </span>
                <div className="text-[10px] text-[var(--text-muted)] font-medium leading-none mt-0.5 hidden sm:block">
                  Quality Guidance and the Right Direction
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-all duration-200"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 w-52 rounded-xl shadow-xl border border-[var(--border)] overflow-hidden",
                        "bg-[var(--bg-card)] transition-all duration-200",
                        openDropdown === link.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)]" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right: CTA + Theme */}
            <div className="flex items-center gap-3">
              <ThemeToggle className="hidden sm:flex" />

              <a
                href={`tel:${institute.phone[0]}`}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors"
              >
                <Phone size={15} />
                <span className="hidden lg:inline">{institute.phone[0]}</span>
              </a>

              <a
                href={buildWhatsAppUrl("Hi, I would like to know more about Academica Institute.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2 px-4 hidden sm:inline-flex"
              >
                Enroll Now
              </a>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors hover:border-[var(--brand-400)]"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 border-t border-[var(--border)]",
            isMobileOpen ? "max-h-screen" : "max-h-0"
          )}
        >
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--brand-400)]" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 pb-1 flex flex-col gap-3">
              <a
                href={buildWhatsAppUrl("Hi, I would like to know more about Academica Institute.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Enroll Now
              </a>
              <a
                href={`tel:${institute.phone[0]}`}
                className="btn-secondary justify-center"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-[var(--text-muted)]">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
