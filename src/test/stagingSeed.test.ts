import { describe, it, expect } from 'vitest';
import { getStagingTestUsers } from '../lib/auth/stagingSeed';

describe('Phase 1B Staging Seed Production Guard Test', () => {
  it('1. Returns staging test user definitions when running in test/staging environment', () => {
    const users = getStagingTestUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  it('2. Proves that production builds return empty staging test users array', () => {
    // Simulate PROD environment
    const originalProd = import.meta.env.PROD;
    try {
      // @ts-ignore
      import.meta.env.PROD = true;
      const prodUsers = getStagingTestUsers();
      expect(prodUsers.length).toBe(0);
    } finally {
      // @ts-ignore
      import.meta.env.PROD = originalProd;
    }
  });
});
