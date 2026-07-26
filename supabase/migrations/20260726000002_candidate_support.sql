-- Phase A12: Candidate Support Centre Schema & RPCs

-- 1. Create candidate_support_tickets table
CREATE TABLE IF NOT EXISTS public.candidate_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_reference VARCHAR(64) UNIQUE NOT NULL,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  category VARCHAR(64) NOT NULL CHECK (
    category IN ('application', 'profile', 'document', 'interview', 'offer', 'placement', 'payment', 'account', 'technical', 'general')
  ),
  subject VARCHAR(160) NOT NULL CHECK (char_length(trim(subject)) >= 5),
  description TEXT NOT NULL CHECK (char_length(trim(description)) >= 20),
  status VARCHAR(32) NOT NULL DEFAULT 'submitted' CHECK (
    status IN ('submitted', 'open', 'awaiting_candidate', 'awaiting_support', 'in_progress', 'resolved', 'closed', 'reopened', 'cancelled')
  ),
  urgency VARCHAR(32) NOT NULL DEFAULT 'normal' CHECK (
    urgency IN ('normal', 'important', 'urgent')
  ),
  related_entity_type VARCHAR(64) CHECK (
    related_entity_type IN ('application', 'document', 'interview', 'offer', 'placement', 'profile')
  ),
  related_entity_id UUID,
  is_candidate_action_required BOOLEAN NOT NULL DEFAULT false,
  unread_candidate_message_count INT NOT NULL DEFAULT 0,
  resolution_summary TEXT,
  closed_at TIMESTAMPTZ,
  reopened_at TIMESTAMPTZ,
  reopen_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance & cursor pagination
CREATE INDEX IF NOT EXISTS idx_candidate_support_tickets_owner_updated 
ON public.candidate_support_tickets(candidate_id, updated_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS idx_candidate_support_tickets_category 
ON public.candidate_support_tickets(candidate_id, category);

CREATE INDEX IF NOT EXISTS idx_candidate_support_tickets_status 
ON public.candidate_support_tickets(candidate_id, status);

-- 2. Create candidate_support_messages table
CREATE TABLE IF NOT EXISTS public.candidate_support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.candidate_support_tickets(id) ON DELETE CASCADE,
  author_role VARCHAR(32) NOT NULL CHECK (author_role IN ('candidate', 'support', 'system')),
  author_display_name VARCHAR(128) NOT NULL,
  message_text TEXT NOT NULL CHECK (char_length(trim(message_text)) >= 1),
  is_candidate_visible BOOLEAN NOT NULL DEFAULT true,
  attachment_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_candidate_support_messages_ticket 
ON public.candidate_support_messages(ticket_id, created_at ASC, id ASC);

-- 3. Create candidate_support_attachments table
CREATE TABLE IF NOT EXISTS public.candidate_support_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.candidate_support_tickets(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.candidate_support_messages(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes <= 5242880),
  mime_type VARCHAR(128) NOT NULL CHECK (
    mime_type IN ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')
  ),
  storage_path VARCHAR(512) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_candidate_support_attachments_ticket 
ON public.candidate_support_attachments(ticket_id, candidate_id);

-- Enable RLS
ALTER TABLE public.candidate_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_support_attachments ENABLE ROW LEVEL SECURITY;

-- Candidates SELECT policies
DROP POLICY IF EXISTS candidate_support_tickets_select_own ON public.candidate_support_tickets;
CREATE POLICY candidate_support_tickets_select_own ON public.candidate_support_tickets
  FOR SELECT TO authenticated
  USING (
    candidate_id IN (
      SELECT id FROM public.candidates WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS candidate_support_messages_select_own ON public.candidate_support_messages;
CREATE POLICY candidate_support_messages_select_own ON public.candidate_support_messages
  FOR SELECT TO authenticated
  USING (
    is_candidate_visible = true AND
    ticket_id IN (
      SELECT id FROM public.candidate_support_tickets WHERE candidate_id IN (
        SELECT id FROM public.candidates WHERE user_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS candidate_support_attachments_select_own ON public.candidate_support_attachments;
CREATE POLICY candidate_support_attachments_select_own ON public.candidate_support_attachments
  FOR SELECT TO authenticated
  USING (
    candidate_id IN (
      SELECT id FROM public.candidates WHERE user_id = auth.uid()
    )
  );

-- Revoke generic direct UPDATE/INSERT access on support tables for candidates
REVOKE INSERT, UPDATE, DELETE ON public.candidate_support_tickets FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.candidate_support_messages FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.candidate_support_attachments FROM authenticated;

-- Grant SELECT access
GRANT SELECT ON public.candidate_support_tickets TO authenticated;
GRANT SELECT ON public.candidate_support_messages TO authenticated;
GRANT SELECT ON public.candidate_support_attachments TO authenticated;

-- 4. RPCs for Candidate Support Operations

-- RPC: Create Candidate Support Ticket
CREATE OR REPLACE FUNCTION public.create_my_candidate_support_ticket(
  p_category VARCHAR,
  p_subject VARCHAR,
  p_description VARCHAR,
  p_urgency VARCHAR DEFAULT 'normal',
  p_related_entity_type VARCHAR DEFAULT NULL,
  p_related_entity_id UUID DEFAULT NULL
)
RETURNS public.candidate_support_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_candidate_name VARCHAR;
  v_ref VARCHAR;
  v_ticket public.candidate_support_tickets;
BEGIN
  -- Resolve Candidate ID
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Candidate profile not found for user %', auth.uid();
  END IF;

  -- Validate subject & description
  IF char_length(trim(p_subject)) < 5 THEN
    RAISE EXCEPTION 'Subject must be at least 5 characters.';
  END IF;

  IF char_length(trim(p_description)) < 20 THEN
    RAISE EXCEPTION 'Description must be at least 20 characters.';
  END IF;

  -- Generate Ticket Reference
  v_ref := 'BHG-SUP-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0');

  -- Insert Ticket
  INSERT INTO public.candidate_support_tickets (
    ticket_reference,
    candidate_id,
    category,
    subject,
    description,
    status,
    urgency,
    related_entity_type,
    related_entity_id,
    created_at,
    updated_at
  ) VALUES (
    v_ref,
    v_candidate_id,
    p_category,
    trim(p_subject),
    trim(p_description),
    'submitted',
    COALESCE(p_urgency, 'normal'),
    p_related_entity_type,
    p_related_entity_id,
    NOW(),
    NOW()
  )
  RETURNING * INTO v_ticket;

  -- Get candidate display name
  SELECT COALESCE(full_name, 'Candidate') INTO v_candidate_name
  FROM public.profiles
  WHERE id = auth.uid();

  -- Create initial candidate message
  INSERT INTO public.candidate_support_messages (
    ticket_id,
    author_role,
    author_display_name,
    message_text,
    is_candidate_visible,
    created_at
  ) VALUES (
    v_ticket.id,
    'candidate',
    v_candidate_name,
    trim(p_description),
    true,
    NOW()
  );

  RETURN v_ticket;
END;
$$;

REVOKE ALL ON FUNCTION public.create_my_candidate_support_ticket FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_my_candidate_support_ticket TO authenticated;

-- RPC: Reply to Candidate Support Ticket
CREATE OR REPLACE FUNCTION public.reply_to_my_candidate_support_ticket(
  p_ticket_id UUID,
  p_message_text VARCHAR,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_support_messages
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_candidate_name VARCHAR;
  v_ticket public.candidate_support_tickets;
  v_message public.candidate_support_messages;
BEGIN
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Candidate profile not found.';
  END IF;

  SELECT * INTO v_ticket
  FROM public.candidate_support_tickets
  WHERE id = p_ticket_id AND candidate_id = v_candidate_id;

  IF v_ticket.id IS NULL THEN
    RAISE EXCEPTION 'Support ticket not found or access denied.';
  END IF;

  IF v_ticket.status IN ('closed', 'cancelled') THEN
    RAISE EXCEPTION 'Cannot reply to a closed or cancelled support request.';
  END IF;

  -- Concurrency check
  IF p_expected_updated_at IS NOT NULL AND v_ticket.updated_at != p_expected_updated_at THEN
    RAISE EXCEPTION 'Conflict: Ticket was modified in another session.';
  END IF;

  IF char_length(trim(p_message_text)) < 1 THEN
    RAISE EXCEPTION 'Message text cannot be empty.';
  END IF;

  SELECT COALESCE(full_name, 'Candidate') INTO v_candidate_name
  FROM public.profiles
  WHERE id = auth.uid();

  -- Insert Candidate Reply
  INSERT INTO public.candidate_support_messages (
    ticket_id,
    author_role,
    author_display_name,
    message_text,
    is_candidate_visible,
    created_at
  ) VALUES (
    p_ticket_id,
    'candidate',
    v_candidate_name,
    trim(p_message_text),
    true,
    NOW()
  )
  RETURNING * INTO v_message;

  -- Update Ticket status & timestamp
  UPDATE public.candidate_support_tickets
  SET
    status = 'awaiting_support',
    is_candidate_action_required = false,
    updated_at = NOW()
  WHERE id = p_ticket_id;

  RETURN v_message;
END;
$$;

REVOKE ALL ON FUNCTION public.reply_to_my_candidate_support_ticket FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reply_to_my_candidate_support_ticket TO authenticated;

-- RPC: Close Candidate Support Ticket
CREATE OR REPLACE FUNCTION public.close_my_candidate_support_ticket(
  p_ticket_id UUID,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_support_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_ticket public.candidate_support_tickets;
BEGIN
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized.';
  END IF;

  SELECT * INTO v_ticket
  FROM public.candidate_support_tickets
  WHERE id = p_ticket_id AND candidate_id = v_candidate_id;

  IF v_ticket.id IS NULL THEN
    RAISE EXCEPTION 'Ticket not found or access denied.';
  END IF;

  IF p_expected_updated_at IS NOT NULL AND v_ticket.updated_at != p_expected_updated_at THEN
    RAISE EXCEPTION 'Conflict: Ticket state changed.';
  END IF;

  UPDATE public.candidate_support_tickets
  SET
    status = 'closed',
    is_candidate_action_required = false,
    closed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_ticket_id
  RETURNING * INTO v_ticket;

  RETURN v_ticket;
END;
$$;

REVOKE ALL ON FUNCTION public.close_my_candidate_support_ticket FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.close_my_candidate_support_ticket TO authenticated;

-- RPC: Reopen Candidate Support Ticket
CREATE OR REPLACE FUNCTION public.reopen_my_candidate_support_ticket(
  p_ticket_id UUID,
  p_expected_updated_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS public.candidate_support_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_candidate_id UUID;
  v_ticket public.candidate_support_tickets;
BEGIN
  SELECT id INTO v_candidate_id
  FROM public.candidates
  WHERE user_id = auth.uid();

  IF v_candidate_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized.';
  END IF;

  SELECT * INTO v_ticket
  FROM public.candidate_support_tickets
  WHERE id = p_ticket_id AND candidate_id = v_candidate_id;

  IF v_ticket.id IS NULL THEN
    RAISE EXCEPTION 'Ticket not found or access denied.';
  END IF;

  IF v_ticket.status NOT IN ('resolved', 'closed') THEN
    RAISE EXCEPTION 'Only resolved or closed tickets can be reopened.';
  END IF;

  IF p_expected_updated_at IS NOT NULL AND v_ticket.updated_at != p_expected_updated_at THEN
    RAISE EXCEPTION 'Conflict: Ticket state changed.';
  END IF;

  UPDATE public.candidate_support_tickets
  SET
    status = 'reopened',
    is_candidate_action_required = false,
    reopened_at = NOW(),
    reopen_count = reopen_count + 1,
    updated_at = NOW()
  WHERE id = p_ticket_id
  RETURNING * INTO v_ticket;

  RETURN v_ticket;
END;
$$;

REVOKE ALL ON FUNCTION public.reopen_my_candidate_support_ticket FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reopen_my_candidate_support_ticket TO authenticated;
