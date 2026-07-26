import type { Application, CandidateStage } from '../supabase/types';

export interface CandidateNextAction {
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'normal' | 'info';
  route: string;
  buttonText: string;
}

export function resolveCandidateNextAction(
  application: Partial<Application> & { id: string; action_required_message?: string | null }
): CandidateNextAction {
  const { stage, action_required_message, id } = application;

  if (action_required_message) {
    return {
      title: 'Action Required',
      description: action_required_message,
      priority: 'urgent',
      route: '/candidate/documents',
      buttonText: 'Upload Document',
    };
  }

  const stageStr = (stage as string) || '';

  switch (stageStr) {
    case 'employer_interview':
      return {
        title: 'Interview Scheduled',
        description: 'Confirm attendance and review UAE interview preparation guide.',
        priority: 'high',
        route: `/candidate/interviews`,
        buttonText: 'Review Interview Details',
      };

    case 'offer_issued':
      return {
        title: 'Conditional Offer Received',
        description: 'Review salary breakdown, benefit details and contract terms.',
        priority: 'high',
        route: `/candidate/offers`,
        buttonText: 'Respond to Offer',
      };

    case 'onboarding':
      return {
        title: 'Upload Verification Documents',
        description: 'Upload your International Passport or National ID to complete dossier.',
        priority: 'high',
        route: '/candidate/documents',
        buttonText: 'Upload Documents',
      };

    case 'registered':
    case 'submitted':
    case 'employer_submitted':
      return {
        title: 'Application Submitted',
        description: 'Dossier undergoing preliminary operations review.',
        priority: 'info',
        route: `/candidate/applications/${id}`,
        buttonText: 'View Details',
      };

    default:
      return {
        title: 'Application Under Review',
        description: 'Track ongoing review progress and updates.',
        priority: 'info',
        route: `/candidate/applications/${id}`,
        buttonText: 'View Details',
      };
  }
}
