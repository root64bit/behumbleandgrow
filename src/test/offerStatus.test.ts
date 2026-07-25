import { describe, it, expect } from 'vitest';
import { getOfferStatusConfig, getCandidateDecisionConfig } from '../lib/candidate/offerStatus';

describe('Offer Status & Decision Model Unit Test Suite', () => {
  it('should map sent_to_candidate status to active category with green badge', () => {
    const config = getOfferStatusConfig('sent_to_candidate');
    expect(config.label).toBe('Available for Review');
    expect(config.category).toBe('active');
  });

  it('should map accepted status to accepted category', () => {
    const config = getOfferStatusConfig('accepted');
    expect(config.label).toBe('Accepted');
    expect(config.category).toBe('accepted');
  });

  it('should map expired status to historical category', () => {
    const config = getOfferStatusConfig('expired');
    expect(config.label).toBe('Expired');
    expect(config.category).toBe('historical');
  });

  it('should fallback unknown status gracefully without crashing', () => {
    const config = getOfferStatusConfig('unknown_custom_status_xyz');
    expect(config.label).toBe('Status Being Updated');
    expect(config.category).toBe('historical');
  });

  it('should format candidate decision badges correctly', () => {
    const dec = getCandidateDecisionConfig('accepted');
    expect(dec.label).toBe('Decision: Accepted');
  });
});
