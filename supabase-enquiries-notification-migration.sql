-- ==============================================================================
-- JR FINSERV PLATFORM - ENQUIRIES NOTIFICATIONS & REALTIME MIGRATION
-- ==============================================================================

-- 1. Add is_read column to enquiries table if it doesn't already exist
ALTER TABLE IF EXISTS enquiries 
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 2. Create performance indexes for real-time querying & badge counts
CREATE INDEX IF NOT EXISTS idx_enquiries_is_read ON enquiries(is_read);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

-- 3. Enable Supabase Realtime publication on enquiries table
-- (Note: Ignore if already added to publication)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'enquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE enquiries;
  END IF;
END $$;
