import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserProfileForm } from "@/components/dashboard/UserProfileForm";

export default async function DashboardProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true, image: true },
  });

  if (!user) redirect("/auth");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Edit Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your contact information and public identity.</p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <UserProfileForm initialUser={user} />
      </div>
    </div>
  );
}
