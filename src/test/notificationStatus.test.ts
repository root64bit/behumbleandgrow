import { describe, it, expect } from 'vitest';
import { resolveNotificationStatus } from '../lib/candidate/notificationStatus';

describe('Candidate Notification Status Resolver', () => {
  it('resolves unread state correctly', () => {
    const res = resolveNotificationStatus({ readAt: null });
    expect(res.state).toBe('unread');
    expect(res.label).toBe('Unread');
  });

  it('resolves read state correctly', () => {
    const res = resolveNotificationStatus({ readAt: '2026-07-26T10:00:00Z' });
    expect(res.state).toBe('read');
    expect(res.label).toBe('Read');
  });

  it('resolves archived state', () => {
    const res = resolveNotificationStatus({ archivedAt: '2026-07-26T10:00:00Z' });
    expect(res.state).toBe('archived');
    expect(res.label).toBe('Archived');
  });

  it('resolves retracted state over other states', () => {
    const res = resolveNotificationStatus({
      readAt: null,
      isRetracted: true,
    });
    expect(res.state).toBe('retracted');
    expect(res.label).toBe('Retracted');
  });

  it('resolves expired state when expiresAt is in the past', () => {
    const res = resolveNotificationStatus({
      expiresAt: '2020-01-01T00:00:00Z',
    });
    expect(res.state).toBe('expired');
    expect(res.label).toBe('Action Expired');
  });

  it('resolves action_required when unread and action required', () => {
    const res = resolveNotificationStatus({
      readAt: null,
      isActionRequired: true,
    });
    expect(res.state).toBe('action_required');
    expect(res.label).toBe('Action Required');
  });
});
