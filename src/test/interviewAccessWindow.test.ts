import { describe, it, expect } from 'vitest';
import { calculateInterviewAccessWindow } from '../lib/candidate/interviewAccessWindow';

describe('Interview Access Window Calculator Suite', () => {
  const startISO = '2026-07-30T10:00:00Z'; // 10:00 UTC

  it('should return available_soon if current time is more than 15 min prior to interview', () => {
    const fakeNow = new Date('2026-07-30T09:30:00Z'); // 30 min before
    const info = calculateInterviewAccessWindow(startISO, 30, true, false, fakeNow);
    expect(info.state).toBe('available_soon');
    expect(info.canClick).toBe(false);
  });

  it('should return available_now when within 15 min prior to interview start', () => {
    const fakeNow = new Date('2026-07-30T09:50:00Z'); // 10 min before
    const info = calculateInterviewAccessWindow(startISO, 30, true, false, fakeNow);
    expect(info.state).toBe('available_now');
    expect(info.canClick).toBe(true);
  });

  it('should return access_closed after interview duration plus grace period', () => {
    const fakeNow = new Date('2026-07-30T11:15:00Z'); // 75 min after start (> 30+30 grace)
    const info = calculateInterviewAccessWindow(startISO, 30, true, false, fakeNow);
    expect(info.state).toBe('access_closed');
    expect(info.canClick).toBe(false);
  });
});
