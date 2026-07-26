import { describe, it, expect } from 'vitest';
import {
  CATEGORY_NOTIFICATION_POLICIES,
  isChannelToggleable,
} from '../lib/candidate/notificationPreferencePolicy';
import { CANONICAL_NOTIFICATION_CATEGORIES } from '../lib/candidate/notificationCategory';

describe('Notification Preference Policy Unit Test Suite', () => {
  it('1. Enforces mandatory in-app notifications across all active recruitment categories', () => {
    Object.keys(CANONICAL_NOTIFICATION_CATEGORIES).forEach((catKey) => {
      const cat = catKey as any;
      const policy = CATEGORY_NOTIFICATION_POLICIES[cat];
      expect(policy).toBeDefined();
      expect(policy.isMandatoryInApp).toBe(true);
      expect(isChannelToggleable(cat, 'in_app')).toBe(false);
    });
  });

  it('2. Denies disabling email for account, system, interview, offer, and placement categories', () => {
    const mandatoryEmailCategories = ['account', 'system', 'interview', 'offer', 'placement'];
    mandatoryEmailCategories.forEach((cat) => {
      expect(isChannelToggleable(cat as any, 'email')).toBe(false);
    });
  });

  it('3. Allows toggling optional push and email channels for application, profile, support, and document categories', () => {
    expect(isChannelToggleable('application', 'push')).toBe(true);
    expect(isChannelToggleable('application', 'email')).toBe(true);
    expect(isChannelToggleable('support', 'email')).toBe(true);
    expect(isChannelToggleable('document', 'email')).toBe(true);
  });
});
