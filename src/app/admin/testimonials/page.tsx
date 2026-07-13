import { adminGetAllTestimonials } from "@/actions/admin";
import { AdminTestimonialsClient } from "@/components/admin/AdminTestimonialsClient";

export default async function AdminTestimonialsPage() {
  let testimonials: any[] = [];
  try {
    testimonials = await adminGetAllTestimonials();
  } catch (error) {
    console.error("Admin testimonials fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Manage Testimonials
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Review student quotes, ratings, and course references displayed in slides.</p>
      </div>

      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
