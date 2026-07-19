"use client";

import { useState, useTransition } from "react";
import { Bell, Check, Trash2, Link as LinkIcon, CheckCheck } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "@/actions/notifications";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string | null;
  createdAt: Date;
}

export function NotificationsClient({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    });
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4">
      {notifications.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || isPending}
            className="text-xs font-bold text-blue-600 dark:text-blue-450 hover:underline flex items-center gap-1.5 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
          >
            <CheckCheck size={14} /> Mark all as read
          </button>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
            <Bell size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">All caught up!</h2>
          <p className="text-sm text-slate-505 dark:text-slate-455 mt-1">
            You don't have any notifications right now.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-colors flex items-start gap-4 ${
                n.isRead
                  ? "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  : "bg-blue-50/20 dark:bg-blue-950/10 border-blue-100 dark:border-blue-950/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  n.isRead
                    ? "bg-slate-100 text-slate-500 dark:bg-slate-900"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                }`}
              >
                <Bell size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-sm font-bold truncate ${
                      n.isRead ? "text-slate-800 dark:text-slate-200" : "text-blue-950 dark:text-blue-200"
                    }`}
                  >
                    {n.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{n.message}</p>
                {n.link && (
                  <Link
                    href={n.link}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold mt-2 hover:underline"
                  >
                    View details <LinkIcon size={10} />
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-center">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="p-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-slate-500 transition-colors"
                    title="Mark as read"
                  >
                    <Check size={14} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-500 transition-colors"
                  title="Delete notification"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
