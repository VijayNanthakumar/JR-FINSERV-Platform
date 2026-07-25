/**
 * Shared CMS TypeScript interfaces.
 * Keep in sync with Supabase DB schema.
 */

// ─── Hero Slides ────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  primary_cta_text: string | null;
  primary_cta_link: string | null;
  secondary_cta_text: string | null;
  secondary_cta_link: string | null;
  image_url: string | null;
  background_image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type HeroSlideInsert = Omit<HeroSlide, "id" | "created_at" | "updated_at">;
export type HeroSlideUpdate = Partial<HeroSlideInsert>;

// ─── Gallery Images ──────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type GalleryImageInsert = Omit<GalleryImage, "id" | "created_at" | "updated_at">;
export type GalleryImageUpdate = Partial<GalleryImageInsert>;

// ─── Partners ────────────────────────────────────────────────────────────────

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  category: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type PartnerInsert = Omit<Partner, "id" | "created_at" | "updated_at">;
export type PartnerUpdate = Partial<PartnerInsert>;

/** Partners grouped by category for the homepage display */
export interface PartnerCategory {
  name: string;
  logos: { name: string; src: string; website_url?: string | null }[];
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  customer_name: string;
  designation: string | null;
  company: string | null;
  review: string;
  rating: number;
  photo_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TestimonialInsert = Omit<Testimonial, "id" | "created_at" | "updated_at">;
export type TestimonialUpdate = Partial<TestimonialInsert>;

// ─── API Response Envelope ───────────────────────────────────────────────────

export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}
