import { describe, it, expect, vi } from 'vitest';
import { CandidateAccountSettingsService } from '../services/candidate-account-settings.service';
import { supabase } from '../lib/supabase/client';

describe('Candidate Account Settings Service Unit Test Suite', () => {
  it('1. Returns null when user is unauthenticated', async () => {
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValueOnce({
      data: { user: null },
      error: null,
    } as any);

    const result = await CandidateAccountSettingsService.loadMyAccountSettings();
    expect(result).toBeNull();
  });

  it('2. Rejects password update requests shorter than 8 characters', async () => {
    await expect(CandidateAccountSettingsService.requestMyPasswordChange('12345')).rejects.toThrow(
      'Password must be at least 8 characters long.'
    );
  });
});
