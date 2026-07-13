"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Star, Loader2, User } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { adminCreateTestimonial, adminUpdateTestimonial, adminDeleteTestimonial } from "@/actions/admin";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  avatar?: string | null;
  rating: number;
  course?: string | null;
  year?: number | null;
  isActive: boolean;
  order: number;
}

export function AdminTestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState(5);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(0);

  const resetForm = () => {
    setName("");
    setText("");
    setAvatar("");
    setRating(5);
    setCourse("");
    setYear(new Date().getFullYear());
    setActive(true);
    setOrder(0);
    setActiveTestimonial(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setActiveTestimonial(t);
    setName(t.name);
    setText(t.text);
    setAvatar(t.avatar || "");
    setRating(t.rating || 5);
    setCourse(t.course || "");
    setYear(t.year || new Date().getFullYear());
    setActive(t.isActive);
    setOrder(t.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const data = {
      name,
      text,
      avatar: avatar || undefined,
      rating: Number(rating),
      course: course || undefined,
      year: Number(year),
      isActive: active,
      order: Number(order),
    };

    startTransition(async () => {
      if (activeTestimonial) {
        const res = await adminUpdateTestimonial(activeTestimonial.id, data);
        if (res.success) {
          setTestimonials((prev) => prev.map((t) => (t.id === activeTestimonial.id ? { ...t, ...data } : t)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateTestimonial(data);
        if (res.success) {
          const newTestimonial: Testimonial = { id: Math.random().toString(), ...data };
          setTestimonials((prev) => [...prev, newTestimonial].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeTestimonial) return;
    startTransition(async () => {
      const res = await adminDeleteTestimonial(activeTestimonial.id);
      if (res.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== activeTestimonial.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course Reference</th>
                <th>Rating</th>
                <th>Feedback Snippet</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">No testimonials found.</td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{t.name}</span>
                      </div>
                    </td>
                    <td>{t.course}</td>
                    <td>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold">{t.rating}/5</span>
                      </div>
                    </td>
                    <td className="text-xs text-slate-400 max-w-[200px] truncate">{t.text}</td>
                    <td>
                      <span className={`badge text-xs ${t.isActive ? "badge-success" : "badge-muted"}`}>
                        {t.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(t)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveTestimonial(t); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeTestimonial ? "Edit Testimonial" : "New Testimonial"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Student Name</label>
            <input type="text" className="input" placeholder="e.g. Riya Kapoor" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Class / Course (e.g. CA Foundation)</label>
              <input type="text" className="input" placeholder="e.g. CA Foundation" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div>
              <label className="label">Graduation Year</label>
              <input type="number" className="input" value={year} onChange={(e) => setYear(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Star Rating (1-5)</label>
              <select className="input py-2" value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label">Testimonial Quote Text</label>
            <textarea className="input h-24" placeholder="Write feedback details..." value={text} onChange={(e) => setText(e.target.value)} required />
          </div>

          <ImageUpload bucket="profile-images" value={avatar} onChange={setAvatar} label="Student Photo Profile" />

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Active slide visible in slide reel</label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary btn-sm" disabled={isPending}>Cancel</button>
            <button type="submit" className="btn-primary btn-sm flex items-center gap-1.5" disabled={isPending}>
              {isPending && <Loader2 size={14} className="animate-spin" />} Save
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete} isPending={isPending} />
    </div>
  );
}
