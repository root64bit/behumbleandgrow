import { describe, it, expect } from 'vitest';
import { resolveSupportStatus } from '../lib/candidate/supportStatus';

describe('Candidate Support Status Resolver', () => {
  it('resolves awaiting_candidate state when candidate action is required', () => {
    const res = resolveSupportStatus({ status: 'open', isCandidateActionRequired: true });
    expect(res.state).toBe('awaiting_candidate');
    expect(res.label).toBe('Your Response Required');
    expect(res.isActionRequired).toBe(true);
  });

  it('resolves submitted / open state', () => {
    const res = resolveSupportStatus({ status: 'submitted' });
    expect(res.state).toBe('open');
    expect(res.label).toBe('Awaiting Support');
  });

  it('resolves in_progress state', () => {
    const res = resolveSupportStatus({ status: 'in_progress' });
    expect(res.state).toBe('in_progress');
    expect(res.label).toBe('Support Reviewing');
  });

  it('resolves reopened state', () => {
    const res = resolveSupportStatus({ status: 'reopened' });
    expect(res.state).toBe('open');
    expect(res.label).toBe('Reopened');
  });

  it('resolves resolved state', () => {
    const res = resolveSupportStatus({ status: 'resolved' });
    expect(res.state).toBe('resolved');
    expect(res.label).toBe('Resolved');
  });

  it('resolves closed state', () => {
    const res = resolveSupportStatus({ status: 'closed' });
    expect(res.state).toBe('closed');
    expect(res.label).toBe('Closed');
  });

  it('falls back safely for unknown status', () => {
    const res = resolveSupportStatus({ status: 'internal_investigation_pending' });
    expect(res.state).toBe('unknown');
    expect(res.label).toBe('Status Being Updated');
  });
});
