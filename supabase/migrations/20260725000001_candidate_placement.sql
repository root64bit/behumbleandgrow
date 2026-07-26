-- Migration: 20260725000001_candidate_placement.sql
-- Description: Create Placement, Milestones, Candidate Actions, and Acknowledgements Schema with RLS

-- 1. Create Placements table
CREATE TABLE IF NOT EXISTS public.placements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_reference TEXT NOT NULL UNIQUE,
    offer_id UUID REFERENCES public.offers(id) ON DELETE RESTRICT,
    application_id UUID REFERENCES public.applications(id) ON DELETE RESTRICT,
    candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
    employer_id UUID REFERENCES public.employers(id) ON DELETE RESTRICT,
    job_id UUID REFERENCES public.jobs(id) ON DELETE RESTRICT,
    
    -- Placement lifecycle & stage
    status TEXT NOT NULL DEFAULT 'documents_in_progress',
    relocation_stage INTEGER NOT NULL DEFAULT 1,
    target_arrival_date DATE,
    
    -- Process statuses (Candidate-visible)
    work_permit_status TEXT NOT NULL DEFAULT 'submitted',
    work_permit_ref TEXT,
    visa_status TEXT NOT NULL DEFAULT 'not_started',
    visa_ref TEXT,
    medical_status TEXT NOT NULL DEFAULT 'not_required',
    medical_clinic_name TEXT,
    medical_appointment_date TIMESTAMPTZ,
    biometric_status TEXT NOT NULL DEFAULT 'not_required',
    
    -- Travel details
    travel_status TEXT NOT NULL DEFAULT 'not_started',
    flight_departure_airport TEXT,
    flight_arrival_airport TEXT,
    flight_departure_time TIMESTAMPTZ,
    flight_arrival_time TIMESTAMPTZ,
    flight_airline TEXT,
    flight_reference TEXT,
    flight_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Accommodation details
    accommodation_status TEXT NOT NULL DEFAULT 'not_started',
    accommodation_type TEXT,
    accommodation_location TEXT,
    accommodation_move_in_date DATE,
    accommodation_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Onboarding details
    onboarding_status TEXT NOT NULL DEFAULT 'not_started',
    onboarding_start_date DATE,
    onboarding_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Audit & Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Placement Milestones table
CREATE TABLE IF NOT EXISTS public.placement_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_id UUID NOT NULL REFERENCES public.placements(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming', -- completed, in_progress, upcoming, not_applicable
    completed_at TIMESTAMPTZ,
    date_display TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_placement_step UNIQUE (placement_id, step_number)
);

-- 3. Create Placement Candidate Actions table
CREATE TABLE IF NOT EXISTS public.placement_candidate_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_id UUID NOT NULL REFERENCES public.placements(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, skipped
    deadline TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Placement Acknowledgements table
CREATE TABLE IF NOT EXISTS public.placement_acknowledgements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_id UUID NOT NULL REFERENCES public.placements(id) ON DELETE CASCADE,
    action_id UUID REFERENCES public.placement_candidate_actions(id) ON DELETE SET NULL,
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    acknowledgement_type TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_candidate_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_acknowledgements ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Candidate Read Access
CREATE POLICY "Candidate read own placement" ON public.placements
    FOR SELECT USING (
        candidate_id IN (
            SELECT c.id FROM public.candidates c WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Candidate read own placement milestones" ON public.placement_milestones
    FOR SELECT USING (
        placement_id IN (
            SELECT p.id FROM public.placements p
            JOIN public.candidates c ON p.candidate_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Candidate read own placement actions" ON public.placement_candidate_actions
    FOR SELECT USING (
        placement_id IN (
            SELECT p.id FROM public.placements p
            JOIN public.candidates c ON p.candidate_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Candidate read own placement acknowledgements" ON public.placement_acknowledgements
    FOR SELECT USING (
        candidate_id IN (
            SELECT c.id FROM public.candidates c WHERE c.user_id = auth.uid()
        )
    );

-- RLS Policy: Candidate Acknowledgement Insert
CREATE POLICY "Candidate insert own placement acknowledgement" ON public.placement_acknowledgements
    FOR INSERT WITH CHECK (
        candidate_id IN (
            SELECT c.id FROM public.candidates c WHERE c.user_id = auth.uid()
        )
    );
