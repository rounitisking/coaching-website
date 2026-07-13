"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, FileText, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { adminCreateResource, adminUpdateResource, adminDeleteResource } from "@/actions/admin";

interface Category {
  id: string;
  name: string;
}

interface Resource {
  id: string;
  title: string;
  description?: string | null;
  type: "PDF" | "VIDEO" | "NOTES" | "BROCHURE" | "OTHER";
  fileUrl?: string | null;
  thumbnail?: string | null;
  subject?: string | null;
  price: number;
  mrp: number;
  isFree: boolean;
  isActive: boolean;
  categoryId?: string | null;
  category?: Category | null;
  order: number;
}

export function AdminResourcesClient({ initialResources, categories }: { initialResources: Resource[]; categories: Category[] }) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"PDF" | "VIDEO" | "NOTES" | "BROCHURE" | "OTHER">("PDF");
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [active, setActive] = useState(true);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [order, setOrder] = useState(0);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("PDF");
    setFileUrl("");
    setThumbnail("");
    setSubject("");
    setPrice(0);
    setMrp(0);
    setIsFree(true);
    setActive(true);
    setCategoryId(categories[0]?.id || "");
    setOrder(0);
    setActiveResource(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (r: Resource) => {
    setActiveResource(r);
    setTitle(r.title);
    setDescription(r.description || "");
    setType(r.type);
    setFileUrl(r.fileUrl || "");
    setThumbnail(r.thumbnail || "");
    setSubject(r.subject || "");
    setPrice(r.price || 0);
    setMrp(r.mrp || 0);
    setIsFree(r.isFree);
    setActive(r.isActive);
    setCategoryId(r.categoryId || categories[0]?.id || "");
    setOrder(r.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const data = {
      title,
      description: description || undefined,
      type,
      fileUrl: fileUrl || undefined,
      thumbnail: thumbnail || undefined,
      subject: subject || undefined,
      price: Number(price),
      mrp: Number(mrp),
      isFree,
      isActive: active,
      categoryId: categoryId || undefined,
      order: Number(order),
    };

    startTransition(async () => {
      if (activeResource) {
        const res = await adminUpdateResource(activeResource.id, data as any);
        if (res.success) {
          setResources((prev) => prev.map((r) => (r.id === activeResource.id ? { ...r, ...data, category: categories.find((cat) => cat.id === categoryId) } : r)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateResource(data as any);
        if (res.success) {
          const newRes: Resource = { id: Math.random().toString(), ...data, category: categories.find((cat) => cat.id === categoryId) };
          setResources((prev) => [...prev, newRes].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeResource) return;
    startTransition(async () => {
      const res = await adminDeleteResource(activeResource.id);
      if (res.success) {
        setResources((prev) => prev.filter((r) => r.id !== activeResource.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Material
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Resource details</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Redirection URL</th>
                <th>Price Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">No resources found.</td>
                </tr>
              ) : (
                resources.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{r.title}</span>
                      </div>
                    </td>
                    <td>{r.type}</td>
                    <td>{r.subject || "-"}</td>
                    <td className="text-xs text-slate-450 truncate max-w-[150px]">{r.fileUrl || "-"}</td>
                    <td>
                      {r.isFree ? (
                        <span className="badge badge-success text-[10px] font-bold py-0">Free</span>
                      ) : (
                        <span className="badge badge-brand text-[10px] font-bold py-0">₹{r.price}</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(r)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveResource(r); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeResource ? "Edit Study Material" : "New Study Material"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Resource Title</label>
            <input type="text" className="input" placeholder="e.g. Chapter 1 revision notes" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="label">Short Description</label>
            <textarea className="input h-16" placeholder="Write description details..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Resource Type</label>
              <select className="input py-2" value={type} onChange={(e) => setType(e.target.value as any)} required>
                <option value="PDF">PDF Document</option>
                <option value="NOTES">Handwritten Notes</option>
                <option value="VIDEO">Video Guide</option>
                <option value="BROCHURE">Course Syllabus</option>
                <option value="OTHER">Other Download</option>
              </select>
            </div>
            <div>
              <label className="label">Subject Specialization</label>
              <input type="text" className="input" placeholder="e.g. Accountancy" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category Group</label>
              <select className="input py-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label">Resource File Link (optional pasted URL)</label>
            <input type="text" className="input" placeholder="e.g. https://supabase.../file.pdf" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="free-check" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="free-check" className="text-xs font-semibold text-slate-500">Free download access</label>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Publish immediately</label>
            </div>
          </div>

          {!isFree && (
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-900 pt-4">
              <div>
                <label className="label">Price (INR)</label>
                <input type="number" className="input" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              </div>
              <div>
                <label className="label">Original MRP (INR)</label>
                <input type="number" className="input" value={mrp} onChange={(e) => setMrp(Number(e.target.value))} />
              </div>
            </div>
          )}

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
