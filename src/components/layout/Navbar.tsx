"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Phone,
  BookOpen, FlaskConical, School, ChevronRight,
  Search, Users, FileText, Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { institute } from "@/data/institute";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── Course Mega Menu Data ────────────────────────────────────────────────────

const COURSES_MEGA = [
  {
    label: "Commerce",
    icon: BookOpen,
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    groups: [
      {
        title: "CA",
        items: [
          { label: "Foundation", href: "/courses/ca-foundation" },
          { label: "Intermediate", href: "/courses/ca-intermediate" },
          { label: "Final", href: "/courses/ca-final" },
        ],
      },
      {
        title: "CS",
        items: [
          { label: "Foundation", href: "/courses/cs-foundation" },
          { label: "Executive", href: "/courses/cs-executive" },
          { label: "Professional", href: "/courses/cs-professional" },
        ],
      },
      {
        title: "CMA",
        items: [
          { label: "Foundation", href: "/courses/cma-foundation" },
          { label: "Intermediate", href: "/courses/cma-intermediate" },
          { label: "Final", href: "/courses/cma-final" },
        ],
      },
    ],
  },
  {
    label: "Science",
    icon: FlaskConical,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    groups: [
      {
        title: "IIT JEE",
        items: [
          { label: "Mains", href: "/courses/iit-jee-mains" },
          { label: "Advanced", href: "/courses/iit-jee-advanced" },
        ],
      },
      {
        title: "NEET",
        items: [
          { label: "NEET", href: "/courses/neet" },
        ],
      },
    ],
  },
  {
    label: "School Coaching",
    icon: School,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    groups: [
      {
        title: "School Coaching",
        items: [
          { label: "Class 9", href: "/courses/class-9" },
          { label: "Class 10", href: "/courses/class-10" },
          { label: "Class 11 Commerce", href: "/courses/class-11-commerce" },
          { label: "Class 11 Science", href: "/courses/class-11-science" },
          { label: "Class 12 Commerce", href: "/courses/class-12-commerce" },
          { label: "Class 12 Science", href: "/courses/class-12-science" },
        ],
      },
    ],
  },
];

// ── Faculty Dropdown Data ────────────────────────────────────────────────────

const FACULTY_DROPDOWN = [
  { label: "Commerce Faculty", href: "/faculty/commerce", icon: BookOpen, color: "#2563eb" },
  { label: "Science Faculty", href: "/faculty/science", icon: FlaskConical, color: "#7c3aed" },
  { label: "School Faculty", href: "/faculty/school", icon: School, color: "#059669" },
  { label: "Apply For Job", href: "/apply-for-job", icon: Briefcase, color: "#d97706" },
];

// ── Flat Navigation Links ────────────────────────────────────────────────────

const FLAT_LINKS = [
  { label: "Demo Classes", href: "/demo-classes", icon: BookOpen },
  { label: "Notes", href: "/notes", icon: FileText },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Gallery", href: "/gallery", icon: null },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [mobileCourses, setMobileCourses] = useState(false);
  const [mobileFaculty, setMobileFaculty] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const coursesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const facultyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeGroups, setActiveGroups] = useState<Record<string, string>>({
    Commerce: "CA",
    Science: "IIT JEE",
    "School Coaching": "School Coaching",
  });
  const [activeMobileGroups, setActiveMobileGroups] = useState<Record<string, string>>({
    Commerce: "CA",
    Science: "IIT JEE",
    "School Coaching": "School Coaching",
  });

  const handleGroupHover = (columnLabel: string, groupTitle: string) => {
    setActiveGroups((prev) => ({
      ...prev,
      [columnLabel]: groupTitle,
    }));
  };

  const handleGroupToggle = (columnLabel: string, groupTitle: string) => {
    setActiveGroups((prev) => ({
      ...prev,
      [columnLabel]: prev[columnLabel] === groupTitle ? "" : groupTitle,
    }));
  };

  const handleMobileGroupToggle = (sectionLabel: string, groupTitle: string) => {
    setActiveMobileGroups((prev) => ({
      ...prev,
      [sectionLabel]: prev[sectionLabel] === groupTitle ? "" : groupTitle,
    }));
  };

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Animate announcement strip — REMOVED (now fixed single message)

  // Keyboard shortcut for search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dropdown hover handlers
  const openCourses = useCallback(() => {
    if (coursesTimer.current) clearTimeout(coursesTimer.current);
    setCoursesOpen(true);
  }, []);
  const closeCourses = useCallback(() => {
    coursesTimer.current = setTimeout(() => setCoursesOpen(false), 100);
  }, []);
  const openFaculty = useCallback(() => {
    if (facultyTimer.current) clearTimeout(facultyTimer.current);
    setFacultyOpen(true);
  }, []);
  const closeFaculty = useCallback(() => {
    facultyTimer.current = setTimeout(() => setFacultyOpen(false), 100);
  }, []);

  return (
    <>
      {/* ── Announcement Strip ──────────────────────────────────────────── */}
      <div
        className="hidden sm:block text-white text-xs font-medium py-2 px-4 text-center overflow-hidden relative"
        style={{ background: "#730C02", minHeight: "32px" }}
      >
        <span className="font-bold tracking-widest uppercase">Choose Professional &middot; Become Professional</span>
      </div>

      {/* ── Main Nav ──────────────────────────────────────────── */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[#5a0901]/40 shadow-lg"
            : ""
        )}
        style={{ background: "#730C02" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom">

          {/* ── MOBILE HEADER ─────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center justify-between h-14 w-full gap-2">
            {/* Hamburger */}
            <button
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 bg-white/10 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Academica Institute Home">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Academica Institute"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-sm font-bold text-white leading-tight">
                Academica<br />
                <span className="text-[10px] font-semibold text-white/70">Institute</span>
              </span>
            </Link>

            <div className="flex-1" />

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <ThemeToggle />

            <Link
              href="/auth"
              className="flex-shrink-0 text-[10px] py-1 px-2.5 h-8 rounded-lg font-semibold flex items-center justify-center bg-[#F2A74B] text-white hover:bg-[#d98b2e] transition-colors"
            >
              Enroll
            </Link>
          </div>

          {/* ── DESKTOP HEADER ────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center justify-between h-16">
            {/* Desktop Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Academica Institute Home">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Academica Institute"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-bold text-white leading-tight flex flex-col">
                <span>Academica</span>
                <span className="text-xs font-semibold text-white/70">Institute</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="flex items-center gap-0.5" role="menubar">
              {/* Home */}
              <Link
                href="/"
                role="menuitem"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === "/"
                    ? "text-[#F2A74B] bg-white/10"
                    : "text-white/80 hover:text-[#F2A74B] hover:bg-white/10"
                )}
              >
                Home
              </Link>

              {/* Courses Mega Menu */}
              <div
                className="relative"
                onMouseEnter={openCourses}
                onMouseLeave={closeCourses}
                onFocus={openCourses}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    closeCourses();
                  }
                }}
              >
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={coursesOpen}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname.startsWith("/courses")
                      ? "text-[#F2A74B] bg-white/10"
                      : "text-white/80 hover:text-[#F2A74B] hover:bg-white/10"
                  )}
                >
                  Courses
                  <ChevronDown size={13} className={cn("transition-transform duration-200", coursesOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {coursesOpen && (
                    <motion.div
                       initial={{ opacity: 0, y: -8, scale: 0.97 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: -8, scale: 0.97 }}
                       transition={{ duration: 0.18 }}
                       className="mega-menu animate-fade-in"
                       onMouseEnter={openCourses}
                       onMouseLeave={closeCourses}
                       role="menu"
                    >
                      {COURSES_MEGA.map((col) => (
                        <div key={col.label} className="mega-menu-col text-left">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: col.bg }}>
                              <col.icon size={14} style={{ color: col.color }} />
                            </div>
                            <h4 style={{ color: col.color, marginBottom: 0, borderBottomColor: `${col.color}22` }}>
                              {col.label}
                            </h4>
                          </div>

                          <div className="space-y-2 mt-2">
                            {col.groups.map((group, groupIdx) => {
                              const isExpanded = activeGroups[col.label] === group.title;
                              return (
                                <div key={groupIdx} className="border-b border-[var(--border-subtle)] dark:border-white/5 last:border-b-0 pb-1">
                                  <button
                                    className={cn(
                                      "w-full flex items-center justify-between text-left py-1.5 px-2 rounded-lg transition-all text-xs font-semibold cursor-pointer",
                                      isExpanded 
                                        ? "text-[#730C02] bg-[#730C02]/5 font-bold" 
                                        : "text-[var(--text-secondary)] hover:text-[#730C02] hover:bg-slate-50 dark:hover:bg-white/5"
                                    )}
                                    onMouseEnter={() => handleGroupHover(col.label, group.title)}
                                    onClick={() => handleGroupToggle(col.label, group.title)}
                                    aria-expanded={isExpanded}
                                  >
                                    <span>{group.title}</span>
                                    <ChevronRight
                                      size={12}
                                      className={cn(
                                        "transition-transform duration-200 text-slate-400",
                                        isExpanded && "rotate-90 text-[#730C02]"
                                      )}
                                    />
                                  </button>
                                  
                                  <motion.div
                                    initial={false}
                                    animate={{
                                      height: isExpanded ? "auto" : 0,
                                      opacity: isExpanded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-1 pl-4 pt-1.5 pb-2">
                                      {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                          <Link
                                            key={item.label}
                                            href={item.href}
                                            className={cn(
                                              "mega-menu-item flex items-center gap-1.5 text-xs py-0.5",
                                              isActive && "text-[#730C02] font-bold"
                                            )}
                                            style={isActive ? { color: "#730C02" } : undefined}
                                            role="menuitem"
                                          >
                                            <span
                                              className="mega-menu-dot flex-shrink-0"
                                              style={isActive ? { background: "#730C02" } : undefined}
                                            />
                                            {item.label}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Faculty Dropdown */}
              <div className="relative" onMouseEnter={openFaculty} onMouseLeave={closeFaculty}>
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={facultyOpen}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname.startsWith("/faculty") || pathname === "/apply-for-job"
                      ? "text-[#F2A74B] bg-white/10"
                      : "text-white/80 hover:text-[#F2A74B] hover:bg-white/10"
                  )}
                >
                  Faculty
                  <ChevronDown size={13} className={cn("transition-transform duration-200", facultyOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {facultyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl p-2 z-50"
                      onMouseEnter={openFaculty}
                      onMouseLeave={closeFaculty}
                      role="menu"
                    >
                      {FACULTY_DROPDOWN.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          role="menuitem"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)] transition-all"
                        >
                          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                            <item.icon size={13} style={{ color: item.color }} />
                          </div>
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Flat links */}
              {FLAT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    pathname.startsWith(link.href)
                      ? "text-[#F2A74B] bg-white/10"
                      : "text-white/80 hover:text-[#F2A74B] hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/20"
                aria-label="Search site (Ctrl+K)"
                title="Search (⌘K)"
              >
                <Search size={14} />
                <span className="text-xs hidden xl:inline text-[var(--text-muted)]">⌘K</span>
              </button>

              <ThemeToggle />

              <a
                href={`tel:${institute.phone[0]}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-[#F2A74B] transition-colors"
                aria-label={`Call ${institute.phone[0]}`}
              >
                <Phone size={14} />
                <span className="hidden xl:inline">{institute.phone[0]}</span>
              </a>

              <Link href="/auth" className="text-sm py-2 px-5 font-bold rounded-lg bg-[#F2A74B] text-white hover:bg-[#d98b2e] transition-colors">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-45 pt-14"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="relative h-full w-72 max-w-[85vw] bg-[var(--bg-card)] border-r border-[var(--border)] overflow-y-auto flex flex-col text-left"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                {/* Search bar in drawer */}
                <div className="p-3 border-b border-[var(--border)]">
                  <button
                    onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-muted)] text-sm text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Search size={14} />
                    <span>Search courses, faculty, notes...</span>
                  </button>
                </div>

                <div className="p-3 space-y-0.5 flex-1">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] min-h-[44px]"
                  >
                    Home
                  </Link>

                  {/* Courses Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCourses(!mobileCourses)}
                      aria-expanded={mobileCourses}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] min-h-[44px]"
                    >
                      <span>Courses</span>
                      <ChevronDown size={14} className={cn("transition-transform duration-200", mobileCourses && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {mobileCourses && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden ml-2"
                        >
                          {COURSES_MEGA.map((section) => (
                            <div key={section.label} className="mt-0.5">
                              <button
                                onClick={() => setActiveMobileSection(
                                  activeMobileSection === section.label ? null : section.label
                                )}
                                aria-expanded={activeMobileSection === section.label}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg min-h-[40px]"
                                style={{ color: section.color }}
                              >
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                  <section.icon size={12} />
                                  {section.label}
                                </span>
                                <ChevronRight
                                  size={13}
                                  className={cn("transition-transform duration-200", activeMobileSection === section.label && "rotate-90")}
                                />
                              </button>

                              <AnimatePresence>
                                {activeMobileSection === section.label && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden ml-3 space-y-3 pb-2"
                                  >
                                    {section.groups.map((group, groupIdx) => {
                                      const isGroupExpanded = activeMobileGroups[section.label] === group.title;
                                      return (
                                        <div key={groupIdx} className="space-y-1">
                                          <button
                                            onClick={() => handleMobileGroupToggle(section.label, group.title)}
                                            aria-expanded={isGroupExpanded}
                                            className={cn(
                                              "w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                              isGroupExpanded 
                                                ? "text-[#730C02] bg-[#730C02]/5" 
                                                : "text-[var(--text-secondary)] hover:text-[#730C02]"
                                            )}
                                          >
                                            <span className="flex items-center gap-1.5">
                                              <ChevronRight
                                                size={11}
                                                className={cn("transition-transform duration-200 text-slate-400", isGroupExpanded && "rotate-90 text-[#730C02]")}
                                              />
                                              {group.title}
                                            </span>
                                          </button>

                                          <AnimatePresence initial={false}>
                                            {isGroupExpanded && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="overflow-hidden ml-5 pl-1 space-y-1 pb-1"
                                              >
                                                {group.items.map((item) => {
                                                  const isActive = pathname === item.href;
                                                  return (
                                                    <Link
                                                      key={item.label}
                                                      href={item.href}
                                                      onClick={() => {
                                                        setMobileOpen(false);
                                                      }}
                                                      className={cn(
                                                        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg min-h-[32px] transition-colors",
                                                        isActive
                                                          ? "text-[#730C02] font-bold bg-[var(--bg-muted)]"
                                                          : "text-[var(--text-secondary)] hover:text-[#730C02] hover:bg-[var(--bg-muted)]"
                                                      )}
                                                    >
                                                      <span className={cn(
                                                        "w-1 h-1 rounded-full flex-shrink-0",
                                                        isActive ? "bg-[#730C02]" : "bg-current opacity-40"
                                                      )} />
                                                      {item.label}
                                                    </Link>
                                                  );
                                                })}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Faculty Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileFaculty(!mobileFaculty)}
                      aria-expanded={mobileFaculty}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] min-h-[44px]"
                    >
                      <span>Faculty</span>
                      <ChevronDown size={14} className={cn("transition-transform duration-200", mobileFaculty && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {mobileFaculty && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden ml-2"
                        >
                          {FACULTY_DROPDOWN.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)] rounded-lg min-h-[40px]"
                              style={{ color: item.color }}
                            >
                              <item.icon size={14} />
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Flat links */}
                  {FLAT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] min-h-[44px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Bottom actions */}
                <div className="p-3 border-t border-[var(--border)] space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary w-full justify-center text-sm py-2.5"
                  >
                    My Dashboard
                  </Link>
                  <a
                    href={buildWhatsAppUrl("Hi, I want to enroll at Academica Institute.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-sm py-2.5"
                  >
                    Enroll Now
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Global Search Overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSearchOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden"
            >
              <SearchOverlay onClose={() => setSearchOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Inline Search Overlay Component ─────────────────────────────────────────

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus input
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults(null); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 300);
  };

  const hasResults = results && (
    (results.courses?.length ?? 0) + (results.faculty?.length ?? 0) +
    (results.notes?.length ?? 0) + (results.blogs?.length ?? 0)
  ) > 0;

  return (
    <div>
      {/* Search input */}
      <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
        <Search size={18} className="text-[var(--text-muted)] flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search courses, faculty, notes, blogs..."
          className="flex-1 bg-transparent text-[var(--text-primary)] text-sm outline-none placeholder:text-[var(--text-muted)]"
          aria-label="Search"
        />
        {loading && <div className="w-4 h-4 border-2 border-[var(--brand-secondary)] border-t-transparent rounded-full animate-spin flex-shrink-0" />}
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0" aria-label="Close search">
          <X size={18} />
        </button>
      </div>

      {/* Results */}
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {query.trim().length < 2 && (
          <div className="p-4 text-center text-sm text-[var(--text-muted)]">
            Type at least 2 characters to search
          </div>
        )}

        {!loading && query.trim().length >= 2 && !hasResults && (
          <div className="p-4 text-center text-sm text-[var(--text-muted)]">
            No results found for &quot;{query}&quot;
          </div>
        )}

        {hasResults && (
          <>
            {results!.courses && results!.courses.length > 0 && (
              <SearchGroup title="Courses" icon={<BookOpen size={14} />}>
                {results!.courses.map((c) => (
                  <SearchResultItem key={c.id} href={`/courses/${c.slug}`} title={c.title} subtitle={c.category} onClose={onClose} />
                ))}
              </SearchGroup>
            )}
            {results!.faculty && results!.faculty.length > 0 && (
              <SearchGroup title="Faculty" icon={<Users size={14} />}>
                {results!.faculty.map((f) => (
                  <SearchResultItem key={f.id} href={`/faculty/${f.slug}`} title={f.name} subtitle={f.designation} onClose={onClose} />
                ))}
              </SearchGroup>
            )}
            {results!.notes && results!.notes.length > 0 && (
              <SearchGroup title="Notes" icon={<FileText size={14} />}>
                {results!.notes.map((n) => (
                  <SearchResultItem key={n.id} href={`/notes/${n.id}`} title={n.title} subtitle={n.subject} onClose={onClose} />
                ))}
              </SearchGroup>
            )}
            {results!.blogs && results!.blogs.length > 0 && (
              <SearchGroup title="Blog" icon={<BookOpen size={14} />}>
                {results!.blogs.map((b) => (
                  <SearchResultItem key={b.id} href={`/blog/${b.slug}`} title={b.title} subtitle={b.excerpt} onClose={onClose} />
                ))}
              </SearchGroup>
            )}
          </>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span><kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">ESC</kbd> to close</span>
        <span><kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">⌘K</kbd> to toggle</span>
      </div>
    </div>
  );
}

interface SearchResults {
  courses?: Array<{ id: string; title: string; slug: string; category: string }>;
  faculty?: Array<{ id: string; name: string; slug: string; designation: string }>;
  notes?: Array<{ id: string; title: string; subject: string | null }>;
  blogs?: Array<{ id: string; title: string; slug: string; excerpt: string | null }>;
}

function SearchGroup({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function SearchResultItem({ href, title, subtitle, onClose }: { href: string; title: string; subtitle?: string | null; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex flex-col px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
    >
      <span className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{title}</span>
      {subtitle && <span className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">{subtitle}</span>}
    </Link>
  );
}

    
