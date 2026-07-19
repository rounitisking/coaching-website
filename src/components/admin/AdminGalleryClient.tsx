"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, GalleryHorizontal, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { adminCreateGalleryImage, adminUpdateGalleryImage, adminDeleteGalleryImage } from "@/actions/admin";

interface GalleryImage {
  id: string; url: string; caption?: string | null;
  category?: string | null; order: number; isActive: boolean;
}

export function AdminGalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => { setUrl(""); setCaption(""); setCategory(""); setOrder(0); setIsActive(true); setActiveImage(null); setError(""); };

  const openAdd = () => { resetForm(); setIsModalOpen(true); };
  const openEdit = (img: GalleryImage) => {
    setActiveImage(img); setUrl(img.url); setCaption(img.caption ?? "");
    setCategory(img.category ?? ""); setOrder(img.order); setIsActive(img.isActive);
    setError(""); setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    const data = { url, caption: caption || undefined, category: category || undefined, order, isActive };
    startTransition(async () => {
      const res = activeImage ? await adminUpdateGalleryImage(activeImage.id, data) : await adminCreateGalleryImage(data);
      if (res?.error) { setError(res.error); return; }
      const updated: GalleryImage = activeImage
        ? { ...activeImage, ...data, caption: data.caption ?? null, category: data.category ?? null }
        : { id: Math.random().toString(), url, caption: caption || null, category: category || null, order, isActive };
      setImages(prev => activeImage ? prev.map(i => i.id === activeImage.id ? updated : i) : [...prev, updated].sort((a, b) => a.order - b.order));
      setIsModalOpen(false); resetForm();
    });
  };

  const handleDelete = () => {
    if (!activeImage) return;
    startTransition(async () => {
      await adminDeleteGalleryImage(activeImage.id);
      setImages(prev => prev.filter(i => i.id !== activeImage.id));
      setIsConfirmOpen(false); setActiveImage(null);
    });
  };

  const CATEGORIES = Array.from(new Set(images.map(i => i.category).filter(Boolean))) as string[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GalleryHorizontal size={20} className="text-blue-500" />
          <h2 className="text-lg font-bold text-slate-100">Gallery ({images.length} images)</h2>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.length === 0 && (
          <div className="col-span-4 text-slate-500 text-center py-10 bg-slate-900 rounded-xl">No gallery images yet.</div>
        )}
        {images.map(img => (
          <div key={img.id} className={`group relative rounded-xl overflow-hidden bg-slate-800 aspect-square ${!img.isActive ? "opacity-50" : ""}`}>
            <img src={img.url} alt={img.caption ?? "Gallery"} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs truncate">{img.caption}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => openEdit(img)} className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-lg transition-colors">
                <Edit2 size={14} />
              </button>
              <button onClick={() => { setActiveImage(img); setIsConfirmOpen(true); }} className="text-white bg-red-600 hover:bg-red-500 p-2 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            {img.category && (
              <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">{img.category}</span>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={activeImage ? "Edit Gallery Image" : "Add Gallery Image"}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Image URL *</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://... or /gallery/image.jpg" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {url && <img src={url} alt="Preview" className="mt-2 h-24 w-full object-cover rounded-lg" onError={e => (e.currentTarget.style.display = "none")} />}
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Caption</label>
            <input value={caption} onChange={e => setCaption(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Category</label>
              <input value={category} onChange={e => setCategory(e.target.value)} list="gallery-categories" placeholder="Events, Campus..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <datalist id="gallery-categories">
                {CATEGORIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Display Order</label>
              <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="gallery-active" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
            <label htmlFor="gallery-active" className="text-sm text-slate-300">Active (visible on site)</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors">
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {activeImage ? "Save Changes" : "Add Image"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete}
        title="Delete Gallery Image" message="Delete this image from the gallery? This cannot be undone." />
    </div>
  );
}
