export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="skeleton h-8 w-48 rounded-lg" />
        <div className="skeleton h-4 w-72 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="skeleton h-6 w-32 rounded-lg mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="skeleton h-6 w-32 rounded-lg mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
