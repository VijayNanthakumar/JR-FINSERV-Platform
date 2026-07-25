import { createServerSupabaseClient } from "@/lib/supabase-server";
import { EnquiryTable } from "@/components/admin/EnquiryTable";
import type { Enquiry } from "@/types/enquiry";

/**
 * /portal/enquiries — Admin Enquiries List
 *
 * Server Component: fetches enquiries from Supabase (newest first)
 * and passes the result to the EnquiryTable client component.
 * No database details are ever exposed to the browser.
 */
export const metadata = {
	title: "Enquiries | JR FINSERV Admin",
};

export default async function EnquiriesPage() {
	const supabase = createServerSupabaseClient();

	const { data, error } = await supabase
		.from("enquiries")
		.select("id, name, phone, email, service, message, status, notes, created_at, updated_at")
		.order("created_at", { ascending: false });

	const enquiries = data as Enquiry[] | null;
	const isError = !!error;

	return (
		<div>
			{/* ── Page header ── */}
			<div className="mb-6">
				<h1 className="text-lg font-semibold text-neutral-900 font-body">
					Enquiries
				</h1>
				<p className="text-sm text-neutral-500 mt-1 font-body">
					All contact form submissions, newest first.
				</p>
			</div>

			{/* ── Summary strip (row count, only when data loaded) ── */}
			{!isError && enquiries && enquiries.length > 0 && (
				<p className="mb-3 text-xs text-neutral-400 font-body">
					{enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"} found
				</p>
			)}

			{/* ── Table ── */}
			<EnquiryTable
				enquiries={enquiries ?? []}
				isLoading={false}
				isError={isError}
			/>
		</div>
	);
}
