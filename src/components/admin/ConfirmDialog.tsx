"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isPending?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you absolutely sure?",
  message = "This action cannot be undone. This will permanently delete the record.",
  isPending = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-900">
          <button
            onClick={onClose}
            className="btn-secondary btn-sm rounded-lg"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5"
            disabled={isPending}
          >
            {isPending ? (
              <><Loader2 size={14} className="animate-spin" /> Deleting…</>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
