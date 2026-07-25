"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteDialogProps {
  /** Label shown in the trigger button */
  label?: string;
  /** Confirmation message shown in the dialog */
  message?: string;
  /** Called when user confirms deletion — return a promise to show loading state */
  onConfirm: () => Promise<void>;
  disabled?: boolean;
}

export function DeleteDialog({
  label = "Delete",
  message = "This action cannot be undone. Are you sure?",
  onConfirm,
  disabled = false,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {label}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-navy-900 text-base">
                  Confirm Deletion
                </h3>
                <p className="text-sm text-neutral-500 mt-1 font-body">{message}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirm}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-60"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
