-- Phase A13: Candidate Account Settings & Notification Preferences Schema & RPCs

-- 1. Create candidate_preferences table
CREATE TABLE IF NOT EXISTS public.candidate_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID UNIQUE NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (language_code IN ('en', 'pt')),
  time_zone VARCHAR(64) NOT NULL DEFAULT 'Asia/Dubai',
  date_locale VARCHAR(20) NOT NULL DEFAULT 'en-AE',
  quiet_hours_enabled BOOLEAN NOT NULL DEFAULT false,
  quiet_hours_start TIME DEFAULT '22:00:00',
  quiet_hours_end TIME DEFAULT '07:00:00',
  marketing_consent_granted BOOLEAN NOT NULL DEFAULT false,
  marketing_consent_updated_at TIMESTAMPTZ,
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_candidate_preferences_owner 
ON public.candidate_preferences(candidate_id);

-- 2. Create candidate_notification_preferences table
CREATE TABLE IF NOT EXISTS public.candidate_notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  category VARCHAR(64) NOT NULL CHECK (
    category IN ('application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system')
  ),
  in_app_enabled BOOLEAN NOT NULL DEFAULT true,
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  email_enabled BOOLEAN NOT NULL DEFAULT true,
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_candidate_notification_pref_category UNIQUE (candidate_id, category)
);

CREATE INDEX IF NOT EXISTS idx_candidate_notification_prefs_owner 
ON public.candidate_notification_preferences(candidate_id);

-- Enable RLS
ALTER TABLE public.candidate_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Candidates SELECT policies
DROP POLICY IF EXISTS candidate_preferences_select_own ON public.candidate_preferences;
CREATE POLICY candidate_preferences_select_own ON public.candidate_preferences
  FOR SELECT TO authenticated
  USING (
    candidate_id IN (
      SELECT id FROM public.candidates WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS candidate_notification_preferences_select_own ON public.candidate_notification_preferences;
CREATE POLICY candidate_notification_preferences_select_own ON public.candidate_notification_preferences
  FOR SELECT TO authenticated
  USING (
    candidate_id IN (
      SELECT id FROM public.candidates WHERE user_id = auth.uid()
    )
  );

-- Revoke direct mutation access for authenticated
REVOKE INSERT, UPDATE, DELETE ON public.candidate_preferences FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.candidate_notification_preferences FROM authenticated;

GRANT SELECT ON public.candidate_preferences TO authenticated;
GRANT SELECT ON public.candidate_notification_preferences TO authenticated;

-- 3. Hardened SECURITY DEFINER RPCs

-- RPC: Get or initialize Candidate Preferences
CREATE OR REPLACE FUNCTION public.load_my_candidate_account_settings()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_prefs public.candidate_preferences;
  v_notif_prefs JSONB;
  v_cat RECORD;
BEGIN
  -- Resolve candidate ID
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Candidate profile not found.';
  END IF;

  -- Ensure candidate_preferences row exists
  INSERT INTO public.candidate_preferences (candidate_id)
  VALUES (v_candidate_id)
  ON CONFLICT (candidate_id) DO NOTHING;

  SELECT * INTO v_prefs
  FROM public.candidate_preferences
  WHERE candidate_id = v_candidate_id;

  -- Seed default category preferences if missing
  FOR v_cat IN 
    SELECT unnest(ARRAY['application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system']) AS category
  LOOP
    INSERT INTO public.candidate_notification_preferences (candidate_id, category, in_app_enabled, push_enabled, email_enabled)
    VALUES (v_candidate_id, v_cat.category, true, true, true)
    ON CONFLICT (candidate_id, category) DO NOTHING;
  END LOOP;

  SELECT jsonb_agg(to_jsonb(np)) INTO v_notif_prefs
  FROM public.candidate_notification_preferences np
  WHERE candidate_id = v_candidate_id;

  RETURN jsonb_build_object(
    'preferences', to_jsonb(v_prefs),
    'notificationPreferences', v_notif_prefs
  );
END;
$$;

REVOKE ALL ON FUNCTION public.load_my_candidate_account_settings FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.load_my_candidate_account_settings TO authenticated;

-- RPC: Update Candidate General Preferences
CREATE OR REPLACE FUNCTION public.update_my_candidate_preferences(
  p_language_code VARCHAR,
  p_time_zone VARCHAR,
  p_quiet_hours_enabled BOOLEAN,
  p_quiet_hours_start TIME DEFAULT '22:00:00',
  p_quiet_hours_end TIME DEFAULT '07:00:00',
  p_marketing_consent_granted BOOLEAN DEFAULT false,
  p_expected_version INT DEFAULT NULL
)
RETURNS public.candidate_preferences
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_current public.candidate_preferences;
  v_updated public.candidate_preferences;
BEGIN
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized.';
  END IF;

  SELECT * INTO v_current
  FROM public.candidate_preferences
  WHERE candidate_id = v_candidate_id;

  IF v_current.id IS NULL THEN
    INSERT INTO public.candidate_preferences (candidate_id)
    VALUES (v_candidate_id)
    RETURNING * INTO v_current;
  END IF;

  -- Optimistic Concurrency check
  IF p_expected_version IS NOT NULL AND v_current.version != p_expected_version THEN
    RAISE EXCEPTION 'Conflict: Settings were modified in another session.';
  END IF;

  -- Validate language code
  IF p_language_code NOT IN ('en', 'pt') THEN
    RAISE EXCEPTION 'Unsupported language code: %', p_language_code;
  END IF;

  UPDATE public.candidate_preferences
  SET
    language_code = p_language_code,
    time_zone = COALESCE(p_time_zone, 'Asia/Dubai'),
    quiet_hours_enabled = p_quiet_hours_enabled,
    quiet_hours_start = p_quiet_hours_start,
    quiet_hours_end = p_quiet_hours_end,
    marketing_consent_granted = p_marketing_consent_granted,
    marketing_consent_updated_at = CASE WHEN p_marketing_consent_granted != v_current.marketing_consent_granted THEN NOW() ELSE v_current.marketing_consent_updated_at END,
    version = v_current.version + 1,
    updated_at = NOW()
  WHERE candidate_id = v_candidate_id
  RETURNING * INTO v_updated;

  RETURN v_updated;
END;
$$;

REVOKE ALL ON FUNCTION public.update_my_candidate_preferences FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_my_candidate_preferences TO authenticated;

-- RPC: Update Candidate Notification Category Preference
CREATE OR REPLACE FUNCTION public.update_my_candidate_notification_preference(
  p_category VARCHAR,
  p_push_enabled BOOLEAN,
  p_email_enabled BOOLEAN,
  p_expected_version INT DEFAULT NULL
)
RETURNS public.candidate_notification_preferences
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_current public.candidate_notification_preferences;
  v_updated public.candidate_notification_preferences;
BEGIN
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized.';
  END IF;

  -- Validate category
  IF p_category NOT IN ('application', 'document', 'interview', 'offer', 'placement', 'profile', 'support', 'account', 'system') THEN
    RAISE EXCEPTION 'Invalid notification category: %', p_category;
  END IF;

  SELECT * INTO v_current
  FROM public.candidate_notification_preferences
  WHERE candidate_id = v_candidate_id AND category = p_category;

  IF v_current.id IS NULL THEN
    INSERT INTO public.candidate_notification_preferences (candidate_id, category, in_app_enabled, push_enabled, email_enabled)
    VALUES (v_candidate_id, p_category, true, p_push_enabled, p_email_enabled)
    RETURNING * INTO v_current;
  END IF;

  IF p_expected_version IS NOT NULL AND v_current.version != p_expected_version THEN
    RAISE EXCEPTION 'Conflict: Notification preference was modified in another session.';
  END IF;

  UPDATE public.candidate_notification_preferences
  SET
    in_app_enabled = true, -- In-app notifications remain mandatory for candidate recruitment events
    push_enabled = p_push_enabled,
    email_enabled = p_email_enabled,
    version = v_current.version + 1,
    updated_at = NOW()
  WHERE candidate_id = v_candidate_id AND category = p_category
  RETURNING * INTO v_updated;

  RETURN v_updated;
END;
$$;

REVOKE ALL ON FUNCTION public.update_my_candidate_notification_preference FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_my_candidate_notification_preference TO authenticated;
