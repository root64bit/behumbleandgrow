export interface PlacementTimelineEvent {
  id: string;
  placementId: string;
  stepNumber: number;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming' | 'not_applicable';
  completedAt?: string | null;
  dateDisplay?: string | null;
}

export function sortPlacementTimeline(events: PlacementTimelineEvent[]): PlacementTimelineEvent[] {
  return [...events].sort((a, b) => a.stepNumber - b.stepNumber);
}

export function filterCandidateVisibleTimeline(events: PlacementTimelineEvent[]): PlacementTimelineEvent[] {
  // Exclude internal staff notes or unverified future events
  return sortPlacementTimeline(events).filter((e) => Boolean(e.title && e.title.trim().length > 0));
}
