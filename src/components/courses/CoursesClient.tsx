"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Search, Users, Clock, ArrowRight, Play } from "lucide-react";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  thumbnail?: string | null;
  category: { type: string; name: string };
  faculty?: { id: string; name: string } | null;
  duration?: string | null;
  level?: string | null;
};

type Category = {
  id: string;
  name: string;
  type: string;
};

type Faculty = {
  id: string;
  name: string;
};

type Props = {
  initialCourses: Course[];
  categories: Category[];
  faculty: Faculty[];
  initialCategory?: string;
  initialSearch?: string;
};

const categoryColors: Record<string, string> = {
  COMMERCE: "linear-gradient(135deg, #1e40af, #2563eb)",
  SCIENCE: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  SCHOOL: "linear-gradient(135deg, #059669, #047857)",
};

function getCourseImage(slug: string, thumbnail: string | null | undefined): string {
  if (thumbnail) return thumbnail;
  const norm = slug.toLowerCase();
  if (norm.includes("ca-foundation") || norm.includes("ca_foundation")) return "/bg/ca foundation.png";
  if (norm.includes("ca-intermediate") || norm.includes("ca_intermediate")) return "/bg/ca intermediate.png";
  if (norm.includes("ca-final") || norm.includes("ca_final")) return "/bg/ca final.png";
  if (norm.includes("cs-foundation") || norm.includes("cs_foundation") || norm.includes("cseet")) return "/bg/cs foundation.png";
  if (norm.includes("cs-executive") || norm.includes("cs_executive")) return "/bg/cs executive.png";
  if (norm.includes("cs-professional") || norm.includes("cs_professional")) return "/bg/cs professional.png";
  if (norm.includes("cma-foundation") || norm.includes("cma_foundation")) return "/bg/cma foundation.png";
  if (norm.includes("cma-intermediate") || norm.includes("cma_intermediate")) return "/bg/cma intermediate.png";
  if (norm.includes("cma-final") || norm.includes("cma_final")) return "/bg/cma final.png";
  if (norm.includes("class-9") || norm.includes("class_9")) return "/bg/class 9.png";
  if (norm.includes("class-10") || norm.includes("class_10")) return "/bg/class 10.png";
  if (norm.includes("class-11") || norm.includes("class_11")) return "/bg/class 11.png";
  if (norm.includes("class-12") || norm.includes("class_12")) return "/bg/class 12.png";
  return "/bg/ca foundation.png";
}

export default function CoursesClient({ initialCourses, categories, faculty, initialCategory, initialSearch }: Props) {
  const [activeTab, setActiveTab] = useState(initialCategory || "ALL");
  const [search, setSearch] = useState(initialSearch || "");
  const [selectedFaculty, setSelectedFaculty] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("DEFAULT");

  const filtered = initialCourses.filter((course) => {
    // Category match
    const matchCategory = activeTab === "ALL" || course.category.type === activeTab.toUpperCase();
    
    // Search match
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()) ||
      course.slug.toLowerCase().includes(search.toLowerCase());
    
    // Faculty match
    const matchFaculty = selectedFaculty === "ALL" || (course.faculty && course.faculty.id === selectedFaculty);

    return matchCategory && matchSearch && matchFaculty;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "PRICE_ASC") return a.price - b.price;
    if (sortOrder === "PRICE_DESC") return b.price - a.price;
    return 0; // Default order
  });

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
        <button onClick={() => setActiveTab("ALL")} className={`tab-pill ${activeTab === "ALL" ? "active" : ""}`}>
          All Programs
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.type)}
            className={`tab-pill ${activeTab === cat.type ? "active" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Faculty Dropdown */}
          <div>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="input bg-[var(--bg-card)] cursor-pointer"
            >
              <option value="ALL">All Faculty</option>
              {faculty.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input bg-[var(--bg-card)] cursor-pointer"
            >
              <option value="DEFAULT">Sort: Default</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((course) => {
          const discount = course.mrp > course.price ? Math.round(((course.mrp - course.price) / course.mrp) * 100) : 0;

          return (
            <div key={course.id} className="card overflow-hidden group flex flex-col justify-between text-left">
              <Link href={`/courses/${course.slug}`} className="block no-underline flex-1">
                <div className="relative h-48 overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center">
                  <Image
                    src={getCourseImage(course.slug, course.thumbnail)}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-75 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                    style={{ background: categoryColors[course.category.type] || categoryColors.COMMERCE }}
                  >
                    {course.category.name}
                  </div>
                  {course.duration && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-semibold">
                      <Clock size={12} />
                      {course.duration}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-secondary)] transition-colors line-clamp-1">
                    {course.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)] mb-4">
                    {course.level && (
                      <span className="flex items-center gap-1">
                        <Users size={13} /> {course.level}
                      </span>
                    )}
                    {course.faculty && (
                      <span className="text-[var(--brand-secondary)]">
                        👨‍🏫 {course.faculty.name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-900 mt-auto">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Course Fee</span>
                    <span className="font-black text-xl text-blue-600 dark:text-blue-400" style={{ fontFamily: "Outfit, sans-serif" }}>
                      ₹{course.price.toLocaleString("en-IN")}
                    </span>
                    {course.mrp > course.price && (
                      <>
                        <span className="text-xs line-through text-slate-400 ml-1.5">
                          ₹{course.mrp.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/20 px-1.5 py-0.5 rounded-full ml-1.5">
                          {discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/demo-classes?course=${encodeURIComponent(course.title)}`}
                    className="flex-1 btn-secondary text-xs py-2.5 px-3 justify-center rounded-xl font-bold flex items-center gap-1.5"
                  >
                    <Play size={13} className="fill-current" /> Demo Classes
                  </Link>
                  <Link
                    href={`/checkout?type=course&id=${course.id}`}
                    className="flex-1 btn-primary text-xs py-2.5 px-3 justify-center rounded-xl font-bold"
                  >
                    Purchase Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto text-[var(--text-muted)] opacity-30 mb-4" />
          <p className="text-[var(--text-muted)]">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
