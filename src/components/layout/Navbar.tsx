"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Phone, GraduationCap,
  BookOpen, FlaskConical, School, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { institute } from "@/data/institute";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const MEGA_MENU = [
  {
    label: "Commerce",
    icon: BookOpen,
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    items: [
      { label: "CA Foundation", href: "/courses?category=COMMERCE&q=ca-foundation" },
      { label: "CA Intermediate", href: "/courses?category=COMMERCE&q=ca-intermediate" },
      { label: "CA Final", href: "/courses?category=COMMERCE&q=ca-final" },
      { label: "CS Foundation", href: "/courses?category=COMMERCE&q=cs" },
      { label: "CMA Foundation", href: "/courses?category=COMMERCE&q=cma" },
      { label: "B.Com", href: "/courses?category=COMMERCE&q=bcom" },
      { label: "Mentorship Program", href: "/courses?category=COMMERCE&q=mentorship" },
    ],
  },
  {
    label: "Science",
    icon: FlaskConical,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    items: [
      { label: "IIT JEE Mains", href: "/courses?category=SCIENCE&q=iit-jee-mains" },
      { label: "IIT JEE Advanced", href: "/courses?category=SCIENCE&q=iit-jee-advanced" },
      { label: "NEET", href: "/courses?category=SCIENCE&q=neet" },
      { label: "Foundation Course", href: "/courses?category=SCIENCE&q=foundation" },
    ],
  },
  {
    label: "School Coaching",
    icon: School,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    items: [
      { label: "Class 9", href: "/courses?category=SCHOOL&q=class-9" },
      { label: "Class 10", href: "/courses?category=SCHOOL&q=class-10" },
      { label: "Class 11 Commerce", href: "/courses?category=SCHOOL&q=class-11-commerce" },
      { label: "Class 11 Science", href: "/courses?category=SCHOOL&q=class-11-science" },
      { label: "Class 12 Commerce", href: "/courses?category=SCHOOL&q=class-12-commerce" },
      { label: "Class 12 Science", href: "/courses?category=SCHOOL&q=class-12-science" },
    ],
  },
];

const FLAT_LINKS = [
  { label: "Test Series", href: "/test-series" },
  { label: "Results", href: "/results" },
  { label: "Faculty", href: "/faculty" },
  { label: "Resources", href: "/resources" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openMega = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 100);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="text-white text-xs font-medium py-2 px-4 text-center hidden sm:block animate-fade-in"
        style={{ background: "var(--gradient-brand)" }}
      >
        🎉 <span className="font-bold">CA Foundation Result:</span> Academica produces <span className="font-bold">AIR 1</span>! Admissions open for 2025-26.{" "}
        <a
          href={buildWhatsAppUrl("Hi, I want to enquire about admissions at Academica Institute.")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-yellow-200 transition-colors"
        >
          Enroll Now →
        </a>
      </div>

      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "navbar-scrolled border-b border-[var(--border)]" : "bg-[var(--bg-primary)]"
        )}
      >
        <div className="container-custom">
          {/* MOBILE */}
          <div className="flex lg:hidden items-center justify-between h-14 w-full gap-2">
            <button
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
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

            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                <span className="text-white font-black text-xs">A</span>
              </div>
              <div className="leading-tight text-left" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
                <div className="font-black text-sm tracking-tight text-[var(--text-primary)]">Academica</div>
                <div className="gradient-text font-black text-sm tracking-tight">Institute</div>
              </div>
            </Link>

            <div className="flex-1" />
            <ThemeToggle />
            <Link
              href="/auth"
              className="flex-shrink-0 btn-primary text-[10px] py-1 px-2.5 h-8 rounded-lg font-semibold flex items-center justify-center"
            >
              Enroll
            </Link>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                <GraduationCap size={18} className="text-white" />
              </div>
              <div className="leading-none text-left">
                <div
                  className="font-black text-lg tracking-tight text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}
                >
                  Academica <span className="gradient-text">Institute</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">Quality Guidance · Est. 2013</div>
              </div>
            </Link>

            <div className="flex items-center gap-0.5">
              <Link
                href="/"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === "/"
                    ? "text-[var(--brand-secondary)] bg-[var(--bg-muted)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)]"
                )}
              >
                Home
              </Link>

              {/* Courses Mega Menu Trigger */}
              <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname.startsWith("/courses")
                      ? "text-[var(--brand-secondary)] bg-[var(--bg-muted)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)]"
                  )}
                >
                  Courses
                  <ChevronDown
                    size={13}
                    className={cn("transition-transform duration-200", megaOpen && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="mega-menu"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      {MEGA_MENU.map((col) => (
                        <div key={col.label} className="mega-menu-col text-left">
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: col.bg }}
                            >
                              <col.icon size={14} style={{ color: col.color }} />
                            </div>
                            <h4 style={{ color: col.color, marginBottom: 0, borderBottomColor: `${col.color}22` }}>
                              {col.label}
                            </h4>
                          </div>
                          {col.items.map((item) => (
                            <Link key={item.label} href={item.href} className="mega-menu-item">
                              <span className="mega-menu-dot" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {FLAT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    pathname.startsWith(link.href)
                      ? "text-[var(--brand-secondary)] bg-[var(--bg-muted)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href={`tel:${institute.phone[0]}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-secondary)] transition-colors"
              >
                <Phone size={14} />
                <span className="hidden xl:inline">{institute.phone[0]}</span>
              </a>
              <Link
                href="/auth"
                className="btn-primary text-sm py-2 px-5 font-bold"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-45 pt-14"
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                exit={{ x: -20 }}
                transition={{ duration: 0.22 }}
                className="relative h-full w-72 max-w-[85vw] bg-[var(--bg-card)] border-r border-[var(--border)] overflow-y-auto flex flex-col text-left"
              >
                <div className="p-4 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
                  >
                    Home
                  </Link>

                  {/* Courses Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
                    >
                      <span>Courses</span>
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform duration-200", mobileCoursesOpen && "rotate-180")}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileCoursesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-2"
                        >
                          {MEGA_MENU.map((section) => (
                            <div key={section.label} className="mt-1">
                              <button
                                onClick={() =>
                                  setActiveMobileSection(
                                    activeMobileSection === section.label ? null : section.label
                                  )
                                }
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg"
                                style={{ color: section.color }}
                              >
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                  <section.icon size={12} />
                                  {section.label}
                                </span>
                                <ChevronRight
                                  size={13}
                                  className={cn(
                                    "transition-transform duration-200",
                                    activeMobileSection === section.label && "rotate-90"
                                  )}
                                />
                              </button>
                              <AnimatePresence>
                                {activeMobileSection === section.label && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden ml-3"
                                  >
                                    {section.items.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--brand-secondary)] hover:bg-[var(--bg-muted)] rounded-lg"
                                      >
                                        <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                                        {item.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {FLAT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto p-4 border-t border-[var(--border)] space-y-2">
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
    </>
  );
}
