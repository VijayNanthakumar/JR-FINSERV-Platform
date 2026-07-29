/**
 * Represents a single row from the `enquiries` Supabase table.
 * Keep in sync with the actual DB schema.
 */
export type EnquiryStatus = "New" | "Contacted" | "Closed";

export interface Enquiry {
	id: string;
	name: string;
	phone: string;
	email: string | null;
	service: string;
	message: string;
	status: EnquiryStatus;
	is_read?: boolean;
	notes: string | null;
	created_at: string;
	updated_at: string;
}

export interface EnquiryStats {
	todayCount: number;
	weekCount: number;
	monthCount: number;
	pendingCount: number;
	contactedCount: number;
	closedCount: number;
	totalCount: number;
	unreadCount: number;
}
