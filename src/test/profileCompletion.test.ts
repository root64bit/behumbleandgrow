import { describe, it, expect } from 'vitest';
import { calculateProfileCompletion } from '../lib/candidate/profileCompletion';

describe('calculateProfileCompletion utility', () => {
  it('returns 0% for an empty profile input', () => {
    const res = calculateProfileCompletion({});
    expect(res.percentage).toBe(0);
    expect(res.completedSectionsCount).toBe(0);
    expect(res.totalSectionsCount).toBe(8);
  });

  it('calculates partial completion when required sections are partially filled', () => {
    const res = calculateProfileCompletion({
      fullName: 'Amina Mabote',
      countryCode: 'MZ',
      headline: 'Hospitality Lead',
    });
    // Personal (15) + Summary (15) = 30 / 100 = 30%
    expect(res.percentage).toBe(30);
    expect(res.completedSectionsCount).toBe(2);
  });

  it('returns 100% when all profile sections are completed', () => {
    const res = calculateProfileCompletion({
      fullName: 'Alexander Chen',
      phone: '+971 50 123 4567',
      countryCode: 'AE',
      headline: 'Senior UX Designer',
      bio: 'Experienced product designer with 8+ years experience.',
      currentLocation: 'Dubai, UAE',
      skills: ['UX Design', 'Figma', 'User Research'],
      languages: ['English', 'Mandarin'],
      workExperiences: [{ id: 'exp-1', company_name: 'GlobalPay' }],
      educations: [{ id: 'edu-1', degree: 'B.S.' }],
      preferredLocation: 'Dubai',
    });
    expect(res.percentage).toBe(100);
    expect(res.completedSectionsCount).toBe(8);
  });

  it('distinguishes information completeness from document readiness or verification', () => {
    // Verified status/documents should not affect info completion calculation
    const resWithoutDocs = calculateProfileCompletion({
      fullName: 'Amina Mabote',
      phone: '+258 84 123 4567',
      countryCode: 'MZ',
      headline: 'F&B Captain',
    });
    expect(resWithoutDocs.percentage).toBeGreaterThan(0);
  });
});
