import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NOTICE_CATEGORIES } from "@/types/cms";

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
    if (body.image_url !== undefined) updates.image_url = body.image_url;
    if (body.service_category !== undefined) {
      const validCategories = NOTICE_CATEGORIES as readonly string[];
      if (!validCategories.includes(body.service_category)) {
        return NextResponse.json(
          { success: false, message: "Invalid service category." },
          { status: 400 }
        );
      }
      updates.service_category = body.service_category;
    }
    if (body.is_active !== undefined) updates.is_active = body.is_active;
    if (body.display_order !== undefined) updates.display_order = body.display_order;

    const { data, error } = await supabase
      .from("notices")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PATCH /api/notices/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/notice-board");
    revalidatePath("/");
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/notices/[id]] unexpected:", err);
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

    // Fetch existing record to clean up storage
    const { data: existing } = await supabase
      .from("notices")
      .select("image_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (error) {
      console.error("[DELETE /api/notices/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    // Remove image from storage
    if (existing?.image_url) {
      const path = extractStoragePath(existing.image_url);
      if (path) await supabase.storage.from("notices").remove([path]);
    }

    revalidatePath("/notice-board");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/notices/[id]] unexpected:", err);
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
