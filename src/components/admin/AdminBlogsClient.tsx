"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Newspaper, Loader2, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { adminCreateBlog, adminUpdateBlog, adminDeleteBlog } from "@/actions/admin";

interface BlogCategory { id: string; name: string }
interface Blog {
  id: string; title: string; slug: string; excerpt?: string | null;
  content: string; featuredImage?: string | null; tags: string[];
  readTime?: number | null; featured: boolean; isPublished: boolean; isActive: boolean;
  categoryId?: string | null;
  category?: BlogCategory | null;
  author?: { id: string; name?: string | null } | null;
  createdAt: Date;
}

export function AdminBlogsClient({
  initialBlogs, categories,
}: { initialBlogs: Blog[]; categories: BlogCategory[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState(5);
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const resetForm = () => {
    setTitle(""); setSlug(""); setExcerpt(""); setContent("");
    setFeaturedImage(""); setCategoryId(""); setTags(""); setReadTime(5);
    setFeatured(false); setIsPublished(false); setActiveBlog(null); setError("");
  };

  const autoSlug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openAdd = () => { resetForm(); setIsModalOpen(true); };
  const openEdit = (b: Blog) => {
    setActiveBlog(b);
    setTitle(b.title); setSlug(b.slug); setExcerpt(b.excerpt ?? "");
    setContent(b.content); setFeaturedImage(b.featuredImage ?? "");
    setCategoryId(b.categoryId ?? ""); setTags((b.tags ?? []).join(", "));
    setReadTime(b.readTime ?? 5); setFeatured(b.featured); setIsPublished(b.isPublished);
    setError(""); setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const data = {
      title, slug, excerpt: excerpt || undefined, content,
      featuredImage: featuredImage || undefined, categoryId: categoryId || undefined,
      tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      readTime, featured, isPublished,
    };
    startTransition(async () => {
      const res = activeBlog ? await adminUpdateBlog(activeBlog.id, data) : await adminCreateBlog(data);
      if (res?.error) { setError(res.error); return; }
      // Refresh list
      const updated: Blog = activeBlog
        ? { ...activeBlog, ...data, category: categories.find(c => c.id === categoryId) ?? null }
        : { id: Math.random().toString(), ...data, isActive: true, tags: data.tags, featuredImage: data.featuredImage ?? null, excerpt: data.excerpt ?? null, category: categories.find(c => c.id === categoryId) ?? null, author: null, createdAt: new Date() };
      setBlogs(prev => activeBlog ? prev.map(b => b.id === activeBlog.id ? updated : b) : [updated, ...prev]);
      setIsModalOpen(false); resetForm();
    });
  };

  const handleDelete = () => {
    if (!activeBlog) return;
    startTransition(async () => {
      await adminDeleteBlog(activeBlog.id);
      setBlogs(prev => prev.filter(b => b.id !== activeBlog.id));
      setIsConfirmOpen(false); setActiveBlog(null);
    });
  };

  const handleQuickToggle = (b: Blog) => {
    startTransition(async () => {
      await adminUpdateBlog(b.id, { isPublished: !b.isPublished });
      setBlogs(prev => prev.map(x => x.id === b.id ? { ...x, isPublished: !x.isPublished } : x));
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper size={20} className="text-blue-500" />
          <h2 className="text-lg font-bold text-slate-100">Blog Posts ({blogs.length})</h2>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {blogs.length === 0 && (
          <div className="text-slate-500 text-center py-10 bg-slate-900 rounded-xl">No blog posts yet. Click "New Post" to create one.</div>
        )}
        {blogs.map(b => (
          <div key={b.id} className="bg-slate-900 rounded-xl p-4 flex items-start gap-4">
            {b.featuredImage && (
              <img src={b.featuredImage} alt={b.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-100 text-sm">{b.title}</span>
                {b.featured && <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">Featured</span>}
                {b.isPublished
                  ? <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10} />Published</span>
                  : <span className="bg-slate-700/50 text-slate-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={10} />Draft</span>
                }
              </div>
              <p className="text-slate-500 text-xs mt-1 truncate">{b.excerpt || b.slug}</p>
              {b.category && <span className="text-blue-400 text-xs">{b.category.name}</span>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleQuickToggle(b)} title={b.isPublished ? "Unpublish" : "Publish"} className="text-slate-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                {b.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => openEdit(b)} className="text-slate-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                <Edit2 size={14} />
              </button>
              <button onClick={() => { setActiveBlog(b); setIsConfirmOpen(true); }} className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={activeBlog ? "Edit Blog Post" : "New Blog Post"}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Title *</label>
              <input value={title} onChange={e => { setTitle(e.target.value); if (!activeBlog) setSlug(autoSlug(e.target.value)); }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Slug *</label>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Category</label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- None --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Read Time (min)</label>
              <input type="number" min={1} value={readTime} onChange={e => setReadTime(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Featured Image URL</label>
              <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="https://..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Excerpt</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Content * (Markdown or plain text)</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Tags (comma-separated)</label>
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="JEE, Maths, Tips" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured-blog" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
              <label htmlFor="featured-blog" className="text-sm text-slate-300">Featured</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published-blog" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
              <label htmlFor="published-blog" className="text-sm text-slate-300">Published</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors">
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {activeBlog ? "Save Changes" : "Create Post"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete}
        title="Delete Blog Post" message={`Are you sure you want to delete "${activeBlog?.title}"? This action cannot be undone.`} />
    </div>
  );
}
