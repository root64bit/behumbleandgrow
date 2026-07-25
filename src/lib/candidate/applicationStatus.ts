import type { Application, CandidateStage } from '../supabase/types';

export interface ApplicationStatusInfo {
  label: string;
  stageIndex: number;
  progressPercent: number;
  tone: 'neutral' | 'emerald' | 'amber' | 'blue' | 'purple' | 'red';
  isActive: boolean;
}

export const CANONICAL_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  eligibility_passed: 'Eligibility Passed',
  qualified: 'Qualified',
  partner_assigned: 'Partner Review',
  partner_interview: 'Partner Review',
  employer_submitted: 'Submitted to Employer',
  employer_review: 'Employer Review',
  employer_interview: 'Interview Scheduled',
  interview_scheduled: 'Interview Scheduled',
  offer_issued: 'Conditional Offer',
  offer_accepted: 'Offer Accepted',
  visa_processing: 'Placement in Progress',
  placed: 'Placed',
  rejected: 'Not Selected',
  withdrawn: 'Withdrawn',
  closed: 'Closed',
};

export function getApplicationStatusLabel(status: string): string {
  if (!status) return 'Status being updated';
  return CANONICAL_STATUS_LABELS[status] || 'Status being updated';
}

export function isApplicationActive(status: string): boolean {
  if (!status) return true;
  const closedStatuses = ['rejected', 'withdrawn', 'closed'];
  return !closedStatuses.includes(status.toLowerCase());
}

export function getApplicationStageIndex(stage?: CandidateStage | string | null): number {
  if (!stage) return 1;
  switch (stage) {
    case 'registered':
    case 'submitted':
      return 1;
    case 'eligibility_passed':
      return 2;
    case 'onboarding':
    case 'verified':
      return 3;
    case 'lead_assigned':
    case 'partner_interview':
      return 4;
    case 'employer_submitted':
      return 5;
    case 'employer_interview':
      return 6;
    case 'offer_issued':
    case 'offer_accepted':
      return 7;
    case 'visa_processing':
    case 'placed':
      return 8;
    case 'rejected':
    case 'withdrawn':
    default:
      return 1;
  }
}

export function getApplicationProgressPercentage(stage?: CandidateStage | string | null): number {
  const index = getApplicationStageIndex(stage);
  return Math.round((index / 8) * 100);
}

export function resolveCandidateEmployerDisplay(application: Partial<Application> & { jobs?: any }): string {
  const stageIndex = getApplicationStageIndex(application.stage);
  // Prior to stage 5 (employer_submitted), hide employer name per disclosure rules
  if (stageIndex < 5) {
    return 'Approved UAE Employer';
  }

  const employerOrgName = application.jobs?.employers?.organisations?.name || application.jobs?.organisation_name;
  if (employerOrgName && typeof employerOrgName === 'string') {
    return employerOrgName;
  }

  return 'Approved UAE Employer';
}
