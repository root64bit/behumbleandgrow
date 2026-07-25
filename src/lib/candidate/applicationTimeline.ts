import type { StatusHistory, CandidateStage } from '../supabase/types';
import { getApplicationStatusLabel } from './applicationStatus';

export interface CandidateTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  stage?: CandidateStage | string | null;
  status: string;
  tone: 'emerald' | 'blue' | 'amber' | 'neutral';
}

const CANDIDATE_VISIBLE_EVENT_TITLES: Record<string, string> = {
  submitted: 'Application Submitted',
  under_review: 'Initial Review',
  eligibility_passed: 'Eligibility Review Passed',
  onboarding: 'Document Verification',
  partner_assigned: 'Recruitment Review',
  partner_interview: 'Recruitment Review',
  employer_submitted: 'Submitted to Employer',
  employer_review: 'Employer Review',
  employer_interview: 'Interview Scheduled',
  interview_scheduled: 'Interview Scheduled',
  offer_issued: 'Conditional Offer Issued',
  offer_accepted: 'Offer Accepted',
  visa_processing: 'Placement Process Started',
  placed: 'Placed in Role',
  rejected: 'Application Closed',
  withdrawn: 'Application Withdrawn',
};

export function mapStatusHistoryToTimelineEvents(historyRecords: StatusHistory[]): CandidateTimelineEvent[] {
  if (!Array.isArray(historyRecords) || historyRecords.length === 0) return [];

  // Filter out internal events (security layer 2: exclude records with internal_note or user_role in internal roles)
  const candidateVisibleRecords = historyRecords.filter((rec) => {
    if (rec.user_role && ['operations', 'recruiter', 'employer'].includes(rec.user_role.toLowerCase())) {
      // Allow only if candidate_message is present
      return Boolean(rec.candidate_message);
    }
    return true;
  });

  // Stable sort: timestamp ASC, id ASC
  const sorted = [...candidateVisibleRecords].sort((a, b) => {
    const timeA = new Date(a.created_at || 0).getTime();
    const timeB = new Date(b.created_at || 0).getTime();
    if (timeA !== timeB) return timeA - timeB;
    return (a.id || '').localeCompare(b.id || '');
  });

  // Deduplicate consecutive identical statuses unless legitimate repeat activity
  const events: CandidateTimelineEvent[] = [];
  let lastStatus = '';

  for (const rec of sorted) {
    const statusKey = rec.new_status || 'submitted';
    if (statusKey === lastStatus && !rec.candidate_message) {
      continue;
    }
    lastStatus = statusKey;

    const title = CANDIDATE_VISIBLE_EVENT_TITLES[statusKey] || getApplicationStatusLabel(statusKey);
    const description = rec.candidate_message || `Status updated to ${title.toLowerCase()}.`;

    let tone: 'emerald' | 'blue' | 'amber' | 'neutral' = 'blue';
    if (['offer_issued', 'offer_accepted', 'placed'].includes(statusKey)) {
      tone = 'emerald';
    } else if (['rejected', 'withdrawn'].includes(statusKey)) {
      tone = 'neutral';
    } else if (['employer_interview', 'interview_scheduled'].includes(statusKey)) {
      tone = 'amber';
    }

    events.push({
      id: rec.id || `evt-${events.length + 1}`,
      title,
      description,
      timestamp: rec.created_at || new Date().toISOString(),
      status: statusKey,
      tone,
    });
  }

  return events;
}
