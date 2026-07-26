export type CandidateSupportCategory =
  | 'application'
  | 'profile'
  | 'document'
  | 'interview'
  | 'offer'
  | 'placement'
  | 'payment'
  | 'account'
  | 'technical'
  | 'general';

export interface SupportCategoryInfo {
  key: CandidateSupportCategory;
  label: string;
  description: string;
  iconName: string;
}

export const CANONICAL_SUPPORT_CATEGORIES: Record<CandidateSupportCategory, SupportCategoryInfo> = {
  application: {
    key: 'application',
    label: 'Applications',
    description: 'Inquiries about your job application status or review process.',
    iconName: 'Briefcase',
  },
  profile: {
    key: 'profile',
    label: 'Profile',
    description: 'Questions about your CV, contact details, or experience.',
    iconName: 'User',
  },
  document: {
    key: 'document',
    label: 'Documents',
    description: 'Help with Document Vault uploads or verification requirements.',
    iconName: 'FileCheck',
  },
  interview: {
    key: 'interview',
    label: 'Interview',
    description: 'Support for employer video interviews or schedule adjustments.',
    iconName: 'Calendar',
  },
  offer: {
    key: 'offer',
    label: 'Conditional Offer',
    description: 'Clarification on offer terms, salary currency, or decision windows.',
    iconName: 'Award',
  },
  placement: {
    key: 'placement',
    label: 'Placement & Relocation',
    description: 'Assistance with UAE MOHRE work permits, visa, travel or onboarding.',
    iconName: 'Plane',
  },
  payment: {
    key: 'payment',
    label: 'Payment',
    description: 'Inquiries regarding payment receipts or fee policies.',
    iconName: 'CreditCard',
  },
  account: {
    key: 'account',
    label: 'Account',
    description: 'Password reset, security verification, or login issues.',
    iconName: 'Shield',
  },
  technical: {
    key: 'technical',
    label: 'Technical Issue',
    description: 'Portal display errors, audio/video test issues, or bugs.',
    iconName: 'Wrench',
  },
  general: {
    key: 'general',
    label: 'General Support',
    description: 'General candidate questions or candidate officer guidance.',
    iconName: 'HelpCircle',
  },
};

export function resolveSupportCategoryLabel(category?: string | null): string {
  if (!category) return 'General Support';
  const norm = category.toLowerCase().trim();
  if (norm in CANONICAL_SUPPORT_CATEGORIES) {
    return CANONICAL_SUPPORT_CATEGORIES[norm as CandidateSupportCategory].label;
  }
  return 'General Support';
}
