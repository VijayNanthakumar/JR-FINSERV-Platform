-- ============================================================
-- JR FINSERV PLATFORM — Phase 4 CMS Migration
-- Run this entire script in the Supabase SQL Editor.
-- ============================================================

-- ─── Helper: auto-update updated_at on every row change ────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── 1. hero_slides ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hero_slides (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  subtitle              TEXT,
  primary_cta_text      TEXT,
  primary_cta_link      TEXT,
  secondary_cta_text    TEXT,
  secondary_cta_link    TEXT,
  image_url             TEXT,
  background_image_url  TEXT,
  is_active             BOOLEAN NOT NULL DEFAULT TRUE,
  display_order         INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order
  ON hero_slides (is_active, display_order);

CREATE OR REPLACE TRIGGER hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── 2. gallery_images ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     TEXT NOT NULL,
  caption       TEXT,
  alt_text      TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_active_order
  ON gallery_images (is_active, display_order);

CREATE OR REPLACE TRIGGER gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── 3. partners ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  logo_url      TEXT NOT NULL,
  website_url   TEXT,
  category      TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partners_active_category_order
  ON partners (is_active, category, display_order);

CREATE OR REPLACE TRIGGER partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── 4. testimonials ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS testimonials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name   TEXT NOT NULL,
  designation     TEXT,
  company         TEXT,
  review          TEXT NOT NULL,
  rating          INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  photo_url       TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_active_order
  ON testimonials (is_active, display_order);

CREATE OR REPLACE TRIGGER testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Row Level Security (service role bypasses RLS automatically) ───────────

ALTER TABLE hero_slides   ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   ENABLE ROW LEVEL SECURITY;

-- Public read policy (so anon key can read for public website if needed)
CREATE POLICY "Public read hero_slides"
  ON hero_slides FOR SELECT USING (true);

CREATE POLICY "Public read gallery_images"
  ON gallery_images FOR SELECT USING (true);

CREATE POLICY "Public read partners"
  ON partners FOR SELECT USING (true);

CREATE POLICY "Public read testimonials"
  ON testimonials FOR SELECT USING (true);

-- ============================================================
-- DONE. Now create these Storage buckets in Supabase Dashboard:
--   Storage > New bucket: hero     (public)
--   Storage > New bucket: gallery  (public)
--   Storage > New bucket: partners (public)
--   Storage > New bucket: testimonials (public)
-- ============================================================
