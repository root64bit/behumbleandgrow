import { supabase } from '../lib/supabase/client';
import { resolveCandidateEmployerDisplay } from '../lib/candidate/applicationStatus';
import { getInterviewStatusDetails, parseInterviewStatus } from '../lib/candidate/interviewStatus';

export interface CandidateInterviewListItem {
  id: string;
  application_id: string;
  job_id: string;
  job_title: string;
  employer_display_name: string;
  scheduled_at: string;
  duration_minutes: number;
  format: string;
  status: string;
  meetingLinkAvailable: boolean;
  updated_at: string;
  candidateProfileTimeZone?: string | null;
}

export interface CandidateInterviewSummaryMetrics {
  upcomingCount: number;
  actionRequiredCount: number;
  thisWeekCount: number;
  completedCount: number;
  rescheduleRequestedCount: number;
}

export interface LoadInterviewsOptions {
  userId: string;
  tabFilter?: 'upcoming' | 'action_required' | 'completed' | 'rescheduled' | 'all';
  searchQuery?: string;
  cursor?: string;
  limit?: number;
}

export interface CandidateInterviewsListResult {
  interviews: CandidateInterviewListItem[];
  nextCursor?: string;
  hasMore: boolean;
}

const SAFE_INTERVIEW_COLUMNS = `
  id,
  application_id,
  candidate_id,
  scheduled_at,
  duration_minutes,
  status,
  format,
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

export async function loadMyInterviews(
  options: LoadInterviewsOptions
): Promise<CandidateInterviewsListResult> {
  const { userId, tabFilter = 'upcoming', searchQuery = '', limit = 10 } = options;

  try {
    let query = supabase
      .from('interviews')
      .select(SAFE_INTERVIEW_COLUMNS)
      .eq('candidate_id', userId)
      .order('scheduled_at', { ascending: tabFilter !== 'completed' });

    if (options.cursor) {
      if (tabFilter === 'completed') {
        query = query.lt('scheduled_at', options.cursor);
      } else {
        query = query.gt('scheduled_at', options.cursor);
      }
    }

    query = query.limit(limit + 1);

    const { data, error } = await query;

    if (error || !data) {
      return { interviews: [], hasMore: false };
    }

    const rawList = (data || []) as any[];

    let mappedItems: CandidateInterviewListItem[] = rawList.map((row) => {
      const app = row.applications;
      const job = app?.jobs;
      const employerDisplayName = resolveCandidateEmployerDisplay(app || {});

      return {
        id: row.id,
        application_id: row.application_id,
        job_id: job?.id || '',
        job_title: job?.title || 'UAE Career Opportunity',
        employer_display_name: employerDisplayName,
        scheduled_at: row.scheduled_at || new Date().toISOString(),
        duration_minutes: row.duration_minutes || 30,
        format: row.format || 'Video Interview',
        status: row.status || 'awaiting_candidate_confirmation',
        meetingLinkAvailable: Boolean(row.meeting_url), // Boolean ONLY! Never return raw URL
        updated_at: row.updated_at || new Date().toISOString(),
      };
    });

    // Filter by Tab Category
    if (tabFilter === 'upcoming') {
      mappedItems = mappedItems.filter((i) => {
        const details = getInterviewStatusDetails(i.status);
        return details.category === 'upcoming' || details.category === 'action_required';
      });
    } else if (tabFilter === 'action_required') {
      mappedItems = mappedItems.filter((i) => {
        const details = getInterviewStatusDetails(i.status);
        return details.isActionRequired;
      });
    } else if (tabFilter === 'completed') {
      mappedItems = mappedItems.filter((i) => {
        const details = getInterviewStatusDetails(i.status);
        return details.category === 'completed';
      });
    } else if (tabFilter === 'rescheduled') {
      mappedItems = mappedItems.filter((i) => {
        const details = getInterviewStatusDetails(i.status);
        return details.category === 'rescheduled';
      });
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      mappedItems = mappedItems.filter(
        (i) =>
          i.job_title.toLowerCase().includes(q) ||
          i.employer_display_name.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q)
      );
    }

    const hasMore = mappedItems.length > limit;
    const pageItems = hasMore ? mappedItems.slice(0, limit) : mappedItems;
    const nextCursor = hasMore && pageItems.length > 0 ? pageItems[pageItems.length - 1].scheduled_at : undefined;

    return {
      interviews: pageItems,
      nextCursor,
      hasMore,
    };
  } catch {
    return { interviews: [], hasMore: false };
  }
}

export async function loadMyInterviewSummaryMetrics(
  userId: string
): Promise<CandidateInterviewSummaryMetrics> {
  try {
    const { data } = await supabase
      .from('interviews')
      .select('id, status, scheduled_at')
      .eq('candidate_id', userId);

    const rows = (data || []) as any[];

    let upcomingCount = 0;
    let actionRequiredCount = 0;
    let thisWeekCount = 0;
    let completedCount = 0;
    let rescheduleRequestedCount = 0;

    const now = new Date();
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (const r of rows) {
      const canonical = parseInterviewStatus(r.status);
      const details = getInterviewStatusDetails(r.status);
      const startTime = new Date(r.scheduled_at || 0);

      if (details.category === 'upcoming' || details.category === 'action_required') {
        upcomingCount++;
        if (startTime >= now && startTime <= oneWeekLater) {
          thisWeekCount++;
        }
      }
      if (details.isActionRequired) {
        actionRequiredCount++;
      }
      if (details.category === 'completed') {
        completedCount++;
      }
      if (canonical === 'reschedule_requested') {
        rescheduleRequestedCount++;
      }
    }

    return {
      upcomingCount,
      actionRequiredCount,
      thisWeekCount,
      completedCount,
      rescheduleRequestedCount,
    };
  } catch {
    return {
      upcomingCount: 0,
      actionRequiredCount: 0,
      thisWeekCount: 0,
      completedCount: 0,
      rescheduleRequestedCount: 0,
    };
  }
}

export async function confirmMyAttendanceConcurrencySafe(
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

export async function requestMyInterviewRescheduleConcurrencySafe(
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
