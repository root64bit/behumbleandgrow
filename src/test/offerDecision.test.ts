import { describe, it, expect } from 'vitest';
import { acceptMyOffer, declineMyOffer } from '../services/candidate-offer-details.service';

describe('Offer Decision & Concurrency Safeguards Unit Test Suite', () => {
  it('should deny acceptance when expected updated_at token is stale', async () => {
    const res = await acceptMyOffer('cand-user-1', 'ofr-demo-1', {
      declarationAcknowledged: true,
      typedSignature: 'Amina Mabote',
      expectedUpdatedAt: '2020-01-01T00:00:00Z',
    });

    expect(res.success).toBe(false);
    expect(res.conflict).toBe(true);
  });

  it('should deny acceptance if legal declarations are missing', async () => {
    await expect(
      acceptMyOffer('cand-user-1', 'ofr-demo-1', {
        declarationAcknowledged: false,
        typedSignature: 'Amina Mabote',
      })
    ).rejects.toThrow();
  });

  it('should deny decline when expected updated_at token is stale', async () => {
    const res = await declineMyOffer('cand-user-1', 'ofr-demo-1', {
      reasonCode: 'compensation_mismatch',
      expectedUpdatedAt: '2020-01-01T00:00:00Z',
    });

    expect(res.success).toBe(false);
    expect(res.conflict).toBe(true);
  });
});
