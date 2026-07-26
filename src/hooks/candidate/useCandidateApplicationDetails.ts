import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  loadMyApplicationDetails,
  withdrawMyApplicationConcurrencySafe,
  type CandidateApplicationDetailsData,
} from '../../services/candidate-application-details.service';
import { mapStatusHistoryToTimelineEvents, type CandidateTimelineEvent } from '../../lib/candidate/applicationTimeline';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

const DEMO_APPLICATION_DETAILS: CandidateApplicationDetailsData = {
  application: {
    id: 'app-demo-14589',
    job_id: 'job-101',
    candidate_id: 'cand-demo',
    stage: 'employer_submitted',
    status: 'employer_submitted',
    submitted_at: '2026-02-10T09:00:00Z',
    updated_at: '2026-02-14T11:00:00Z',
    consent_given: true,
    employer_disclosure_status: 'disclosed',
    jobs: {
      id: 'job-101',
      title: 'Customer Service Representative',
      location: 'Dubai, UAE',
      salary_range: '14,000 AED / mo',
      employers: { organisations: { name: 'Horizon Gulf Services LLC' } },
    },
    action_required_message: undefined,
  } as any,
  timeline: [
    {
      id: 'hist-1',
      entity_type: 'application',
      entity_id: 'app-demo-14589',
      new_status: 'submitted',
      user_role: 'candidate',
      created_at: '2026-02-10T09:00:00Z',
      candidate_message: 'Application dossier received.',
    },
    {
      id: 'hist-2',
      entity_type: 'application',
      entity_id: 'app-demo-14589',
      new_status: 'onboarding',
      user_role: 'candidate',
      created_at: '2026-02-11T14:20:00Z',
      candidate_message: 'Credential verification passed.',
    },
    {
      id: 'hist-3',
      entity_type: 'application',
      entity_id: 'app-demo-14589',
      new_status: 'employer_submitted',
      user_role: 'candidate',
      created_at: '2026-02-14T11:00:00Z',
      candidate_message: 'Dossier presented to employer hiring team.',
    },
  ] as any,
  screeningAnswers: {
    'years_experience': '5+ years in hospitality & customer operations',
    'uae_residency': 'Resident visa ready for transfer',
    'notice_period': 'Immediate availability (15 days notice)',
  },
  documents: [
    {
      id: 'doc-1',
      candidate_id: 'cand-demo',
      document_type: 'candidate-cv',
      file_name: 'Amina_Mabote_CV.pdf',
      verification_status: 'approved',
      uploaded_at: '2026-02-10T09:05:00Z',
    } as any,
    {
      id: 'doc-2',
      candidate_id: 'cand-demo',
      document_type: 'candidate-identity',
      file_name: 'Passport_Scan.pdf',
      verification_status: 'approved',
      expiry_date: '2029-08-20',
      uploaded_at: '2026-02-10T09:10:00Z',
    } as any,
  ],
  interview: null,
  offer: null,
  placement: null,
};

export function useCandidateApplicationDetails(applicationId?: string) {
  const { user } = useAuth();
  const [detailsState, setDetailsState] = useState<ResourceState<CandidateApplicationDetailsData>>({ status: 'loading' });
  const [activeTab, setActiveTab] = useState<'overview' | 'screening' | 'documents' | 'payment'>('overview');
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!user || !applicationId) return;
    setDetailsState({ status: 'loading' });

    try {
      const data = await loadMyApplicationDetails(user.id, applicationId);
      const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';

      if (!data) {
        if (isDemoEnabled && (applicationId === 'app-demo-14589' || applicationId === 'demo')) {
          setDetailsState({ status: 'success', data: DEMO_APPLICATION_DETAILS });
        } else {
          setDetailsState({ status: 'not_found' });
        }
      } else {
        setDetailsState({ status: 'success', data });
      }
    } catch (err: any) {
      setDetailsState({
        status: 'error',
        message: err.message || 'Failed to load application details',
      });
    }
  }, [user, applicationId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleWithdraw = async () => {
    if (!user || !applicationId || detailsState.status !== 'success') return;
    setWithdrawLoading(true);
    setWithdrawError(null);

    try {
      await withdrawMyApplicationConcurrencySafe(
        user.id,
        applicationId,
        detailsState.data.application.updated_at
      );
      await fetchDetails();
    } catch (err: any) {
      setWithdrawError(err.message || 'Failed to withdraw application.');
    } finally {
      setWithdrawLoading(false);
    }
  };

  const timelineEvents: CandidateTimelineEvent[] =
    detailsState.status === 'success' ? mapStatusHistoryToTimelineEvents(detailsState.data.timeline) : [];

  return {
    detailsState,
    timelineEvents,
    activeTab,
    setActiveTab,
    withdrawLoading,
    withdrawError,
    handleWithdraw,
    refetch: fetchDetails,
  };
}
