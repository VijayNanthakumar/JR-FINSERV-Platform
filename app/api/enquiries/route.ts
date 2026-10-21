import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Enquiry, EnquiryStats } from "@/types/enquiry";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/enquiries
 *
 * Admin endpoint to list all enquiries and calculate realtime summary statistics.
 */
export async function GET(request: NextRequest) {
	try {
		const supabase = createServerSupabaseClient();
		const { searchParams } = new URL(request.url);
		const limitParam = searchParams.get("limit");
		const limit = limitParam ? parseInt(limitParam, 10) : undefined;

		let query = supabase
			.from("enquiries")
			.select("*")
			.order("created_at", { ascending: false });

		if (limit) {
			query = query.limit(limit);
		}

		const { data, error } = await query;

		if (error) {
			console.error("[GET /api/enquiries] Supabase error:", error.message);
			return NextResponse.json(
				{ success: false, message: "Failed to fetch enquiries." },
				{ status: 500 }
			);
		}

		const enquiries = (data as Enquiry[]) ?? [];

		// Calculate statistics
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

		let todayCount = 0;
		let weekCount = 0;
		let monthCount = 0;
		let pendingCount = 0;
		let contactedCount = 0;
		let closedCount = 0;
		let unreadCount = 0;

		for (const item of enquiries) {
			const createdAt = new Date(item.created_at);

			if (createdAt >= startOfToday) todayCount++;
			if (createdAt >= sevenDaysAgo) weekCount++;
			if (createdAt >= startOfMonth) monthCount++;

			if (item.status === "New") pendingCount++;
			if (item.status === "Contacted") contactedCount++;
			if (item.status === "Closed") closedCount++;

			if (item.is_read === false || (item.is_read === undefined && item.status === "New")) {
				unreadCount++;
			}
		}

		const stats: EnquiryStats = {
			todayCount,
			weekCount,
			monthCount,
			pendingCount,
			contactedCount,
			closedCount,
			totalCount: enquiries.length,
			unreadCount,
		};

		return NextResponse.json({
			success: true,
			enquiries,
			stats,
		});
	} catch (err) {
		console.error("[GET /api/enquiries] Unexpected error:", err);
		return NextResponse.json(
			{ success: false, message: "Internal server error." },
			{ status: 500 }
		);
	}
}

/**
 * POST /api/enquiries
 *
 * Public endpoint for website enquiries.
 */
export async function POST(request: NextRequest) {
	let body: Record<string, unknown>;

	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid JSON body.",
			},
			{ status: 400 }
		);
	}

	const { name, phone, service, message, email } = body as {
		name?: string;
		phone?: string;
		service?: string;
		message?: string;
		email?: string;
	};

	const fieldErrors: Record<string, string> = {};

	if (!name?.trim()) {
		fieldErrors.name = "Full name is required.";
	}

	if (!phone?.trim()) {
		fieldErrors.phone = "Phone number is required.";
	}

	if (!service?.trim()) {
		fieldErrors.service = "Service selection is required.";
	}

	// Phone validation
	const phoneNumber = String(phone ?? "").replace(/\s+/g, "");

	if (phone && !/^\d{10}$/.test(phoneNumber)) {
		fieldErrors.phone = "Enter a valid 10-digit phone number.";
	}

	if (Object.keys(fieldErrors).length > 0) {
		return NextResponse.json(
			{
				success: false,
				message: "Validation failed.",
				errors: fieldErrors,
			},
			{
				status: 400,
			}
		);
	}

	const payload: Record<string, unknown> = {
		name: String(name).trim(),
		phone: phoneNumber,
		service: String(service).trim(),
		message: message?.trim() ? String(message).trim() : "No message provided",
		status: "New",
		is_read: false,
	};

	if (email?.trim()) {
		payload.email = email.trim();
	}

	const supabase = createServerSupabaseClient();

	const { error } = await supabase
		.from("enquiries")
		.insert([payload]);

	if (error) {
		console.error("[POST /api/enquiries] Supabase error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Failed to submit enquiry. Please try again later.",
			},
			{
				status: 500,
			}
		);
	}

	revalidatePath("/portal/enquiries");
	revalidatePath("/portal/dashboard");

	return NextResponse.json(
		{
			success: true,
			message: "Enquiry submitted successfully.",
		},
		{
			status: 201,
		}
	);
}