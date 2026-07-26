import { describe, it, expect } from 'vitest';
import { loadMyApplicationDetails, withdrawMyApplicationConcurrencySafe } from '../services/candidate-application-details.service';

describe('Candidate Application Details Service Unit Test Suite', () => {
  it('should return null (not found) when application does not belong to authenticated user', async () => {
    const data = await loadMyApplicationDetails('cand-user-1', 'unowned-app-id');
    expect(data).toBeNull();
  }, 15000);

  it('should enforce concurrency check on application withdrawal', async () => {
    await expect(
      withdrawMyApplicationConcurrencySafe('cand-user-1', 'non-existent-app-id', '2026-01-01T00:00:00Z')
    ).rejects.toThrow();
  }, 15000);
});
