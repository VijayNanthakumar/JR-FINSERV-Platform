/**
 * lib/cms-data.ts
 *
 * Server-side Supabase helpers for fetching CMS content.
 * Used ONLY by Server Components (public pages).
 * Never import from client components — use API routes for mutations.
 */

import { createServerSupabaseClient } from "@/lib/supabase-server";
import type {
  HeroSlide,
  GalleryImage,
  Partner,
  PartnerCategory,
  Testimonial,
} from "@/types/cms";

// ─── Hero Slides ─────────────────────────────────────────────────────────────

export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[cms-data] getActiveHeroSlides error:", error.message);
      return [];
    }
    return (data as HeroSlide[]) ?? [];
  } catch (err) {
    console.error("[cms-data] getActiveHeroSlides unexpected error:", err);
    return [];
  }
}

// ─── Gallery Images ───────────────────────────────────────────────────────────

export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[cms-data] getActiveGalleryImages error:", error.message);
      return [];
    }
    return (data as GalleryImage[]) ?? [];
  } catch (err) {
    console.error("[cms-data] getActiveGalleryImages unexpected error:", err);
    return [];
  }
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export async function getActivePartners(): Promise<Partner[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("is_active", true)
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[cms-data] getActivePartners error:", error.message);
      return [];
    }
    return (data as Partner[]) ?? [];
  } catch (err) {
    console.error("[cms-data] getActivePartners unexpected error:", err);
    return [];
  }
}

/**
 * Groups partners by their `category` field.
 * Returns an array of { name, logos[] } matching the homepage layout.
 */
export function groupPartnersByCategory(partners: Partner[]): PartnerCategory[] {
  const map = new Map<string, PartnerCategory>();

  for (const partner of partners) {
    const cat = partner.category ?? "Other";
    if (!map.has(cat)) {
      map.set(cat, { name: cat, logos: [] });
    }
    map.get(cat)!.logos.push({
      name: partner.name,
      src: partner.logo_url,
      website_url: partner.website_url,
    });
  }

  return Array.from(map.values());
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[cms-data] getActiveTestimonials error:", error.message);
      return [];
    }
    return (data as Testimonial[]) ?? [];
  } catch (err) {
    console.error("[cms-data] getActiveTestimonials unexpected error:", err);
    return [];
  }
}
