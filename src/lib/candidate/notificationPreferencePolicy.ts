import { CandidateNotificationCategory, CANONICAL_NOTIFICATION_CATEGORIES } from './notificationCategory';

export interface CategoryPolicy {
  category: CandidateNotificationCategory;
  isMandatoryInApp: boolean;
  isMandatoryEmail: boolean;
  canDisablePush: boolean;
  canDisableEmail: boolean;
  description: string;
}

export const CATEGORY_NOTIFICATION_POLICIES: Record<CandidateNotificationCategory, CategoryPolicy> = {
  account: {
    category: 'account',
    isMandatoryInApp: true,
    isMandatoryEmail: true,
    canDisablePush: false,
    canDisableEmail: false,
    description: CANONICAL_NOTIFICATION_CATEGORIES.account.description,
  },
  system: {
    category: 'system',
    isMandatoryInApp: true,
    isMandatoryEmail: true,
    canDisablePush: false,
    canDisableEmail: false,
    description: CANONICAL_NOTIFICATION_CATEGORIES.system.description,
  },
  interview: {
    category: 'interview',
    isMandatoryInApp: true,
    isMandatoryEmail: true,
    canDisablePush: true,
    canDisableEmail: false,
    description: CANONICAL_NOTIFICATION_CATEGORIES.interview.description,
  },
  offer: {
    category: 'offer',
    isMandatoryInApp: true,
    isMandatoryEmail: true,
    canDisablePush: true,
    canDisableEmail: false,
    description: CANONICAL_NOTIFICATION_CATEGORIES.offer.description,
  },
  placement: {
    category: 'placement',
    isMandatoryInApp: true,
    isMandatoryEmail: true,
    canDisablePush: true,
    canDisableEmail: false,
    description: CANONICAL_NOTIFICATION_CATEGORIES.placement.description,
  },
  document: {
    category: 'document',
    isMandatoryInApp: true,
    isMandatoryEmail: false,
    canDisablePush: true,
    canDisableEmail: true,
    description: CANONICAL_NOTIFICATION_CATEGORIES.document.description,
  },
  support: {
    category: 'support',
    isMandatoryInApp: true,
    isMandatoryEmail: false,
    canDisablePush: true,
    canDisableEmail: true,
    description: CANONICAL_NOTIFICATION_CATEGORIES.support.description,
  },
  application: {
    category: 'application',
    isMandatoryInApp: true,
    isMandatoryEmail: false,
    canDisablePush: true,
    canDisableEmail: true,
    description: CANONICAL_NOTIFICATION_CATEGORIES.application.description,
  },
  profile: {
    category: 'profile',
    isMandatoryInApp: true,
    isMandatoryEmail: false,
    canDisablePush: true,
    canDisableEmail: true,
    description: CANONICAL_NOTIFICATION_CATEGORIES.profile.description,
  },
};

export function isChannelToggleable(category: CandidateNotificationCategory, channel: 'in_app' | 'push' | 'email'): boolean {
  const policy = CATEGORY_NOTIFICATION_POLICIES[category];
  if (!policy) return true;

  if (channel === 'in_app') {
    return !policy.isMandatoryInApp;
  }
  if (channel === 'email') {
    return policy.canDisableEmail;
  }
  if (channel === 'push') {
    return policy.canDisablePush;
  }
  return true;
}
