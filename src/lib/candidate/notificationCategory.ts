export type CandidateNotificationCategory =
  | 'application'
  | 'document'
  | 'interview'
  | 'offer'
  | 'placement'
  | 'profile'
  | 'support'
  | 'account'
  | 'system';

export interface NotificationCategoryConfig {
  key: CandidateNotificationCategory;
  label: string;
  description: string;
  iconName: string;
}

export const CANONICAL_NOTIFICATION_CATEGORIES: Record<CandidateNotificationCategory, NotificationCategoryConfig> = {
  application: {
    key: 'application',
    label: 'Applications',
    description: 'Updates on job application screening, submission, and status changes.',
    iconName: 'Briefcase',
  },
  document: {
    key: 'document',
    label: 'Documents',
    description: 'Vault verification requests, document approvals, and expiry alerts.',
    iconName: 'FileCheck',
  },
  interview: {
    key: 'interview',
    label: 'Interviews',
    description: 'Interview invitations, scheduling updates, and meeting access notices.',
    iconName: 'Calendar',
  },
  offer: {
    key: 'offer',
    label: 'Conditional Offers',
    description: 'Conditional job offer releases, term updates, and decision deadlines.',
    iconName: 'Award',
  },
  placement: {
    key: 'placement',
    label: 'Placement and Relocation',
    description: 'Work permit, entry permit, flight, and housing relocation milestones.',
    iconName: 'Plane',
  },
  profile: {
    key: 'profile',
    label: 'Profile',
    description: 'Candidate profile verification, headline, and credential updates.',
    iconName: 'User',
  },
  support: {
    key: 'support',
    label: 'Support',
    description: 'Placement officer chat messages and helpdesk ticket updates.',
    iconName: 'MessageSquare',
  },
  account: {
    key: 'account',
    label: 'Account',
    description: 'Security alerts, password changes, and account status notices.',
    iconName: 'Shield',
  },
  system: {
    key: 'system',
    label: 'System',
    description: 'Platform maintenance, terms of service, and system announcements.',
    iconName: 'Info',
  },
};

export function resolveNotificationCategoryLabel(rawCategory?: string | null): string {
  if (!rawCategory) return 'General update';
  const categoryKey = rawCategory.toLowerCase().trim() as CandidateNotificationCategory;
  const config = CANONICAL_NOTIFICATION_CATEGORIES[categoryKey];
  return config ? config.label : 'General update';
}
