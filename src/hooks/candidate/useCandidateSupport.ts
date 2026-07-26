import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  CandidateSupportTicketItem,
  CandidateSupportMessageItem,
  CandidateSupportSummary,
  CandidateSupportFilters,
  CreateSupportTicketPayload,
  CandidateSupportService,
} from '../../services/candidate-support.service';
import { CandidateSupportCategory } from '../../lib/candidate/supportCategory';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export type SupportTabKey = 'all' | 'open' | 'action_required' | 'awaiting_support' | 'resolved' | 'closed';

export interface CandidateSupportHookResult {
  ticketsState: ResourceState<CandidateSupportTicketItem[]>;
  summaryState: ResourceState<CandidateSupportSummary>;
  selectedTicket: CandidateSupportTicketItem | null;
  messagesState: ResourceState<CandidateSupportMessageItem[]>;
  activeTab: SupportTabKey;
  activeCategory?: CandidateSupportCategory;
  searchQuery: string;
  pagination: {
    hasMore: boolean;
    isLoadingMore: boolean;
    error?: string;
  };
  createModal: {
    isOpen: boolean;
    isSubmitting: boolean;
    error?: string;
  };
  mutation: {
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    ticketId?: string;
    action?: 'reply' | 'close' | 'reopen';
    error?: string;
  };
  setActiveTab: (tab: SupportTabKey) => void;
  setActiveCategory: (category?: CandidateSupportCategory) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTicketId: (ticketId: string | null) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  refreshSupportData: () => Promise<void>;
  loadMoreTickets: () => Promise<void>;
  createTicket: (payload: CreateSupportTicketPayload) => Promise<boolean>;
  replyToTicket: (ticketId: string, messageText: string) => Promise<boolean>;
  closeTicket: (ticketId: string) => Promise<boolean>;
  reopenTicket: (ticketId: string) => Promise<boolean>;
}

export function useCandidateSupport(): CandidateSupportHookResult {
  const { user } = useAuth();
  const [ticketsState, setTicketsState] = useState<ResourceState<CandidateSupportTicketItem[]>>({ status: 'loading' });
  const [summaryState, setSummaryState] = useState<ResourceState<CandidateSupportSummary>>({ status: 'loading' });
  const [activeTab, setActiveTabState] = useState<SupportTabKey>('all');
  const [activeCategory, setActiveCategoryState] = useState<CandidateSupportCategory | undefined>();
  const [searchQuery, setSearchQueryState] = useState<string>('');

  const [selectedTicket, setSelectedTicket] = useState<CandidateSupportTicketItem | null>(null);
  const [selectedTicketId, setSelectedTicketIdState] = useState<string | null>(null);
  const [messagesState, setMessagesState] = useState<ResourceState<CandidateSupportMessageItem[]>>({ status: 'empty', data: [] });

  const [cursor, setCursor] = useState<{ nextUpdatedAt?: string; nextId?: string }>({});
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [paginationError, setPaginationError] = useState<string | undefined>();

  const [createModal, setCreateModal] = useState<{ isOpen: boolean; isSubmitting: boolean; error?: string }>({
    isOpen: false,
    isSubmitting: false,
  });

  const [mutation, setMutation] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    ticketId?: string;
    action?: 'reply' | 'close' | 'reopen';
    error?: string;
  }>({ status: 'idle' });

  const buildFilters = useCallback(
    (tab: SupportTabKey, category?: CandidateSupportCategory, search?: string): CandidateSupportFilters => {
      return {
        tab,
        category,
        searchQuery: search,
        limit: 15,
      };
    },
    []
  );

  const fetchInitialData = useCallback(async () => {
    setTicketsState({ status: 'loading' });
    setSummaryState({ status: 'loading' });
    setPaginationError(undefined);

    try {
      const filters = buildFilters(activeTab, activeCategory, searchQuery);
      const [res, summary] = await Promise.all([
        CandidateSupportService.loadMySupportRequests(filters),
        CandidateSupportService.loadMySupportSummary(),
      ]);

      setSummaryState({ status: 'success', data: summary });

      if (!res.items || res.items.length === 0) {
        setTicketsState({ status: 'empty', data: [] });
        setHasMore(false);
        setCursor({});
      } else {
        setTicketsState({ status: 'success', data: res.items });
        setHasMore(res.hasMore);
        setCursor({ nextUpdatedAt: res.nextCursorUpdatedAt, nextId: res.nextCursorId });
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to load support requests.';
      setTicketsState({ status: 'error', message: msg });
      setSummaryState({ status: 'error', message: msg });
    }
  }, [activeTab, activeCategory, searchQuery, buildFilters]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData, user?.id]);

  // Load selected ticket details & messages when selectedTicketId changes
  useEffect(() => {
    if (!selectedTicketId) {
      setSelectedTicket(null);
      setMessagesState({ status: 'empty', data: [] });
      return;
    }

    let isMounted = true;
    setMessagesState({ status: 'loading' });

    Promise.all([
      CandidateSupportService.loadMySupportRequest(selectedTicketId),
      CandidateSupportService.loadMySupportMessages(selectedTicketId),
    ]).then(([t, msgs]) => {
      if (!isMounted) return;
      if (!t) {
        setSelectedTicket(null);
        setMessagesState({ status: 'error', message: 'Support ticket not found.' });
      } else {
        setSelectedTicket(t);
        setMessagesState(msgs.length === 0 ? { status: 'empty', data: [] } : { status: 'success', data: msgs });
      }
    }).catch((err: any) => {
      if (!isMounted) return;
      setMessagesState({ status: 'error', message: err.message || 'Failed to load ticket conversation.' });
    });

    return () => {
      isMounted = false;
    };
  }, [selectedTicketId]);

  const setActiveTab = (tab: SupportTabKey) => {
    setActiveTabState(tab);
  };

  const setActiveCategory = (cat?: CandidateSupportCategory) => {
    setActiveCategoryState(cat);
  };

  const setSearchQuery = (q: string) => {
    setSearchQueryState(q);
  };

  const setSelectedTicketId = (id: string | null) => {
    setSelectedTicketIdState(id);
  };

  const openCreateModal = () => {
    setCreateModal({ isOpen: true, isSubmitting: false });
  };

  const closeCreateModal = () => {
    setCreateModal({ isOpen: false, isSubmitting: false });
  };

  const loadMoreTickets = async () => {
    if (!hasMore || isLoadingMore || ticketsState.status !== 'success') return;

    setIsLoadingMore(true);
    setPaginationError(undefined);

    try {
      const filters = buildFilters(activeTab, activeCategory, searchQuery);
      filters.cursorUpdatedAt = cursor.nextUpdatedAt;
      filters.cursorId = cursor.nextId;

      const res = await CandidateSupportService.loadMySupportRequests(filters);
      const updated = [...ticketsState.data, ...res.items];

      setTicketsState({ status: 'success', data: updated });
      setHasMore(res.hasMore);
      setCursor({ nextUpdatedAt: res.nextCursorUpdatedAt, nextId: res.nextCursorId });
    } catch (err: any) {
      setPaginationError(err.message || 'Failed to load more support requests.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const createTicket = async (payload: CreateSupportTicketPayload): Promise<boolean> => {
    setCreateModal((prev) => ({ ...prev, isSubmitting: true, error: undefined }));

    try {
      const newTicket = await CandidateSupportService.createMySupportRequest(payload);
      setCreateModal({ isOpen: false, isSubmitting: false });
      await fetchInitialData();
      return true;
    } catch (err: any) {
      const msg = err.message || 'Failed to create support request.';
      setCreateModal((prev) => ({ ...prev, isSubmitting: false, error: msg }));
      return false;
    }
  };

  const replyToTicket = async (ticketId: string, messageText: string): Promise<boolean> => {
    if (!selectedTicket) return false;

    setMutation({ status: 'submitting', ticketId, action: 'reply' });

    try {
      const newMsg = await CandidateSupportService.replyToMySupportRequest(
        ticketId,
        messageText,
        selectedTicket.updatedAt
      );

      setMutation({ status: 'success', ticketId, action: 'reply' });

      // Refresh ticket details & messages
      const [refreshedTicket, refreshedMsgs] = await Promise.all([
        CandidateSupportService.loadMySupportRequest(ticketId),
        CandidateSupportService.loadMySupportMessages(ticketId),
      ]);

      if (refreshedTicket) setSelectedTicket(refreshedTicket);
      setMessagesState({ status: 'success', data: refreshedMsgs });

      // Refresh list & summary
      fetchInitialData();
      return true;
    } catch (err: any) {
      const msg = err.message || 'Failed to send reply.';
      const isConflict = msg.toLowerCase().includes('conflict') || msg.toLowerCase().includes('modified');
      setMutation({
        status: isConflict ? 'conflict' : 'error',
        ticketId,
        action: 'reply',
        error: msg,
      });
      return false;
    }
  };

  const closeTicket = async (ticketId: string): Promise<boolean> => {
    const currentObj = selectedTicket?.id === ticketId ? selectedTicket : ticketsState.status === 'success' ? ticketsState.data.find(t => t.id === ticketId) : null;
    if (!currentObj) return false;

    setMutation({ status: 'submitting', ticketId, action: 'close' });

    try {
      const updated = await CandidateSupportService.closeMySupportRequest(ticketId, currentObj.updatedAt);
      setMutation({ status: 'success', ticketId, action: 'close' });

      if (selectedTicket?.id === ticketId) setSelectedTicket(updated);
      fetchInitialData();
      return true;
    } catch (err: any) {
      const msg = err.message || 'Failed to close support request.';
      const isConflict = msg.toLowerCase().includes('conflict');
      setMutation({
        status: isConflict ? 'conflict' : 'error',
        ticketId,
        action: 'close',
        error: msg,
      });
      return false;
    }
  };

  const reopenTicket = async (ticketId: string): Promise<boolean> => {
    const currentObj = selectedTicket?.id === ticketId ? selectedTicket : ticketsState.status === 'success' ? ticketsState.data.find(t => t.id === ticketId) : null;
    if (!currentObj) return false;

    setMutation({ status: 'submitting', ticketId, action: 'reopen' });

    try {
      const updated = await CandidateSupportService.reopenMySupportRequest(ticketId, currentObj.updatedAt);
      setMutation({ status: 'success', ticketId, action: 'reopen' });

      if (selectedTicket?.id === ticketId) setSelectedTicket(updated);
      fetchInitialData();
      return true;
    } catch (err: any) {
      const msg = err.message || 'Failed to reopen support request.';
      const isConflict = msg.toLowerCase().includes('conflict');
      setMutation({
        status: isConflict ? 'conflict' : 'error',
        ticketId,
        action: 'reopen',
        error: msg,
      });
      return false;
    }
  };

  return {
    ticketsState,
    summaryState,
    selectedTicket,
    messagesState,
    activeTab,
    activeCategory,
    searchQuery,
    pagination: {
      hasMore,
      isLoadingMore,
      error: paginationError,
    },
    createModal,
    mutation,
    setActiveTab,
    setActiveCategory,
    setSearchQuery,
    setSelectedTicketId,
    openCreateModal,
    closeCreateModal,
    refreshSupportData: fetchInitialData,
    loadMoreTickets,
    createTicket,
    replyToTicket,
    closeTicket,
    reopenTicket,
  };
}
