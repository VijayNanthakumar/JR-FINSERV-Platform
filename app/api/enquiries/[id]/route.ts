import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { EnquiryStatus } from "@/types/enquiry";

type RouteContext = { params: Promise<{ id: string }> };

// ─── PATCH /api/enquiries/[id] ────────────────────────────────────────────────
// Admin endpoint — updates status and/or notes for a single enquiry.
// Always sets updated_at to the current timestamp.
export async function PATCH(request: NextRequest, context: RouteContext) {
	const { id } = await context.params;

	if (!id) {
		return NextResponse.json(
			{ success: false, message: "Enquiry ID is required." },
			{ status: 400 },
		);
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ success: false, message: "Invalid JSON body." },
			{ status: 400 },
		);
	}

	const VALID_STATUSES: EnquiryStatus[] = ["New", "Contacted", "Closed"];
	const patch: Record<string, unknown> = {
		updated_at: new Date().toISOString(),
	};

	// status (optional in payload)
	if ("status" in body) {
		const s = body.status as string;
		if (!VALID_STATUSES.includes(s as EnquiryStatus)) {
			return NextResponse.json(
				{ success: false, message: "Invalid status value." },
				{ status: 400 },
			);
		}
		patch.status = s;
	}

	// notes (optional in payload, allow null to clear)
	if ("notes" in body) {
		patch.notes =
			body.notes === null ? null : String(body.notes ?? "").trim() || null;
	}

	const supabase = createServerSupabaseClient();
	const { error } = await supabase
		.from("enquiries")
		.update(patch)
		.eq("id", id);

	if (error) {
		console.error(`[PATCH /api/enquiries/${id}]`, error);
		return NextResponse.json(
			{ success: false, message: "Failed to update enquiry. Please try again." },
			{ status: 500 },
		);
	}

	return NextResponse.json({ success: true, message: "Enquiry updated." });
}

// ─── DELETE /api/enquiries/[id] ───────────────────────────────────────────────
// Admin endpoint — permanently deletes a single enquiry row.
export async function DELETE(_request: NextRequest, context: RouteContext) {
	const { id } = await context.params;

	if (!id) {
		return NextResponse.json(
			{ success: false, message: "Enquiry ID is required." },
			{ status: 400 },
		);
	}

	const supabase = createServerSupabaseClient();
	const { error } = await supabase.from("enquiries").delete().eq("id", id);

	if (error) {
		console.error(`[DELETE /api/enquiries/${id}]`, error);
		return NextResponse.json(
			{ success: false, message: "Failed to delete enquiry. Please try again." },
			{ status: 500 },
		);
	}

	return NextResponse.json({ success: true, message: "Enquiry deleted." });
}
