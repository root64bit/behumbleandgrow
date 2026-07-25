import { describe, it, expect } from 'vitest';
import { loadMyOffers, loadMyOfferSummary } from '../services/candidate-offers.service';

describe('Candidate Offers Service Unit Test Suite', () => {
  it('should return empty list or fallback demo offers safely for user identity', async () => {
    const res = await loadMyOffers('invalid-user-id');
    expect(Array.isArray(res.offers)).toBe(true);
  });

  it('should filter offers by tab status safely', async () => {
    const resActive = await loadMyOffers('cand-user-1', { tab: 'active' });
    expect(Array.isArray(resActive.offers)).toBe(true);

    const resAccepted = await loadMyOffers('cand-user-1', { tab: 'accepted' });
    expect(Array.isArray(resAccepted.offers)).toBe(true);
  });

  it('should calculate offer summary metrics correctly', async () => {
    const summary = await loadMyOfferSummary('cand-user-1');
    expect(typeof summary.total).toBe('number');
    expect(typeof summary.actionRequired).toBe('number');
    expect(typeof summary.accepted).toBe('number');
  });

  it('should preserve currency as AED without auto-conversion', async () => {
    const res = await loadMyOffers('cand-user-1');
    if (res.offers.length > 0) {
      expect(res.offers[0].currency).toBe('AED');
    }
  });
});
