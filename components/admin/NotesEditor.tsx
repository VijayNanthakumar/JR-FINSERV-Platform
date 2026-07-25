"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface NotesEditorProps {
	enquiryId: string;
	initialNotes: string | null;
}

/**
 * NotesEditor
 *
 * Provides a textarea for admin staff to write follow-up notes.
 * PATCHes /api/enquiries/[id] with { notes } on save.
 * Shows a brief success indicator after saving.
 */
export function NotesEditor({ enquiryId, initialNotes }: NotesEditorProps) {
	const [notes, setNotes] = useState(initialNotes ?? "");
	const [savedNotes, setSavedNotes] = useState(initialNotes ?? "");
	const [isSaving, setIsSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isDirty = notes !== savedNotes;

	const handleSave = async () => {
		if (!isDirty) return;

		setIsSaving(true);
		setError(null);
		setSaved(false);

		try {
			const res = await fetch(`/api/enquiries/${enquiryId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ notes: notes.trim() || null }),
			});
			const data = await res.json();

			if (!res.ok || !data.success) {
				setError(data.message ?? "Failed to save notes.");
				return;
			}

			setSavedNotes(notes);
			setSaved(true);
			setTimeout(() => setSaved(false), 3000);
		} catch {
			setError("Unable to reach the server. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<textarea
				value={notes}
				onChange={(e) => {
					setNotes(e.target.value);
					setSaved(false);
					setError(null);
				}}
				disabled={isSaving}
				rows={4}
				placeholder={`e.g. "Customer requested callback tomorrow." or "Interested in SIP."`}
				className="w-full resize-y rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 min-h-[100px]"
			/>

			<div className="flex items-center justify-between">
				{error ? (
					<p className="text-xs text-red-600 font-body">{error}</p>
				) : saved ? (
					<span className="flex items-center gap-1.5 text-xs text-emerald-600 font-body">
						<CheckCircle className="h-3.5 w-3.5" />
						Notes saved
					</span>
				) : (
					<span />
				)}

				<button
					type="button"
					onClick={handleSave}
					disabled={isSaving || !isDirty}
					className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-700 disabled:opacity-50"
				>
					{isSaving ? (
						<>
							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Saving…
						</>
					) : (
						"Save Notes"
					)}
				</button>
			</div>
		</div>
	);
}
