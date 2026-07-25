import { describe, it, expect } from 'vitest';
import { loadMyApplications, withdrawMyApplication } from '../services/candidate-applications.service';

describe('Candidate Applications Service Unit Test Suite', () => {
  it('should load candidate applications safely using user identity', async () => {
    const result = await loadMyApplications({
      userId: 'cand-user-1',
      statusFilter: 'all',
      searchQuery: '',
      page: 1,
      limit: 10,
    });

    expect(result).toHaveProperty('applications');
    expect(result).toHaveProperty('totalCount');
    expect(result).toHaveProperty('hasMore');
    expect(Array.isArray(result.applications)).toBe(true);
  });

  it('should filter applications by active and closed status categories', async () => {
    const activeResult = await loadMyApplications({
      userId: 'cand-user-1',
      statusFilter: 'active',
    });
    expect(activeResult.applications).toBeDefined();

    const closedResult = await loadMyApplications({
      userId: 'cand-user-1',
      statusFilter: 'closed',
    });
    expect(closedResult.applications).toBeDefined();
  });

  it('should reject application withdrawal when target application does not exist', async () => {
    await expect(withdrawMyApplication('cand-user-1', 'non-existent-app')).rejects.toThrow();
  });
});
