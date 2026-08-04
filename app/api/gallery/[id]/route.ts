import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const supabase = createServerSupabaseClient();

    const updates: Record<string, unknown> = {};
    if (body.image_url !== undefined)   updates.image_url = body.image_url;
    if (body.title !== undefined)       updates.title = body.title?.trim() ?? null;
    if (body.description !== undefined) updates.description = body.description?.trim() ?? null;
    if (body.category !== undefined)    updates.category = body.category?.trim() ?? null;
    if (body.caption !== undefined)     updates.caption = body.caption?.trim() ?? null;
    if (body.alt_text !== undefined)    updates.alt_text = body.alt_text?.trim() ?? null;
    if (body.is_active !== undefined)   updates.is_active = body.is_active;
    if (body.display_order !== undefined) updates.display_order = body.display_order;

    const { data, error } = await supabase
      .from("gallery_images")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PATCH /api/gallery/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/gallery");
    revalidatePath("/");
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/gallery/[id]] unexpected:", err);
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
      .from("gallery_images")
      .select("image_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) {
      console.error("[DELETE /api/gallery/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    if (existing?.image_url) {
      const path = extractStoragePath(existing.image_url);
      if (path) await supabase.storage.from("gallery").remove([path]);
    }

    revalidatePath("/gallery");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/gallery/[id]] unexpected:", err);
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
