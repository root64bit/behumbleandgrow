import { describe, it, expect } from 'vitest';
import { formatDualInterviewTime } from '../lib/candidate/interviewTime';

describe('Interview Time-Zone Formatter Suite', () => {
  it('should format UTC timestamp into both Candidate Local Time and UAE Asia/Dubai time', () => {
    // 2026-07-30T10:00:00Z = 14:00 GST in Dubai (UTC+4)
    const result = formatDualInterviewTime('2026-07-30T10:00:00Z', 'Africa/Maputo');

    expect(result.dateString).toContain('30 July 2026');
    expect(result.candidateLocalTime).toBe('12:00 PM'); // UTC+2 (Maputo)
    expect(result.uaeTime).toBe('02:00 PM'); // UTC+4 (Dubai)
    expect(result.uaeTimeZoneLabel).toBe('UAE time — Asia/Dubai');
    expect(result.isBrowserFallback).toBe(false);
  });

  it('should flag browser fallback when candidate profile time zone is omitted', () => {
    const result = formatDualInterviewTime('2026-07-30T10:00:00Z', null);
    expect(result.isBrowserFallback).toBe(true);
  });
});
