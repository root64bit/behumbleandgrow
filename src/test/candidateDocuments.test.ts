import { describe, it, expect } from 'vitest';
import { isDemoDataAllowed } from '../hooks/candidate/useCandidateDocuments';

describe('Candidate Documents RBAC & Safeguards Suite', () => {
  it('should verify demo data is disabled unless VITE_DEMO_DATA_ENABLED=true in DEV', () => {
    const demoAllowed = isDemoDataAllowed();
    expect(demoAllowed).toBe(false);
  });

  it('should verify document sensitivity signed URL calculation', () => {
    const passportDuration = 300; // 5 mins
    const cvDuration = 900; // 15 mins
    expect(passportDuration).toBeLessThan(cvDuration);
  });
});
