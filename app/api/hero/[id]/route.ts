import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { HeroSlideUpdate } from "@/types/cms";

/**
 * PATCH /api/hero/[id] — update a hero slide
 * DELETE /api/hero/[id] — delete a hero slide + remove its storage object
 */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json() as HeroSlideUpdate;
    const supabase = createServerSupabaseClient();

    const updates: Record<string, unknown> = {};
    if (body.title !== undefined)                updates.title = body.title?.trim();
    if (body.subtitle !== undefined)              updates.subtitle = body.subtitle?.trim() ?? null;
    if (body.primary_cta_text !== undefined)      updates.primary_cta_text = body.primary_cta_text?.trim() ?? null;
    if (body.primary_cta_link !== undefined)      updates.primary_cta_link = body.primary_cta_link?.trim() ?? null;
    if (body.secondary_cta_text !== undefined)    updates.secondary_cta_text = body.secondary_cta_text?.trim() ?? null;
    if (body.secondary_cta_link !== undefined)    updates.secondary_cta_link = body.secondary_cta_link?.trim() ?? null;
    if (body.image_url !== undefined)             updates.image_url = body.image_url ?? null;
    if (body.background_image_url !== undefined)  updates.background_image_url = body.background_image_url ?? null;
    if (body.is_active !== undefined)             updates.is_active = body.is_active;
    if (body.display_order !== undefined)         updates.display_order = body.display_order;

    const { data, error } = await supabase
      .from("hero_slides")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PATCH /api/hero/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/hero/[id]] unexpected:", err);
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

    // Fetch the record first to get image_url for storage cleanup
    const { data: existing } = await supabase
      .from("hero_slides")
      .select("image_url, background_image_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) {
      console.error("[DELETE /api/hero/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    // Best-effort storage cleanup
    if (existing?.image_url) {
      const path = extractStoragePath(existing.image_url);
      if (path) await supabase.storage.from("hero").remove([path]);
    }
    if (existing?.background_image_url) {
      const path = extractStoragePath(existing.background_image_url);
      if (path) await supabase.storage.from("hero").remove([path]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/hero/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

function extractStoragePath(url: string): string | null {
  try {
    const u = new URL(url);
    // Supabase public URL: /storage/v1/object/public/{bucket}/{path}
    const match = u.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
