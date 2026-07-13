"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Users, Loader2, Sparkles } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { adminCreateFaculty, adminUpdateFaculty, adminDeleteFaculty } from "@/actions/admin";

interface Faculty {
  id: string;
  name: string;
  slug: string;
  designation: string;
  subjects: string[];
  photo?: string | null;
  bio?: string | null;
  experience?: number | null;
  featured: boolean;
  isActive: boolean;
  order: number;
}

export function AdminFacultyClient({ initialFaculty }: { initialFaculty: Faculty[] }) {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeFaculty, setActiveFaculty] = useState<Faculty | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [subjectsText, setSubjectsText] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(0);

  const resetForm = () => {
    setName("");
    setDesignation("");
    setSubjectsText("");
    setPhoto("");
    setBio("");
    setExperience(0);
    setFeatured(false);
    setActive(true);
    setOrder(0);
    setActiveFaculty(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (f: Faculty) => {
    setActiveFaculty(f);
    setName(f.name);
    setDesignation(f.designation);
    setSubjectsText(f.subjects.join(", "));
    setPhoto(f.photo || "");
    setBio(f.bio || "");
    setExperience(f.experience || 0);
    setFeatured(f.featured);
    setActive(f.isActive);
    setOrder(f.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const subjects = subjectsText.split(",").map((s) => s.trim()).filter((s) => s.length > 0);

    const data = {
      name,
      slug,
      designation,
      subjects,
      photo: photo || undefined,
      bio: bio || undefined,
      experience: Number(experience),
      featured,
      isActive: active,
      order: Number(order),
    };

    startTransition(async () => {
      if (activeFaculty) {
        const res = await adminUpdateFaculty(activeFaculty.id, data);
        if (res.success) {
          setFaculty((prev) => prev.map((f) => (f.id === activeFaculty.id ? { ...f, ...data } : f)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await adminCreateFaculty(data);
        if (res.success) {
          const newFaculty: Faculty = { id: Math.random().toString(), ...data };
          setFaculty((prev) => [...prev, newFaculty].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeFaculty) return;
    startTransition(async () => {
      const res = await adminDeleteFaculty(activeFaculty.id);
      if (res.success) {
        setFaculty((prev) => prev.filter((f) => f.id !== activeFaculty.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Teacher Profile</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">No teachers found.</td>
                </tr>
              ) : (
                faculty.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{f.name}</span>
                      </div>
                    </td>
                    <td>{f.designation}</td>
                    <td>{f.experience || 0} Years</td>
                    <td>
                      {f.featured ? (
                        <span className="text-amber-500 font-bold text-xs flex items-center gap-1">
                          <Sparkles size={12} fill="currentColor" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">No</span>
                      )}
                    </td>
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
                          onClick={() => { setActiveFaculty(f); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeFaculty ? "Edit Teacher Profile" : "New Teacher"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" className="input" placeholder="e.g. CA Rajesh Kumar" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="label">Designation / Role</label>
            <input type="text" className="input" placeholder="e.g. Accounts Partner Faculty" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
          </div>

          <div>
            <label className="label">Subjects Taught (comma-separated)</label>
            <input type="text" className="input" placeholder="e.g. Accountancy, Business Studies" value={subjectsText} onChange={(e) => setSubjectsText(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Years of Experience</label>
              <input type="number" className="input" value={experience} onChange={(e) => setExperience(Number(e.target.value))} />
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label">Detailed Bio</label>
            <textarea className="input h-20" placeholder="Summary of academic achievements, experience..." value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <ImageUpload bucket="faculty-images" value={photo} onChange={setPhoto} label="Teacher Portrait Image" />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured-check" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="featured-check" className="text-xs font-semibold text-slate-500">Featured Teacher</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
              <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Active Profile</label>
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
