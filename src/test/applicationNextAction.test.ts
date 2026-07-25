import { describe, it, expect } from 'vitest';
import { resolveCandidateNextAction } from '../lib/candidate/applicationNextAction';

describe('Candidate Next-Action Resolver Suite', () => {
  it('should resolve urgent document action when action_required_message is set', () => {
    const app = {
      id: 'app-1',
      stage: 'onboarding' as any,
      status: 'submitted',
      action_required_message: 'Action Required: Upload missing passport',
    };

    const action = resolveCandidateNextAction(app);
    expect(action.title).toBe('Action Required');
    expect(action.priority).toBe('urgent');
    expect(action.buttonText).toBe('Upload Document');
    expect(action.route).toBe('/candidate/documents');
  });

  it('should resolve high priority interview action when stage is employer_interview', () => {
    const app = {
      id: 'app-2',
      stage: 'employer_interview' as any,
      status: 'interview_scheduled',
    };

    const action = resolveCandidateNextAction(app);
    expect(action.title).toBe('Interview Scheduled');
    expect(action.priority).toBe('high');
    expect(action.route).toBe('/candidate/interviews');
  });

  it('should resolve offer action when stage is offer_issued', () => {
    const app = {
      id: 'app-3',
      stage: 'offer_issued' as any,
      status: 'offer_issued',
    };

    const action = resolveCandidateNextAction(app);
    expect(action.title).toBe('Conditional Offer Received');
    expect(action.priority).toBe('high');
    expect(action.route).toBe('/candidate/offers');
  });

  it('should resolve default info action for standard submitted application', () => {
    const app = {
      id: 'app-4',
      stage: 'submitted' as any,
      status: 'submitted',
    };

    const action = resolveCandidateNextAction(app);
    expect(action.priority).toBe('info');
    expect(action.buttonText).toBe('View Details');
    expect(action.route).toBe('/candidate/applications/app-4');
  });
});
