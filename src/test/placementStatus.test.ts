import { describe, it, expect } from 'vitest';
import { resolvePlacementStatusInfo } from '../lib/candidate/placementStatus';

describe('Candidate Placement Status Resolver', () => {
  it('resolves canonical work permit in progress status', () => {
    const info = resolvePlacementStatusInfo('work_permit_in_progress');
    expect(info.label).toBe('Work Permit in Progress');
    expect(info.badgeVariant).toBe('indigo');
  });

  it('resolves canonical completed status', () => {
    const info = resolvePlacementStatusInfo('completed');
    expect(info.label).toBe('Placement Completed');
    expect(info.badgeVariant).toBe('emerald');
  });

  it('provides safe fallback for unknown raw status', () => {
    const info = resolvePlacementStatusInfo('unknown_stage_xyz');
    expect(info.label).toBe('Status Being Updated');
    expect(info.badgeVariant).toBe('outline');
  });

  it('provides safe fallback for null status', () => {
    const info = resolvePlacementStatusInfo(null);
    expect(info.label).toBe('Status Being Updated');
  });
});
