"use client";

import { useState, useTransition } from "react";
import { Plus, Search, Edit2, Trash2, Check, X, Loader2, Sparkles, BookOpen } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { adminCreateCourse, adminUpdateCourse, adminDeleteCourse } from "@/actions/admin";

interface Category {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  price: number;
  mrp: number;
  thumbnail?: string | null;
  featured: boolean;
  isActive: boolean;
  categoryId: string;
  category?: Category | null;
}

interface AdminCoursesClientProps {
  initialCourses: Course[];
  categories: Category[];
}

export function AdminCoursesClient({ initialCourses, categories }: AdminCoursesClientProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId(categories[0]?.id || "");
    setPrice(0);
    setMrp(0);
    setThumbnail("");
    setFeatured(false);
    setActive(true);
    setActiveCourse(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setActiveCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setCategoryId(course.categoryId);
    setPrice(course.price);
    setMrp(course.mrp);
    setThumbnail(course.thumbnail || "");
    setFeatured(course.featured);
    setActive(course.isActive);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (course: Course) => {
    setActiveCourse(course);
    setIsConfirmOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !categoryId) return;

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const data = {
      title,
      slug,
      description,
      categoryId,
      price: Number(price),
      mrp: Number(mrp),
      thumbnail: thumbnail || undefined,
      featured,
      isActive: active,
    };

    startTransition(async () => {
      if (activeCourse) {
        // Edit mode
        const res = await adminUpdateCourse(activeCourse.id, data);
        if (res.success) {
          setCourses((prev) =>
            prev.map((c) =>
              c.id === activeCourse.id
                ? { ...c, ...data, category: categories.find((cat) => cat.id === categoryId) }
                : c
            )
          );
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        // Create mode
        const res = await adminCreateCourse(data);
        if (res.success) {
          // Simplistic local state refresh (you would normally refetch or receive the item back)
          // For now, let's create a temporary object that will be replaced on full reload
          const newCourse: Course = {
            id: Math.random().toString(),
            ...data,
            category: categories.find((cat) => cat.id === categoryId) || null,
          };
          setCourses((prev) => [newCourse, ...prev]);
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeCourse) return;
    startTransition(async () => {
      const res = await adminDeleteCourse(activeCourse.id);
      if (res.success) {
        setCourses((prev) => prev.filter((c) => c.id !== activeCourse.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Action Header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            className="input pl-10 py-2.5"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={openAddModal} className="btn-primary w-full sm:w-auto flex items-center gap-1.5">
          <Plus size={16} /> Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Details</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No courses found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600">
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{course.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[150px]">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-brand text-xs">
                        {course.category?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="font-semibold text-slate-850 dark:text-slate-100">
                      ₹{course.price} <span className="text-[10px] line-through text-slate-400 font-normal">₹{course.mrp}</span>
                    </td>
                    <td>
                      {course.featured ? (
                        <span className="text-amber-500 font-bold text-xs flex items-center gap-1">
                          <Sparkles size={12} fill="currentColor" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">No</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge text-xs ${course.isActive ? "badge-success" : "badge-muted"}`}>
                        {course.isActive ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(course)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(course)}
                          className="p-1.5 rounded-lg border hover:bg-red-50 dark:hover:bg-red-950/20"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeCourse ? "Edit Course Details" : "Create New Course"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Course Title</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. CA Foundation Fastrack"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Short Description</label>
            <textarea
              className="input h-20"
              placeholder="Provide a brief summary of course topics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select
                className="input py-2"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Featured on Home</label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Featured Product
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Enrollment Price (INR)</label>
              <input
                type="number"
                className="input"
                placeholder="10000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={0}
                required
              />
            </div>

            <div>
              <label className="label">Original MRP (INR)</label>
              <input
                type="number"
                className="input"
                placeholder="15000"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                min={0}
                required
              />
            </div>
          </div>

          <ImageUpload
            bucket="course-images"
            value={thumbnail}
            onChange={setThumbnail}
            label="Thumbnail Image URL"
          />

          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-900">
            <input
              type="checkbox"
              id="active-check"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded"
            />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Publish directly to catalog (Active)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary btn-sm rounded-lg"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary btn-sm rounded-lg flex items-center gap-1.5"
              disabled={isPending}
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </div>
  );
}
