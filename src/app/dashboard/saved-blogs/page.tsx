import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Calendar, Clock, Trash2, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function SavedBlogsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const bookmarks = await db.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      blog: {
        include: {
          category: true,
          author: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  async function handleRemoveBookmark(blogId: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;
    await db.bookmark.deleteMany({
      where: {
        userId: session.user.id,
        blogId,
      },
    });
    revalidatePath("/dashboard/saved-blogs");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Saved Blogs
        </h1>
        <p className="text-slate-555 dark:text-slate-400 text-sm mt-1">Bookmarked articles and preparation tips.</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
            <Bookmark size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No saved blogs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Bookmark articles from our blog to read them later or save key revision resources.
          </p>
          <Link href="/blog" className="btn-primary btn-sm inline-flex items-center gap-1">
            Browse Blog <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {bookmarks.map(({ blog }) => {
            if (!blog) return null;
            const timeAgo = blog.publishedAt
              ? formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })
              : "Recently";
            return (
              <div
                key={blog.id}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  {blog.featuredImage && (
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-[1.01] transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    {blog.category && (
                      <span className="badge text-[9px] font-bold uppercase tracking-wider">
                        {blog.category.name}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {blog.readTime || 5} min read
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {timeAgo}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="btn-primary btn-xs px-3 py-1.5 rounded-lg text-xs"
                    >
                      Read Article
                    </Link>
                    <form action={handleRemoveBookmark.bind(null, blog.id)}>
                      <button
                        type="submit"
                        className="p-1.5 border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-550 rounded-lg transition-colors"
                        title="Remove Bookmark"
                      >
                        <Trash2 size={12} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
