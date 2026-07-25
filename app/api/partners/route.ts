import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * GET /api/partners  — list all partners (admin view)
 * POST /api/partners — create a new partner
 */

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/partners]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/partners] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const errors: Record<string, string> = {};
    if (!body.name?.trim()) errors.name = "Partner name is required.";
    if (!body.logo_url?.trim()) errors.logo_url = "Logo image is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, message: "Validation failed.", errors }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("partners")
      .insert([{
        name: body.name.trim(),
        logo_url: body.logo_url.trim(),
        website_url: body.website_url?.trim() ?? null,
        category: body.category?.trim() ?? null,
        is_active: body.is_active ?? true,
        display_order: body.display_order ?? 0,
      }])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/partners]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/partners] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
