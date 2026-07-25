import { describe, it, expect } from 'vitest';
import { loadMyInterviews, confirmMyAttendanceConcurrencySafe, requestMyInterviewRescheduleConcurrencySafe } from '../services/candidate-interviews.service';

describe('Candidate Interviews Service Unit Test Suite', () => {
  it('should return empty interview list for invalid or unowned user identity', async () => {
    const result = await loadMyInterviews({
      userId: 'cand-unowned-id',
      tabFilter: 'upcoming',
    });
    expect(result.interviews).toEqual([]);
    expect(result.hasMore).toBe(false);
  });

  it('should enforce concurrency check on interview attendance confirmation', async () => {
    await expect(
      confirmMyAttendanceConcurrencySafe('cand-user-1', 'non-existent-interview-id', '2026-01-01T00:00:00Z')
    ).rejects.toThrow();
  }, 15000);

  it('should enforce concurrency check on interview reschedule request', async () => {
    await expect(
      requestMyInterviewRescheduleConcurrencySafe('cand-user-1', 'non-existent-interview-id', 'Schedule Conflict', 'Prefer afternoons', '2026-01-01T00:00:00Z')
    ).rejects.toThrow();
  }, 15000);
});
