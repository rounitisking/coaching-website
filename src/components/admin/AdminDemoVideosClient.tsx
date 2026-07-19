"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Video, Loader2, Star, ExternalLink } from "lucide-react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { adminCreateDemoVideo, adminUpdateDemoVideo, adminDeleteDemoVideo } from "@/actions/admin";

interface Faculty { id: string; name: string }
interface Course { id: string; title: string }
interface DemoVideo {
  id: string; title: string; youtubeUrl: string; youtubeVideoId: string;
  thumbnailUrl?: string | null; subject?: string | null; duration?: string | null;
  description?: string | null; featured: boolean; isActive: boolean; order: number;
  facultyId?: string | null; courseId?: string | null;
  faculty?: Faculty | null; course?: Course | null;
}

export function AdminDemoVideosClient({
  initialVideos, facultyList, courses,
}: { initialVideos: DemoVideo[]; facultyList: Faculty[]; courses: Course[] }) {
  const [videos, setVideos] = useState<DemoVideo[]>(initialVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<DemoVideo | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const extractVideoId = (url: string) => {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
    return m ? m[1] : url;
  };

  const resetForm = () => {
    setTitle(""); setYoutubeUrl(""); setYoutubeVideoId(""); setSubject("");
    setDuration(""); setDescription(""); setFacultyId(""); setCourseId("");
    setFeatured(false); setOrder(0); setActiveVideo(null); setError("");
  };

  const openAdd = () => { resetForm(); setIsModalOpen(true); };
  const openEdit = (v: DemoVideo) => {
    setActiveVideo(v); setTitle(v.title); setYoutubeUrl(v.youtubeUrl);
    setYoutubeVideoId(v.youtubeVideoId); setSubject(v.subject ?? "");
    setDuration(v.duration ?? ""); setDescription(v.description ?? "");
    setFacultyId(v.facultyId ?? ""); setCourseId(v.courseId ?? "");
    setFeatured(v.featured); setOrder(v.order); setError(""); setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    const vid = extractVideoId(youtubeUrl) || youtubeVideoId;
    const data = {
      title, youtubeUrl, youtubeVideoId: vid,
      subject: subject || undefined, duration: duration || undefined,
      description: description || undefined,
      facultyId: facultyId || undefined, courseId: courseId || undefined,
      featured, order,
    };
    startTransition(async () => {
      const res = activeVideo ? await adminUpdateDemoVideo(activeVideo.id, data) : await adminCreateDemoVideo(data);
      if (res?.error) { setError(res.error); return; }
      const updated: DemoVideo = activeVideo
        ? { ...activeVideo, ...data, faculty: facultyList.find(f => f.id === facultyId) ?? null, course: courses.find(c => c.id === courseId) ?? null }
        : { id: Math.random().toString(), ...data, thumbnailUrl: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`, isActive: true, faculty: facultyList.find(f => f.id === facultyId) ?? null, course: courses.find(c => c.id === courseId) ?? null, facultyId: facultyId || null, courseId: courseId || null };
      setVideos(prev => activeVideo ? prev.map(v => v.id === activeVideo.id ? updated : v) : [updated, ...prev]);
      setIsModalOpen(false); resetForm();
    });
  };

  const handleDelete = () => {
    if (!activeVideo) return;
    startTransition(async () => {
      await adminDeleteDemoVideo(activeVideo.id);
      setVideos(prev => prev.filter(v => v.id !== activeVideo.id));
      setIsConfirmOpen(false); setActiveVideo(null);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Video size={20} className="text-blue-500" />
          <h2 className="text-lg font-bold text-slate-100">Demo Videos ({videos.length})</h2>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus size={16} /> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.length === 0 && (
          <div className="col-span-2 text-slate-500 text-center py-10 bg-slate-900 rounded-xl">No demo videos yet.</div>
        )}
        {videos.map(v => (
          <div key={v.id} className="bg-slate-900 rounded-xl overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-slate-800">
              {v.thumbnailUrl && <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />}
              {v.featured && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Star size={10} />Featured</span>
              )}
              <a href={v.youtubeUrl} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-white bg-black/60 hover:bg-black/80 p-1.5 rounded-lg transition-colors">
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <p className="text-sm font-semibold text-slate-100 line-clamp-2">{v.title}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {v.subject && <span className="text-xs text-blue-400">{v.subject}</span>}
                {v.duration && <span className="text-xs text-slate-500">{v.duration}</span>}
                {v.faculty && <span className="text-xs text-slate-400">{v.faculty.name}</span>}
              </div>
              <div className="flex items-center gap-2 mt-auto pt-3">
                <button onClick={() => openEdit(v)} className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-1 transition-colors">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => { setActiveVideo(v); setIsConfirmOpen(true); }} className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 flex items-center justify-center gap-1 transition-colors">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={activeVideo ? "Edit Demo Video" : "Add Demo Video"}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">YouTube URL * (Video ID will be extracted automatically)</label>
              <input value={youtubeUrl} onChange={e => { setYoutubeUrl(e.target.value); setYoutubeVideoId(extractVideoId(e.target.value)); }}
                placeholder="https://www.youtube.com/watch?v=..." required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Mathematics" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Duration</label>
              <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="45 min" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Faculty</label>
              <select value={facultyId} onChange={e => setFacultyId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- None --</option>
                {facultyList.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Course</label>
              <select value={courseId} onChange={e => setCourseId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- None --</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Display Order</label>
              <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <input type="checkbox" id="featured-vid" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
              <label htmlFor="featured-vid" className="text-sm text-slate-300">Featured</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors">
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {activeVideo ? "Save Changes" : "Add Video"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete}
        title="Delete Demo Video" message={`Delete "${activeVideo?.title}"? This cannot be undone.`} />
    </div>
  );
}
