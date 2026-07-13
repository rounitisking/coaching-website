"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Trophy, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { adminCreateResult, adminUpdateResult, adminDeleteResult } from "@/actions/admin";

interface Category {
  id: string;
  name: string;
}

interface Result {
  id: string;
  studentName: string;
  photo?: string | null;
  exam: string;
  score?: string | null;
  rank?: string | null;
  year: number;
  categoryId?: string | null;
  category?: Category | null;
  isActive: boolean;
  order: number;
}

export function AdminResultsClient({ initialResults, categories }: { initialResults: Result[]; categories: Category[] }) {
  const [results, setResults] = useState<Result[]>(initialResults);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeResult, setActiveResult] = useState<Result | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [studentName, setStudentName] = useState("");
  const [exam, setExam] = useState("");
  const [photo, setPhoto] = useState("");
  const [score, setScore] = useState("");
  const [rank, setRank] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(0);

  const resetForm = () => {
    setStudentName("");
    setExam("");
    setPhoto("");
    setScore("");
    setRank("");
    setYear(new Date().getFullYear());
    setCategoryId(categories[0]?.id || "");
    setActive(true);
    setOrder(0);
    setActiveResult(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (r: Result) => {
    setActiveResult(r);
    setStudentName(r.studentName);
    setExam(r.exam);
    setPhoto(r.photo || "");
    setScore(r.score || "");
    setRank(r.rank || "");
    setYear(r.year);
    setCategoryId(r.categoryId || categories[0]?.id || "");
    setActive(r.isActive);
    setOrder(r.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !exam) return;

    const data = {
      studentName,
      exam,
      photo: photo || undefined,
      score: score || undefined,
      rank: rank || undefined,
      year: Number(year),
      categoryId: categoryId || undefined,
      isActive: active,
      order: Number(order),
    };

    startTransition(async () => {
      if (activeResult) {
        const res = await adminUpdateResult(activeResult.id, data);
        if (res.success) {
          setResults((prev) => prev.map((r) => (r.id === activeResult.id ? { ...r, ...data, category: categories.find((cat) => cat.id === categoryId) } : r)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateResult(data);
        if (res.success) {
          const newRes: Result = { id: Math.random().toString(), ...data, category: categories.find((cat) => cat.id === categoryId) };
          setResults((prev) => [...prev, newRes].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeResult) return;
    startTransition(async () => {
      const res = await adminDeleteResult(activeResult.id);
      if (res.success) {
        setResults((prev) => prev.filter((r) => r.id !== activeResult.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Selection
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Topper Student</th>
                <th>Exam Category</th>
                <th>Rank / Score</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">No topper records found.</td>
                </tr>
              ) : (
                results.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-amber-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{r.studentName}</span>
                      </div>
                    </td>
                    <td>{r.exam}</td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        {r.rank && <span className="badge badge-accent text-[9px] font-bold py-0">{r.rank}</span>}
                        {r.score && <span className="badge badge-brand text-[9px] font-bold py-0">{r.score}</span>}
                      </div>
                    </td>
                    <td>{r.year}</td>
                    <td>
                      <span className={`badge text-xs ${r.isActive ? "badge-success" : "badge-muted"}`}>
                        {r.isActive ? "Active" : "Hidden"}
                      </span>
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
                          onClick={() => { setActiveResult(r); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeResult ? "Edit Topper Details" : "New Selection Topper"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Student Name</label>
            <input type="text" className="input" placeholder="e.g. Sneha Patel" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Exam Name (e.g. CA Foundation)</label>
              <input type="text" className="input" placeholder="e.g. CA Foundation" value={exam} onChange={(e) => setExam(e.target.value)} required />
            </div>
            <div>
              <label className="label">Academic Year</label>
              <input type="number" className="input" value={year} onChange={(e) => setYear(Number(e.target.value))} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Rank Achieved (optional)</label>
              <input type="text" className="input" placeholder="e.g. AIR 4" value={rank} onChange={(e) => setRank(e.target.value)} />
            </div>
            <div>
              <label className="label">Score Achieved (optional)</label>
              <input type="text" className="input" placeholder="e.g. 365/400" value={score} onChange={(e) => setScore(e.target.value)} />
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

          <ImageUpload bucket="banners" value={photo} onChange={setPhoto} label="Student Photo" />

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Show selection on accomplishments board</label>
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
