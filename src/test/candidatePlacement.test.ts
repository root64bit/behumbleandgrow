import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CandidatePlacementService } from '../services/candidate-placement.service';
import { maskWorkPermitReference, maskVisaReference, maskPassportNumber } from '../lib/candidate/placementReferenceMasking';

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe('Candidate Placement Security & Service Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('masks sensitive reference values for safe candidate projection', () => {
    expect(maskWorkPermitReference('WP-104821')).toBe('WP-••••-4821');
    expect(maskVisaReference('VIS-991905')).toBe('VIS-••••-1905');
    expect(maskPassportNumber('A98765432')).toBe('••••••5432');
  });

  it('throws authentication error if user session is absent', async () => {
    const { supabase } = await import('../lib/supabase');
    (supabase.auth.getUser as any).mockResolvedValueOnce({ data: { user: null }, error: null });

    await expect(CandidatePlacementService.loadMyPlacement()).rejects.toThrow(
      'Authentication required to view placement status.'
    );
  });
});
