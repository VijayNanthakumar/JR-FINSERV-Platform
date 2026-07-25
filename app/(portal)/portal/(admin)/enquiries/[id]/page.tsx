import { createServerSupabaseClient } from "@/lib/supabase-server";
import { EnquiryDetails } from "@/components/admin/EnquiryDetails";
import type { Enquiry } from "@/types/enquiry";
import Link from "next/link";
import { ArrowLeft, InboxIcon } from "lucide-react";

export const metadata = {
	title: "Enquiry Details | JR FINSERV Admin",
};



// ─── Not found ────────────────────────────────────────────────────────────────

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-neutral-200 bg-white py-16 text-center">
			<InboxIcon className="h-10 w-10 text-neutral-300" />
			<div>
				<p className="text-sm font-semibold text-neutral-700 font-body">
					Enquiry not found.
				</p>
				<p className="mt-1 text-xs text-neutral-400 font-body">
					This enquiry may have been deleted or the link is invalid.
				</p>
			</div>
			<Link
				href="/portal/enquiries"
				className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
			>
				<ArrowLeft className="h-3.5 w-3.5" />
				Back to Enquiries
			</Link>
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ id: string }> };

/**
 * /portal/enquiries/[id] — Enquiry Details Page
 *
 * Server Component: fetches a single enquiry from Supabase.
 * Passes it to the EnquiryDetails client component.
 * Renders NotFound if the ID doesn't match any row.
 * Shows a skeleton while loading (via Suspense boundary in layout).
 */
export default async function EnquiryDetailPage({ params }: PageProps) {
	const { id } = await params;

	const supabase = createServerSupabaseClient();

	const { data, error } = await supabase
		.from("enquiries")
		.select("id, name, phone, email, service, message, status, notes, created_at, updated_at")
		.eq("id", id)
		.single();

	// Supabase returns PGRST116 when no row matches — treat as not found
	if (error?.code === "PGRST116" || !data) {
		return <NotFound />;
	}

	// Any other Supabase error — friendly card, never raw message
	if (error) {
		console.error(`[EnquiryDetailPage] id=${id}`, error);
		return (
			<div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
				<p className="text-sm font-semibold text-red-700 font-body">
					Failed to load enquiry.
				</p>
				<p className="mt-1 text-xs text-red-500 font-body">
					Please refresh the page. If the problem persists, contact your developer.
				</p>
			</div>
		);
	}

	const enquiry = data as Enquiry;

	return <EnquiryDetails enquiry={enquiry} />;
}
