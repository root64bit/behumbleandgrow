export type CandidateSupportStatus =
  | 'submitted'
  | 'open'
  | 'awaiting_support'
  | 'awaiting_candidate'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'reopened'
  | 'cancelled';

export interface SupportStatusInfo {
  state: 'open' | 'awaiting_candidate' | 'in_progress' | 'resolved' | 'closed' | 'unknown';
  label: string;
  badgeClass: string;
  isActionRequired: boolean;
}

export function resolveSupportStatus(params: {
  status?: string | null;
  isCandidateActionRequired?: boolean;
}): SupportStatusInfo {
  const norm = (params.status || '').toLowerCase().trim();

  if (params.isCandidateActionRequired || norm === 'awaiting_candidate') {
    return {
      state: 'awaiting_candidate',
      label: 'Your Response Required',
      badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60',
      isActionRequired: true,
    };
  }

  switch (norm) {
    case 'submitted':
    case 'open':
    case 'awaiting_support':
      return {
        state: 'open',
        label: 'Awaiting Support',
        badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60',
        isActionRequired: false,
      };
    case 'in_progress':
      return {
        state: 'in_progress',
        label: 'Support Reviewing',
        badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60',
        isActionRequired: false,
      };
    case 'reopened':
      return {
        state: 'open',
        label: 'Reopened',
        badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60',
        isActionRequired: false,
      };
    case 'resolved':
      return {
        state: 'resolved',
        label: 'Resolved',
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        isActionRequired: false,
      };
    case 'closed':
      return {
        state: 'closed',
        label: 'Closed',
        badgeClass: 'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400 border-slate-200 dark:border-slate-800',
        isActionRequired: false,
      };
    case 'cancelled':
      return {
        state: 'closed',
        label: 'Cancelled',
        badgeClass: 'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400 border-slate-200 dark:border-slate-800',
        isActionRequired: false,
      };
    default:
      return {
        state: 'unknown',
        label: 'Status Being Updated',
        badgeClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        isActionRequired: false,
      };
  }
}
