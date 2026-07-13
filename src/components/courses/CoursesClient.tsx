"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Search, Users, SlidersHorizontal, ArrowUpDown, Clock, ArrowRight } from "lucide-react";

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

export default function CoursesClient({ initialCourses, categories, faculty, initialCategory, initialSearch }: Props) {
  const [activeTab, setActiveTab] = useState(initialCategory || "ALL");
  const [search, setSearch] = useState(initialSearch || "");
  const [selectedFaculty, setSelectedFaculty] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sortOrder, setSortOrder] = useState("DEFAULT");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = initialCourses.filter((course) => {
    // Category match
    const matchCategory = activeTab === "ALL" || course.category.type === activeTab.toUpperCase();
    
    // Search match
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()) ||
      course.slug.toLowerCase().includes(search.toLowerCase());
    
    // Faculty match
    const matchFaculty = selectedFaculty === "ALL" || (course.faculty && course.faculty.id === selectedFaculty);
    
    // Price match
    const matchPrice = course.price <= maxPrice;

    return matchCategory && matchSearch && matchFaculty && matchPrice;
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
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search */}
          <div className="relative md:col-span-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Faculty Dropdown */}
          <div className="md:col-span-3">
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
          <div className="md:col-span-3">
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

          {/* Filters Toggle Button (Mobile/Tablet) */}
          <div className="md:col-span-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="btn-secondary w-full justify-center text-sm py-2.5 flex items-center gap-2"
            >
              <SlidersHorizontal size={14} /> Price Filter
            </button>
          </div>
        </div>

        {/* Price Slider Overlay */}
        {(showMobileFilters || true) && (
          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)] mb-2">
                <span>Price Limit</span>
                <span className="text-blue-600 dark:text-blue-400">Up to ₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div className="text-xs text-[var(--text-muted)] font-medium">
              Showing {sorted.length} courses matching price limit
            </div>
          </div>
        )}
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((course) => {
          const discount = course.mrp > course.price ? Math.round(((course.mrp - course.price) / course.mrp) * 100) : 0;

          return (
            <div key={course.id} className="card overflow-hidden group flex flex-col justify-between text-left">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-75 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <BookOpen size={48} className="text-blue-500 opacity-30" />
                  )}
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
              </div>

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
                    href={`/courses/${course.slug}`}
                    className="flex-1 btn-secondary text-xs py-2.5 px-3 justify-center rounded-xl font-bold"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/checkout?type=course&id=${course.id}`}
                    className="flex-1 btn-primary text-xs py-2.5 px-3 justify-center rounded-xl font-bold"
                  >
                    Enroll Now
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
