import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { extractYouTubeId } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/youtube-videos  — list all youtube videos (admin view)
 * POST /api/youtube-videos — create a new youtube video record
 */

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("youtube_videos")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/youtube-videos]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/youtube-videos] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const errors: Record<string, string> = {};
    if (!body.title?.trim()) {
      errors.title = "Title is required.";
    }
    if (!body.youtube_url?.trim()) {
      errors.youtube_url = "YouTube URL is required.";
    } else {
      const videoId = extractYouTubeId(body.youtube_url);
      if (!videoId) {
        errors.youtube_url = "Invalid YouTube URL format. Please paste a valid YouTube video link.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("youtube_videos")
      .insert([
        {
          title: body.title.trim(),
          description: body.description?.trim() ?? null,
          youtube_url: body.youtube_url.trim(),
          category: body.category?.trim() || "Homepage",
          display_order: body.display_order ?? 0,
          is_active: body.is_active ?? true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/youtube-videos]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/youtube-videos] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
