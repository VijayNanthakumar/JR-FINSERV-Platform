"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Enquiry } from "@/types/enquiry";
import { StatusSelector } from "@/components/admin/StatusSelector";
import { NotesEditor } from "@/components/admin/NotesEditor";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";
import {
	ArrowLeft,
	Phone,
	MessageCircle,
	Mail,
	Trash2,
	User,
	Briefcase,
	MessageSquareText,
	Clock,
	CalendarDays,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
	"mutual-funds": "Mutual Funds Advisory",
	lic: "LIC Life Insurance",
	"health-insurance": "Star Health Insurance",
	"general-insurance": "General Asset Insurance",
	"vehicle-insurance": "Vehicle Insurance",
};

function formatService(s: string) {
	return SERVICE_LABELS[s] ?? s;
}

function formatDateTime(iso: string) {
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(iso));
}

// ─── Read-only info row ───────────────────────────────────────────────────────

function InfoRow({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3 py-3 border-b border-neutral-100 last:border-0">
			<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100">
				<Icon className="h-3.5 w-3.5 text-neutral-500" />
			</div>
			<div className="min-w-0">
				<p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-body">
					{label}
				</p>
				<p className="mt-0.5 text-sm text-neutral-900 font-body break-words">
					{value}
				</p>
			</div>
		</div>
	);
}

// ─── Section card wrapper ─────────────────────────────────────────────────────

function SectionCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-xl border border-neutral-200 bg-white">
			<div className="border-b border-neutral-100 px-5 py-3.5">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-body">
					{title}
				</h2>
			</div>
			<div className="px-5 py-4">{children}</div>
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

interface EnquiryDetailsProps {
	enquiry: Enquiry;
}

/**
 * EnquiryDetails
 *
 * Client component that renders the full enquiry detail view.
 * Orchestrates StatusSelector, NotesEditor, ConfirmDeleteDialog,
 * and the quick-action buttons (Call, WhatsApp, Email).
 */
export function EnquiryDetails({ enquiry }: EnquiryDetailsProps) {
	const router = useRouter();
	const [showDelete, setShowDelete] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	// Build WhatsApp message
	const whatsappText = encodeURIComponent(
		`Hello ${enquiry.name}, Thank you for contacting JR FINSERV. Our advisor will contact you shortly.`,
	);
	const whatsappUrl = `https://wa.me/91${enquiry.phone.replace(/\D/g, "")}?text=${whatsappText}`;

	// ── Delete handler ────────────────────────────────────────────────────────
	const handleDelete = async () => {
		setIsDeleting(true);
		setDeleteError(null);

		try {
			const res = await fetch(`/api/enquiries/${enquiry.id}`, {
				method: "DELETE",
			});
			const data = await res.json();

			if (!res.ok || !data.success) {
				setDeleteError(data.message ?? "Failed to delete enquiry.");
				setShowDelete(false);
				return;
			}

			router.push("/portal/enquiries");
			router.refresh();
		} catch {
			setDeleteError("Unable to reach the server. Please try again.");
			setShowDelete(false);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			{/* ── Page header ── */}
			<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
				<div>
					<Link
						href="/portal/enquiries"
						className="mb-1 inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 font-body transition-colors"
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Back to Enquiries
					</Link>
					<h1 className="text-lg font-semibold text-neutral-900 font-body">
						{enquiry.name}
					</h1>
					<p className="text-sm text-neutral-500 font-body">
						Enquiry details and follow-up tools
					</p>
				</div>

				{/* Quick-action buttons */}
				<div className="flex flex-wrap items-center gap-2">
					{/* Call */}
					<a
						href={`tel:${enquiry.phone}`}
						className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
					>
						<Phone className="h-3.5 w-3.5" />
						Call
					</a>

					{/* WhatsApp */}
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:border-green-500 hover:bg-green-50 hover:text-green-700"
					>
						<MessageCircle className="h-3.5 w-3.5" />
						WhatsApp
					</a>

					{/* Email — only shown if email exists */}
					{enquiry.email && (
						<a
							href={`mailto:${enquiry.email}`}
							className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
						>
							<Mail className="h-3.5 w-3.5" />
							Email
						</a>
					)}

					{/* Delete */}
					<button
						type="button"
						onClick={() => {
							setDeleteError(null);
							setShowDelete(true);
						}}
						className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
					>
						<Trash2 className="h-3.5 w-3.5" />
						Delete
					</button>
				</div>
			</div>

			{/* Delete error (outside dialog) */}
			{deleteError && (
				<div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-body">
					{deleteError}
				</div>
			)}

			{/* ── Layout grid ── */}
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
				{/* Left column – read-only info */}
				<div className="flex flex-col gap-5 lg:col-span-2">
					{/* Customer Information */}
					<SectionCard title="Customer Information">
						<InfoRow icon={User} label="Full Name" value={enquiry.name} />
						<InfoRow icon={Phone} label="Phone" value={enquiry.phone} />
						<InfoRow
							icon={Mail}
							label="Email"
							value={enquiry.email ?? "Not provided"}
						/>
						<InfoRow
							icon={Briefcase}
							label="Service"
							value={formatService(enquiry.service)}
						/>
					</SectionCard>

					{/* Enquiry Message */}
					<SectionCard title="Enquiry">
						<div className="flex items-start gap-3">
							<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100">
								<MessageSquareText className="h-3.5 w-3.5 text-neutral-500" />
							</div>
							<p className="text-sm text-neutral-800 font-body leading-relaxed whitespace-pre-wrap break-words">
								{enquiry.message}
							</p>
						</div>
					</SectionCard>
				</div>

				{/* Right column – tracking & actions */}
				<div className="flex flex-col gap-5">
					{/* Tracking */}
					<SectionCard title="Tracking">
						<div className="flex flex-col gap-4">
							{/* Dates */}
							<div className="flex flex-col gap-2 pb-4 border-b border-neutral-100">
								<div className="flex items-start gap-2">
									<CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
									<div>
										<p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-body">
											Received On
										</p>
										<p className="mt-0.5 text-xs text-neutral-700 font-body tabular-nums">
											{formatDateTime(enquiry.created_at)}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-2">
									<Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
									<div>
										<p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-body">
											Last Updated
										</p>
										<p className="mt-0.5 text-xs text-neutral-700 font-body tabular-nums">
											{formatDateTime(enquiry.updated_at)}
										</p>
									</div>
								</div>
							</div>

							{/* Status */}
							<div>
								<p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-body">
									Status
								</p>
								<StatusSelector
									enquiryId={enquiry.id}
									initialStatus={enquiry.status}
								/>
							</div>
						</div>
					</SectionCard>

					{/* Notes */}
					<SectionCard title="Notes">
						<NotesEditor
							enquiryId={enquiry.id}
							initialNotes={enquiry.notes}
						/>
					</SectionCard>
				</div>
			</div>

			{/* ── Confirmation dialog ── */}
			<ConfirmDeleteDialog
				isOpen={showDelete}
				isDeleting={isDeleting}
				onConfirm={handleDelete}
				onCancel={() => setShowDelete(false)}
			/>
		</>
	);
}
