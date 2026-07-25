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
    if (body.name !== undefined)          updates.name = body.name?.trim();
    if (body.logo_url !== undefined)      updates.logo_url = body.logo_url;
    if (body.website_url !== undefined)   updates.website_url = body.website_url?.trim() ?? null;
    if (body.category !== undefined)      updates.category = body.category?.trim() ?? null;
    if (body.is_active !== undefined)     updates.is_active = body.is_active;
    if (body.display_order !== undefined) updates.display_order = body.display_order;

    const { data, error } = await supabase
      .from("partners")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PATCH /api/partners/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/partners/[id]] unexpected:", err);
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
      .from("partners")
      .select("logo_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) {
      console.error("[DELETE /api/partners/[id]]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    if (existing?.logo_url) {
      const path = extractStoragePath(existing.logo_url);
      if (path) await supabase.storage.from("partners").remove([path]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/partners/[id]] unexpected:", err);
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
