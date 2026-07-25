import type { CandidateDocument } from '../supabase/types';

export type DocumentCategory =
  | 'candidate-cv'
  | 'candidate-identity'
  | 'candidate-certificates'
  | 'police-clearance'
  | 'medical-report'
  | 'passport-photo'
  | 'other';

export interface DocumentRequirement {
  category: string;
  label: string;
  required: boolean;
  source: 'platform' | 'job' | 'application' | 'operations';
  applicationId?: string;
  expiresAtRequired?: boolean;
}

export interface DocumentReadinessResult {
  score: number; // 0 - 100%
  totalRequired: number;
  uploadedRequired: number;
  approvedRequired: number;
  rejectedCount: number;
  expiringSoonCount: number;
  expiredCount: number;
  overallStatus: 'incomplete' | 'pending_review' | 'ready' | 'action_required';
}

export const DEFAULT_PLATFORM_REQUIREMENTS: DocumentRequirement[] = [
  {
    category: 'candidate-cv',
    label: 'Curriculum Vitae / Resume',
    required: true,
    source: 'platform',
  },
  {
    category: 'candidate-identity',
    label: 'International Passport / National ID',
    required: true,
    source: 'platform',
    expiresAtRequired: true,
  },
  {
    category: 'candidate-certificates',
    label: 'Educational & Professional Certificates',
    required: false,
    source: 'platform',
  },
];

export const DOCUMENT_STATUS_LABELS: Record<string, string> = {
  not_uploaded: 'Missing',
  uploaded: 'Uploaded',
  pending: 'Pending Review',
  pending_review: 'Pending Review',
  under_review: 'Under Review',
  approved: 'Verified',
  verified: 'Verified',
  rejected: 'Rejected',
  replacement_requested: 'Replacement Requested',
  superseded: 'Superseded',
  archived: 'Archived',
};

export function getDocumentStatusLabel(status: string): string {
  return DOCUMENT_STATUS_LABELS[status] || status;
}

export function calculateDocumentExpiryState(
  expiryDate?: string | null,
  thresholdDays = 90
): 'valid' | 'expiring_soon' | 'expired' | null {
  if (!expiryDate) return null;
  const expiry = new Date(expiryDate).getTime();
  const now = Date.now();
  if (isNaN(expiry)) return null;

  if (expiry < now) {
    return 'expired';
  }

  const daysRemaining = (expiry - now) / (1000 * 60 * 60 * 24);
  if (daysRemaining <= thresholdDays) {
    return 'expiring_soon';
  }

  return 'valid';
}

export function calculateDocumentReadiness(
  documents: CandidateDocument[],
  requirements: DocumentRequirement[] = DEFAULT_PLATFORM_REQUIREMENTS
): DocumentReadinessResult {
  const activeDocs = documents.filter((d) => d.verification_status !== 'superseded' && d.verification_status !== 'archived');
  const requiredReqs = requirements.filter((r) => r.required);
  const totalRequired = requiredReqs.length;

  let uploadedRequired = 0;
  let approvedRequired = 0;
  let rejectedCount = 0;
  let expiringSoonCount = 0;
  let expiredCount = 0;

  for (const doc of activeDocs) {
    if (doc.verification_status === 'rejected' || doc.verification_status === 'replacement_requested') {
      rejectedCount++;
    }

    const expiryState = calculateDocumentExpiryState(doc.expiry_date);
    if (expiryState === 'expiring_soon') expiringSoonCount++;
    if (expiryState === 'expired') expiredCount++;
  }

  for (const req of requiredReqs) {
    const matchingDoc = activeDocs.find((d) => d.document_type === req.category);
    if (matchingDoc) {
      uploadedRequired++;
      if (matchingDoc.verification_status === 'approved' || matchingDoc.verification_status === 'verified') {
        approvedRequired++;
      }
    }
  }

  const score = totalRequired > 0 ? Math.round((uploadedRequired / totalRequired) * 100) : 100;

  let overallStatus: DocumentReadinessResult['overallStatus'] = 'incomplete';
  if (score === 100) {
    overallStatus = approvedRequired === totalRequired ? 'ready' : 'pending_review';
  }
  if (rejectedCount > 0 || expiredCount > 0) {
    overallStatus = 'action_required';
  }

  return {
    score,
    totalRequired,
    uploadedRequired,
    approvedRequired,
    rejectedCount,
    expiringSoonCount,
    expiredCount,
    overallStatus,
  };
}
