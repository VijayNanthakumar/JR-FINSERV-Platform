-- ============================================================
-- JR FINSERV PLATFORM — Notices CMS Migration
-- Run this entire script in the Supabase SQL Editor.
-- ============================================================

-- ─── notices table ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url         TEXT NOT NULL,
  service_category  TEXT NOT NULL DEFAULT 'All Services'
    CHECK (service_category IN (
      'Homepage',
      'Mutual Funds',
      'LIC',
      'Health Insurance',
      'General Insurance',
      'All Services'
    )),
  display_order     INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast public queries (active + category + order)
CREATE INDEX IF NOT EXISTS idx_notices_active_category_order
  ON notices (is_active, service_category, display_order);

-- Reuse the existing updated_at trigger function
CREATE OR REPLACE TRIGGER notices_updated_at
  BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Row Level Security ────────────────────────────────────────────────────

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Public read policy (anon key can read for public website)
CREATE POLICY "Public read notices"
  ON notices FOR SELECT USING (true);

-- ============================================================
-- DONE. Now create the Storage bucket in Supabase Dashboard:
--   Storage > New bucket: notices (public)
-- ============================================================
