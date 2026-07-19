import { adminGetAllApplications } from "@/actions/admin";
import { AdminApplicationsClient } from "@/components/admin/AdminApplicationsClient";
import { ClipboardCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await adminGetAllApplications();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <ClipboardCheck size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100">Faculty Applications</h1>
        </div>
        <p className="text-slate-500 text-sm">Review and manage faculty job applications submitted through the website.</p>
      </div>
      <AdminApplicationsClient
        initialApplications={applications.map(a => ({
          id: a.id,
          name: a.name,
          email: a.email,
          phone: a.phone,
          subjects: a.subjects,
          experience: a.experience,
          qualification: a.qualification,
          message: a.message ?? null,
          resumeUrl: a.resumeUrl ?? null,
          status: a.status as "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED",
          createdAt: a.createdAt,
        }))}
      />
    </div>
  );
}
