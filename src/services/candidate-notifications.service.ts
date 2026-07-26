import { supabase } from '../lib/supabase/client';
import { CandidateNotificationCategory } from '../lib/candidate/notificationCategory';

export interface CandidateNotificationItem {
  id: string;
  candidateId: string;
  category: CandidateNotificationCategory;
  title: string;
  summary: string;
  priority: 'normal' | 'important' | 'urgent';
  entityType?: string | null;
  entityId?: string | null;
  actionType?: string | null;
  actionUrl?: string | null;
  isActionRequired: boolean;
  isArchivable: boolean;
  readAt?: string | null;
  archivedAt?: string | null;
  expiresAt?: string | null;
  isRetracted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateNotificationSummary {
  unreadCount: number;
  actionRequiredCount: number;
  todayCount: number;
  importantCount: number;
}

export interface CandidateNotificationFilters {
  category?: CandidateNotificationCategory | 'all';
  unreadOnly?: boolean;
  actionRequiredOnly?: boolean;
  includeArchived?: boolean;
  searchQuery?: string;
  cursorCreatedAt?: string;
  cursorId?: string;
  limit?: number;
}

export interface CandidateNotificationQueryResult {
  items: CandidateNotificationItem[];
  hasMore: boolean;
  nextCursorCreatedAt?: string;
  nextCursorId?: string;
}

export class CandidateNotificationsService {
  /**
   * Load candidate notifications with cursor pagination & category/search filtering.
   * Identity is derived strictly from the authenticated session (auth.uid()).
   */
  static async loadMyNotifications(
    filters: CandidateNotificationFilters = {}
  ): Promise<CandidateNotificationQueryResult> {
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      throw new Error('Authentication required to view notifications.');
    }

    const userId = authData.user.id;

    // Resolve Candidate ID
    const { data: candidateData, error: candidateErr } = await supabase
      .from('candidates')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (candidateErr || !candidateData) {
      return { items: [], hasMore: false };
    }

    const limit = filters.limit || 15;

    let query = supabase
      .from('candidate_notifications')
      .select(`
        id,
        candidate_id,
        category,
        title,
        summary,
        priority,
        entity_type,
        entity_id,
        action_type,
        action_url,
        is_action_required,
        is_archivable,
        read_at,
        archived_at,
        expires_at,
        is_retracted,
        created_at,
        updated_at
      `)
      .eq('candidate_id', candidateData.id)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit + 1);

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    // Apply unread filter
    if (filters.unreadOnly) {
      query = query.is('read_at', null);
    }

    // Apply action required filter
    if (filters.actionRequiredOnly) {
      query = query.eq('is_action_required', true);
    }

    // Apply archived filter
    if (!filters.includeArchived) {
      query = query.is('archived_at', null);
    }

    // Apply database cursor pagination
    if (filters.cursorCreatedAt && filters.cursorId) {
      query = query.or(`created_at.lt.${filters.cursorCreatedAt},and(created_at.eq.${filters.cursorCreatedAt},id.lt.${filters.cursorId})`);
    }

    const { data: rows, error } = await query;
    if (error) {
      throw new Error('Failed to load candidate notifications.');
    }

    const hasMore = (rows || []).length > limit;
    const pagedRows = hasMore ? (rows || []).slice(0, limit) : (rows || []);

    const items: CandidateNotificationItem[] = pagedRows.map((r: any) => ({
      id: r.id,
      candidateId: r.candidate_id,
      category: r.category as CandidateNotificationCategory,
      title: r.title,
      summary: r.summary,
      priority: r.priority || 'normal',
      entityType: r.entity_type,
      entityId: r.entity_id,
      actionType: r.action_type,
      actionUrl: r.action_url,
      isActionRequired: r.is_action_required ?? false,
      isArchivable: r.is_archivable ?? true,
      readAt: r.read_at,
      archivedAt: r.archived_at,
      expiresAt: r.expires_at,
      isRetracted: r.is_retracted ?? false,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    // Perform plain-text search filtering in memory if query provided
    let filteredItems = items;
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      filteredItems = items.filter(
        (i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q)
      );
    }

    const lastItem = pagedRows[pagedRows.length - 1];

    return {
      items: filteredItems,
      hasMore,
      nextCursorCreatedAt: lastItem?.created_at,
      nextCursorId: lastItem?.id,
    };
  }

  /**
   * Load database-backed notification metrics summary for authenticated candidate
   */
  static async loadMyNotificationSummary(): Promise<CandidateNotificationSummary> {
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return { unreadCount: 0, actionRequiredCount: 0, todayCount: 0, importantCount: 0 };
    }

    const { data: candidateData } = await supabase
      .from('candidates')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (!candidateData) {
      return { unreadCount: 0, actionRequiredCount: 0, todayCount: 0, importantCount: 0 };
    }

    const candidateId = candidateData.id;

    // Fetch candidate active notifications for count calculations
    const { data: rows } = await supabase
      .from('candidate_notifications')
      .select('id, read_at, is_action_required, priority, created_at, is_retracted')
      .eq('candidate_id', candidateId)
      .is('archived_at', null);

    if (!rows) {
      return { unreadCount: 0, actionRequiredCount: 0, todayCount: 0, importantCount: 0 };
    }

    const todayStr = new Date().toISOString().split('T')[0];

    let unreadCount = 0;
    let actionRequiredCount = 0;
    let todayCount = 0;
    let importantCount = 0;

    for (const r of rows) {
      if (r.is_retracted) continue;
      if (!r.read_at) unreadCount++;
      if (r.is_action_required) actionRequiredCount++;
      if (r.created_at && r.created_at.startsWith(todayStr)) todayCount++;
      if (r.priority === 'important' || r.priority === 'urgent') importantCount++;
    }

    return {
      unreadCount,
      actionRequiredCount,
      todayCount,
      importantCount,
    };
  }

  /**
   * Mark one candidate notification read via RPC
   */
  static async markMyNotificationRead(
    notificationId: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateNotificationItem> {
    const { data, error } = await supabase.rpc('mark_my_candidate_notification_read', {
      p_notification_id: notificationId,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error) {
      throw new Error(error.message || 'Failed to mark notification as read.');
    }

    return {
      id: data.id,
      candidateId: data.candidate_id,
      category: data.category,
      title: data.title,
      summary: data.summary,
      priority: data.priority,
      entityType: data.entity_type,
      entityId: data.entity_id,
      actionType: data.action_type,
      actionUrl: data.action_url,
      isActionRequired: data.is_action_required,
      isArchivable: data.is_archivable,
      readAt: data.read_at,
      archivedAt: data.archived_at,
      expiresAt: data.expires_at,
      isRetracted: data.is_retracted,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  /**
   * Mark one candidate notification unread via RPC
   */
  static async markMyNotificationUnread(
    notificationId: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateNotificationItem> {
    const { data, error } = await supabase.rpc('mark_my_candidate_notification_unread', {
      p_notification_id: notificationId,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error) {
      throw new Error(error.message || 'Failed to mark notification as unread.');
    }

    return {
      id: data.id,
      candidateId: data.candidate_id,
      category: data.category,
      title: data.title,
      summary: data.summary,
      priority: data.priority,
      entityType: data.entity_type,
      entityId: data.entity_id,
      actionType: data.action_type,
      actionUrl: data.action_url,
      isActionRequired: data.is_action_required,
      isArchivable: data.is_archivable,
      readAt: data.read_at,
      archivedAt: data.archived_at,
      expiresAt: data.expires_at,
      isRetracted: data.is_retracted,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  /**
   * Mark all candidate notifications read via RPC
   */
  static async markAllMyNotificationsRead(category?: string): Promise<number> {
    const { data, error } = await supabase.rpc('mark_all_my_candidate_notifications_read', {
      p_category: category || null,
    });

    if (error) {
      throw new Error(error.message || 'Failed to mark all notifications as read.');
    }

    return typeof data === 'number' ? data : 0;
  }

  /**
   * Archive one candidate notification via RPC
   */
  static async archiveMyNotification(
    notificationId: string,
    expectedUpdatedAt?: string
  ): Promise<CandidateNotificationItem> {
    const { data, error } = await supabase.rpc('archive_my_candidate_notification', {
      p_notification_id: notificationId,
      p_expected_updated_at: expectedUpdatedAt || null,
    });

    if (error) {
      throw new Error(error.message || 'Failed to archive notification.');
    }

    return {
      id: data.id,
      candidateId: data.candidate_id,
      category: data.category,
      title: data.title,
      summary: data.summary,
      priority: data.priority,
      entityType: data.entity_type,
      entityId: data.entity_id,
      actionType: data.action_type,
      actionUrl: data.action_url,
      isActionRequired: data.is_action_required,
      isArchivable: data.is_archivable,
      readAt: data.read_at,
      archivedAt: data.archived_at,
      expiresAt: data.expires_at,
      isRetracted: data.is_retracted,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}
