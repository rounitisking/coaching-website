import { BlogCardSkeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <main>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center animate-pulse">
          <div className="w-24 h-4 bg-white/20 mx-auto rounded mb-3" />
          <div className="w-64 h-10 bg-white/20 mx-auto rounded mb-4" />
          <div className="w-96 h-6 bg-white/20 mx-auto rounded" />
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
