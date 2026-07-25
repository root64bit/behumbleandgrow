import { supabase } from '../lib/supabase/client';
import type { Application, StatusHistory, CandidateDocument } from '../lib/supabase/types';

export interface CandidateApplicationDetailsData {
  application: Application;
  timeline: StatusHistory[];
  screeningAnswers: Record<string, any>;
  documents: CandidateDocument[];
  interview: any | null;
  offer: any | null;
  placement: any | null;
}

const SAFE_APPLICATION_DETAILS_COLUMNS = `
  id,
  job_id,
  candidate_id,
  stage,
  status,
  screening_answers,
  consent_given,
  submitted_at,
  updated_at,
  jobs (
    id,
    title,
    location,
    salary_range,
    employer_id
  )
`;

export async function loadMyApplicationDetails(
  userId: string,
  applicationId: string
): Promise<CandidateApplicationDetailsData | null> {
  // 1. Fetch core application record verifying Candidate ownership
  const { data: appData, error: appError } = await supabase
    .from('applications')
    .select(SAFE_APPLICATION_DETAILS_COLUMNS)
    .eq('id', applicationId)
    .eq('candidate_id', userId)
    .maybeSingle();

  if (appError || !appData) {
    return null; // Not Found or Unowned or query error
  }

  const application = appData as unknown as Application;

  // 2. Fetch connected resources independently via Promise.allSettled
  const [timelineRes, docsRes, interviewRes, offerRes, placementRes] = await Promise.allSettled([
    supabase
      .from('status_history')
      .select('id, entity_type, entity_id, previous_status, new_status, changed_by, user_role, candidate_message, created_at')
      .eq('entity_id', applicationId)
      .order('created_at', { ascending: true }),

    supabase
      .from('candidate_documents')
      .select('id, candidate_id, document_type, file_name, mime_type, file_size, expiry_date, verification_status, uploaded_at')
      .eq('candidate_id', userId),

    supabase
      .from('interviews')
      .select('id, application_id, candidate_id, scheduled_at, duration_minutes, status, format')
      .eq('application_id', applicationId)
      .eq('candidate_id', userId)
      .maybeSingle(),

    supabase
      .from('job_offers')
      .select('id, application_id, candidate_id, salary_offered, currency, status, issued_at, expires_at')
      .eq('application_id', applicationId)
      .eq('candidate_id', userId)
      .maybeSingle(),

    supabase
      .from('placements')
      .select('id, application_id, candidate_id, status, start_date, milestone')
      .eq('application_id', applicationId)
      .eq('candidate_id', userId)
      .maybeSingle(),
  ]);

  const timeline = timelineRes.status === 'fulfilled' && !timelineRes.value.error ? (timelineRes.value.data as StatusHistory[]) : [];
  const documents = docsRes.status === 'fulfilled' && !docsRes.value.error ? (docsRes.value.data as CandidateDocument[]) : [];
  const interview = interviewRes.status === 'fulfilled' && !interviewRes.value.error ? interviewRes.value.data : null;
  const offer = offerRes.status === 'fulfilled' && !offerRes.value.error ? offerRes.value.data : null;
  const placement = placementRes.status === 'fulfilled' && !placementRes.value.error ? placementRes.value.data : null;

  return {
    application,
    timeline,
    screeningAnswers: (application as any).screening_answers || {},
    documents,
    interview,
    offer,
    placement,
  };
}

export async function withdrawMyApplicationConcurrencySafe(
  userId: string,
  applicationId: string,
  previouslyLoadedUpdatedAt?: string
): Promise<boolean> {
  const { data: currentApp } = await supabase
    .from('applications')
    .select('id, status, candidate_id, updated_at')
    .eq('id', applicationId)
    .eq('candidate_id', userId)
    .single();

  if (!currentApp) {
    throw new Error('Application not found or unauthorized.');
  }

  const forbiddenStatuses = ['placed', 'withdrawn', 'rejected', 'offer_accepted'];
  if (forbiddenStatuses.includes(currentApp.status?.toLowerCase())) {
    throw new Error(`Application cannot be withdrawn in status '${currentApp.status}'.`);
  }

  // Concurrency Check
  if (previouslyLoadedUpdatedAt && currentApp.updated_at !== previouslyLoadedUpdatedAt) {
    throw new Error('Application status has changed since last loaded. Please refresh the page.');
  }

  const { error } = await supabase
    .from('applications')
    .update({
      status: 'withdrawn',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', applicationId)
    .eq('candidate_id', userId);

  if (error) {
    throw new Error(error.message || 'Failed to withdraw application.');
  }

  await supabase.from('status_history').insert({
    entity_type: 'application',
    entity_id: applicationId,
    previous_status: currentApp.status,
    new_status: 'withdrawn',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: 'Application withdrawn by candidate.',
  } as any);

  return true;
}
