import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/testimonials  — list all testimonials (admin view)
 * POST /api/testimonials — create a new testimonial
 */

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[GET /api/testimonials]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/testimonials] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const errors: Record<string, string> = {};
    if (!body.customer_name?.trim()) errors.customer_name = "Customer name is required.";
    if (!body.review?.trim()) errors.review = "Review text is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, message: "Validation failed.", errors }, { status: 400 });
    }

    const rating = Number(body.rating ?? 5);
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { success: false, message: "Rating must be an integer between 1 and 5.", errors: { rating: "Rating must be 1–5." } },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .insert([{
        customer_name: body.customer_name.trim(),
        designation: body.designation?.trim() ?? null,
        company: body.company?.trim() ?? null,
        review: body.review.trim(),
        rating,
        photo_url: body.photo_url ?? null,
        is_active: body.is_active ?? true,
        display_order: body.display_order ?? 0,
      }])
      .select()
      .single();

    if (error) {
      console.error("[POST /api/testimonials]", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath("/testimonials");
    revalidatePath("/");
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/testimonials] unexpected:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
