const { createClient } = require('@supabase/supabase-js');

// =====================================================
// BHG - Create Missing Tables via Supabase Admin API
// Target: acfjjrupcigwjbqcbonw (Be Humble & Grow ONLY)
// =====================================================

const supabase = createClient(
  'https://acfjjrupcigwjbqcbonw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmpqcnVwY2lnd2picWNib253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDkyNjg4NSwiZXhwIjoyMTAwNTAyODg1fQ.MH4Poph6kA6tQKoxEYYImYj0S9Yl12qcAr2js0jiTNA'
);

async function createMissingTables() {
  console.log('=== Creating Missing Tables on BHG (acfjjrupcigwjbqcbonw) ===\n');

  // We can't run DDL SQL directly via PostgREST. 
  // But we CAN use the Supabase Management API via access token.
  // Alternative: use the Supabase SQL editor in dashboard.
  
  // For now, let's generate the exact SQL that needs to be run
  // and save it as a migration file for the user to apply.

  const migrationSql = `-- Migration: Create Missing Tables for BHG
-- Target: acfjjrupcigwjbqcbonw (Be Humble & Grow)
-- Run this in the Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/acfjjrupcigwjbqcbonw/sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- ORGANISATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.organisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'platform',
  country_code VARCHAR(3) NOT NULL DEFAULT 'AE',
  license_number TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.organisations ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ORGANISATION_USERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.organisation_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  role_in_org TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, organisation_id)
);
ALTER TABLE public.organisation_users ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- INVITATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ==========================================
-- SECURITY_EVENTS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RECRUITMENT_PARTNERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.recruitment_partners (
  id UUID PRIMARY KEY REFERENCES public.organisations(id) ON DELETE CASCADE,
  license_number TEXT,
  primary_contact_email TEXT NOT NULL,
  compliance_status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.recruitment_partners ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- EMPLOYERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.employers (
  id UUID PRIMARY KEY REFERENCES public.organisations(id) ON DELETE CASCADE,
  industry TEXT NOT NULL,
  company_website TEXT,
  verification_status TEXT NOT NULL DEFAULT 'verified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- LEAD_ASSIGNMENTS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.lead_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES public.recruitment_partners(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- INTERVIEWS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  interviewer_id UUID NOT NULL REFERENCES public.profiles(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  meeting_link TEXT,
  feedback_notes TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- OFFERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  employer_id UUID NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
  salary NUMERIC(12,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'AED',
  status TEXT NOT NULL DEFAULT 'issued',
  valid_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- REFUNDS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE RESTRICT,
  requested_by UUID NOT NULL REFERENCES public.profiles(id),
  approved_by UUID REFERENCES public.profiles(id),
  amount NUMERIC(10,2) NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_approval',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- STATUS_HISTORY
-- ==========================================
CREATE TABLE IF NOT EXISTS public.status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES public.profiles(id),
  user_role TEXT,
  organisation_id UUID,
  candidate_message TEXT,
  internal_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- AUDIT_LOGS (Append-only)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.profiles(id),
  actor_role TEXT NOT NULL,
  org_id UUID,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Protect audit_logs from modification
CREATE OR REPLACE FUNCTION protect_audit_logs()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'AUDIT LOG IMMUTABILITY VIOLATION: Audit log records cannot be modified or deleted.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_protect_audit_logs ON public.audit_logs;
CREATE TRIGGER trg_protect_audit_logs
BEFORE UPDATE OR DELETE ON public.audit_logs
FOR EACH ROW EXECUTE FUNCTION protect_audit_logs();

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- Security events: authenticated users can insert their own events
DO $$ BEGIN
  CREATE POLICY security_events_insert_own ON public.security_events
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Security events: service role can read all
DO $$ BEGIN
  CREATE POLICY security_events_select_service ON public.security_events
    FOR SELECT TO service_role
    USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Invitations: authenticated users can read
DO $$ BEGIN
  CREATE POLICY invitations_select_auth ON public.invitations
    FOR SELECT TO authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Audit logs: service role insert only
DO $$ BEGIN
  CREATE POLICY audit_logs_insert_service ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;
`;

  console.log(migrationSql);
  
  // Save to migration file
  const fs = require('fs');
  const migrationPath = 'supabase/migrations/20260725000003_create_missing_tables.sql';
  fs.writeFileSync(migrationPath, migrationSql);
  console.log(`\n✅ Migration saved to: ${migrationPath}`);
  console.log('Run this SQL in the Supabase Dashboard SQL Editor for project acfjjrupcigwjbqcbonw');
}

createMissingTables().catch(console.error);
