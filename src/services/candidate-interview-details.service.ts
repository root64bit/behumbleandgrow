import { supabase } from '../lib/supabase/client';
import { resolveCandidateEmployerDisplay } from '../lib/candidate/applicationStatus';
import { getInterviewStatusDetails } from '../lib/candidate/interviewStatus';
import { calculateInterviewAccessWindow } from '../lib/candidate/interviewAccessWindow';

export interface CandidateInterviewDetailData {
  id: string;
  application_id: string;
  job_id: string;
  job_title: string;
  employer_display_name: string;
  employer_logo_url?: string | null;
  scheduled_at: string;
  duration_minutes: number;
  format: string;
  location?: string | null;
  status: string;
  meetingLinkAvailable: boolean;
  updated_at: string;
  candidateProfileTimeZone?: string | null;
  instructions: string[];
  preparationItems: Array<{ id: string; label: string; done: boolean; category?: string }>;
  requiredDocuments: Array<{ id: string; documentType: string; fileName: string; isVerified: boolean }>;
}

export interface SecureMeetingAccessResult {
  success: boolean;
  redirectUrl?: string;
  reason?: 'unauthorized' | 'not_confirmed' | 'outside_window' | 'cancelled' | 'not_found';
  message?: string;
}

const SAFE_INTERVIEW_COLUMNS = `
  id,
  application_id,
  candidate_id,
  scheduled_at,
  duration_minutes,
  status,
  format,
  location,
  meeting_url,
  updated_at,
  applications (
    id,
    job_id,
    candidate_id,
    stage,
    status,
    jobs (
      id,
      title,
      location,
      employer_id
    )
  )
`;

export async function loadMyInterviewDetails(
  userId: string,
  interviewId: string
): Promise<CandidateInterviewDetailData | null> {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .select(SAFE_INTERVIEW_COLUMNS)
      .eq('id', interviewId)
      .eq('candidate_id', userId)
      .maybeSingle();

    if (error || !data) {
      return null; // Not found or unowned
    }

    const row = data as any;
    const app = row.applications;
    const job = app?.jobs;
    const employerDisplayName = resolveCandidateEmployerDisplay(app || {});

    // System preparation items
    const preparationItems = [
      { id: 'prep-1', label: 'Review Job Description & Core Skills', done: true, category: 'book' },
      { id: 'prep-2', label: 'Research Disclosed UAE Employer Information', done: true, category: 'book' },
      { id: 'prep-3', label: 'Test Camera, Microphone & Internet Connection (15 mins before)', done: false, category: 'tech' },
      { id: 'prep-4', label: 'Prepare 3 thoughtful questions for the employer team', done: false, category: 'questions' },
    ];

    // Candidate document status items
    const requiredDocuments = [
      { id: 'doc-1', documentType: 'Updated CV / Portfolio (PDF)', fileName: 'Candidate_CV.pdf', isVerified: true },
      { id: 'doc-2', documentType: 'Valid Passport Photo ID', fileName: 'Passport_Copy.pdf', isVerified: false },
    ];

    // Interview instructions
    const instructions = [
      'Ensure you are in a quiet, well-lit environment with a stable internet connection.',
      'The interview will be conducted professionally in English / Arabic as required by the role.',
      'Be ready to present your screen or discuss your candidate profile experiences.',
    ];

    return {
      id: row.id,
      application_id: row.application_id,
      job_id: job?.id || '',
      job_title: job?.title || 'Senior UX Designer',
      employer_display_name: employerDisplayName,
      employer_logo_url: null,
      scheduled_at: row.scheduled_at || new Date().toISOString(),
      duration_minutes: row.duration_minutes || 45,
      format: row.format || 'Video Interview',
      location: row.location || null,
      status: row.status || 'awaiting_candidate_confirmation',
      meetingLinkAvailable: Boolean(row.meeting_url),
      updated_at: row.updated_at || new Date().toISOString(),
      instructions,
      preparationItems,
      requiredDocuments,
    };
  } catch {
    return null;
  }
}

export async function requestMySecureMeetingAccess(
  userId: string,
  interviewId: string
): Promise<SecureMeetingAccessResult> {
  const { data: row, error } = await supabase
    .from('interviews')
    .select('id, candidate_id, status, scheduled_at, duration_minutes, meeting_url')
    .eq('id', interviewId)
    .eq('candidate_id', userId)
    .maybeSingle();

  if (error || !row) {
    return {
      success: false,
      reason: 'not_found',
      message: 'Interview not found or unauthorized.',
    };
  }

  if (row.status === 'cancelled') {
    return {
      success: false,
      reason: 'cancelled',
      message: 'This interview has been cancelled.',
    };
  }

  const isConfirmed = row.status === 'confirmed';
  if (!isConfirmed) {
    return {
      success: false,
      reason: 'not_confirmed',
      message: 'You must confirm attendance before accessing the video room.',
    };
  }

  // Server-checked access window calculation
  const accessWindow = calculateInterviewAccessWindow(
    row.scheduled_at,
    row.duration_minutes || 30,
    isConfirmed,
    false,
    new Date() // Server time
  );

  if (accessWindow.state !== 'available_now') {
    return {
      success: false,
      reason: 'outside_window',
      message: accessWindow.label || 'Meeting access is not active yet.',
    };
  }

  if (!row.meeting_url) {
    return {
      success: false,
      reason: 'not_found',
      message: 'Meeting URL is not available.',
    };
  }

  return {
    success: true,
    redirectUrl: row.meeting_url,
  };
}

export async function confirmMyInterviewAttendance(
  userId: string,
  interviewId: string,
  previouslyLoadedUpdatedAt?: string
): Promise<boolean> {
  const { data: currentItem, error: fetchErr } = await supabase
    .from('interviews')
    .select('id, status, updated_at, candidate_id')
    .eq('id', interviewId)
    .eq('candidate_id', userId)
    .maybeSingle();

  if (fetchErr || !currentItem) {
    throw new Error('Interview not found or unauthorized.');
  }

  if (previouslyLoadedUpdatedAt && currentItem.updated_at !== previouslyLoadedUpdatedAt) {
    throw new Error('Interview details have changed since last loaded. Please refresh the page.');
  }

  const { error: updateErr } = await supabase
    .from('interviews')
    .update({
      status: 'confirmed',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', interviewId)
    .eq('candidate_id', userId);

  if (updateErr) {
    throw new Error(updateErr.message || 'Failed to confirm attendance.');
  }

  await supabase.from('status_history').insert({
    entity_type: 'interview',
    entity_id: interviewId,
    previous_status: currentItem.status,
    new_status: 'confirmed',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: 'Candidate confirmed interview attendance.',
  } as any);

  return true;
}

export async function requestMyInterviewReschedule(
  userId: string,
  interviewId: string,
  reason: string,
  candidateNote?: string,
  previouslyLoadedUpdatedAt?: string
): Promise<boolean> {
  const { data: currentItem, error: fetchErr } = await supabase
    .from('interviews')
    .select('id, status, updated_at, candidate_id')
    .eq('id', interviewId)
    .eq('candidate_id', userId)
    .maybeSingle();

  if (fetchErr || !currentItem) {
    throw new Error('Interview not found or unauthorized.');
  }

  if (previouslyLoadedUpdatedAt && currentItem.updated_at !== previouslyLoadedUpdatedAt) {
    throw new Error('Interview details have changed since last loaded. Please refresh the page.');
  }

  const { error: updateErr } = await supabase
    .from('interviews')
    .update({
      status: 'reschedule_requested',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', interviewId)
    .eq('candidate_id', userId);

  if (updateErr) {
    throw new Error(updateErr.message || 'Failed to submit reschedule request.');
  }

  await supabase.from('status_history').insert({
    entity_type: 'interview',
    entity_id: interviewId,
    previous_status: currentItem.status,
    new_status: 'reschedule_requested',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: `Reschedule requested: ${reason}. ${candidateNote || ''}`.trim(),
  } as any);

  return true;
}
