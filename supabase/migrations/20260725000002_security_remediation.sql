-- ====================================================================
-- BE HUMBLE & GROW — AUTHENTICATION SECURITY REMEDIATION MIGRATION
-- Project Target: acfjjrupcigwjbqcbonw (https://acfjjrupcigwjbqcbonw.supabase.co)
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PUBLIC.INVITATIONS TABLE
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'recruiter',
  organisation_id UUID,
  token_hash TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  expires_at TIMESTAMPTZ NOT NULL,
  invited_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_at TIMESTAMPTZ
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY invitations_select_policy ON public.invitations FOR SELECT TO authenticated USING (true);
  CREATE POLICY invitations_insert_policy ON public.invitations FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY invitations_update_policy ON public.invitations FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. PUBLIC.SECURITY_EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY security_events_insert_policy ON public.security_events FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY security_events_select_policy ON public.security_events FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;
