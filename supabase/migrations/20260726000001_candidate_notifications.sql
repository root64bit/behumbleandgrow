-- Phase A11: Candidate Notifications Schema & Hardened RPC Mutations
-- Migration: 20260726000001_candidate_notifications.sql

-- 1. Create candidate_notifications table
CREATE TABLE IF NOT EXISTS public.candidate_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system'
  )),
  title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
  summary TEXT NOT NULL CHECK (length(trim(summary)) > 0),
  priority VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'important', 'urgent')),
  entity_type VARCHAR(50) CHECK (entity_type IN (
    'application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system'
  )),
  entity_id UUID,
  action_type VARCHAR(50),
  action_url TEXT,
  is_action_required BOOLEAN NOT NULL DEFAULT false,
  is_archivable BOOLEAN NOT NULL DEFAULT true,
  dedupe_key VARCHAR(255),
  source_type VARCHAR(50),
  source_event_id VARCHAR(255),
  read_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_retracted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT candidate_notifications_dedupe_unique UNIQUE (candidate_id, dedupe_key)
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_cand_notif_inbox 
  ON public.candidate_notifications (candidate_id, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS idx_cand_notif_unread 
  ON public.candidate_notifications (candidate_id, created_at DESC) 
  WHERE read_at IS NULL AND archived_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cand_notif_action 
  ON public.candidate_notifications (candidate_id, created_at DESC) 
  WHERE is_action_required = true AND archived_at IS NULL;

-- 3. Enable RLS
ALTER TABLE public.candidate_notifications ENABLE ROW LEVEL SECURITY;

-- 4. Candidate SELECT RLS Policy
DROP POLICY IF EXISTS candidate_notifications_select_policy ON public.candidate_notifications;
CREATE POLICY candidate_notifications_select_policy ON public.candidate_notifications
  FOR SELECT
  TO authenticated
  USING (
    candidate_id IN (
      SELECT id FROM public.candidates WHERE user_id = auth.uid()
    )
  );

-- Note: No direct UPDATE/INSERT/DELETE grants for Candidate role.
-- Read, unread, mark-all, and archive mutations are handled via narrow SECURITY DEFINER RPCs.

-- 5. Hardened RPC: Mark One Notification Read
CREATE OR REPLACE FUNCTION public.mark_my_candidate_notification_read(
  p_notification_id UUID,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_notifications
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_result public.candidate_notifications;
BEGIN
  -- Authenticate caller
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  -- Resolve Candidate ID
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Candidate record not found.';
  END IF;

  -- Update read_at with optimistic version lock check if provided
  UPDATE public.candidate_notifications
  SET 
    read_at = COALESCE(read_at, now()),
    updated_at = now()
  WHERE id = p_notification_id
    AND candidate_id = v_candidate_id
    AND (p_expected_updated_at IS NULL OR updated_at = p_expected_updated_at)
  RETURNING * INTO v_result;

  IF v_result.id IS NULL THEN
    RAISE EXCEPTION 'Notification item not found or update conflict.';
  END IF;

  RETURN v_result;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_my_candidate_notification_read(UUID, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_my_candidate_notification_read(UUID, TIMESTAMPTZ) TO authenticated;

-- 6. Hardened RPC: Mark One Notification Unread
CREATE OR REPLACE FUNCTION public.mark_my_candidate_notification_unread(
  p_notification_id UUID,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_notifications
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_result public.candidate_notifications;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Candidate record not found.';
  END IF;

  UPDATE public.candidate_notifications
  SET 
    read_at = NULL,
    updated_at = now()
  WHERE id = p_notification_id
    AND candidate_id = v_candidate_id
    AND (p_expected_updated_at IS NULL OR updated_at = p_expected_updated_at)
  RETURNING * INTO v_result;

  IF v_result.id IS NULL THEN
    RAISE EXCEPTION 'Notification item not found or update conflict.';
  END IF;

  RETURN v_result;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_my_candidate_notification_unread(UUID, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_my_candidate_notification_unread(UUID, TIMESTAMPTZ) TO authenticated;

-- 7. Hardened RPC: Mark All Candidate Notifications Read
CREATE OR REPLACE FUNCTION public.mark_all_my_candidate_notifications_read(
  p_category VARCHAR DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_updated_count INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Candidate record not found.';
  END IF;

  IF p_category IS NOT NULL AND p_category NOT IN (
    'application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system'
  ) THEN
    RAISE EXCEPTION 'Invalid category specified.';
  END IF;

  UPDATE public.candidate_notifications
  SET 
    read_at = now(),
    updated_at = now()
  WHERE candidate_id = v_candidate_id
    AND read_at IS NULL
    AND archived_at IS NULL
    AND (p_category IS NULL OR category = p_category);

  GET DIAGNOSTICS v_updated_count = ROW_COUNT;
  RETURN v_updated_count;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_all_my_candidate_notifications_read(VARCHAR) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_all_my_candidate_notifications_read(VARCHAR) TO authenticated;

-- 8. Hardened RPC: Archive My Candidate Notification
CREATE OR REPLACE FUNCTION public.archive_my_candidate_notification(
  p_notification_id UUID,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_notifications
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_result public.candidate_notifications;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Candidate record not found.';
  END IF;

  UPDATE public.candidate_notifications
  SET 
    archived_at = now(),
    updated_at = now()
  WHERE id = p_notification_id
    AND candidate_id = v_candidate_id
    AND is_archivable = true
    AND (p_expected_updated_at IS NULL OR updated_at = p_expected_updated_at)
  RETURNING * INTO v_result;

  IF v_result.id IS NULL THEN
    RAISE EXCEPTION 'Notification item not found, mandatory non-archivable, or update conflict.';
  END IF;

  RETURN v_result;
END;
$$;

REVOKE ALL ON FUNCTION public.archive_my_candidate_notification(UUID, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.archive_my_candidate_notification(UUID, TIMESTAMPTZ) TO authenticated;
