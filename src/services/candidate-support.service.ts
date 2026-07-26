import { supabase } from '../lib/supabase/client';
import { CandidateSupportCategory } from '../lib/candidate/supportCategory';
import { CandidateSupportStatus } from '../lib/candidate/supportStatus';
import { sanitizePlainText } from '../lib/candidate/supportValidation';

export interface CandidateSupportTicketItem {
  id: string;
  ticketReference: string;
  candidateId: string;
  category: CandidateSupportCategory;
  subject: string;
  description: string;
  status: CandidateSupportStatus;
  urgency: 'normal' | 'important' | 'urgent';
  relatedEntityType?: string | null;
  relatedEntityId?: string | null;
  isCandidateActionRequired: boolean;
  unreadCandidateMessageCount: number;
  resolutionSummary?: string | null;
  closedAt?: string | null;
  reopenedAt?: string | null;
  reopenCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateSupportMessageItem {
  id: string;
  ticketId: string;
  authorRole: 'candidate' | 'support' | 'system';
  authorDisplayName: string;
  messageText: string;
  isCandidateVisible: boolean;
  attachmentCount: number;
  createdAt: string;
}

export interface CandidateSupportSummary {
  openCount: number;
  actionRequiredCount: number;
  awaitingSupportCount: number;
  resolvedCount: number;
}

export interface CandidateSupportFilters {
  tab?: 'all' | 'open' | 'action_required' | 'awaiting_support' | 'resolved' | 'closed';
  category?: CandidateSupportCategory;
  searchQuery?: string;
  cursorUpdatedAt?: string;
  cursorId?: string;
  limit?: number;
}

export interface CreateSupportTicketPayload {
  category: CandidateSupportCategory;
  subject: string;
  description: string;
  urgency?: 'normal' | 'important' | 'urgent';
  relatedEntityType?: 'application' | 'document' | 'interview' | 'offer' | 'placement' | 'profile';
  relatedEntityId?: string;
  idempotencyKey?: string;
}

function mapRowToTicket(row: any): CandidateSupportTicketItem {
  return {
    id: row.id,
    ticketReference: row.ticket_reference || `BHG-SUP-${row.id.slice(0, 6).toUpperCase()}`,
    candidateId: row.candidate_id,
    category: row.category as CandidateSupportCategory,
    subject: sanitizePlainText(row.subject),
    description: sanitizePlainText(row.description),
    status: row.status as CandidateSupportStatus,
    urgency: row.urgency || 'normal',
    relatedEntityType: row.related_entity_type,
    relatedEntityId: row.related_entity_id,
    isCandidateActionRequired: Boolean(row.is_candidate_action_required),
    unreadCandidateMessageCount: Number(row.unread_candidate_message_count || 0),
    resolutionSummary: row.resolution_summary ? sanitizePlainText(row.resolution_summary) : null,
    closedAt: row.closed_at,
    reopenedAt: row.reopened_at,
    reopenCount: Number(row.reopen_count || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRowToMessage(row: any): CandidateSupportMessageItem {
  return {
    id: row.id,
    ticketId: row.ticket_id,
    authorRole: row.author_role || 'support',
    authorDisplayName: sanitizePlainText(row.author_display_name || 'Support Officer'),
    messageText: sanitizePlainText(row.message_text),
    isCandidateVisible: Boolean(row.is_candidate_visible),
    attachmentCount: Number(row.attachment_count || 0),
    createdAt: row.created_at,
  };
}

export class CandidateSupportService {
  /**
   * Load Candidate ID from authenticated user session
   */
  private static async getCandidateId(): Promise<string | null> {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) return null;

    const { data, error } = await supabase
      .from('candidates')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (error || !data) return null;
    return data.id;
  }

  /**
   * Load Candidate-owned support tickets with cursor pagination & filters
   */
  public static async loadMySupportRequests(
    filters: CandidateSupportFilters = {}
  ): Promise<{
    items: CandidateSupportTicketItem[];
    hasMore: boolean;
    nextCursorUpdatedAt?: string;
    nextCursorId?: string;
  }> {
    const candidateId = await this.getCandidateId();
    if (!candidateId) {
      return { items: [], hasMore: false };
    }

    const limit = filters.limit || 15;
    let query = supabase
      .from('candidate_support_tickets')
      .select('*')
      .eq('candidate_id', candidateId);

    // Apply Tab Filters
    if (filters.tab === 'open') {
      query = query.in('status', ['submitted', 'open', 'awaiting_support', 'awaiting_candidate', 'in_progress', 'reopened']);
    } else if (filters.tab === 'action_required') {
      query = query.or('is_candidate_action_required.eq.true,status.eq.awaiting_candidate');
    } else if (filters.tab === 'awaiting_support') {
      query = query.in('status', ['submitted', 'open', 'awaiting_support']);
    } else if (filters.tab === 'resolved') {
      query = query.eq('status', 'resolved');
    } else if (filters.tab === 'closed') {
      query = query.in('status', ['closed', 'cancelled']);
    }

    // Apply Category Filter
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    // Apply Search Query
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = sanitizePlainText(filters.searchQuery.trim());
      query = query.or(`subject.ilike.%${q}%,ticket_reference.ilike.%${q}%`);
    }

    // Apply Cursor Pagination (updated_at DESC, id DESC)
    if (filters.cursorUpdatedAt && filters.cursorId) {
      query = query.or(
        `updated_at.lt.${filters.cursorUpdatedAt},and(updated_at.eq.${filters.cursorUpdatedAt},id.lt.${filters.cursorId})`
      );
    }

    query = query
      .order('updated_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit + 1);

    const { data: rows, error } = await query;
    if (error || !rows) {
      return { items: [], hasMore: false };
    }

    const hasMore = rows.length > limit;
    const pageRows = hasMore ? rows.slice(0, limit) : rows;
    const items = pageRows.map(mapRowToTicket);

    const last = pageRows[pageRows.length - 1];
    return {
      items,
      hasMore,
      nextCursorUpdatedAt: last?.updated_at,
      nextCursorId: last?.id,
    };
  }

  /**
   * Load summary metrics for Candidate Support Centre
   */
  public static async loadMySupportSummary(): Promise<CandidateSupportSummary> {
    const candidateId = await this.getCandidateId();
    if (!candidateId) {
      return { openCount: 0, actionRequiredCount: 0, awaitingSupportCount: 0, resolvedCount: 0 };
    }

    const { data, error } = await supabase
      .from('candidate_support_tickets')
      .select('status, is_candidate_action_required')
      .eq('candidate_id', candidateId);

    if (error || !data) {
      return { openCount: 0, actionRequiredCount: 0, awaitingSupportCount: 0, resolvedCount: 0 };
    }

    let openCount = 0;
    let actionRequiredCount = 0;
    let awaitingSupportCount = 0;
    let resolvedCount = 0;

    for (const r of data) {
      const st = (r.status || '').toLowerCase();
      if (['submitted', 'open', 'awaiting_support', 'awaiting_candidate', 'in_progress', 'reopened'].includes(st)) {
        openCount++;
      }
      if (r.is_candidate_action_required || st === 'awaiting_candidate') {
        actionRequiredCount++;
      }
      if (['submitted', 'open', 'awaiting_support'].includes(st)) {
        awaitingSupportCount++;
      }
      if (st === 'resolved') {
        resolvedCount++;
      }
    }

    return { openCount, actionRequiredCount, awaitingSupportCount, resolvedCount };
  }

  /**
   * Create a new Candidate support ticket via RPC
   */
  public static async createMySupportRequest(
    payload: CreateSupportTicketPayload
  ): Promise<CandidateSupportTicketItem> {
    const cleanSubject = sanitizePlainText(payload.subject);
    const cleanDesc = sanitizePlainText(payload.description);

    const { data, error } = await supabase.rpc('create_my_candidate_support_ticket', {
      p_category: payload.category,
      p_subject: cleanSubject,
      p_description: cleanDesc,
      p_urgency: payload.urgency || 'normal',
      p_related_entity_type: payload.relatedEntityType || null,
      p_related_entity_id: payload.relatedEntityId || null,
    });

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create support ticket.');
    }

    return mapRowToTicket(data);
  }

  /**
   * Load details of a specific candidate-owned support ticket
   */
  public static async loadMySupportRequest(
    ticketId: string
  ): Promise<CandidateSupportTicketItem | null> {
    const candidateId = await this.getCandidateId();
    if (!candidateId) return null;

    const { data, error } = await supabase
      .from('candidate_support_tickets')
      .select('*')
      .eq('id', ticketId)
      .eq('candidate_id', candidateId)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToTicket(data);
  }

  /**
   * Load Candidate-visible messages for a ticket
   */
  public static async loadMySupportMessages(
    ticketId: string
  ): Promise<CandidateSupportMessageItem[]> {
    const candidateId = await this.getCandidateId();
    if (!candidateId) return [];

    // Verify ticket ownership first
    const ticket = await this.loadMySupportRequest(ticketId);
    if (!ticket) return [];

    const { data, error } = await supabase
      .from('candidate_support_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .eq('is_candidate_visible', true)
      .order('created_at', { ascending: true });

    if (error || !data) return [];
    return data.map(mapRowToMessage);
  }

  /**
   * Reply to owned support ticket via RPC
   */
  public static async replyToMySupportRequest(
    ticketId: string,
    messageText: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateSupportMessageItem> {
    const cleanMsg = sanitizePlainText(messageText);

    const { data, error } = await supabase.rpc('reply_to_my_candidate_support_ticket', {
      p_ticket_id: ticketId,
      p_message_text: cleanMsg,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error || !data) {
      throw new Error(error?.message || 'Failed to send reply to support ticket.');
    }

    return mapRowToMessage(data);
  }

  /**
   * Close owned support ticket via RPC
   */
  public static async closeMySupportRequest(
    ticketId: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateSupportTicketItem> {
    const { data, error } = await supabase.rpc('close_my_candidate_support_ticket', {
      p_ticket_id: ticketId,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error || !data) {
      throw new Error(error?.message || 'Failed to close support ticket.');
    }

    return mapRowToTicket(data);
  }

  /**
   * Reopen resolved or closed support ticket via RPC
   */
  public static async reopenMySupportRequest(
    ticketId: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateSupportTicketItem> {
    const { data, error } = await supabase.rpc('reopen_my_candidate_support_ticket', {
      p_ticket_id: ticketId,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error || !data) {
      throw new Error(error?.message || 'Failed to reopen support ticket.');
    }

    return mapRowToTicket(data);
  }
}
