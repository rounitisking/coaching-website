import { adminGetAllGalleryImages } from "@/actions/admin";
import { AdminGalleryClient } from "@/components/admin/AdminGalleryClient";
import { GalleryHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await adminGetAllGalleryImages();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <GalleryHorizontal size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100">Gallery Management</h1>
        </div>
        <p className="text-slate-500 text-sm">Add, edit, and organise gallery images. Use category labels to group them.</p>
      </div>
      <AdminGalleryClient
        initialImages={images.map(i => ({
          ...i,
          caption: i.caption ?? null,
          category: i.category ?? null,
        }))}
      />
    </div>
  );
}
