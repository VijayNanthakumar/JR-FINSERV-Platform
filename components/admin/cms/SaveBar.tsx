"use client";

import { Loader2, Check } from "lucide-react";

interface SaveBarProps {
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel?: () => void;
  savedLabel?: string;
}

export function SaveBar({
  isDirty,
  isSaving,
  onSave,
  onCancel,
  savedLabel = "All changes saved",
}: SaveBarProps) {
  if (!isDirty && !isSaving) {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
        <Check className="h-3.5 w-3.5" />
        {savedLabel}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isDirty && !isSaving && (
        <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
      )}
      {onCancel && (
        <button
          type="button"
          disabled={isSaving}
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      )}
      <button
        type="button"
        disabled={isSaving || !isDirty}
        onClick={onSave}
        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {isSaving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
