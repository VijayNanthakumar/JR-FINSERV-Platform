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
	notes: string | null;
	created_at: string;
	updated_at: string;
}
