export type LeadStatus = 'new_assigned' | 'awaiting_acceptance' | 'accepted' | 'recruiter_review' | 'submitted_to_employer' | 'interview' | 'offer' | 'placement' | 'declined';
export type LeadPriority = 'urgent' | 'high' | 'normal';
export type PartnerVerificationStatus = 'approved' | 'verification_required' | 'agreement_renewal_required' | 'compliance_review' | 'suspended';
export type RecruiterWorkloadStatus = 'available' | 'balanced' | 'near_capacity' | 'over_capacity' | 'away';

export interface PartnerOrganisationCard {
  id: string;
  agencyName: string;
  partnerReference: string;
  verificationStatus: PartnerVerificationStatus;
  agreementStatus: string;
  activeRecruiters: number;
  activeLeads: number;
  leadCapacity: number;
  slaStatus: 'performing' | 'monitor' | 'action_required';
  operationsContactName: string;
  operationsContactEmail: string;
}

export interface PartnerKpiMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  change?: number;
  comparisonLabel?: string;
  status?: 'normal' | 'warning' | 'critical';
  destinationRoute: string;
  tooltip: string;
  lastUpdatedAt: string;
}

export interface PartnerActionItem {
  id: string;
  title: string;
  category: 'Leads' | 'Clarification' | 'Submissions' | 'Interviews' | 'Offers' | 'Placements' | 'Compliance';
  count: number;
  priority: 'urgent' | 'high' | 'normal';
  oldestPendingAt: string;
  responsibleRecruiter?: string;
  queueRoute: string;
}

export interface PartnerLead {
  id: string;
  candidateName: string;
  candidateId: string;
  country: string;
  countryCode: string;
  flag: string;
  avatarUrl?: string;
  profession: string;
  experienceYears: number;
  englishLevel: string;
  eligibilityStatus: 'eligible' | 'under_review';
  documentStatus: 'verified' | 'pending';
  assignedJobTitle: string;
  employerName: string;
  leadPriority: LeadPriority;
  assignedAt: string;
  responseDeadline: string;
  assignedRecruiterName?: string;
  leadStatus: LeadStatus;
}

export interface RecruiterWorkloadRecord {
  id: string;
  recruiterName: string;
  email: string;
  avatarUrl?: string;
  activeLeads: number;
  submissionsCount: number;
  interviewsCount: number;
  placementsCount: number;
  capacityPercentage: number;
  status: RecruiterWorkloadStatus;
}

export interface EmployerSubmissionRecord {
  id: string;
  candidateName: string;
  employerName: string;
  jobTitle: string;
  submissionRef: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'under_review' | 'shortlisted' | 'interview_requested' | 'rejected';
  daysWaiting: number;
}

export interface UpcomingInterviewRecord {
  id: string;
  candidateName: string;
  jobTitle: string;
  employerName: string;
  uaeTime: string;
  localTime: string;
  interviewType: 'Video Call' | 'In-Person' | 'Technical Screening';
  status: 'confirmed' | 'pending_confirmation' | 'feedback_required';
}

export interface OfferProgressRecord {
  id: string;
  candidateName: string;
  jobTitle: string;
  employerName: string;
  offerStatus: 'draft' | 'approved' | 'sent_to_candidate' | 'accepted' | 'declined';
  offerDate: string;
  expiryDate: string;
  candidateResponse?: string;
}

export interface PlacementProgressRecord {
  id: string;
  candidateName: string;
  employerName: string;
  currentStage: 'Offer Accepted' | 'Medical Review' | 'Work Permit Submitted' | 'Visa Approved' | 'Travel Prep' | 'UAE Arrival' | 'Completed';
  daysInStage: number;
  delayReason?: string;
  expectedArrival: string;
}

export interface PartnerPerformanceMetric {
  acceptanceRate: number; // percentage
  avgResponseTimeHours: number;
  submissionRate: number; // percentage
  interviewConversion: number; // percentage
  placementConversion: number; // percentage
  slaStatus: 'performing' | 'monitor' | 'action_required';
}

export interface PartnerFilters {
  dateRange: '7d' | '30d' | '90d' | 'ytd';
  leadStage?: string;
  profession?: string;
  recruiterId?: string;
  priority?: string;
}
