import type { EnquiryStatus } from "@/types/enquiry";

interface StatusBadgeProps {
	status: EnquiryStatus;
}

const STATUS_CONFIG: Record<
	EnquiryStatus,
	{ label: string; className: string }
> = {
	New: {
		label: "New",
		className: "bg-blue-50 text-blue-700 ring-blue-600/20",
	},
	Contacted: {
		label: "Contacted",
		className: "bg-amber-50 text-amber-700 ring-amber-600/20",
	},
	Closed: {
		label: "Closed",
		className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
	},
};

/**
 * StatusBadge
 *
 * Renders a compact pill badge that reflects the current enquiry status.
 * Colors follow the spec:
 *   New       → Blue
 *   Contacted → Amber
 *   Closed    → Green (Emerald)
 */
export function StatusBadge({ status }: StatusBadgeProps) {
	const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["New"];

	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.className}`}
		>
			{config.label}
		</span>
	);
}
