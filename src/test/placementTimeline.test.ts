import { describe, it, expect } from 'vitest';
import { sortPlacementTimeline, filterCandidateVisibleTimeline, PlacementTimelineEvent } from '../lib/candidate/placementTimeline';

describe('Candidate Placement Timeline Utilities', () => {
  it('sorts timeline events by step number', () => {
    const events: PlacementTimelineEvent[] = [
      { id: '2', placementId: 'p1', stepNumber: 4, title: 'Work Permit', status: 'in_progress' },
      { id: '1', placementId: 'p1', stepNumber: 1, title: 'Offer Accepted', status: 'completed' },
    ];

    const sorted = sortPlacementTimeline(events);
    expect(sorted[0].stepNumber).toBe(1);
    expect(sorted[1].stepNumber).toBe(4);
  });

  it('filters out empty or invalid title events', () => {
    const events: PlacementTimelineEvent[] = [
      { id: '1', placementId: 'p1', stepNumber: 1, title: 'Offer Accepted', status: 'completed' },
      { id: '2', placementId: 'p1', stepNumber: 2, title: ' ', status: 'upcoming' },
    ];

    const visible = filterCandidateVisibleTimeline(events);
    expect(visible.length).toBe(1);
    expect(visible[0].title).toBe('Offer Accepted');
  });
});
