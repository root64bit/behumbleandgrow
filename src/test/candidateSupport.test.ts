import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CandidateSupportService, CandidateSupportTicketItem } from '../services/candidate-support.service';
import { supabase } from '../lib/supabase/client';

const mockCandidate = { id: 'cand-101', user_id: 'usr-cand-101' };

const mockTicket: CandidateSupportTicketItem = {
  id: 'tkt-101',
  ticketReference: 'BHG-SUP-2026-001284',
  candidateId: 'cand-101',
  category: 'application',
  subject: 'Inquiry regarding application review timeframe',
  description: 'I would like to clarify the standard review timeframe for my application.',
  status: 'submitted',
  urgency: 'normal',
  relatedEntityType: 'application',
  relatedEntityId: 'app-101',
  isCandidateActionRequired: false,
  unreadCandidateMessageCount: 0,
  reopenCount: 0,
  createdAt: '2026-07-26T10:00:00Z',
  updatedAt: '2026-07-26T10:00:00Z',
};

describe('Candidate Support Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loadMySupportRequests queries tickets for authenticated candidate', async () => {
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'usr-cand-101' } as any },
      error: null,
    });

    const candidateChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: mockCandidate, error: null }),
    };

    const mockRows = [
      {
        id: 'tkt-101',
        ticket_reference: 'BHG-SUP-2026-001284',
        candidate_id: 'cand-101',
        category: 'application',
        subject: 'Inquiry regarding application review timeframe',
        description: 'I would like to clarify the standard review timeframe for my application.',
        status: 'submitted',
        urgency: 'normal',
        is_candidate_action_required: false,
        created_at: '2026-07-26T10:00:00Z',
        updated_at: '2026-07-26T10:00:00Z',
      },
    ];

    const ticketChain: any = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      then: (resolve: any) => resolve({ data: mockRows, error: null }),
    };

    vi.spyOn(supabase, 'from').mockImplementation((table: string) => {
      if (table === 'candidates') return candidateChain as any;
      if (table === 'candidate_support_tickets') return ticketChain as any;
      return {} as any;
    });

    const res = await CandidateSupportService.loadMySupportRequests();
    expect(res.items.length).toBe(1);
    expect(res.items[0].ticketReference).toBe('BHG-SUP-2026-001284');
  });

  it('loadMySupportSummary computes metrics for active tickets', async () => {
    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: { id: 'usr-cand-101' } as any },
      error: null,
    });

    const candidateChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: mockCandidate, error: null }),
    };

    const summaryChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { status: 'submitted', is_candidate_action_required: false },
          { status: 'awaiting_candidate', is_candidate_action_required: true },
          { status: 'resolved', is_candidate_action_required: false },
        ],
        error: null,
      }),
    };

    vi.spyOn(supabase, 'from').mockImplementation((table: string) => {
      if (table === 'candidates') return candidateChain as any;
      if (table === 'candidate_support_tickets') return summaryChain as any;
      return {} as any;
    });

    const summary = await CandidateSupportService.loadMySupportSummary();
    expect(summary.openCount).toBe(2);
    expect(summary.actionRequiredCount).toBe(1);
    expect(summary.resolvedCount).toBe(1);
  });

  it('createMySupportRequest calls create_my_candidate_support_ticket RPC', async () => {
    vi.spyOn(supabase, 'rpc').mockResolvedValue({
      data: {
        id: 'tkt-101',
        ticket_reference: 'BHG-SUP-2026-001284',
        candidate_id: 'cand-101',
        category: 'application',
        subject: 'Inquiry regarding application review timeframe',
        description: 'I would like to clarify the standard review timeframe for my application.',
        status: 'submitted',
        created_at: '2026-07-26T10:00:00Z',
        updated_at: '2026-07-26T10:00:00Z',
      },
      error: null,
    } as any);

    const ticket = await CandidateSupportService.createMySupportRequest({
      category: 'application',
      subject: 'Inquiry regarding application review timeframe',
      description: 'I would like to clarify the standard review timeframe for my application.',
    });

    expect(ticket.ticketReference).toBe('BHG-SUP-2026-001284');
    expect(supabase.rpc).toHaveBeenCalledWith('create_my_candidate_support_ticket', {
      p_category: 'application',
      p_subject: 'Inquiry regarding application review timeframe',
      p_description: 'I would like to clarify the standard review timeframe for my application.',
      p_urgency: 'normal',
      p_related_entity_type: null,
      p_related_entity_id: null,
    });
  });

  it('replyToMySupportRequest calls reply_to_my_candidate_support_ticket RPC', async () => {
    vi.spyOn(supabase, 'rpc').mockResolvedValue({
      data: {
        id: 'msg-202',
        ticket_id: 'tkt-101',
        author_role: 'candidate',
        author_display_name: 'Alex Johnson',
        message_text: 'Thank you for following up.',
        is_candidate_visible: true,
        created_at: '2026-07-26T11:00:00Z',
      },
      error: null,
    } as any);

    const msg = await CandidateSupportService.replyToMySupportRequest('tkt-101', 'Thank you for following up.');
    expect(msg.messageText).toBe('Thank you for following up.');
    expect(supabase.rpc).toHaveBeenCalledWith('reply_to_my_candidate_support_ticket', {
      p_ticket_id: 'tkt-101',
      p_message_text: 'Thank you for following up.',
      p_expected_updated_at: null,
    });
  });
});
