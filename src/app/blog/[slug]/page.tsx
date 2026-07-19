import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, Bookmark, Share2, ChevronRight, User } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { formatDistanceToNow, format } from "date-fns";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await db.blog.findUnique({
    where: { slug, isPublished: true, isActive: true },
    select: { title: true, metaDescription: true, featuredImage: true },
  }).catch(() => null);

  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.title} — Academica Institute Blog`,
    description: blog.metaDescription || undefined,
    openGraph: blog.featuredImage ? { images: [blog.featuredImage] } : undefined,
  };
}

// Simple markdown-to-HTML renderer (no external lib needed for basic content)
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-black mb-4 mt-8" style="color:var(--text-primary);font-family:Outfit,sans-serif">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mb-3 mt-6" style="color:var(--text-primary)">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mb-2 mt-5" style="color:var(--text-primary)">$1</h3>')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[var(--brand-secondary)] underline hover:no-underline" target="_blank" rel="noopener">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="mb-1.5">$1</li>')
    .replace(/((?:<li.*<\/li>\n?)+)/g, '<ul class="list-disc list-inside mb-4 space-y-1 text-[var(--text-secondary)]">$1</ul>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="mb-1.5">$1</li>')
    // Paragraphs
    .replace(/^(?!<[hul]|<li)(.+)$/gm, '<p class="mb-4 leading-relaxed text-[var(--text-secondary)]">$1</p>')
    // Line breaks
    .replace(/\n{2,}/g, '\n');
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const [blog, session] = await Promise.all([
    db.blog.findUnique({
      where: { slug, isPublished: true, isActive: true },
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
      },
    }).catch(() => null),
    auth(),
  ]);

  if (!blog) notFound();

  // Increment view count (fire-and-forget)
  db.blog.update({
    where: { id: blog.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  // Related posts (same category, exclude current)
  const related = await db.blog.findMany({
    where: {
      isPublished: true,
      isActive: true,
      categoryId: blog.categoryId ?? undefined,
      id: { not: blog.id },
    },
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  }).catch(() => []);

  // Recent posts
  const recent = await db.blog.findMany({
    where: { isPublished: true, isActive: true, id: { not: blog.id } },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: { id: true, title: true, slug: true, publishedAt: true, readTime: true },
  }).catch(() => []);

  const isLoggedIn = !!session?.user;
  const isBookmarked = isLoggedIn
    ? await db.bookmark.findFirst({
        where: { userId: session!.user!.id, blogId: blog.id },
      }).then(Boolean).catch(() => false)
    : false;

  const publishDate = blog.publishedAt
    ? format(new Date(blog.publishedAt), "MMMM d, yyyy")
    : null;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        {blog.featuredImage && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${blog.featuredImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
              <ChevronLeft size={14} /> Blog
            </Link>
            {blog.category && (
              <>
                <ChevronRight size={14} />
                <Link href={`/blog?category=${blog.category.slug}`} className="hover:text-white transition-colors">
                  {blog.category.name}
                </Link>
              </>
            )}
          </div>

          {blog.category && (
            <span className="badge badge-accent text-xs mb-4 inline-block">{blog.category.name}</span>
          )}

          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 max-w-3xl leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-blue-100 text-base max-w-2xl mb-6 leading-relaxed">{blog.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-blue-300 text-sm">
            {blog.author?.name && (
              <span className="flex items-center gap-1.5">
                <User size={14} /> {blog.author.name}
              </span>
            )}
            {publishDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {publishDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {blog.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content layout */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main content */}
            <article>
              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="badge badge-muted text-xs">{tag}</span>
                  ))}
                </div>
              )}

              {/* Blog body */}
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
              />

              {/* Share row */}
              <div className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-[var(--border)]">
                <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Share:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} — ${process.env.NEXT_PUBLIC_SITE_URL || "https://academica.in"}/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-sm"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => {}}
                  className="btn-secondary btn-sm flex items-center gap-1.5"
                  id="copy-link-btn"
                  aria-label="Copy link"
                >
                  <Share2 size={13} /> Copy Link
                </button>
                {isLoggedIn && (
                  <form action={`/api/bookmarks`} method="POST">
                    <input type="hidden" name="blogId" value={blog.id} />
                    <button
                      type="submit"
                      className={`btn-sm flex items-center gap-1.5 ${isBookmarked ? "btn-primary" : "btn-secondary"}`}
                    >
                      <Bookmark size={13} fill={isBookmarked ? "currentColor" : "none"} />
                      {isBookmarked ? "Saved" : "Save"}
                    </button>
                  </form>
                )}
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                    Related Articles
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/blog/${r.slug}`}
                        className="card p-4 no-underline hover:border-[var(--brand-secondary)] transition-colors group"
                      >
                        {r.category && (
                          <span className="badge badge-muted text-xs mb-2 inline-block">{r.category.name}</span>
                        )}
                        <h3
                          className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-[var(--brand-secondary)] transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {r.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Recent posts */}
              {recent.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recent.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex items-start gap-3 no-underline"
                      >
                        <div
                          className="w-16 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-black text-xl"
                          style={{ background: "var(--gradient-brand)" }}
                        >
                          {post.title.charAt(0)}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-[var(--brand-secondary)] transition-colors"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {post.title}
                          </p>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            {post.readTime} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div
                className="card p-6 text-center"
                style={{ background: "var(--gradient-hero)" }}
              >
                <h3 className="font-bold text-white mb-2">Enroll at Academica</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Get expert coaching for CA, CS, CMA, CUET &amp; more.
                </p>
                <Link href="/demo-classes" className="btn-accent w-full justify-center font-bold" id="sidebar-demo-cta">
                  Demo Class
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
