"use client";

import { useState, useTransition } from "react";
import { Plus, Search, Edit2, Trash2, Check, X, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ImageUpload } from "./ImageUpload";
import { createHeroBanner, updateHeroBanner, deleteHeroBanner } from "@/actions/admin";

interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  image?: string | null;
  badgeText?: string | null;
  isActive: boolean;
  order: number;
}

export function AdminBannersClient({ initialBanners }: { initialBanners: Banner[] }) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [image, setImage] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setCtaText("");
    setCtaUrl("");
    setImage("");
    setBadgeText("");
    setOrder(0);
    setActive(true);
    setActiveBanner(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setActiveBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setDescription(banner.description || "");
    setCtaText(banner.ctaText || "");
    setCtaUrl(banner.ctaUrl || "");
    setImage(banner.image || "");
    setBadgeText(banner.badgeText || "");
    setOrder(banner.order);
    setActive(banner.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const data = {
      title,
      subtitle: subtitle || undefined,
      description: description || undefined,
      ctaText: ctaText || undefined,
      ctaUrl: ctaUrl || undefined,
      image: image || undefined,
      badgeText: badgeText || undefined,
      order: Number(order),
      isActive: active,
    };

    startTransition(async () => {
      if (activeBanner) {
        const res = await updateHeroBanner(activeBanner.id, data);
        if (res.success) {
          setBanners((prev) => prev.map((b) => (b.id === activeBanner.id ? { ...b, ...data } : b)));
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        const res = await createHeroBanner(data);
        if (res.success) {
          const newBanner: Banner = { id: Math.random().toString(), ...data };
          setBanners((prev) => [...prev, newBanner].sort((a, b) => a.order - b.order));
          setIsModalOpen(false);
          resetForm();
        }
      }
    });
  };

  const handleDelete = () => {
    if (!activeBanner) return;
    startTransition(async () => {
      const res = await deleteHeroBanner(activeBanner.id);
      if (res.success) {
        setBanners((prev) => prev.filter((b) => b.id !== activeBanner.id));
        setIsConfirmOpen(false);
        resetForm();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openAddModal} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title / Headline</th>
                <th>CTA Text</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No banners found.</td>
                </tr>
              ) : (
                banners.map((b) => (
                  <tr key={b.id}>
                    <td className="font-bold text-slate-800 dark:text-slate-200">{b.title}</td>
                    <td>{b.ctaText || "-"}</td>
                    <td>{b.order}</td>
                    <td>
                      <span className={`badge text-xs ${b.isActive ? "badge-success" : "badge-muted"}`}>
                        {b.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(b)}
                          className="p-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Edit2 size={12} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => { setActiveBanner(b); setIsConfirmOpen(true); }}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeBanner ? "Edit Banner" : "New Banner"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Headline Title</label>
            <input type="text" className="input" placeholder="e.g. Commerce Coaching Classes" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="label">Subtitle / Highlight</label>
            <input type="text" className="input" placeholder="e.g. Admissions Open 2025" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <div>
            <label className="label">Description Text</label>
            <textarea className="input h-16" placeholder="Write descriptions here..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">CTA Button Label</label>
              <input type="text" className="input" placeholder="e.g. Enroll Now" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
            </div>
            <div>
              <label className="label">CTA Button URL</label>
              <input type="text" className="input" placeholder="e.g. /courses" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Badge Text</label>
              <input type="text" className="input" placeholder="e.g. Est. 2013" value={badgeText} onChange={(e) => setBadgeText(e.target.value)} />
            </div>
            <div>
              <label className="label">Sort Order</label>
              <input type="number" className="input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <ImageUpload bucket="banners" value={image} onChange={setImage} label="Background Image" />

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active-check" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">Show this banner slide on homepage</label>
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
