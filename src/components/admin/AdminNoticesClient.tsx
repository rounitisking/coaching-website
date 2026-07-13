"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Bell, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { adminCreateNotice, adminUpdateNotice, adminDeleteNotice } from "@/actions/admin";

interface Notice {
  id: string;
  title: string;
  content?: string | null;
  link?: string | null;
  isUrgent: boolean;
  isActive: boolean;
  expiresAt?: Date | null;
  order: number;
}

export function AdminNoticesClient({ initialNotices }: { initialNotices: Notice[] }) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [active, setActive] = useState(true);
  const [expiresAtText, setExpiresAtText] = useState("");
  const [order, setOrder] = useState(0);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setLink("");
    setUrgent(false);
    setActive(true);
    setExpiresAtText("");
    setOrder(0);
    setActiveNotice(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (n: Notice) => {
    setActiveNotice(n);
    setTitle(n.title);
    setContent(n.content || "");
    setLink(n.link || "");
    setUrgent(n.isUrgent);
    setActive(n.isActive);
    setExpiresAtText(n.expiresAt ? new Date(n.expiresAt).toISOString().split("T")[0] : "");
    setOrder(n.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const data = {
      title,
      content: content || undefined,
      link: link || undefined,
      isUrgent: urgent,
      isActive: active,
      expiresAt: expiresAtText ? new Date(expiresAtText) : undefined,
      order: Number(order),
    };

    startTransition(async () => {
      if (activeNotice) {
        const res = await adminUpdateNotice(activeNotice.id, data);
        if (res.success) {
          setNotices((prev) => prev.map((n) => (n.id === activeNotice.id ? { ...n, ...data } : n)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateNotice(data);
        if (res.success) {
          const newNotice: Notice = { id: Math.random().toString(), ...data };
          setNotices((prev) => [...prev, newNotice].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeNotice) return;
    startTransition(async () => {
      const res = await adminDeleteNotice(activeNotice.id);
      if (res.success) {
        setNotices((prev) => prev.filter((n) => n.id !== activeNotice.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Notice
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Notice Headline</th>
                <th>Redirect Link</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No notices found.</td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr key={n.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Bell size={15} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{n.title}</span>
                      </div>
                    </td>
                    <td>{n.link || "-"}</td>
                    <td>
                      {n.isUrgent ? (
                        <span className="badge badge-error text-[10px] font-bold py-0">Urgent</span>
                      ) : (
                        <span className="text-slate-400 text-xs">Standard</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge text-xs ${n.isActive ? "badge-success" : "badge-muted"}`}>
                        {n.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(n)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveNotice(n); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeNotice ? "Edit Notice" : "New Notice"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Headline Notice Title</label>
            <input type="text" className="input" placeholder="e.g. CA Foundation batches starting next Monday!" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="label">Redirection Link URL (optional)</label>
            <input type="text" className="input" placeholder="e.g. /courses/ca-foundation" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Expiration Date (optional)</label>
              <input type="date" className="input" value={expiresAtText} onChange={(e) => setExpiresAtText(e.target.value)} />
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="urgent-check" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="urgent-check" className="text-xs font-semibold text-slate-500">Urgent Red Banner</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Show this notice</label>
            </div>
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
