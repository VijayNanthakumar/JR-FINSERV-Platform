import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * POST /api/enquiries
 *
 * Public endpoint for website enquiries.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 }
    );
  }

  const { name, phone, service, message, email } = body as {
    name?: string;
    phone?: string;
    service?: string;
    message?: string;
    email?: string;
  };

  const fieldErrors: Record<string, string> = {};

  if (!name?.trim()) {
    fieldErrors.name = "Full name is required.";
  }

  if (!phone?.trim()) {
    fieldErrors.phone = "Phone number is required.";
  }

  if (!service?.trim()) {
    fieldErrors.service = "Service selection is required.";
  }

  // Phone validation

  const phoneNumber = String(phone ?? "").replace(/\s+/g, "");

  if (phone && !/^\d{10}$/.test(phoneNumber)) {
    fieldErrors.phone = "Enter a valid 10-digit phone number.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed.",
        errors: fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  const payload: Record<string, string> = {
    name: String(name).trim(),
    phone: phoneNumber,
    service: String(service).trim(),
    message: message?.trim() ? String(message).trim() : "No message provided",
  };

  if (email?.trim()) {
    payload.email = email.trim();
  }

  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("enquiries")
    .insert([payload]);

  if (error) {
    console.error("[POST /api/enquiries] Supabase error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit enquiry. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Enquiry submitted successfully.",
    },
    {
      status: 201,
    }
  );
}