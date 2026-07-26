import { describe, it, expect } from 'vitest';
import { formatNotificationRelativeTime, formatNotificationAccessibleDate } from '../lib/candidate/notificationTime';

describe('Candidate Notification Time Formatter', () => {
  it('formats "Just now" for recent timestamps', () => {
    const now = new Date();
    expect(formatNotificationRelativeTime(now)).toBe('Just now');
  });

  it('formats minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatNotificationRelativeTime(date)).toBe('5m ago');
  });

  it('formats hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatNotificationRelativeTime(date)).toBe('3h ago');
  });

  it('formats Yesterday', () => {
    const date = new Date(Date.now() - 25 * 60 * 60 * 1000);
    expect(formatNotificationRelativeTime(date)).toBe('Yesterday');
  });

  it('handles invalid timestamp gracefully', () => {
    expect(formatNotificationRelativeTime('invalid-date')).toBe('Recently');
    expect(formatNotificationAccessibleDate('invalid-date')).toBe('');
  });
});
