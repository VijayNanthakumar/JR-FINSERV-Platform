import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * GET /api/gallery  — list all gallery images (admin view)
 * POST /api/gallery — create a new gallery image record
 */

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/gallery]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/gallery] unexpected:", err);
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

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .insert([
        {
          image_url: body.image_url.trim(),
          title: body.title?.trim() ?? null,
          description: body.description?.trim() ?? null,
          category: body.category?.trim() ?? null,
          caption: body.caption?.trim() ?? body.title?.trim() ?? null,
          alt_text: body.alt_text?.trim() ?? body.title?.trim() ?? null,
          is_active: body.is_active ?? true,
          display_order: body.display_order ?? 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/gallery]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/gallery] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
