import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { EnquiryStatus, Enquiry } from "@/types/enquiry";

type RouteContext = { params: Promise<{ id: string }> };

// ─── GET /api/enquiries/[id] ──────────────────────────────────────────────────
// Admin endpoint — fetches a single enquiry by ID.
export async function GET(_request: NextRequest, context: RouteContext) {
	const { id } = await context.params;

	if (!id) {
		return NextResponse.json(
			{ success: false, message: "Enquiry ID is required." },
			{ status: 400 }
		);
	}

	const supabase = createServerSupabaseClient();

	const { data, error } = await supabase
		.from("enquiries")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error || !data) {
		console.error(`[GET /api/enquiries/${id}] Error:`, error?.message);
		return NextResponse.json(
			{ success: false, message: "Enquiry not found." },
			{ status: 404 }
		);
	}

	// Background mark as read
	try {
		await supabase
			.from("enquiries")
			.update({ is_read: true, updated_at: new Date().toISOString() })
			.eq("id", id);
	} catch {
		// Ignore if column doesn't exist
	}

	return NextResponse.json({
		success: true,
		enquiry: data as Enquiry,
	});
}

// ─── PATCH /api/enquiries/[id] ────────────────────────────────────────────────
// Admin endpoint — updates status, notes, and/or is_read for a single enquiry.
export async function PATCH(request: NextRequest, context: RouteContext) {
	const { id } = await context.params;

	if (!id) {
		return NextResponse.json(
			{ success: false, message: "Enquiry ID is required." },
			{ status: 400 }
		);
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ success: false, message: "Invalid JSON body." },
			{ status: 400 }
		);
	}

	const VALID_STATUSES: EnquiryStatus[] = ["New", "Contacted", "Closed"];
	const patch: Record<string, unknown> = {
		updated_at: new Date().toISOString(),
	};

	if ("status" in body) {
		const s = body.status as string;
		if (!VALID_STATUSES.includes(s as EnquiryStatus)) {
			return NextResponse.json(
				{ success: false, message: "Invalid status value." },
				{ status: 400 }
			);
		}
		patch.status = s;
	}

	if ("notes" in body) {
		patch.notes =
			body.notes === null ? null : String(body.notes ?? "").trim() || null;
	}

	if ("is_read" in body) {
		patch.is_read = Boolean(body.is_read);
	}

	const supabase = createServerSupabaseClient();
	const { error } = await supabase
		.from("enquiries")
		.update(patch)
		.eq("id", id);

	if (error) {
		// If error is caused by missing is_read column, retry without is_read
		if ("is_read" in patch) {
			delete patch.is_read;
			const { error: retryError } = await supabase
				.from("enquiries")
				.update(patch)
				.eq("id", id);

			if (retryError) {
				console.error(`[PATCH /api/enquiries/${id}] Retry error:`, retryError);
				return NextResponse.json(
					{ success: false, message: "Failed to update enquiry. Please try again." },
					{ status: 500 }
				);
			}
			return NextResponse.json({ success: true, message: "Enquiry updated." });
		}

		console.error(`[PATCH /api/enquiries/${id}]`, error);
		return NextResponse.json(
			{ success: false, message: "Failed to update enquiry. Please try again." },
			{ status: 500 }
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
			{ status: 400 }
		);
	}

	const supabase = createServerSupabaseClient();
	const { error } = await supabase.from("enquiries").delete().eq("id", id);

	if (error) {
		console.error(`[DELETE /api/enquiries/${id}]`, error);
		return NextResponse.json(
			{ success: false, message: "Failed to delete enquiry. Please try again." },
			{ status: 500 }
		);
	}

	return NextResponse.json({ success: true, message: "Enquiry deleted." });
}
