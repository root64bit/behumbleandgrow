import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  loadMyOfferDetails,
  loadMyOfferDecisionHistory,
  requestMyOfferDocumentAccess,
  acceptMyOffer,
  declineMyOffer,
  CandidateOfferDetails,
  CandidateOfferDecisionEvent,
  AcceptOfferPayload,
  DeclineOfferPayload,
} from '../../services/candidate-offer-details.service';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

export function useCandidateOfferDetails(offerId: string) {
  const { user } = useAuth();
  const userId = user?.id || 'cand-user-1';

  const [offerState, setOfferState] = useState<ResourceState<CandidateOfferDetails>>({ status: 'loading' });
  const [historyState, setHistoryState] = useState<ResourceState<CandidateOfferDecisionEvent[]>>({ status: 'loading' });

  const [documentState, setDocumentState] = useState<{
    status: 'idle' | 'checking' | 'available' | 'unavailable' | 'error';
    url?: string;
    error?: string;
  }>({ status: 'idle' });

  const [acceptanceState, setAcceptanceState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    error?: string;
  }>({ status: 'idle' });

  const [declineState, setDeclineState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    error?: string;
  }>({ status: 'idle' });

  const fetchDetails = useCallback(async () => {
    if (!offerId) {
      setOfferState({ status: 'not_found' });
      return;
    }

    setOfferState({ status: 'loading' });
    setHistoryState({ status: 'loading' });

    try {
      const [offer, history] = await Promise.all([
        loadMyOfferDetails(userId, offerId),
        loadMyOfferDecisionHistory(userId, offerId),
      ]);

      if (!offer) {
        setOfferState({ status: 'not_found' });
      } else {
        setOfferState({ status: 'success', data: offer });
      }

      setHistoryState({ status: 'success', data: history });
    } catch (err: any) {
      setOfferState({
        status: 'error',
        message: err?.message || 'We could not load this conditional offer.',
      });
    }
  }, [userId, offerId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const requestDocument = async () => {
    setDocumentState({ status: 'checking' });
    try {
      const res = await requestMyOfferDocumentAccess(userId, offerId);
      setDocumentState({ status: 'available', url: res.signedUrl });
    } catch (err: any) {
      setDocumentState({ status: 'error', error: err?.message || 'Could not load offer document.' });
    }
  };

  const clearDocumentPreview = () => {
    setDocumentState({ status: 'idle' });
  };

  const submitAcceptance = async (payload: AcceptOfferPayload) => {
    setAcceptanceState({ status: 'submitting' });
    try {
      const currentExpectedUpdatedAt = offerState.status === 'success' ? offerState.data.updated_at : undefined;
      const res = await acceptMyOffer(userId, offerId, {
        ...payload,
        expectedUpdatedAt: currentExpectedUpdatedAt,
      });

      if (res.conflict) {
        setAcceptanceState({ status: 'conflict', error: res.message });
      } else if (res.success) {
        setAcceptanceState({ status: 'success' });
        await fetchDetails();
      } else {
        setAcceptanceState({ status: 'error', error: res.message || 'Acceptance failed.' });
      }
    } catch (err: any) {
      setAcceptanceState({ status: 'error', error: err?.message || 'Failed to submit acceptance.' });
    }
  };

  const submitDecline = async (payload: DeclineOfferPayload) => {
    setDeclineState({ status: 'submitting' });
    try {
      const currentExpectedUpdatedAt = offerState.status === 'success' ? offerState.data.updated_at : undefined;
      const res = await declineMyOffer(userId, offerId, {
        ...payload,
        expectedUpdatedAt: currentExpectedUpdatedAt,
      });

      if (res.conflict) {
        setDeclineState({ status: 'conflict', error: res.message });
      } else if (res.success) {
        setDeclineState({ status: 'success' });
        await fetchDetails();
      } else {
        setDeclineState({ status: 'error', error: res.message || 'Decline failed.' });
      }
    } catch (err: any) {
      setDeclineState({ status: 'error', error: err?.message || 'Failed to submit decline.' });
    }
  };

  return {
    offerState,
    historyState,
    documentState,
    acceptanceState,
    declineState,
    requestDocument,
    clearDocumentPreview,
    submitAcceptance,
    submitDecline,
    refetch: fetchDetails,
  };
}
