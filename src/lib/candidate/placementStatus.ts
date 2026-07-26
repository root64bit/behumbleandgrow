export type CanonicalPlacementStatus =
  | 'not_started'
  | 'awaiting_candidate_action'
  | 'documents_in_progress'
  | 'employer_processing'
  | 'work_permit_in_progress'
  | 'visa_in_progress'
  | 'medical_in_progress'
  | 'travel_preparation'
  | 'accommodation_preparation'
  | 'onboarding_in_progress'
  | 'completed'
  | 'paused'
  | 'cancelled'
  | 'unsuccessful';

export interface PlacementStatusInfo {
  label: string;
  badgeVariant: 'secondary' | 'outline' | 'amber' | 'emerald' | 'rose' | 'indigo';
  description: string;
}

export function resolvePlacementStatusInfo(rawStatus?: string | null): PlacementStatusInfo {
  if (!rawStatus) {
    return {
      label: 'Status Being Updated',
      badgeVariant: 'outline',
      description: 'Placement progress is currently being updated by the placement team.',
    };
  }

  const status = rawStatus.toLowerCase().trim();

  switch (status) {
    case 'not_started':
      return {
        label: 'Not Started',
        badgeVariant: 'outline',
        description: 'Placement initiation is pending offer acceptance confirmation.',
      };
    case 'awaiting_candidate_action':
      return {
        label: 'Action Required',
        badgeVariant: 'amber',
        description: 'Your action or document submission is required to proceed.',
      };
    case 'documents_in_progress':
      return {
        label: 'Documents in Progress',
        badgeVariant: 'secondary',
        description: 'Required candidate dossier documents are currently under review.',
      };
    case 'employer_processing':
      return {
        label: 'Employer Processing',
        badgeVariant: 'secondary',
        description: 'Employer onboarding and legal formalities are being prepared.',
      };
    case 'work_permit_in_progress':
    case 'work_permit_submitted':
      return {
        label: 'Work Permit in Progress',
        badgeVariant: 'indigo',
        description: 'Application submitted to UAE MOHRE. Awaiting authority response.',
      };
    case 'visa_in_progress':
    case 'visa_submitted':
      return {
        label: 'Visa Process in Progress',
        badgeVariant: 'indigo',
        description: 'Entry permit application is being processed by UAE Immigration.',
      };
    case 'medical_in_progress':
      return {
        label: 'Medical Process in Progress',
        badgeVariant: 'secondary',
        description: 'Medical appointment or health verification is underway.',
      };
    case 'travel_preparation':
      return {
        label: 'Travel Preparation',
        badgeVariant: 'emerald',
        description: 'Flight ticketing and arrival details are being coordinated.',
      };
    case 'accommodation_preparation':
      return {
        label: 'Accommodation Preparation',
        badgeVariant: 'emerald',
        description: 'Housing arrangements and move-in details are being finalized.',
      };
    case 'onboarding_in_progress':
      return {
        label: 'Employer Onboarding',
        badgeVariant: 'emerald',
        description: 'Final arrival reception and employer orientation are scheduled.',
      };
    case 'completed':
      return {
        label: 'Placement Completed',
        badgeVariant: 'emerald',
        description: 'Placement, arrival, and employer onboarding successfully completed.',
      };
    case 'paused':
      return {
        label: 'Paused',
        badgeVariant: 'amber',
        description: 'Placement processing is temporarily paused.',
      };
    case 'cancelled':
    case 'unsuccessful':
      return {
        label: 'Closed',
        badgeVariant: 'rose',
        description: 'Placement file is no longer active.',
      };
    default:
      return {
        label: 'Status Being Updated',
        badgeVariant: 'outline',
        description: 'Placement progress is currently being updated by the placement team.',
      };
  }
}
