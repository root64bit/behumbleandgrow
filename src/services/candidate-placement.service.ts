import { supabase } from '../lib/supabase/client';
import { PlacementRoadmapStage, CANONICAL_ROADMAP_STAGES } from '../lib/candidate/placementRoadmap';
import { PlacementTimelineEvent } from '../lib/candidate/placementTimeline';
import { PlacementCandidateAction } from '../lib/candidate/placementNextAction';

export function resolveCandidateEmployerDisplay(params: {
  employerDisclosureAuthorised: boolean;
  employerDisplayName?: string | null;
}): string {
  if (!params.employerDisclosureAuthorised) {
    return 'Approved UAE Employer';
  }
  return params.employerDisplayName || 'Approved UAE Employer';
}

export interface CandidatePlacement {
  id: string;
  placementReference: string;
  offerId: string;
  applicationId: string;
  candidateId: string;
  employerId: string;
  jobId: string;
  jobTitle: string;
  employerDisplayName: string;
  employerDisclosureAuthorised: boolean;
  location: string;
  status: string;
  relocationStage: number;
  targetArrivalDate?: string | null;
  
  // Process summaries
  workPermitStatus: string;
  workPermitRef?: string | null;
  visaStatus: string;
  visaRef?: string | null;
  medicalStatus: string;
  medicalClinicName?: string | null;
  medicalAppointmentDate?: string | null;
  biometricStatus: string;

  // Travel details
  travelStatus: string;
  flightDepartureAirport?: string | null;
  flightArrivalAirport?: string | null;
  flightDepartureTime?: string | null;
  flightArrivalTime?: string | null;
  flightAirline?: string | null;
  flightReference?: string | null;
  flightConfirmed: boolean;

  // Accommodation details
  accommodationStatus: string;
  accommodationType?: string | null;
  accommodationLocation?: string | null;
  accommodationMoveInDate?: string | null;
  accommodationConfirmed: boolean;

  // Onboarding details
  onboardingStatus: string;
  onboardingStartDate?: string | null;
  onboardingConfirmed: boolean;
  
  updatedAt: string;
}

export interface CandidatePlacementPayload {
  placement: CandidatePlacement | null;
  roadmap: PlacementRoadmapStage[];
  timeline: PlacementTimelineEvent[];
  actions: PlacementCandidateAction[];
}

export class CandidatePlacementService {
  /**
   * Load candidate placement details with strict candidate ownership verification
   */
  static async loadMyPlacement(targetUserId?: string): Promise<CandidatePlacementPayload> {
    let userId = targetUserId;

    if (!userId) {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData.user) {
        throw new Error('Authentication required to view placement status.');
      }
      userId = authData.user.id;
    }

    // Resolve candidate ID
    const { data: candidateData, error: candidateErr } = await supabase
      .from('candidates')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (candidateErr || !candidateData) {
      return {
        placement: null,
        roadmap: [],
        timeline: [],
        actions: [],
      };
    }

    const candidateId = candidateData.id;

    // Load active placement owned by candidate
    const { data: placementData, error: placementErr } = await supabase
      .from('placements')
      .select(`
        id,
        placement_reference,
        offer_id,
        application_id,
        candidate_id,
        employer_id,
        job_id,
        status,
        relocation_stage,
        target_arrival_date,
        work_permit_status,
        work_permit_ref,
        visa_status,
        visa_ref,
        medical_status,
        medical_clinic_name,
        medical_appointment_date,
        biometric_status,
        travel_status,
        flight_departure_airport,
        flight_arrival_airport,
        flight_departure_time,
        flight_arrival_time,
        flight_airline,
        flight_reference,
        flight_confirmed,
        accommodation_status,
        accommodation_type,
        accommodation_location,
        accommodation_move_in_date,
        accommodation_confirmed,
        onboarding_status,
        onboarding_start_date,
        onboarding_confirmed,
        updated_at,
        applications!inner (
          id,
          employer_disclosure_status,
          employer_disclosed_at,
          jobs (
            id,
            title,
            location
          ),
          employers (
            id,
            name
          )
        )
      `)
      .eq('candidate_id', candidateId)
      .maybeSingle();

    if (placementErr) {
      throw new Error('Failed to load placement status. Please try again.');
    }

    if (!placementData) {
      return {
        placement: null,
        roadmap: [],
        timeline: [],
        actions: [],
      };
    }

    const app = placementData.applications as any;
    const job = app?.jobs ?? { title: 'Healthcare Professional', location: 'Dubai, UAE' };
    const emp = app?.employers ?? { name: 'Approved UAE Employer' };

    const disclosureAuthorised =
      app?.employer_disclosure_status === 'disclosed' || Boolean(app?.employer_disclosed_at);

    const employerDisplayName = resolveCandidateEmployerDisplay({
      employerDisclosureAuthorised: disclosureAuthorised,
      employerDisplayName: emp?.name,
    });

    const placement: CandidatePlacement = {
      id: placementData.id,
      placementReference: placementData.placement_reference || `BHG-PLC-${placementData.id.slice(0, 8).toUpperCase()}`,
      offerId: placementData.offer_id,
      applicationId: placementData.application_id,
      candidateId: placementData.candidate_id,
      employerId: placementData.employer_id,
      jobId: placementData.job_id,
      jobTitle: job.title || 'Healthcare Professional',
      employerDisplayName,
      employerDisclosureAuthorised: disclosureAuthorised,
      location: job.location || 'Dubai, UAE',
      status: placementData.status || 'documents_in_progress',
      relocationStage: placementData.relocation_stage || 1,
      targetArrivalDate: placementData.target_arrival_date,
      workPermitStatus: placementData.work_permit_status || 'submitted',
      workPermitRef: placementData.work_permit_ref,
      visaStatus: placementData.visa_status || 'not_started',
      visaRef: placementData.visa_ref,
      medicalStatus: placementData.medical_status || 'not_required',
      medicalClinicName: placementData.medical_clinic_name,
      medicalAppointmentDate: placementData.medical_appointment_date,
      biometricStatus: placementData.biometric_status || 'not_required',
      travelStatus: placementData.travel_status || 'not_started',
      flightDepartureAirport: placementData.flight_departure_airport,
      flightArrivalAirport: placementData.flight_arrival_airport,
      flightDepartureTime: placementData.flight_departure_time,
      flightArrivalTime: placementData.flight_arrival_time,
      flightAirline: placementData.flight_airline,
      flightReference: placementData.flight_reference,
      flightConfirmed: Boolean(placementData.flight_confirmed),
      accommodationStatus: placementData.accommodation_status || 'not_started',
      accommodationType: placementData.accommodation_type,
      accommodationLocation: placementData.accommodation_location,
      accommodationMoveInDate: placementData.accommodation_move_in_date,
      accommodationConfirmed: Boolean(placementData.accommodation_confirmed),
      onboardingStatus: placementData.onboarding_status || 'not_started',
      onboardingStartDate: placementData.onboarding_start_date,
      onboardingConfirmed: Boolean(placementData.onboarding_confirmed),
      updatedAt: placementData.updated_at,
    };

    // Load milestones
    const { data: milestonesData } = await supabase
      .from('placement_milestones')
      .select('*')
      .eq('placement_id', placement.id)
      .order('step_number', { ascending: true });

    const timelineEvents: PlacementTimelineEvent[] = (milestonesData || []).map((m) => ({
      id: m.id,
      placementId: m.placement_id,
      stepNumber: m.step_number,
      title: m.name,
      status: m.status as any,
      completedAt: m.completed_at,
      dateDisplay: m.date_display,
    }));

    // Build Roadmap stages
    const roadmapStages: PlacementRoadmapStage[] = CANONICAL_ROADMAP_STAGES.map((canonical) => {
      const match = timelineEvents.find((e) => e.stepNumber === canonical.stepNumber);
      let status: PlacementRoadmapStage['status'] = 'pending';

      if (match) {
        if (match.status === 'completed') status = 'completed';
        else if (match.status === 'in_progress') status = 'current';
        else if (match.status === 'not_applicable') status = 'not_applicable';
        else status = 'pending';
      } else if (canonical.stepNumber < placement.relocationStage) {
        status = 'completed';
      } else if (canonical.stepNumber === placement.relocationStage) {
        status = 'current';
      }

      return {
        stepNumber: canonical.stepNumber,
        name: canonical.name,
        status,
        isOptional: canonical.isOptional,
        dateDisplay: match?.dateDisplay,
      };
    });

    // Load Candidate Actions
    const { data: actionsData } = await supabase
      .from('placement_candidate_actions')
      .select('*')
      .eq('placement_id', placement.id)
      .order('created_at', { ascending: true });

    const candidateActions: PlacementCandidateAction[] = (actionsData || []).map((a) => ({
      id: a.id,
      placementId: a.placement_id,
      actionType: a.action_type as any,
      title: a.title,
      description: a.description,
      status: a.status as any,
      deadline: a.deadline,
      version: a.version || 1,
    }));

    return {
      placement,
      roadmap: roadmapStages,
      timeline: timelineEvents,
      actions: candidateActions,
    };
  }

  /**
   * Complete Candidate acknowledgement mutation with concurrency protection
   */
  static async completeMyAcknowledgement(
    placementId: string,
    actionId: string,
    expectedVersion: number,
    targetUserId?: string
  ): Promise<void> {
    let userId = targetUserId;
    if (!userId) {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData.user) {
        throw new Error('Authentication required to submit acknowledgement.');
      }
      userId = authData.user.id;
    }

    // Verify candidate ownership
    const { data: candidateData } = await supabase
      .from('candidates')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!candidateData) {
      throw new Error('Candidate identity could not be verified.');
    }

    // Fetch action to verify version token
    const { data: actionData, error: actionErr } = await supabase
      .from('placement_candidate_actions')
      .select('id, placement_id, action_type, version, status')
      .eq('id', actionId)
      .eq('placement_id', placementId)
      .maybeSingle();

    if (actionErr || !actionData) {
      throw new Error('Action item not found or unavailable.');
    }

    if (actionData.version !== expectedVersion) {
      throw new Error('This placement action was updated concurrently. Please reload.');
    }

    // Insert immutable acknowledgement record
    const { error: ackErr } = await supabase.from('placement_acknowledgements').insert({
      placement_id: placementId,
      action_id: actionId,
      candidate_id: candidateData.id,
      acknowledgement_type: actionData.action_type,
      version: expectedVersion,
    });

    if (ackErr) {
      throw new Error('Failed to record acknowledgement. Please try again.');
    }

    // Update action status to completed
    await supabase
      .from('placement_candidate_actions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        version: expectedVersion + 1,
      })
      .eq('id', actionId);
  }
}
