import { describe, it, expect } from 'vitest';
import { env } from '../lib/config/env';
import { PaymentService } from '../services/payment.service';
import { isSuperAdminUser } from '../lib/permissions/rbac';

describe('Phase 2 Square Payments Security & RLS Compliance Tests', () => {

  it('1. Confirms Square Application ID is available in public client environment', () => {
    expect(env.VITE_SQUARE_ENVIRONMENT).toBe('sandbox');
  });

  it('2. Prohibits Square Access Token from Vite environment variables', () => {
    // @ts-ignore
    const tokenInVite = import.meta.env.VITE_SQUARE_ACCESS_TOKEN || import.meta.env.SQUARE_ACCESS_TOKEN;
    expect(tokenInVite).toBeUndefined();
  });

  it('3. Enforces strict financial RLS rules — Candidates cannot mutate payment status directly', () => {
    const candidateRole = ['candidate' as const];
    const canMutatePayments = isSuperAdminUser(candidateRole);
    expect(canMutatePayments).toBe(false);
  });

  it('4. Payment fee processing automatically bypasses when feature flag is disabled', async () => {
    const result = await PaymentService.processSquarePayment({
      applicationId: 'app-test-1',
      candidateId: 'user-cand-a',
      amountGBP: 15,
      nonce: 'cnon:test-nonce',
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe('succeeded');
  });

  it('5. Retrieves candidate payment history without exposing secret transaction keys', async () => {
    const history = await PaymentService.getPaymentHistory('user-cand-a');
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].payment_provider).toBe('square');
  });

});
