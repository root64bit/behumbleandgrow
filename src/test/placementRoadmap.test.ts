import { describe, it, expect } from 'vitest';
import { calculateRoadmapProgress, PlacementRoadmapStage } from '../lib/candidate/placementRoadmap';

describe('Candidate Placement Roadmap Calculator', () => {
  it('calculates progress correctly for completed required stages', () => {
    const stages: PlacementRoadmapStage[] = [
      { stepNumber: 1, name: 'Offer Accepted', status: 'completed', isOptional: false },
      { stepNumber: 2, name: 'Document Preparation', status: 'completed', isOptional: false },
      { stepNumber: 3, name: 'Employer Processing', status: 'completed', isOptional: false },
      { stepNumber: 4, name: 'Work-Permit Processing', status: 'current', isOptional: false },
      { stepNumber: 5, name: 'Accommodation', status: 'pending', isOptional: true },
    ];

    const { percentage, completedCount, totalRequiredCount } = calculateRoadmapProgress(stages);
    expect(completedCount).toBe(3);
    expect(totalRequiredCount).toBe(4);
    expect(percentage).toBe(75);
  });

  it('handles empty stages list gracefully', () => {
    const res = calculateRoadmapProgress([]);
    expect(res.percentage).toBe(0);
    expect(res.completedCount).toBe(0);
  });
});
