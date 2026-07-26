import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  loadMyOffers,
  loadMyOfferSummary,
  CandidateOfferListItem,
  CandidateOfferSummaryMetrics,
  CandidateOfferFilters,
} from '../../services/candidate-offers.service';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export function useCandidateOffers() {
  const { user } = useAuth();
  const userId = user?.id || 'cand-user-1';

  const [offersState, setOffersState] = useState<ResourceState<CandidateOfferListItem[]>>({ status: 'loading' });
  const [summaryState, setSummaryState] = useState<ResourceState<CandidateOfferSummaryMetrics>>({ status: 'loading' });
  const [filters, setFilters] = useState<CandidateOfferFilters>({ tab: 'all', sortBy: 'expiring_soonest' });

  const fetchData = useCallback(async () => {
    setOffersState({ status: 'loading' });

    try {
      const [resOffers, resSummary] = await Promise.all([
        loadMyOffers(userId, filters),
        loadMyOfferSummary(userId),
      ]);

      if (resOffers.offers.length === 0) {
        setOffersState({ status: 'empty', data: [] });
      } else {
        setOffersState({ status: 'success', data: resOffers.offers });
      }

      setSummaryState({ status: 'success', data: resSummary });
    } catch (err: any) {
      setOffersState({
        status: 'error',
        message: err?.message || 'We could not load your conditional offers. Please try again.',
      });
      setSummaryState({
        status: 'error',
        message: 'Could not load summary metrics.',
      });
    }
  }, [userId, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = (newFilters: Partial<CandidateOfferFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ tab: 'all', searchQuery: '', sortBy: 'expiring_soonest' });
  };

  return {
    offersState,
    summaryState,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchData,
  };
}
