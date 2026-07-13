"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, MessageSquare } from "lucide-react";
import { adminUpdatePopup } from "@/actions/admin";

interface PopupData {
  id: string;
  title: string;
  content?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  image?: string | null;
  isActive: boolean;
}

export function AdminPopupClient({ popup }: { popup: PopupData }) {
  const [title, setTitle] = useState(popup.title);
  const [content, setContent] = useState(popup.content || "");
  const [ctaText, setCtaText] = useState(popup.ctaText || "");
  const [ctaUrl, setCtaUrl] = useState(popup.ctaUrl || "");
  const [active, setActive] = useState(popup.isActive);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      title,
      content: content || undefined,
      ctaText: ctaText || undefined,
      ctaUrl: ctaUrl || undefined,
      isActive: active,
    };

    startTransition(async () => {
      const res = await adminUpdatePopup(popup.id, data);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("Campaign popup updated successfully!");
      }
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
      <form onSubmit={handleSave} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg text-sm bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
            {success}
          </div>
        )}

        <div>
          <label className="label">Popup Header Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Body Descriptions</label>
          <textarea
            className="input h-20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Button Label</label>
            <input
              type="text"
              className="input"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Button Redirect URL</label>
            <input
              type="text"
              className="input"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="active-check"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="active-check" className="text-xs font-semibold text-slate-500">
            Enable 10-second automatic campaign popup
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary h-11 text-sm rounded-xl px-6 flex items-center gap-1.5"
        >
          {isPending ? (
            <><Loader2 size={16} className="animate-spin" /> Saving…</>
          ) : (
            <><Save size={16} /> Save Campaign</>
          )}
        </button>
      </form>
    </div>
  );
}
