import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * POST /api/upload
 *
 * Accepts multipart/form-data with:
 *   file   — the image File
 *   bucket — storage bucket name (hero | gallery | partners | testimonials)
 *   path   — optional sub-path prefix
 *
 * Returns { success, url } on success.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = formData.get("bucket") as string | null;
    const pathPrefix = (formData.get("path") as string | null) ?? "";

    if (!file || !bucket) {
      return NextResponse.json(
        { success: false, message: "file and bucket are required." },
        { status: 400 }
      );
    }

    const allowedBuckets = ["hero", "gallery", "partners", "testimonials"];
    if (!allowedBuckets.includes(bucket)) {
      return NextResponse.json(
        { success: false, message: "Invalid bucket." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only JPEG, PNG, WebP, GIF and SVG images are allowed." },
        { status: 400 }
      );
    }

    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: `File must be smaller than ${MAX_MB} MB.` },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const fileName = `${pathPrefix}${timestamp}-${random}.${ext}`;

    const supabase = createServerSupabaseClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[POST /api/upload] Storage error:", uploadError.message);
      return NextResponse.json(
        { success: false, message: "Upload failed. " + uploadError.message },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return NextResponse.json(
      { success: true, url: urlData.publicUrl, path: fileName },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/upload] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
