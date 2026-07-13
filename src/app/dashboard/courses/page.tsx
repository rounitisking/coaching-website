import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const userId = session.user.id;
  let enrollments: any[] = [];

  try {
    enrollments = await db.enrollment.findMany({
      where: { userId, isActive: true },
      include: {
        course: {
          include: { category: true },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });
  } catch (error) {
    console.error("Dashboard courses database query error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          My Enrolled Courses
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Access all your active study programs.</p>
      </div>

      {enrollments.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <GraduationCap className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No courses yet</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            You aren't enrolled in any coaching classes yet. Browse our list of modules to choose your program.
          </p>
          <Link href="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enr) => {
            const course = enr.course;
            return (
              <div
                key={enr.id}
                className="card flex flex-col bg-white dark:bg-slate-950 overflow-hidden"
              >
                <div className="h-40 relative flex items-center justify-center" style={{ background: "var(--bg-muted)" }}>
                  <BookOpen size={44} style={{ color: "var(--brand-secondary)", opacity: 0.3 }} />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-brand text-xs">{course.category?.name}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      Enrolled: {new Date(enr.enrolledAt).toLocaleDateString("en-IN")}
                    </span>
                    <Link
                      href={`/dashboard/courses/${course.slug}`}
                      className="btn-primary btn-sm rounded-lg"
                    >
                      Enter Class <ChevronRight size={14} />
                    </Link>
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
