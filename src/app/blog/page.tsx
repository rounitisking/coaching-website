import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "Blog — Academica Institute",
  description: "Read expert articles on CA exam preparation, career guidance, study tips and institute updates from Academica Institute faculty.",
};

function BlogCard({
  blog,
  featured = false,
}: {
  blog: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    readTime: number;
    publishedAt: Date | null;
    category: { name: string; slug: string } | null;
    author: { name: string | null } | null;
    tags: string[];
  };
  featured?: boolean;
}) {
  const date = blog.publishedAt
    ? formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })
    : "Recently";

  if (featured) {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        className="group card overflow-hidden flex flex-col lg:flex-row no-underline hover:border-[var(--brand-secondary)] transition-all duration-300 mb-8"
        aria-label={`Read: ${blog.title}`}
      >
        {/* Image */}
        <div
          className="lg:w-1/2 h-52 lg:h-auto relative flex items-center justify-center"
          style={{ background: "var(--gradient-brand)", minHeight: "220px" }}
        >
          {blog.featuredImage ? (
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              width={600}
              height={400}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-white/20 text-8xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
              {blog.title.charAt(0)}
            </div>
          )}
          {blog.category && (
            <span className="badge badge-accent text-xs absolute top-3 left-3">
              {blog.category.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col">
          <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1"><Calendar size={12} />{date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime} min read</span>
          </div>
          <h2
            className="text-xl lg:text-2xl font-black mb-3 leading-snug group-hover:text-[var(--brand-secondary)] transition-colors"
            style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}
          >
            {blog.title}
          </h2>
          {blog.excerpt && (
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
              {blog.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm font-semibold mt-auto" style={{ color: "var(--brand-secondary)" }}>
            Read Article <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group card overflow-hidden flex flex-col no-underline hover:border-[var(--brand-secondary)] transition-all duration-300"
      aria-label={`Read: ${blog.title}`}
    >
      {/* Image */}
      <div
        className="h-44 relative flex items-center justify-center"
        style={{ background: "var(--gradient-brand)" }}
      >
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            width={400}
            height={250}
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="text-white/20 text-6xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
            {blog.title.charAt(0)}
          </div>
        )}
        {blog.category && (
          <span className="badge badge-accent text-xs absolute top-3 left-3">
            {blog.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs mb-2" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{blog.readTime} min</span>
        </div>
        <h3
          className="font-bold text-sm mb-2 leading-snug line-clamp-2 group-hover:text-[var(--brand-secondary)] transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="text-xs mb-3 line-clamp-2 flex-1" style={{ color: "var(--text-muted)" }}>
            {blog.excerpt}
          </p>
        )}
        <div className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: "var(--brand-secondary)" }}>
          Read More <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = parseInt(page || "1") || 1;
  const pageSize = 10;

  const where = {
    isActive: true,
    isPublished: true,
    ...(category && category !== "all"
      ? { category: { slug: category } }
      : {}),
  };

  const [allBlogs, totalCount, categories] = await Promise.all([
    db.blog.findMany({
      where,
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }).catch(() => []),
    db.blog.count({ where }).catch(() => 0),
    db.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }).catch(() => []),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const featuredBlog = allBlogs.find((b) => b.featured);
  const restBlogs = allBlogs.filter((b) => !b.featured || b.id !== featuredBlog?.id);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            Knowledge Hub
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Blog &amp; Articles
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto">
            Expert insights on CA exam preparation, career guidance, study techniques and professional growth from our faculty.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          {/* Category filter tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[var(--border)]">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  !category || category === "all"
                    ? "bg-[var(--brand-secondary)] text-white"
                    : "bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    category === cat.slug
                      ? "bg-[var(--brand-secondary)] text-white"
                      : "bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {allBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-muted)] text-lg">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured blog */}
              {featuredBlog && !category && currentPage === 1 && (
                <BlogCard blog={featuredBlog} featured />
              )}

              {/* Blog grid */}
              {restBlogs.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-[var(--border)]">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage - 1}`}
                      className="px-4 py-2 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold text-sm transition-colors text-[var(--text-primary)]"
                      style={{ borderColor: "var(--border)" }}
                    >
                      Previous
                    </Link>
                  )}
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage + 1}`}
                      className="px-4 py-2 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold text-sm transition-colors text-[var(--text-primary)]"
                      style={{ borderColor: "var(--border)" }}
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
