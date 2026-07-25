import { describe, it, expect } from 'vitest';
import { loadMyOfferDetails, loadMyOfferDecisionHistory } from '../services/candidate-offer-details.service';

describe('Candidate Offer Details Service Unit Test Suite', () => {
  it('should return null for non-existent or unowned offer ID', async () => {
    const res = await loadMyOfferDetails('cand-user-1', 'unowned-offer-999');
    expect(res).toBeNull();
  });

  it('should return decision history list safely for valid offer ID', async () => {
    const history = await loadMyOfferDecisionHistory('cand-user-1', 'ofr-demo-1');
    expect(Array.isArray(history)).toBe(true);
  });
});
