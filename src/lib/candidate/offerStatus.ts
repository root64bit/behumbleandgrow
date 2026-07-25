export type CanonicalOfferStatus =
  | 'draft'
  | 'internal_review'
  | 'employer_approval_pending'
  | 'approved'
  | 'sent_to_candidate'
  | 'viewed'
  | 'awaiting_candidate_decision'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'withdrawn'
  | 'replaced'
  | 'superseded'
  | 'cancelled';

export type CandidateDecisionStatus =
  | 'not_available'
  | 'pending'
  | 'viewed'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'revoked';

export interface OfferStatusConfig {
  label: string;
  badgeClass: string;
  category: 'active' | 'action_required' | 'accepted' | 'historical';
}

export interface CandidateDecisionConfig {
  label: string;
  badgeClass: string;
}

export function getOfferStatusConfig(status: string): OfferStatusConfig {
  switch (status.toLowerCase()) {
    case 'sent_to_candidate':
    case 'issued':
    case 'available':
      return {
        label: 'Available for Review',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        category: 'active',
      };

    case 'awaiting_candidate_decision':
    case 'action_required':
      return {
        label: 'Action Required',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        category: 'action_required',
      };

    case 'accepted':
    case 'offer_accepted':
      return {
        label: 'Accepted',
        badgeClass: 'bg-emerald-600 text-white border-emerald-700',
        category: 'accepted',
      };

    case 'declined':
    case 'offer_declined':
      return {
        label: 'Declined',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        category: 'historical',
      };

    case 'expired':
      return {
        label: 'Expired',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
        category: 'historical',
      };

    case 'withdrawn':
    case 'cancelled':
      return {
        label: 'Withdrawn',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
        category: 'historical',
      };

    case 'replaced':
    case 'superseded':
      return {
        label: 'Superseded',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
        category: 'historical',
      };

    case 'draft':
    case 'internal_review':
    case 'employer_approval_pending':
      return {
        label: 'Awaiting Release',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
        category: 'active',
      };

    default:
      return {
        label: 'Status Being Updated',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
        category: 'historical',
      };
  }
}

export function getCandidateDecisionConfig(decision: CandidateDecisionStatus | string): CandidateDecisionConfig {
  switch (decision?.toLowerCase()) {
    case 'accepted':
      return {
        label: 'Decision: Accepted',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      };
    case 'declined':
      return {
        label: 'Decision: Declined',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      };
    case 'viewed':
      return {
        label: 'Reviewed by You',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      };
    case 'expired':
      return {
        label: 'Decision Window Expired',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      };
    case 'revoked':
      return {
        label: 'Offer Revoked',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      };
    case 'pending':
    default:
      return {
        label: 'Decision Pending',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      };
  }
}
