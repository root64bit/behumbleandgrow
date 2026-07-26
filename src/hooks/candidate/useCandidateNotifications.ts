import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  CandidateNotificationItem,
  CandidateNotificationSummary,
  CandidateNotificationFilters,
  CandidateNotificationsService,
} from '../../services/candidate-notifications.service';
import { CandidateNotificationCategory } from '../../lib/candidate/notificationCategory';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export interface CandidateNotificationsHookResult {
  notificationsState: ResourceState<CandidateNotificationItem[]>;
  summaryState: ResourceState<CandidateNotificationSummary>;
  activeTab: 'all' | 'unread' | 'action_required' | CandidateNotificationCategory;
  searchQuery: string;
  pagination: {
    hasMore: boolean;
    isLoadingMore: boolean;
    error?: string;
  };
  mutation: {
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    notificationId?: string;
    action?: 'read' | 'unread' | 'archive' | 'mark_all_read';
    error?: string;
  };
  setActiveTab: (tab: 'all' | 'unread' | 'action_required' | CandidateNotificationCategory) => void;
  setSearchQuery: (query: string) => void;
  refreshNotifications: () => Promise<void>;
  loadMoreNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAsUnread: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  archiveNotification: (notificationId: string) => Promise<void>;
}

export function useCandidateNotifications(): CandidateNotificationsHookResult {
  const { user } = useAuth();
  const [notificationsState, setNotificationsState] = useState<ResourceState<CandidateNotificationItem[]>>({ status: 'loading' });
  const [summaryState, setSummaryState] = useState<ResourceState<CandidateNotificationSummary>>({ status: 'loading' });
  const [activeTab, setActiveTabState] = useState<'all' | 'unread' | 'action_required' | CandidateNotificationCategory>('all');
  const [searchQuery, setSearchQueryState] = useState<string>('');

  const [cursor, setCursor] = useState<{ nextCreatedAt?: string; nextId?: string }>({});
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [paginationError, setPaginationError] = useState<string | undefined>();

  const [mutation, setMutation] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    notificationId?: string;
    action?: 'read' | 'unread' | 'archive' | 'mark_all_read';
    error?: string;
  }>({ status: 'idle' });

  const buildFilters = useCallback(
    (tab: typeof activeTab, search: string): CandidateNotificationFilters => {
      const filters: CandidateNotificationFilters = { searchQuery: search, limit: 15 };
      if (tab === 'unread') {
        filters.unreadOnly = true;
      } else if (tab === 'action_required') {
        filters.actionRequiredOnly = true;
      } else if (tab !== 'all') {
        filters.category = tab as CandidateNotificationCategory;
      }
      return filters;
    },
    []
  );

  const fetchInitialData = useCallback(async () => {
    setNotificationsState({ status: 'loading' });
    setSummaryState({ status: 'loading' });
    setPaginationError(undefined);

    try {
      const filters = buildFilters(activeTab, searchQuery);
      const [res, summary] = await Promise.all([
        CandidateNotificationsService.loadMyNotifications(filters),
        CandidateNotificationsService.loadMyNotificationSummary(),
      ]);

      setSummaryState({ status: 'success', data: summary });

      if (!res.items || res.items.length === 0) {
        setNotificationsState({ status: 'empty', data: [] });
        setHasMore(false);
        setCursor({});
      } else {
        setNotificationsState({ status: 'success', data: res.items });
        setHasMore(res.hasMore);
        setCursor({ nextCreatedAt: res.nextCursorCreatedAt, nextId: res.nextCursorId });
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to load notifications.';
      setNotificationsState({ status: 'error', message: msg });
      setSummaryState({ status: 'error', message: msg });
    }
  }, [activeTab, searchQuery, buildFilters]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData, user?.id]);

  const setActiveTab = (tab: typeof activeTab) => {
    setActiveTabState(tab);
  };

  const setSearchQuery = (q: string) => {
    setSearchQueryState(q);
  };

  const loadMoreNotifications = async () => {
    if (!hasMore || isLoadingMore || notificationsState.status !== 'success') return;

    setIsLoadingMore(true);
    setPaginationError(undefined);

    try {
      const filters = buildFilters(activeTab, searchQuery);
      filters.cursorCreatedAt = cursor.nextCreatedAt;
      filters.cursorId = cursor.nextId;

      const res = await CandidateNotificationsService.loadMyNotifications(filters);
      const updated = [...notificationsState.data, ...res.items];

      setNotificationsState({ status: 'success', data: updated });
      setHasMore(res.hasMore);
      setCursor({ nextCreatedAt: res.nextCursorCreatedAt, nextId: res.nextCursorId });
    } catch (err: any) {
      setPaginationError(err.message || 'Failed to load more notifications.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (notificationsState.status !== 'success') return;

    const previousItems = notificationsState.data;
    const previousSummary = summaryState.status === 'success' ? summaryState.data : null;
    const item = previousItems.find((i) => i.id === notificationId);
    if (!item) return;

    setMutation({ status: 'submitting', notificationId, action: 'read' });

    // Optimistic Update
    const optimisticItems = previousItems.map((i) =>
      i.id === notificationId ? { ...i, readAt: new Date().toISOString() } : i
    );
    setNotificationsState({ status: 'success', data: optimisticItems });

    if (previousSummary && !item.readAt) {
      setSummaryState({
        status: 'success',
        data: {
          ...previousSummary,
          unreadCount: Math.max(0, previousSummary.unreadCount - 1),
        },
      });
    }

    try {
      const updated = await CandidateNotificationsService.markMyNotificationRead(
        notificationId,
        item.updatedAt
      );
      setMutation({ status: 'success', notificationId, action: 'read' });

      // Synchronize with server response
      const synced = optimisticItems.map((i) => (i.id === notificationId ? updated : i));
      setNotificationsState({ status: 'success', data: synced });
    } catch (err: any) {
      // Rollback on failure
      setNotificationsState({ status: 'success', data: previousItems });
      if (previousSummary) setSummaryState({ status: 'success', data: previousSummary });
      const msg = err.message || 'Failed to mark notification as read.';
      setMutation({ status: 'error', notificationId, action: 'read', error: msg });
    }
  };

  const markAsUnread = async (notificationId: string) => {
    if (notificationsState.status !== 'success') return;

    const previousItems = notificationsState.data;
    const previousSummary = summaryState.status === 'success' ? summaryState.data : null;
    const item = previousItems.find((i) => i.id === notificationId);
    if (!item) return;

    setMutation({ status: 'submitting', notificationId, action: 'unread' });

    // Optimistic Update
    const optimisticItems = previousItems.map((i) =>
      i.id === notificationId ? { ...i, readAt: null } : i
    );
    setNotificationsState({ status: 'success', data: optimisticItems });

    if (previousSummary && item.readAt) {
      setSummaryState({
        status: 'success',
        data: {
          ...previousSummary,
          unreadCount: previousSummary.unreadCount + 1,
        },
      });
    }

    try {
      const updated = await CandidateNotificationsService.markMyNotificationUnread(
        notificationId,
        item.updatedAt
      );
      setMutation({ status: 'success', notificationId, action: 'unread' });

      const synced = optimisticItems.map((i) => (i.id === notificationId ? updated : i));
      setNotificationsState({ status: 'success', data: synced });
    } catch (err: any) {
      // Rollback on failure
      setNotificationsState({ status: 'success', data: previousItems });
      if (previousSummary) setSummaryState({ status: 'success', data: previousSummary });
      const msg = err.message || 'Failed to mark notification as unread.';
      setMutation({ status: 'error', notificationId, action: 'unread', error: msg });
    }
  };

  const markAllAsRead = async () => {
    setMutation({ status: 'submitting', action: 'mark_all_read' });

    try {
      const cat = activeTab !== 'all' && activeTab !== 'unread' && activeTab !== 'action_required' ? activeTab : undefined;
      await CandidateNotificationsService.markAllMyNotificationsRead(cat);
      setMutation({ status: 'success', action: 'mark_all_read' });
      await fetchInitialData();
    } catch (err: any) {
      const msg = err.message || 'Failed to mark all notifications as read.';
      setMutation({ status: 'error', action: 'mark_all_read', error: msg });
    }
  };

  const archiveNotification = async (notificationId: string) => {
    if (notificationsState.status !== 'success') return;

    const previousItems = notificationsState.data;
    const previousSummary = summaryState.status === 'success' ? summaryState.data : null;
    const item = previousItems.find((i) => i.id === notificationId);
    if (!item) return;

    if (!item.isArchivable) {
      setMutation({
        status: 'error',
        notificationId,
        action: 'archive',
        error: 'This notification is mandatory and cannot be archived.',
      });
      return;
    }

    setMutation({ status: 'submitting', notificationId, action: 'archive' });

    // Optimistic filter removal
    const optimisticItems = previousItems.filter((i) => i.id !== notificationId);
    setNotificationsState({
      status: optimisticItems.length === 0 ? 'empty' : 'success',
      data: optimisticItems,
    });

    try {
      await CandidateNotificationsService.archiveMyNotification(notificationId, item.updatedAt);
      setMutation({ status: 'success', notificationId, action: 'archive' });
      const newSummary = await CandidateNotificationsService.loadMyNotificationSummary();
      setSummaryState({ status: 'success', data: newSummary });
    } catch (err: any) {
      // Rollback on failure
      setNotificationsState({ status: 'success', data: previousItems });
      if (previousSummary) setSummaryState({ status: 'success', data: previousSummary });
      const msg = err.message || 'Failed to archive notification.';
      setMutation({ status: 'error', notificationId, action: 'archive', error: msg });
    }
  };

  return {
    notificationsState,
    summaryState,
    activeTab,
    searchQuery,
    pagination: {
      hasMore,
      isLoadingMore,
      error: paginationError,
    },
    mutation,
    setActiveTab,
    setSearchQuery,
    refreshNotifications: fetchInitialData,
    loadMoreNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    archiveNotification,
  };
}
