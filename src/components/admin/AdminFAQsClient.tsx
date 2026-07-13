"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, HelpCircle, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { adminCreateFAQ, adminUpdateFAQ, adminDeleteFAQ } from "@/actions/admin";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  isActive: boolean;
  order: number;
}

export function AdminFAQsClient({ initialFAQs }: { initialFAQs: FAQ[] }) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<FAQ | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setOrder(0);
    setActive(true);
    setActiveFAQ(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (f: FAQ) => {
    setActiveFAQ(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category || "General");
    setOrder(f.order);
    setActive(f.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    const data = {
      question,
      answer,
      category: category || undefined,
      order: Number(order),
      isActive: active,
    };

    startTransition(async () => {
      if (activeFAQ) {
        const res = await adminUpdateFAQ(activeFAQ.id, data);
        if (res.success) {
          setFaqs((prev) => prev.map((f) => (f.id === activeFAQ.id ? { ...f, ...data } : f)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateFAQ(data);
        if (res.success) {
          const newFAQ: FAQ = { id: Math.random().toString(), ...data };
          setFaqs((prev) => [...prev, newFAQ].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeFAQ) return;
    startTransition(async () => {
      const res = await adminDeleteFAQ(activeFAQ.id);
      if (res.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== activeFAQ.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No FAQ entries found.</td>
                </tr>
              ) : (
                faqs.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <HelpCircle size={15} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{f.question}</span>
                      </div>
                    </td>
                    <td>{f.category || "General"}</td>
                    <td>{f.order}</td>
                    <td>
                      <span className={`badge text-xs ${f.isActive ? "badge-success" : "badge-muted"}`}>
                        {f.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(f)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveFAQ(f); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeFAQ ? "Edit FAQ" : "New FAQ"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Question Text</label>
            <input type="text" className="input" placeholder="e.g. When are class batches starting?" value={question} onChange={(e) => setQuestion(e.target.value)} required />
          </div>

          <div>
            <label className="label">Answer Explanations</label>
            <textarea className="input h-24" placeholder="Provide a detailed explanation..." value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Group / Category</label>
              <input type="text" className="input" placeholder="e.g. Admissions" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Active accordion item visible on home pages</label>
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
