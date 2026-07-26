export type CandidateDocumentType = 'passport' | 'cv' | 'national_id' | 'education' | 'medical' | 'police_clearance';
export type CandidateDocumentStatus = 'verified' | 'uploaded' | 'under_review' | 'replacement_required' | 'missing';
export type CandidateEligibilityStatus = 'qualified' | 'potentially_eligible' | 'under_review' | 'not_eligible';

export interface CandidateSummary {
  id: string;
  candidateName: string;
  candidateId: string;
  country: string;
  countryCode: string;
  flag: string;
  avatarUrl?: string;
  profession: string;
  profileCompletionPercent: number;
  eligibilityStatus: CandidateEligibilityStatus;
  currentStageIndex: number; // 0 to 9
}

export interface CandidateNextStep {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  priority: 'normal' | 'important' | 'urgent';
  actionLabel: string;
  destinationRoute: string;
}

export interface CandidateJourneyStep {
  stageNumber: number;
  title: string;
  status: 'completed' | 'current' | 'action_required' | 'pending_review' | 'upcoming';
  isCompleted: boolean;
  isCurrent: boolean;
  timestamp?: string;
}

export interface ProfileCompletionSection {
  id: string;
  name: string;
  isCompleted: boolean;
  isRequired: boolean;
}

export interface CandidateDocumentRecord {
  id: string;
  name: string;
  type: CandidateDocumentType;
  status: CandidateDocumentStatus;
  expiryDate?: string;
  lastUploadedAt?: string;
}

export interface RecommendedJob {
  id: string;
  slug: string;
  title: string;
  employerName: string;
  emirate: string;
  salaryText: string;
  matchScore: number; // percentage
  matchReason: string;
  deadline: string;
}

export interface CandidateApplication {
  id: string;
  reference: string;
  jobTitle: string;
  employerName: string;
  emirate: string;
  submittedAt: string;
  currentStage: string;
  progressPercent: number;
  requiredAction?: string;
}

export interface CandidateInterview {
  id: string;
  jobTitle: string;
  employerName: string;
  uaeTime: string;
  localTime: string;
  interviewType: string;
  status: 'confirmed' | 'pending_confirmation';
  prepChecklist: Array<{ id: string; label: string; done: boolean }>;
}

export interface CandidateConditionalOffer {
  id: string;
  reference: string;
  position: string;
  employerName: string;
  salaryText: string;
  benefitsText: string;
  issueDate: string;
  expiryDate: string;
  status: 'sent_to_candidate' | 'accepted' | 'declined';
}

export interface CandidatePlacementProgress {
  id: string;
  employerName: string;
  currentStage: 'Offer Accepted' | 'Medical Clearance' | 'Work Permit Submitted' | 'Visa Approved' | 'Travel Preparation' | 'UAE Arrival' | 'Completed';
  expectedArrival: string;
  visaStatus: string;
  workPermitStatus: string;
}
