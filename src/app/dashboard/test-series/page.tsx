import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClipboardList, Download } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardTestSeriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const userId = session.user.id;
  let purchases: any[] = [];

  try {
    purchases = await db.testPurchase.findMany({
      where: { userId, isActive: true },
      include: {
        testSeries: {
          include: { category: true },
        },
      },
      orderBy: { purchasedAt: "desc" },
    });
  } catch (error) {
    console.error("Dashboard tests database query error:", error);
  }

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          My Purchased Test Series
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Practice with mock tests and view complete solutions.</p>
      </div>

      {purchases.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <ClipboardList className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No test series purchased</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Practice makes perfect. Practice mock papers to evaluate your current academic standings.
          </p>
          <Link href="/test-series" className="btn-primary">
            Browse Test Series
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((pur) => {
            const series = pur.testSeries;
            return (
              <div
                key={pur.id}
                className="card flex flex-col bg-white dark:bg-slate-950 overflow-hidden"
              >
                <div className="h-40 relative flex items-center justify-center" style={{ background: "var(--bg-muted)" }}>
                  <ClipboardList size={44} style={{ color: "var(--brand-secondary)", opacity: 0.3 }} />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-brand text-xs">{series.category?.name || "Test Series"}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1">
                    {series.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {series.description || "Interactive test papers with solutions."}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>{series.totalTests || 10} Mock Tests</span>
                    <a
                      href={series.fileUrl || "/scratch/test-schema.prisma"}
                      download
                      className="btn-primary btn-sm flex items-center gap-1.5 font-bold"
                    >
                      <Download size={13} /> Download PDF
                    </a>
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
