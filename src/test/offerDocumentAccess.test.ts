import { describe, it, expect } from 'vitest';
import { requestMyOfferDocumentAccess } from '../services/candidate-offer-details.service';

describe('Offer Document Access Level 3 Security Test Suite', () => {
  it('should deny secure document access for invalid or unowned offer ID', async () => {
    await expect(requestMyOfferDocumentAccess('cand-user-1', 'unowned-offer-999')).rejects.toThrow();
  });

  it('should generate short-lived signed URL or blob preview for owned offer', async () => {
    const res = await requestMyOfferDocumentAccess('cand-user-1', 'ofr-demo-1');
    expect(res.signedUrl).toBeTruthy();
    expect(res.expiresAt).toBeTruthy();
  });
});
