"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Tag, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { createCategory, updateCategory, deleteCategory } from "@/actions/admin";

interface Category {
  id: string;
  name: string;
  slug: string;
  type: "COMMERCE" | "SCIENCE" | "SCHOOL";
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  order: number;
  isActive: boolean;
}

export function AdminCategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState<"COMMERCE" | "SCIENCE" | "SCHOOL">("COMMERCE");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const resetForm = () => {
    setName("");
    setType("COMMERCE");
    setDescription("");
    setOrder(0);
    setActive(true);
    setActiveCategory(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setActiveCategory(cat);
    setName(cat.name);
    setType(cat.type);
    setDescription(cat.description || "");
    setOrder(cat.order);
    setActive(cat.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const data = {
      name,
      slug,
      type,
      description: description || undefined,
      order: Number(order),
      isActive: active,
    };

    startTransition(async () => {
      if (activeCategory) {
        const res = await updateCategory(activeCategory.id, data);
        if (res.success) {
          setCategories((prev) => prev.map((c) => (c.id === activeCategory.id ? { ...c, ...data } : c)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await createCategory(data);
        if (res.success) {
          const newCat: Category = { id: Math.random().toString(), ...data };
          setCategories((prev) => [...prev, newCat].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeCategory) return;
    startTransition(async () => {
      const res = await deleteCategory(activeCategory.id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== activeCategory.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Group Type</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No categories found.</td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{c.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-brand text-[10px] font-bold tracking-wider">{c.type}</span>
                    </td>
                    <td>{c.order}</td>
                    <td>
                      <span className={`badge text-xs ${c.isActive ? "badge-success" : "badge-muted"}`}>
                        {c.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveCategory(c); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeCategory ? "Edit Category" : "New Category"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Category Name</label>
            <input type="text" className="input" placeholder="e.g. CA Foundation" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Syllabus Type</label>
              <select className="input py-2" value={type} onChange={(e) => setType(e.target.value as any)} required>
                <option value="COMMERCE">COMMERCE</option>
                <option value="SCIENCE">SCIENCE</option>
                <option value="SCHOOL">SCHOOL</option>
              </select>
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label">Brief Description</label>
            <textarea className="input h-16" placeholder="Brief outline of syllabus classes..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Active category visible in filter tabs</label>
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
