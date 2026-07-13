export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero skeleton */}
      <div className="h-[60vh]" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom h-full flex items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="skeleton h-5 w-32 rounded-full" />
            <div className="skeleton h-12 w-3/4 rounded-xl" />
            <div className="skeleton h-12 w-1/2 rounded-xl" />
            <div className="skeleton h-5 w-full rounded-lg" />
            <div className="skeleton h-5 w-4/5 rounded-lg" />
            <div className="flex gap-3 mt-6">
              <div className="skeleton h-11 w-36 rounded-lg" />
              <div className="skeleton h-11 w-36 rounded-lg" />
            </div>
          </div>
          <div className="hidden lg:block flex-1">
            <div className="skeleton h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
      {/* Cards skeleton */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
