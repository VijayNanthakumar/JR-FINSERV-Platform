-- ============================================================
-- JR FINSERV PLATFORM — YouTube Videos & Gallery Schema Update
-- Run this script in the Supabase SQL Editor.
-- ============================================================

-- Helper function (if not created previously)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── 1. youtube_videos Table ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS youtube_videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  youtube_url   TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'Homepage',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_active_category_order
  ON youtube_videos (is_active, category, display_order);

CREATE OR REPLACE TRIGGER youtube_videos_updated_at
  BEFORE UPDATE ON youtube_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- Public read policy for website rendering
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'youtube_videos' AND policyname = 'Public read youtube_videos'
  ) THEN
    CREATE POLICY "Public read youtube_videos"
      ON youtube_videos FOR SELECT USING (true);
  END IF;
END $$;

-- ─── 2. gallery_images Schema Enhancements ───────────────────────────────────

ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS category TEXT;

-- ============================================================
-- DONE.
-- ============================================================
