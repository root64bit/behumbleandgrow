import { describe, it, expect } from 'vitest';
import {
  getApplicationStatusLabel,
  getApplicationStageIndex,
  getApplicationProgressPercentage,
  resolveCandidateEmployerDisplay,
  isApplicationActive,
} from '../lib/candidate/applicationStatus';
import type { CandidateStage } from '../lib/supabase/types';

describe('Application Status & Employer Disclosure Utility Suite', () => {
  it('should map canonical DB statuses to human-readable labels', () => {
    expect(getApplicationStatusLabel('submitted')).toBe('Submitted');
    expect(getApplicationStatusLabel('employer_submitted')).toBe('Submitted to Employer');
    expect(getApplicationStatusLabel('employer_interview')).toBe('Interview Scheduled');
    expect(getApplicationStatusLabel('offer_issued')).toBe('Conditional Offer');
    expect(getApplicationStatusLabel('rejected')).toBe('Not Selected');
    expect(getApplicationStatusLabel('unknown_status_xyz')).toBe('Status being updated');
  });

  it('should calculate 8-stage progress percentage accurately', () => {
    expect(getApplicationStageIndex('registered')).toBe(1);
    expect(getApplicationProgressPercentage('registered')).toBe(13); // 1/8

    expect(getApplicationStageIndex('employer_submitted')).toBe(5);
    expect(getApplicationProgressPercentage('employer_submitted')).toBe(63); // 5/8

    expect(getApplicationStageIndex('placed')).toBe(8);
    expect(getApplicationProgressPercentage('placed')).toBe(100); // 8/8
  });

  it('should enforce employer disclosure rules before stage 5', () => {
    const earlyApp = {
      stage: 'eligibility_passed' as CandidateStage,
      jobs: { employers: { organisations: { name: 'Secret Tech LLC' } } },
    };
    expect(resolveCandidateEmployerDisplay(earlyApp)).toBe('Approved UAE Employer');

    const lateApp = {
      stage: 'employer_submitted' as CandidateStage,
      jobs: { employers: { organisations: { name: 'Horizon Gulf Services LLC' } } },
    };
    expect(resolveCandidateEmployerDisplay(lateApp)).toBe('Horizon Gulf Services LLC');
  });

  it('should distinguish active vs closed applications', () => {
    expect(isApplicationActive('submitted')).toBe(true);
    expect(isApplicationActive('employer_interview')).toBe(true);
    expect(isApplicationActive('rejected')).toBe(false);
    expect(isApplicationActive('withdrawn')).toBe(false);
  });
});
