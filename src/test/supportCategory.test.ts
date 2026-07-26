import { describe, it, expect } from 'vitest';
import { resolveSupportCategoryLabel, CANONICAL_SUPPORT_CATEGORIES } from '../lib/candidate/supportCategory';

describe('Candidate Support Category Helper', () => {
  it('resolves all 10 canonical category labels', () => {
    expect(resolveSupportCategoryLabel('application')).toBe('Applications');
    expect(resolveSupportCategoryLabel('profile')).toBe('Profile');
    expect(resolveSupportCategoryLabel('document')).toBe('Documents');
    expect(resolveSupportCategoryLabel('interview')).toBe('Interview');
    expect(resolveSupportCategoryLabel('offer')).toBe('Conditional Offer');
    expect(resolveSupportCategoryLabel('placement')).toBe('Placement & Relocation');
    expect(resolveSupportCategoryLabel('payment')).toBe('Payment');
    expect(resolveSupportCategoryLabel('account')).toBe('Account');
    expect(resolveSupportCategoryLabel('technical')).toBe('Technical Issue');
    expect(resolveSupportCategoryLabel('general')).toBe('General Support');
  });

  it('falls back to "General Support" for unknown or empty categories', () => {
    expect(resolveSupportCategoryLabel(null)).toBe('General Support');
    expect(resolveSupportCategoryLabel(undefined)).toBe('General Support');
    expect(resolveSupportCategoryLabel('')).toBe('General Support');
    expect(resolveSupportCategoryLabel('fraud_investigation')).toBe('General Support');
    expect(resolveSupportCategoryLabel('internal_escalation')).toBe('General Support');
  });

  it('contains valid icon metadata for canonical categories', () => {
    expect(CANONICAL_SUPPORT_CATEGORIES.placement.iconName).toBe('Plane');
    expect(CANONICAL_SUPPORT_CATEGORIES.interview.iconName).toBe('Calendar');
  });
});
