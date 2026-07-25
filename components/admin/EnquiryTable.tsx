import type { Enquiry } from "@/types/enquiry";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { InboxIcon, Eye } from "lucide-react";
import Link from "next/link";

// ─── Service label map ────────────────────────────────────────────────────────
const SERVICE_LABELS: Record<string, string> = {
	"mutual-funds": "Mutual Funds",
	lic: "LIC Insurance",
	"health-insurance": "Star Health",
	"general-insurance": "General Insurance",
	"vehicle-insurance": "Vehicle Insurance",
};

function formatService(service: string): string {
	return SERVICE_LABELS[service] ?? service;
}

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(iso: string): string {
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(iso));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Skeleton loader – one row */
function SkeletonRow() {
	return (
		<tr className="border-b border-neutral-100 last:border-0">
			{Array.from({ length: 6 }).map((_, i) => (
				<td key={i} className="px-4 py-3.5">
					<div className="h-4 bg-neutral-100 rounded-md animate-pulse" />
				</td>
			))}
		</tr>
	);
}

/** Empty state */
function EmptyState() {
	return (
		<tr>
			<td colSpan={6}>
				<div className="flex flex-col items-center justify-center gap-3 py-16 text-neutral-400">
					<InboxIcon className="h-10 w-10 opacity-40" />
					<p className="text-sm font-medium">No enquiries received yet.</p>
				</div>
			</td>
		</tr>
	);
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface EnquiryTableProps {
	/** The fetched rows. Pass `null` while loading, `undefined` on error. */
	enquiries: Enquiry[] | null | undefined;
	/** If true, renders skeleton rows instead of real data */
	isLoading?: boolean;
	/** If true, renders an error card */
	isError?: boolean;
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * EnquiryTable
 *
 * Renders the admin enquiries table.
 * Handles three states:
 *   isLoading  → skeleton rows
 *   isError    → friendly error card
 *   data       → real rows (or empty state if empty array)
 */
export function EnquiryTable({
	enquiries,
	isLoading = false,
	isError = false,
}: EnquiryTableProps) {
	// ── Error state ────────────────────────────────────────────────────────────
	if (isError) {
		return (
			<div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
				<p className="text-sm font-semibold text-red-700">
					Failed to load enquiries.
				</p>
				<p className="mt-1 text-xs text-red-500">
					Please refresh the page. If the problem persists, contact your
					developer.
				</p>
			</div>
		);
	}

	const columns = ["Name", "Phone", "Service", "Status", "Received On", "Actions"];

	return (
		<div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
			<table className="min-w-full text-sm">
				{/* ── Head ── */}
				<thead>
					<tr className="border-b border-neutral-200 bg-neutral-50">
						{columns.map((col) => (
							<th
								key={col}
								className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>

				{/* ── Body ── */}
				<tbody className="divide-y divide-neutral-100">
					{isLoading ? (
						<>
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
							<SkeletonRow />
						</>
					) : !enquiries || enquiries.length === 0 ? (
						<EmptyState />
					) : (
						enquiries.map((row) => (
							<tr
								key={row.id}
								className="hover:bg-neutral-50 transition-colors"
							>
								{/* Name */}
								<td className="px-4 py-3.5 font-medium text-neutral-900">
									{row.name}
								</td>

								{/* Phone */}
								<td className="px-4 py-3.5 text-neutral-600 tabular-nums">
									{row.phone}
								</td>

								{/* Service */}
								<td className="px-4 py-3.5 text-neutral-600">
									{formatService(row.service)}
								</td>

								{/* Status */}
								<td className="px-4 py-3.5">
									<StatusBadge status={row.status} />
								</td>

								{/* Received On */}
								<td className="px-4 py-3.5 text-neutral-500 whitespace-nowrap tabular-nums">
									{formatDate(row.created_at)}
								</td>

								{/* Actions */}
								<td className="px-4 py-3.5">
									<Link
										href={`/portal/enquiries/${row.id}`}
										className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
										aria-label={`View enquiry from ${row.name}`}
									>
										<Eye className="h-3.5 w-3.5" />
										View
									</Link>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
