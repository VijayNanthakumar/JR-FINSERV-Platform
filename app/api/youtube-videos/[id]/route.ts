import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { extractYouTubeId } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("youtube_videos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/youtube-videos/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.youtube_url) {
      const videoId = extractYouTubeId(body.youtube_url);
      if (!videoId) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid YouTube URL format.",
            errors: { youtube_url: "Invalid YouTube URL format." },
          },
          { status: 400 }
        );
      }
    }

    const updates: Record<string, unknown> = {};
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.description !== undefined) updates.description = body.description ? body.description.trim() : null;
    if (body.youtube_url !== undefined) updates.youtube_url = body.youtube_url.trim();
    if (body.category !== undefined) updates.category = body.category.trim();
    if (body.display_order !== undefined) updates.display_order = body.display_order;
    if (body.is_active !== undefined) updates.is_active = body.is_active;

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("youtube_videos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/youtube-videos/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("youtube_videos").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, message: "Video deleted successfully." });
  } catch (err) {
    console.error("[DELETE /api/youtube-videos/[id]] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
