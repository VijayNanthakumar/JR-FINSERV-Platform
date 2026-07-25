import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * POST /api/gallery/reorder
 *
 * Body: { items: Array<{ id: string; display_order: number }> }
 * Batch-updates display_order for all provided gallery image records.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items: { id: string; display_order: number }[] = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "items array is required." },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const updates = items.map(({ id, display_order }) =>
      supabase
        .from("gallery_images")
        .update({ display_order })
        .eq("id", id)
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/gallery/reorder] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
