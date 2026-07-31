import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NOTICE_CATEGORIES } from "@/types/cms";

/**
 * GET /api/notices  — list all notices (admin view), or filter by category
 * POST /api/notices — create a new notice record
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const supabase = createServerSupabaseClient();
    let query = supabase.from("notices").select("*");

    if (category) {
      query = query.eq("service_category", category);
    }

    const { data, error } = await query.order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/notices]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/notices] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.image_url?.trim()) {
      return NextResponse.json(
        { success: false, message: "image_url is required.", errors: { image_url: "Image is required." } },
        { status: 400 }
      );
    }

    // Validate service_category
    const validCategories = NOTICE_CATEGORIES as readonly string[];
    const category = body.service_category?.trim() || "All Services";
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid service category.", errors: { service_category: "Invalid category." } },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("notices")
      .insert([
        {
          image_url: body.image_url.trim(),
          service_category: category,
          display_order: body.display_order ?? 0,
          is_active: body.is_active ?? true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/notices]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/notices] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
