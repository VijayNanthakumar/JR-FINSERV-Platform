import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const supabase = createServerSupabaseClient();

    const updates: Record<string, unknown> = {};
    if (body.customer_name !== undefined) updates.customer_name = body.customer_name?.trim();
    if (body.designation !== undefined)   updates.designation = body.designation?.trim() ?? null;
    if (body.company !== undefined)       updates.company = body.company?.trim() ?? null;
    if (body.review !== undefined)        updates.review = body.review?.trim();
    if (body.photo_url !== undefined)     updates.photo_url = body.photo_url ?? null;
    if (body.is_active !== undefined)     updates.is_active = body.is_active;
    if (body.display_order !== undefined) updates.display_order = body.display_order;
    if (body.rating !== undefined) {
      const rating = Number(body.rating);
      if (rating >= 1 && rating <= 5 && Number.isInteger(rating)) {
        updates.rating = rating;
      }
    }

    const { data, error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PATCH /api/testimonials/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/testimonials/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = createServerSupabaseClient();

    const { data: existing } = await supabase
      .from("testimonials")
      .select("photo_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      console.error("[DELETE /api/testimonials/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    if (existing?.photo_url) {
      const path = extractStoragePath(existing.photo_url);
      if (path) await supabase.storage.from("testimonials").remove([path]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/testimonials/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

function extractStoragePath(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
