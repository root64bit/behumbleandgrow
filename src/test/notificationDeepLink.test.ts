import { describe, it, expect } from 'vitest';
import { resolveCandidateNotificationRoute } from '../lib/candidate/notificationDeepLink';

describe('Candidate Notification Deep Link Allowlist', () => {
  it('resolves valid application deep link', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'application',
      entityType: 'application',
      entityId: 'app-101-uuid',
    });
    expect(res.isSupported).toBe(true);
    expect(res.route).toBe('/candidate/applications/app-101-uuid');
    expect(res.label).toBe('View Application');
  });

  it('resolves document vault route', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'document',
      entityType: 'document',
    });
    expect(res.isSupported).toBe(true);
    expect(res.route).toBe('/candidate/documents');
  });

  it('resolves valid interview deep link', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'interview',
      entityType: 'interview',
      entityId: 'int-202-uuid',
    });
    expect(res.isSupported).toBe(true);
    expect(res.route).toBe('/candidate/interviews/int-202-uuid');
  });

  it('resolves valid offer deep link', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'offer',
      entityType: 'offer',
      entityId: 'off-303-uuid',
    });
    expect(res.isSupported).toBe(true);
    expect(res.route).toBe('/candidate/offers/off-303-uuid');
  });

  it('resolves placement route', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'placement',
      entityType: 'placement',
    });
    expect(res.isSupported).toBe(true);
    expect(res.route).toBe('/candidate/placement');
  });

  it('strips malicious javascript: URLs and open redirect attempts', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'unknown' as any,
      rawActionUrl: 'javascript:alert(1)',
    });
    expect(res.isSupported).toBe(false);
    expect(res.route).toBe('/candidate/dashboard');
  });

  it('strips external domain URLs', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'system',
      rawActionUrl: 'https://malicious-site.com/steal-token',
    });
    expect(res.route).toBe('/candidate/dashboard');
  });

  it('strips path traversal attempts', () => {
    const res = resolveCandidateNotificationRoute({
      category: 'system',
      rawActionUrl: '/candidate/../../admin',
    });
    expect(res.route).toBe('/candidate/dashboard');
  });
});
