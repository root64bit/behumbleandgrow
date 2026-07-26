import { describe, it, expect } from 'vitest';
import { parseInterviewStatus, getInterviewStatusDetails } from '../lib/candidate/interviewStatus';

describe('Interview Status Model Suite', () => {
  it('should correctly parse canonical interview statuses', () => {
    expect(parseInterviewStatus('confirmed')).toBe('confirmed');
    expect(parseInterviewStatus('action_required')).toBe('awaiting_candidate_confirmation');
    expect(parseInterviewStatus('reschedule_requested')).toBe('reschedule_requested');
    expect(parseInterviewStatus('completed')).toBe('completed');
    expect(parseInterviewStatus('invalid_status')).toBe('unknown');
  });

  it('should return correct badge styles and action flags', () => {
    const actionReq = getInterviewStatusDetails('awaiting_candidate_confirmation');
    expect(actionReq.isActionRequired).toBe(true);
    expect(actionReq.canConfirm).toBe(true);

    const confirmed = getInterviewStatusDetails('confirmed');
    expect(confirmed.isActionRequired).toBe(false);
    expect(confirmed.canJoin).toBe(true);
  });
});
