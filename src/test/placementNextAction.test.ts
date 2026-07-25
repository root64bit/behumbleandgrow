import { describe, it, expect } from 'vitest';
import { resolveNextActionPriority, PlacementCandidateAction } from '../lib/candidate/placementNextAction';

describe('Candidate Placement Next Action Resolver', () => {
  it('prioritizes document replacement over general acknowledgements', () => {
    const actions: PlacementCandidateAction[] = [
      {
        id: 'a1',
        placementId: 'p1',
        actionType: 'acknowledge_onboarding',
        title: 'Review Onboarding',
        description: 'Read instructions',
        status: 'pending',
        version: 1,
      },
      {
        id: 'a2',
        placementId: 'p1',
        actionType: 'replace_document',
        title: 'Replace Passport',
        description: 'Uploaded copy was unreadable',
        status: 'pending',
        version: 1,
      },
    ];

    const next = resolveNextActionPriority(actions);
    expect(next).not.toBeNull();
    expect(next?.id).toBe('a2');
    expect(next?.actionType).toBe('replace_document');
  });

  it('returns null when no pending actions remain', () => {
    const actions: PlacementCandidateAction[] = [
      {
        id: 'a1',
        placementId: 'p1',
        actionType: 'confirm_personal_info',
        title: 'Personal Info',
        description: 'Confirmed',
        status: 'completed',
        version: 2,
      },
    ];

    const next = resolveNextActionPriority(actions);
    expect(next).toBeNull();
  });
});
