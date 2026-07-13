import { auth } from "@/lib/auth";
import { getCourseBySlug, isEnrolled } from "@/actions/courses";
import { redirect, notFound } from "next/navigation";
import { CoursePlayer } from "@/components/dashboard/CoursePlayer";

export default async function DashboardCoursePlayerPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  // Check enrollment
  const enrolled = await isEnrolled(session.user.id, course.id);
  if (!enrolled && session.user.role !== "ADMIN") {
    redirect("/dashboard/courses");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          {course.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Study curriculum and lessons.</p>
      </div>

      <CoursePlayer course={course} />
    </div>
  );
}
