export type CanonicalInterviewStatus =
  | 'awaiting_candidate_confirmation'
  | 'awaiting_employer_confirmation'
  | 'confirmed'
  | 'reschedule_requested'
  | 'rescheduled'
  | 'completed'
  | 'cancelled'
  | 'expired'
  | 'unknown';

export interface InterviewStatusDetails {
  status: CanonicalInterviewStatus;
  label: string;
  badgeStyle: string;
  category: 'upcoming' | 'action_required' | 'completed' | 'rescheduled' | 'cancelled' | 'other';
  isActionRequired: boolean;
  canConfirm: boolean;
  canReschedule: boolean;
  canJoin: boolean;
}

export function parseInterviewStatus(rawStatus?: string | null): CanonicalInterviewStatus {
  if (!rawStatus) return 'unknown';
  const s = rawStatus.toLowerCase().trim();

  if (['awaiting_candidate_confirmation', 'action_required', 'pending_confirmation'].includes(s)) {
    return 'awaiting_candidate_confirmation';
  }
  if (['awaiting_employer_confirmation', 'pending_employer'].includes(s)) {
    return 'awaiting_employer_confirmation';
  }
  if (['confirmed', 'accepted', 'scheduled'].includes(s)) {
    return 'confirmed';
  }
  if (['reschedule_requested', 'pending_reschedule'].includes(s)) {
    return 'reschedule_requested';
  }
  if (['rescheduled'].includes(s)) {
    return 'rescheduled';
  }
  if (['completed', 'finished', 'concluded'].includes(s)) {
    return 'completed';
  }
  if (['cancelled', 'canceled', 'rejected'].includes(s)) {
    return 'cancelled';
  }
  if (['expired', 'no_show', 'missed'].includes(s)) {
    return 'expired';
  }

  return 'unknown';
}

export function getInterviewStatusDetails(rawStatus?: string | null): InterviewStatusDetails {
  const canonical = parseInterviewStatus(rawStatus);

  switch (canonical) {
    case 'awaiting_candidate_confirmation':
      return {
        status: canonical,
        label: 'Action Required: Confirm Attendance',
        badgeStyle: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
        category: 'action_required',
        isActionRequired: true,
        canConfirm: true,
        canReschedule: true,
        canJoin: false,
      };
    case 'awaiting_employer_confirmation':
      return {
        status: canonical,
        label: 'Awaiting Employer Confirmation',
        badgeStyle: 'bg-slate-100 text-slate-700 border border-slate-300 font-bold',
        category: 'upcoming',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: true,
        canJoin: false,
      };
    case 'confirmed':
      return {
        status: canonical,
        label: 'Confirmed',
        badgeStyle: 'bg-emerald-100 text-[#006D44] border border-emerald-300 font-bold',
        category: 'upcoming',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: true,
        canJoin: true,
      };
    case 'reschedule_requested':
      return {
        status: canonical,
        label: 'Reschedule Requested',
        badgeStyle: 'bg-purple-100 text-purple-900 border border-purple-300 font-bold',
        category: 'rescheduled',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: false,
        canJoin: false,
      };
    case 'rescheduled':
      return {
        status: canonical,
        label: 'Rescheduled',
        badgeStyle: 'bg-blue-100 text-blue-900 border border-blue-300 font-bold',
        category: 'rescheduled',
        isActionRequired: false,
        canConfirm: true,
        canReschedule: true,
        canJoin: true,
      };
    case 'completed':
      return {
        status: canonical,
        label: 'Completed',
        badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200 font-medium',
        category: 'completed',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: false,
        canJoin: false,
      };
    case 'cancelled':
      return {
        status: canonical,
        label: 'Cancelled',
        badgeStyle: 'bg-red-50 text-red-800 border border-red-200 font-medium',
        category: 'cancelled',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: false,
        canJoin: false,
      };
    case 'expired':
      return {
        status: canonical,
        label: 'Expired',
        badgeStyle: 'bg-slate-100 text-slate-500 border border-slate-200 font-medium',
        category: 'completed',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: false,
        canJoin: false,
      };
    default:
      return {
        status: 'unknown',
        label: 'Status Being Updated',
        badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200 font-medium',
        category: 'other',
        isActionRequired: false,
        canConfirm: false,
        canReschedule: false,
        canJoin: false,
      };
  }
}
