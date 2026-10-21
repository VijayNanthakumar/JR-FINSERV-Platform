"use client";

import { useRef, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDeleteDialogProps {
	isOpen: boolean;
	isDeleting: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

/**
 * ConfirmDeleteDialog
 *
 * A lightweight modal dialog that asks the admin to confirm permanent
 * deletion of an enquiry. Uses a native <dialog> element for accessibility.
 * Traps focus and closes on Escape automatically.
 */
export function ConfirmDeleteDialog({
	isOpen,
	isDeleting,
	onConfirm,
	onCancel,
}: ConfirmDeleteDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const el = dialogRef.current;
		if (!el) return;
		if (isOpen) {
			el.showModal();
		} else {
			el.close();
		}
	}, [isOpen]);

	// Close on backdrop click
	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) onCancel();
	};

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			onKeyDown={(e) => e.key === "Escape" && onCancel()}
			className="
				w-[calc(100vw-2rem)] max-w-md mx-auto my-auto rounded-xl border border-neutral-200 bg-white p-0
				shadow-2xl backdrop:bg-black/40
				open:flex open:flex-col
			"
		>
			{/* Header */}
			<div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
						<AlertTriangle className="h-5 w-5 text-red-600" />
					</div>
					<h2 className="text-sm font-semibold text-neutral-900 font-body">
						Delete Enquiry
					</h2>
				</div>
				<button
					onClick={onCancel}
					disabled={isDeleting}
					className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-50 cursor-pointer"
					aria-label="Close dialog"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			{/* Body */}
			<div className="px-6 py-5">
				<p className="text-sm text-neutral-600 leading-relaxed font-body">
					Are you sure you want to permanently delete this enquiry?
				</p>
				<p className="mt-1 text-xs text-neutral-400 font-body">
					This action cannot be undone.
				</p>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-6 py-4">
				<button
					type="button"
					onClick={onCancel}
					disabled={isDeleting}
					className="min-h-[44px] px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50 cursor-pointer"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={onConfirm}
					disabled={isDeleting}
					className="min-h-[44px] px-4 py-2.5 inline-flex items-center gap-2 rounded-lg bg-red-600 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60 cursor-pointer"
				>
					{isDeleting ? (
						<>
							<span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Deleting…
						</>
					) : (
						"Delete Permanently"
					)}
				</button>
			</div>
		</dialog>
	);
}
