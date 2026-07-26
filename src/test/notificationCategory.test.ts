import { describe, it, expect } from 'vitest';
import { resolveNotificationCategoryLabel, CANONICAL_NOTIFICATION_CATEGORIES } from '../lib/candidate/notificationCategory';

describe('Candidate Notification Category Helper', () => {
  it('resolves all 9 canonical category labels', () => {
    expect(resolveNotificationCategoryLabel('application')).toBe('Applications');
    expect(resolveNotificationCategoryLabel('document')).toBe('Documents');
    expect(resolveNotificationCategoryLabel('interview')).toBe('Interviews');
    expect(resolveNotificationCategoryLabel('offer')).toBe('Conditional Offers');
    expect(resolveNotificationCategoryLabel('placement')).toBe('Placement and Relocation');
    expect(resolveNotificationCategoryLabel('profile')).toBe('Profile');
    expect(resolveNotificationCategoryLabel('support')).toBe('Support');
    expect(resolveNotificationCategoryLabel('account')).toBe('Account');
    expect(resolveNotificationCategoryLabel('system')).toBe('System');
  });

  it('falls back to "General update" for unknown or empty categories', () => {
    expect(resolveNotificationCategoryLabel(null)).toBe('General update');
    expect(resolveNotificationCategoryLabel(undefined)).toBe('General update');
    expect(resolveNotificationCategoryLabel('')).toBe('General update');
    expect(resolveNotificationCategoryLabel('fraud_review')).toBe('General update');
    expect(resolveNotificationCategoryLabel('partner_sla')).toBe('General update');
  });

  it('contains correct metadata for canonical categories', () => {
    expect(CANONICAL_NOTIFICATION_CATEGORIES.placement.iconName).toBe('Plane');
    expect(CANONICAL_NOTIFICATION_CATEGORIES.interview.iconName).toBe('Calendar');
  });
});
