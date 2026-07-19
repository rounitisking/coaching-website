"use client";

import { useState, useTransition } from "react";
import { ClipboardCheck, Trash2, Loader2, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Modal } from "./Modal";
import { adminUpdateApplicationStatus, adminDeleteApplication } from "@/actions/admin";

type AppStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";

interface FacultyApplication {
  id: string; name: string; email: string; phone: string;
  subjects: string[]; experience: number;
  qualification: string; message?: string | null;
  resumeUrl?: string | null; status: AppStatus; createdAt: Date;
}

const STATUS_MAP: Record<AppStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING:  { label: "Pending",  color: "bg-yellow-500/20 text-yellow-400", icon: <Clock size={12} /> },
  REVIEWED: { label: "Reviewed", color: "bg-blue-500/20 text-blue-400",    icon: <Eye size={12} /> },
  ACCEPTED: { label: "Accepted", color: "bg-green-500/20 text-green-400",  icon: <CheckCircle2 size={12} /> },
  REJECTED: { label: "Rejected", color: "bg-red-500/20 text-red-400",      icon: <XCircle size={12} /> },
};

export function AdminApplicationsClient({ initialApplications }: { initialApplications: FacultyApplication[] }) {
  const [apps, setApps] = useState<FacultyApplication[]>(initialApplications);
  const [activeApp, setActiveApp] = useState<FacultyApplication | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<FacultyApplication | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (app: FacultyApplication, status: AppStatus) => {
    startTransition(async () => {
      await adminUpdateApplicationStatus(app.id, status);
      setApps(prev => prev.map(a => a.id === app.id ? { ...a, status } : a));
      if (activeApp?.id === app.id) setActiveApp(prev => prev ? { ...prev, status } : null);
    });
  };

  const handleDelete = () => {
    if (!toDelete) return;
    startTransition(async () => {
      await adminDeleteApplication(toDelete.id);
      setApps(prev => prev.filter(a => a.id !== toDelete.id));
      setIsConfirmOpen(false); setToDelete(null);
      if (activeApp?.id === toDelete.id) { setActiveApp(null); setIsViewOpen(false); }
    });
  };

  const pending = apps.filter(a => a.status === "PENDING").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ClipboardCheck size={20} className="text-blue-500" />
          <h2 className="text-lg font-bold text-slate-100">Faculty Applications ({apps.length})</h2>
          {pending > 0 && <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">{pending} Pending</span>}
        </div>
      </div>

      <div className="space-y-3">
        {apps.length === 0 && (
          <div className="text-slate-500 text-center py-10 bg-slate-900 rounded-xl">No applications received yet.</div>
        )}
        {apps.map(app => {
          const s = STATUS_MAP[app.status];
          return (
            <div key={app.id} className="bg-slate-900 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                {app.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-100 text-sm">{app.name}</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.icon}{s.label}</span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">{app.email} {app.subjects?.[0] && `· ${app.subjects[0]}`}</p>
                <p className="text-slate-600 text-xs">{new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setActiveApp(app); setIsViewOpen(true); }} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                  View
                </button>
                <button onClick={() => { setToDelete(app); setIsConfirmOpen(true); }} className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Modal */}
      <Modal isOpen={isViewOpen && !!activeApp} onClose={() => setIsViewOpen(false)} title="Application Details">
        {activeApp && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-slate-500 text-xs">Name</p><p className="text-slate-100 font-medium">{activeApp.name}</p></div>
              <div><p className="text-slate-500 text-xs">Email</p><p className="text-slate-100 font-medium break-all">{activeApp.email}</p></div>
              <div><p className="text-slate-500 text-xs">Phone</p><p className="text-slate-100 font-medium">{activeApp.phone}</p></div>
              {activeApp.subjects?.length > 0 && <div><p className="text-slate-500 text-xs">Subjects</p><p className="text-slate-100 font-medium">{activeApp.subjects.join(", ")}</p></div>}
              {activeApp.experience !== undefined && <div><p className="text-slate-500 text-xs">Experience</p><p className="text-slate-100 font-medium">{activeApp.experience} year{activeApp.experience !== 1 ? "s" : ""}</p></div>}
              {activeApp.qualification && <div><p className="text-slate-500 text-xs">Qualification</p><p className="text-slate-100 font-medium">{activeApp.qualification}</p></div>}
            </div>
            {activeApp.message && (
              <div className="bg-slate-800 rounded-xl p-3">
                <p className="text-slate-500 text-xs mb-1">Message</p>
                <p className="text-slate-300 text-sm">{activeApp.message}</p>
              </div>
            )}
            {activeApp.resumeUrl && (
              <a href={activeApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium underline">
                View Resume ↗
              </a>
            )}
            <div>
              <p className="text-slate-500 text-xs mb-2">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {(["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"] as AppStatus[]).map(status => {
                  const s = STATUS_MAP[status];
                  return (
                    <button key={status} onClick={() => handleStatusChange(activeApp, status)} disabled={isPending || activeApp.status === status}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${activeApp.status === status ? s.color + " ring-1 ring-current" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                      {isPending ? <Loader2 size={10} className="animate-spin" /> : s.icon}
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete}
        title="Delete Application" message={`Delete application from "${toDelete?.name}"? This cannot be undone.`} />
    </div>
  );
}
