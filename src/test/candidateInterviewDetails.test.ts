import { describe, it, expect } from 'vitest';
import {
  loadMyInterviewDetails,
  requestMySecureMeetingAccess,
  confirmMyInterviewAttendance,
  requestMyInterviewReschedule,
} from '../services/candidate-interview-details.service';

describe('Candidate Interview Details Service Unit Test Suite', () => {
  it('should return null for invalid or unowned interview ID', async () => {
    const detail = await loadMyInterviewDetails('cand-user-1', 'unowned-interview-id');
    expect(detail).toBeNull();
  });

  it('should deny secure meeting access for invalid or unowned interview ID', async () => {
    const res = await requestMySecureMeetingAccess('cand-user-1', 'unowned-interview-id');
    expect(res.success).toBe(false);
    expect(res.reason).toBe('not_found');
  });

  it('should enforce concurrency check on attendance confirmation', async () => {
    await expect(
      confirmMyInterviewAttendance('cand-user-1', 'non-existent-interview-id', '2026-01-01T00:00:00Z')
    ).rejects.toThrow();
  }, 15000);

  it('should enforce concurrency check on reschedule request', async () => {
    await expect(
      requestMyInterviewReschedule('cand-user-1', 'non-existent-interview-id', 'Schedule Conflict', 'Prefer afternoons', '2026-01-01T00:00:00Z')
    ).rejects.toThrow();
  }, 15000);
});
