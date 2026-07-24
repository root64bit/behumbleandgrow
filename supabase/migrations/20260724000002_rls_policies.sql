-- Migration: 20260724000002_rls_policies.sql
-- Description: Production Row-Level Security (RLS) policies for Be Humble & Grow Platform

-- ==================================================================
-- 1. HELPER FUNCTIONS FOR CLAIMS & CONTEXT RESOLUTION
-- ==================================================================
CREATE OR REPLACE FUNCTION auth.current_org_id() 
RETURNS uuid AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::jsonb->'app_metadata'->>'active_org_id', '')::uuid;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION auth.current_user_roles() 
RETURNS text[] AS $$
  SELECT ARRAY(
    SELECT jsonb_array_elements_text(
      COALESCE(current_setting('request.jwt.claims', true)::jsonb->'app_metadata'->'user_roles', '[]'::jsonb)
    )
  );
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION auth.is_mfa_verified()
RETURNS boolean AS $$
  SELECT COALESCE((current_setting('request.jwt.claims', true)::jsonb->'app_metadata'->>'mfa_verified')::boolean, false);
$$ LANGUAGE sql STABLE;

-- ==================================================================
-- 2. ENABLE ROW LEVEL SECURITY ACROSS ALL TABLES
-- ==================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upload_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ==================================================================
-- 3. PROFILES RLS
-- ==================================================================
CREATE POLICY profile_select_own ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY profile_update_own ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY profile_select_admin ON public.profiles
  FOR SELECT TO authenticated
  USING (
    'operations_admin' = ANY(auth.current_user_roles()) OR
    'operations_manager' = ANY(auth.current_user_roles()) OR
    'candidate_reviewer' = ANY(auth.current_user_roles())
  );

-- ==================================================================
-- 4. CANDIDATES RLS
-- ==================================================================
CREATE POLICY candidate_read_own ON public.candidates
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY candidate_update_own ON public.candidates
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY candidate_insert_own ON public.candidates
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- Candidate work experiences & educations
CREATE POLICY work_exp_all_own ON public.work_experiences
  FOR ALL TO authenticated
  USING (candidate_id = auth.uid())
  WITH CHECK (candidate_id = auth.uid());

CREATE POLICY educations_all_own ON public.educations
  FOR ALL TO authenticated
  USING (candidate_id = auth.uid())
  WITH CHECK (candidate_id = auth.uid());

-- Partner read assigned candidates
CREATE POLICY partner_read_assigned_candidates ON public.candidates
  FOR SELECT TO authenticated
  USING (
    ('recruiter' = ANY(auth.current_user_roles()) OR 'recruitment_partner_admin' = ANY(auth.current_user_roles()))
    AND EXISTS (
      SELECT 1 FROM public.lead_assignments la
      WHERE la.candidate_id = candidates.id
        AND la.partner_id = auth.current_org_id()
        AND la.status = 'active'
    )
  );

-- Employer read applicant candidates
CREATE POLICY employer_read_applicant_candidates ON public.candidates
  FOR SELECT TO authenticated
  USING (
    ('employer_admin' = ANY(auth.current_user_roles()) OR 'employer_reviewer' = ANY(auth.current_user_roles()))
    AND EXISTS (
      SELECT 1 FROM public.applications app
      JOIN public.jobs j ON app.job_id = j.id
      WHERE app.candidate_id = candidates.id
        AND j.employer_id = auth.current_org_id()
    )
  );

-- Ops read candidates
CREATE POLICY ops_read_candidates ON public.candidates
  FOR SELECT TO authenticated
  USING (
    'operations_admin' = ANY(auth.current_user_roles()) OR
    'operations_manager' = ANY(auth.current_user_roles()) OR
    'candidate_reviewer' = ANY(auth.current_user_roles())
  );

-- ==================================================================
-- 5. CANDIDATE DOCUMENTS RLS
-- ==================================================================
CREATE POLICY candidate_docs_read_own ON public.candidate_documents
  FOR SELECT TO authenticated
  USING (candidate_id = auth.uid());

CREATE POLICY candidate_docs_insert_own ON public.candidate_documents
  FOR INSERT TO authenticated
  WITH CHECK (candidate_id = auth.uid());

CREATE POLICY ops_compliance_docs_read ON public.candidate_documents
  FOR SELECT TO authenticated
  USING (
    'document_reviewer' = ANY(auth.current_user_roles()) OR 
    'operations_admin' = ANY(auth.current_user_roles())
  );

-- ==================================================================
-- 6. JOBS & APPLICATIONS RLS
-- ==================================================================
CREATE POLICY jobs_select_published ON public.jobs
  FOR SELECT TO authenticated
  USING (status = 'published');

CREATE POLICY employer_jobs_all ON public.jobs
  FOR ALL TO authenticated
  USING (
    employer_id = auth.current_org_id()
    AND ('employer_admin' = ANY(auth.current_user_roles()) OR 'employer_reviewer' = ANY(auth.current_user_roles()))
  );

CREATE POLICY candidate_applications_read_own ON public.applications
  FOR SELECT TO authenticated
  USING (candidate_id = auth.uid());

CREATE POLICY candidate_applications_insert_own ON public.applications
  FOR INSERT TO authenticated
  WITH CHECK (candidate_id = auth.uid());

CREATE POLICY employer_applications_read ON public.applications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      WHERE j.id = applications.job_id
        AND j.employer_id = auth.current_org_id()
    )
  );

CREATE POLICY ops_applications_read ON public.applications
  FOR SELECT TO authenticated
  USING (
    'operations_admin' = ANY(auth.current_user_roles()) OR
    'operations_manager' = ANY(auth.current_user_roles()) OR
    'candidate_reviewer' = ANY(auth.current_user_roles())
  );

-- ==================================================================
-- 7. STATUS HISTORY RLS
-- ==================================================================
CREATE POLICY status_history_read ON public.status_history
  FOR SELECT TO authenticated
  USING (
    changed_by = auth.uid() OR
    'operations_admin' = ANY(auth.current_user_roles()) OR
    'operations_manager' = ANY(auth.current_user_roles())
  );

CREATE POLICY status_history_insert ON public.status_history
  FOR INSERT TO authenticated
  WITH CHECK (changed_by = auth.uid());

-- ==================================================================
-- 8. AUDIT LOGS RLS
-- ==================================================================
CREATE POLICY ops_audit_read ON public.audit_logs
  FOR SELECT TO authenticated
  USING (
    'operations_admin' = ANY(auth.current_user_roles())
  );

CREATE POLICY deny_client_audit_insert ON public.audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (false);
