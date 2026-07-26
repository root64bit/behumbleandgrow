import { describe, it, expect } from 'vitest';
import { mapStatusHistoryToTimelineEvents } from '../lib/candidate/applicationTimeline';
import type { StatusHistory } from '../lib/supabase/types';

describe('Candidate Application Timeline Mapper Suite', () => {
  it('should map status history records into candidate-visible timeline events in stable chronological order', () => {
    const history: StatusHistory[] = [
      {
        id: 'hist-2',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'employer_submitted',
        user_role: 'candidate',
        created_at: '2026-02-12T10:00:00Z',
        candidate_message: 'Dossier submitted to employer.',
      },
      {
        id: 'hist-1',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'submitted',
        user_role: 'candidate',
        created_at: '2026-02-10T09:00:00Z',
        candidate_message: 'Application received.',
      },
    ];

    const events = mapStatusHistoryToTimelineEvents(history);
    expect(events.length).toBe(2);
    expect(events[0].id).toBe('hist-1'); // Earliest timestamp comes first
    expect(events[0].title).toBe('Application Submitted');
    expect(events[1].id).toBe('hist-2');
    expect(events[1].title).toBe('Submitted to Employer');
  });

  it('should exclude internal notes and internal operations records lacking candidate messages', () => {
    const history: StatusHistory[] = [
      {
        id: 'hist-1',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'submitted',
        user_role: 'candidate',
        created_at: '2026-02-10T09:00:00Z',
        candidate_message: 'Application received.',
      },
      {
        id: 'hist-internal',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'internal_escalation',
        user_role: 'operations',
        internal_note: 'Internal Operations SLA review flag: high priority candidate',
        created_at: '2026-02-11T12:00:00Z',
      },
    ];

    const events = mapStatusHistoryToTimelineEvents(history);
    expect(events.length).toBe(1);
    expect(events[0].id).toBe('hist-1');
  });

  it('should deduplicate consecutive identical statuses without messages', () => {
    const history: StatusHistory[] = [
      {
        id: 'hist-1',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'submitted',
        created_at: '2026-02-10T09:00:00Z',
      },
      {
        id: 'hist-2',
        entity_type: 'application',
        entity_id: 'app-1',
        new_status: 'submitted',
        created_at: '2026-02-10T09:05:00Z',
      },
    ];

    const events = mapStatusHistoryToTimelineEvents(history);
    expect(events.length).toBe(1);
  });
});
