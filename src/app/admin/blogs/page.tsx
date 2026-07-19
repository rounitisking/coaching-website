import { adminGetAllBlogs, adminGetAllBlogCategories } from "@/actions/admin";
import { AdminBlogsClient } from "@/components/admin/AdminBlogsClient";
import { Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const [blogs, categories] = await Promise.all([
    adminGetAllBlogs(),
    adminGetAllBlogCategories(),
  ]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Newspaper size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100">Blog Management</h1>
        </div>
        <p className="text-slate-500 text-sm">Create and manage blog posts. Publish or keep them as drafts.</p>
      </div>
      <AdminBlogsClient
        initialBlogs={blogs.map(b => ({
          ...b,
          category: b.category ?? null,
          author: b.author ?? null,
        }))}
        categories={categories}
      />
    </div>
  );
}
