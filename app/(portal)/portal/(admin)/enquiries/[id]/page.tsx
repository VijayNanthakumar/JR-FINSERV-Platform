import { createServerSupabaseClient } from "@/lib/supabase-server";
import { EnquiryDetails } from "@/components/admin/EnquiryDetails";
import type { Enquiry } from "@/types/enquiry";
import Link from "next/link";
import { ArrowLeft, InboxIcon } from "lucide-react";

export const metadata = {
	title: "Enquiry Details | JR FINSERV Admin",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

type PageProps = { params: Promise<{ id: string }> };

export default async function EnquiryDetailPage({ params }: PageProps) {
	const { id } = await params;

	if (!id) {
		return <NotFound />;
	}

	const supabase = createServerSupabaseClient();

	// 1. Fetch enquiry with select("*") to be 100% schema resilient
	const { data, error } = await supabase
		.from("enquiries")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		console.error(`[EnquiryDetailPage] Supabase fetch error for id=${id}:`, error);
	}

	if (!data) {
		return <NotFound />;
	}

	// 2. Mark as read in background without blocking rendering
	try {
		await supabase
			.from("enquiries")
			.update({ is_read: true, updated_at: new Date().toISOString() })
			.eq("id", id);
	} catch (err) {
		// Non-critical: ignore if is_read column is not present
		console.warn(`[EnquiryDetailPage] Safe is_read update skipped for id=${id}:`, err);
	}

	const enquiry = data as Enquiry;

	return <EnquiryDetails enquiry={enquiry} />;
}
