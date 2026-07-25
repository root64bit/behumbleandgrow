import { describe, it, expect } from 'vitest';
import { calculateOfferExpiry } from '../lib/candidate/offerExpiry';

describe('Offer Expiry Calculation Unit Test Suite', () => {
  const refTime = new Date('2026-07-25T12:00:00Z').getTime();

  it('should identify future valid expiry (> 72 hours)', () => {
    const res = calculateOfferExpiry('2026-08-05T23:59:59Z', refTime);
    expect(res.state).toBe('valid');
    expect(res.isExpired).toBe(false);
  });

  it('should identify expiring soon within 72 hours', () => {
    const res = calculateOfferExpiry('2026-07-27T12:00:00Z', refTime);
    expect(res.state).toBe('expiring_soon');
    expect(res.isExpired).toBe(false);
  });

  it('should identify same-day expiry', () => {
    const res = calculateOfferExpiry('2026-07-25T18:00:00Z', refTime);
    expect(res.state).toBe('expires_today');
    expect(res.isExpired).toBe(false);
  });

  it('should identify expired offer in the past', () => {
    const res = calculateOfferExpiry('2026-07-20T00:00:00Z', refTime);
    expect(res.state).toBe('expired');
    expect(res.isExpired).toBe(true);
  });

  it('should handle null or invalid expiry date safely', () => {
    const res = calculateOfferExpiry(null, refTime);
    expect(res.state).toBe('unknown');
    expect(res.isExpired).toBe(false);
  });
});
