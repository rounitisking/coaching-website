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
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Edit Profile
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your contact information and public identity.</p>
      </div>

      <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl">
        <UserProfileForm initialUser={user} />
      </div>
    </div>
  );
}
