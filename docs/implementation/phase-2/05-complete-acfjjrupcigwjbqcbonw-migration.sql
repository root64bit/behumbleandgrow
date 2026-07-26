-- ====================================================================
-- BE HUMBLE & GROW — COMPLETE PRODUCTION DATABASE MIGRATION FOR:
-- SUPABASE PROJECT: acfjjrupcigwjbqcbonw (https://acfjjrupcigwjbqcbonw.supabase.co)
-- Execute this entire script in Supabase Dashboard -> SQL Editor
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- 1. ENUMS & TYPES
-- ====================================================================
DO $$ BEGIN
  CREATE TYPE org_type_enum AS ENUM (
    'platform', 'platform_hq', 'recruitment_partner', 'employer', 
    'country_partner', 'training_institution', 'service_provider'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE candidate_stage_enum AS ENUM (
    'registered', 'eligibility_passed', 'onboarding', 'verified',
    'lead_assigned', 'partner_interview', 'employer_submitted',
    'employer_interview', 'offer_issued', 'offer_accepted',
    'visa_processing', 'placed', 'rejected', 'withdrawn'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status_enum AS ENUM (
    'pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE doc_classification_enum AS ENUM (
    'public', 'internal', 'confidential', 'restricted', 'secret'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ====================================================================
-- 2. CORE TABLES (PROFILES, ORGANISATIONS, CANDIDATES)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  country_code VARCHAR(3) NOT NULL DEFAULT 'MOZ',
  default_role TEXT NOT NULL DEFAULT 'candidate',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended', 'ativo', 'inativo', 'pendente')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type org_type_enum NOT NULL DEFAULT 'employer',
  country_code VARCHAR(3) NOT NULL DEFAULT 'AE',
  license_number TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.roles (name, description) VALUES
  ('super_admin', 'Full platform control'),
  ('operations_admin', 'Operations administrative control'),
  ('operations_manager', 'Operations management'),
  ('candidate_reviewer', 'Candidate profile reviewer'),
  ('document_reviewer', 'Document compliance officer'),
  ('candidate', 'Registered candidate account'),
  ('recruitment_partner_admin', 'Recruitment partner admin'),
  ('recruiter', 'Recruitment agent'),
  ('employer_admin', 'Employer portal administrator')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'candidate',
  organisation_id UUID REFERENCES public.organisations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  organisation_id UUID REFERENCES public.organisations(id) ON DELETE RESTRICT,
  stage candidate_stage_enum NOT NULL DEFAULT 'registered',
  verification_status TEXT NOT NULL DEFAULT 'pending',
  headline TEXT,
  bio TEXT,
  current_location TEXT,
  preferred_location TEXT DEFAULT 'UAE',
  skills TEXT[],
  languages TEXT[],
  profile_completion_percentage INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.employers (
  id UUID PRIMARY KEY REFERENCES public.organisations(id) ON DELETE CASCADE,
  industry TEXT NOT NULL DEFAULT 'Hospitality',
  company_website TEXT,
  verification_status TEXT NOT NULL DEFAULT 'verified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES public.employers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT NOT NULL,
  country_code VARCHAR(3) NOT NULL DEFAULT 'AE',
  location TEXT DEFAULT 'Dubai, UAE',
  salary_range TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  stage candidate_stage_enum NOT NULL DEFAULT 'employer_submitted',
  status TEXT NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL DEFAULT 15.00,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  status payment_status_enum NOT NULL DEFAULT 'pending',
  payment_provider VARCHAR(50) NOT NULL DEFAULT 'square',
  payment_reference VARCHAR(255) UNIQUE,
  idempotency_key VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 3. AUTOMATIC NEW USER TRIGGER FUNCTION (auth.users -> public.profiles)
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. Insert into public.profiles
  INSERT INTO public.profiles (id, email, full_name, phone, status, default_role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'active',
    COALESCE(NEW.raw_user_meta_data->>'role', 'candidate')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    default_role = EXCLUDED.default_role,
    updated_at = NOW();

  -- 2. Insert into public.candidates if role is candidate
  IF (NEW.raw_user_meta_data->>'role' IS NULL OR NEW.raw_user_meta_data->>'role' = 'candidate') THEN
    INSERT INTO public.candidates (id, stage, verification_status)
    VALUES (NEW.id, 'registered', 'pending')
    ON CONFLICT (id) DO NOTHING;

    -- 3. Assign role in public.user_roles
    INSERT INTO public.user_roles (profile_id, role)
    VALUES (NEW.id, 'candidate')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill all existing users in auth.users
INSERT INTO public.profiles (id, email, full_name, phone, status, default_role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  COALESCE(raw_user_meta_data->>'phone', ''),
  'active',
  COALESCE(raw_user_meta_data->>'role', 'candidate')
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.candidates (id, stage, verification_status)
SELECT id, 'registered', 'pending'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (profile_id, role)
SELECT id, 'candidate'
FROM auth.users
ON CONFLICT DO NOTHING;

-- ====================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY profile_select_own ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
  CREATE POLICY profile_update_own ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
  CREATE POLICY profile_insert_own ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
  CREATE POLICY candidate_read_own ON public.candidates FOR SELECT TO authenticated USING (id = auth.uid());
  CREATE POLICY candidate_update_own ON public.candidates FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
  CREATE POLICY candidate_insert_own ON public.candidates FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
  CREATE POLICY jobs_select_published ON public.jobs FOR SELECT TO authenticated USING (status = 'published');
  CREATE POLICY payments_select_own ON public.payments FOR SELECT TO authenticated USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN null; END $$;
