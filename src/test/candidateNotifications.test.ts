import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CandidateNotificationsService, CandidateNotificationItem } from '../services/candidate-notifications.service';
import { supabase } from '../lib/supabase/client';

const mockCandidate = { id: 'cand-101', user_id: 'usr-cand-101' };

const mockNotifications: CandidateNotificationItem[] = [
  {
    id: 'notif-1',
    candidateId: 'cand-101',
    category: 'application',
    title: 'Application Shortlisted',
    summary: 'Your application for Senior Healthcare Specialist has been shortlisted.',
    priority: 'important',
    entityType: 'application',
    entityId: 'app-101',
    isActionRequired: false,
    isArchivable: true,
    readAt: null,
    archivedAt: null,
    isRetracted: false,
    createdAt: '2026-07-26T10:00:00Z',
    updatedAt: '2026-07-26T10:00:00Z',
  },
  {
    id: 'notif-2',
    candidateId: 'cand-101',
    category: 'interview',
    title: 'Employer Interview Invitation',
    summary: 'Dubai Central Hospital invited you to an interview.',
    priority: 'urgent',
    entityType: 'interview',
    entityId: 'int-202',
    isActionRequired: true,
    isArchivable: true,
    readAt: null,
    archivedAt: null,
    isRetracted: false,
    createdAt: '2026-07-26T09:00:00Z',
    updatedAt: '2026-07-26T09:00:00Z',
  },
];

describe('Candidate Notifications Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loadMyNotifications queries notifications for authenticated candidate', async () => {
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'usr-cand-101' } as any },
      error: null,
    });

    const candidateChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: mockCandidate, error: null }),
    };

    const mockData = [
      {
        id: 'notif-1',
        candidate_id: 'cand-101',
        category: 'application',
        title: 'Application Shortlisted',
        summary: 'Your application for Senior Healthcare Specialist has been shortlisted.',
        priority: 'important',
        entity_type: 'application',
        entity_id: 'app-101',
        is_action_required: false,
        is_archivable: true,
        read_at: null,
        archived_at: null,
        is_retracted: false,
        created_at: '2026-07-26T10:00:00Z',
        updated_at: '2026-07-26T10:00:00Z',
      },
    ];

    const notifChain: any = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      then: (resolve: any) => resolve({ data: mockData, error: null }),
    };

    vi.spyOn(supabase, 'from').mockImplementation((table: string) => {
      if (table === 'candidates') return candidateChain as any;
      if (table === 'candidate_notifications') return notifChain as any;
      return {} as any;
    });

    const res = await CandidateNotificationsService.loadMyNotifications();
    expect(res.items.length).toBe(1);
    expect(res.items[0].title).toBe('Application Shortlisted');
  });

  it('loadMyNotificationSummary computes metrics for active notifications', async () => {
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'usr-cand-101' } as any },
      error: null,
    });

    const candidateChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: mockCandidate, error: null }),
    };

    const notifChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockResolvedValue({
        data: [
          { read_at: null, is_action_required: true, priority: 'urgent', created_at: '2026-07-26T10:00:00Z', is_retracted: false },
          { read_at: '2026-07-26T11:00:00Z', is_action_required: false, priority: 'normal', created_at: '2026-07-26T08:00:00Z', is_retracted: false },
        ],
        error: null,
      }),
    };

    vi.spyOn(supabase, 'from').mockImplementation((table: string) => {
      if (table === 'candidates') return candidateChain as any;
      if (table === 'candidate_notifications') return notifChain as any;
      return {} as any;
    });

    const summary = await CandidateNotificationsService.loadMyNotificationSummary();
    expect(summary.unreadCount).toBe(1);
    expect(summary.actionRequiredCount).toBe(1);
    expect(summary.importantCount).toBe(1);
  });

  it('markMyNotificationRead executes mark_my_candidate_notification_read RPC', async () => {
    vi.spyOn(supabase, 'rpc').mockResolvedValue({
      data: {
        id: 'notif-1',
        candidate_id: 'cand-101',
        category: 'application',
        title: 'Application Shortlisted',
        summary: 'Your application has been shortlisted.',
        priority: 'important',
        read_at: '2026-07-26T11:30:00Z',
        created_at: '2026-07-26T10:00:00Z',
        updated_at: '2026-07-26T11:30:00Z',
      },
      error: null,
    } as any);

    const res = await CandidateNotificationsService.markMyNotificationRead('notif-1');
    expect(res.readAt).toBe('2026-07-26T11:30:00Z');
    expect(supabase.rpc).toHaveBeenCalledWith('mark_my_candidate_notification_read', {
      p_notification_id: 'notif-1',
      p_expected_updated_at: null,
    });
  });

  it('markAllMyNotificationsRead executes mark_all_my_candidate_notifications_read RPC', async () => {
    vi.spyOn(supabase, 'rpc').mockResolvedValue({
      data: 5,
      error: null,
    } as any);

    const count = await CandidateNotificationsService.markAllMyNotificationsRead('application');
    expect(count).toBe(5);
    expect(supabase.rpc).toHaveBeenCalledWith('mark_all_my_candidate_notifications_read', {
      p_category: 'application',
    });
  });
});
