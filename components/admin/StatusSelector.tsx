"use client";

import { useState } from "react";
import type { EnquiryStatus } from "@/types/enquiry";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CheckCircle } from "lucide-react";

const STATUS_OPTIONS: EnquiryStatus[] = ["New", "Contacted", "Closed"];

interface StatusSelectorProps {
	enquiryId: string;
	initialStatus: EnquiryStatus;
}

/**
 * StatusSelector
 *
 * Renders a <select> pre-filled with the current status and a Save button.
 * On save it PATCHes /api/enquiries/[id] with { status }.
 * Gives visual feedback via a brief success tick after saving.
 */
export function StatusSelector({ enquiryId, initialStatus }: StatusSelectorProps) {
	const [selected, setSelected] = useState<EnquiryStatus>(initialStatus);
	const [isSaving, setIsSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState<string | null>(null);


	const handleSave = async () => {
		if (selected === initialStatus && !saved) return;

		setIsSaving(true);
		setError(null);
		setSaved(false);

		try {
			const res = await fetch(`/api/enquiries/${enquiryId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: selected }),
			});
			const data = await res.json();

			if (!res.ok || !data.success) {
				setError(data.message ?? "Failed to update status.");
				return;
			}

			setSaved(true);
			setTimeout(() => setSaved(false), 3000);
		} catch {
			setError("Unable to reach the server. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			{/* Live preview badge */}
			<div className="flex items-center gap-2">
				<span className="text-xs text-neutral-400 font-body">Current:</span>
				<StatusBadge status={selected} />
			</div>

			<div className="flex items-center gap-2">
				<select
					value={selected}
					onChange={(e) => {
						setSelected(e.target.value as EnquiryStatus);
						setSaved(false);
						setError(null);
					}}
					disabled={isSaving}
					className="h-9 flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
				>
					{STATUS_OPTIONS.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>

				<button
					type="button"
					onClick={handleSave}
					disabled={isSaving || selected === initialStatus}
					className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-700 disabled:opacity-50"
				>
					{isSaving ? (
						<>
							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Saving…
						</>
					) : saved ? (
						<>
							<CheckCircle className="h-3.5 w-3.5" />
							Saved
						</>
					) : (
						"Save Status"
					)}
				</button>
			</div>

			{error && (
				<p className="text-xs text-red-600 font-body">{error}</p>
			)}
		</div>
	);
}
