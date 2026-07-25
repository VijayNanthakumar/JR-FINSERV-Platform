import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { HeroSlideInsert } from "@/types/cms";

/**
 * GET /api/hero  — list all hero slides (admin, unfiltered by active)
 * POST /api/hero — create a new hero slide
 */

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/hero]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/hero] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<HeroSlideInsert>;

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required.", errors: { title: "Title is required." } },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .insert([{
        title: body.title.trim(),
        subtitle: body.subtitle?.trim() ?? null,
        primary_cta_text: body.primary_cta_text?.trim() ?? null,
        primary_cta_link: body.primary_cta_link?.trim() ?? null,
        secondary_cta_text: body.secondary_cta_text?.trim() ?? null,
        secondary_cta_link: body.secondary_cta_link?.trim() ?? null,
        image_url: body.image_url ?? null,
        background_image_url: body.background_image_url ?? null,
        is_active: body.is_active ?? true,
        display_order: body.display_order ?? 0,
      }])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/hero]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/hero] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
