import { describe, it, expect } from 'vitest';
import {
  validateIanaTimeZone,
  formatTimeZoneLabel,
  SUPPORTED_TIME_ZONES,
} from '../lib/candidate/timeZonePreference';

describe('Time Zone Preference Unit Test Suite', () => {
  it('1. Validates known IANA time zone identifiers', () => {
    expect(validateIanaTimeZone('Asia/Dubai')).toBe('Asia/Dubai');
    expect(validateIanaTimeZone('Africa/Maputo')).toBe('Africa/Maputo');
    expect(validateIanaTimeZone('Africa/Nairobi')).toBe('Africa/Nairobi');
  });

  it('2. Falls back safely to Asia/Dubai for invalid or missing IANA time zones', () => {
    expect(validateIanaTimeZone(null)).toBe('Asia/Dubai');
    expect(validateIanaTimeZone('')).toBe('Asia/Dubai');
    expect(validateIanaTimeZone('Invalid/Timezone')).toBe('Asia/Dubai');
  });

  it('3. Formats time zone labels with explicit UTC offsets', () => {
    const label = formatTimeZoneLabel('Asia/Dubai');
    expect(label).toContain('Dubai / Gulf Standard Time (GST)');
    expect(label).toContain('UTC+04:00');
  });
});
