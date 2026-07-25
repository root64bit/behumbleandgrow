import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  loadMyInterviews,
  loadMyInterviewSummaryMetrics,
  confirmMyAttendanceConcurrencySafe,
  requestMyInterviewRescheduleConcurrencySafe,
  type CandidateInterviewListItem,
  type CandidateInterviewSummaryMetrics,
} from '../../services/candidate-interviews.service';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty' }
  | { status: 'error'; message: string };

const DEMO_INTERVIEWS: CandidateInterviewListItem[] = [
  {
    id: 'int-demo-101',
    application_id: 'app-demo-1',
    job_id: 'job-101',
    job_title: 'Senior Product Designer',
    employer_display_name: 'Global Nexus Innovations',
    scheduled_at: '2026-07-30T10:00:00Z',
    duration_minutes: 45,
    format: 'Video Interview',
    status: 'awaiting_candidate_confirmation',
    meetingLinkAvailable: true,
    updated_at: '2026-07-25T12:00:00Z',
  },
  {
    id: 'int-demo-102',
    application_id: 'app-demo-2',
    job_id: 'job-102',
    job_title: 'Lead UX Researcher',
    employer_display_name: 'Urban Flow Dynamics',
    scheduled_at: '2026-07-30T14:30:00Z',
    duration_minutes: 60,
    format: 'Video Interview',
    status: 'confirmed',
    meetingLinkAvailable: true,
    updated_at: '2026-07-25T13:00:00Z',
  },
  {
    id: 'int-demo-103',
    application_id: 'app-demo-3',
    job_id: 'job-103',
    job_title: 'Data Analyst',
    employer_display_name: 'EcoFreight Solutions',
    scheduled_at: '2026-07-31T09:00:00Z',
    duration_minutes: 30,
    format: 'Video Interview',
    status: 'awaiting_employer_confirmation',
    meetingLinkAvailable: false,
    updated_at: '2026-07-25T14:00:00Z',
  },
];

const DEMO_METRICS: CandidateInterviewSummaryMetrics = {
  upcomingCount: 3,
  actionRequiredCount: 1,
  thisWeekCount: 3,
  completedCount: 2,
  rescheduleRequestedCount: 0,
};

export function useCandidateInterviews() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'action_required' | 'completed' | 'rescheduled' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [interviewsState, setInterviewsState] = useState<ResourceState<CandidateInterviewListItem[]>>({ status: 'loading' });
  const [metricsState, setMetricsState] = useState<ResourceState<CandidateInterviewSummaryMetrics>>({ status: 'loading' });

  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchInterviews = useCallback(async () => {
    if (!user) return;
    setInterviewsState({ status: 'loading' });
    setMetricsState({ status: 'loading' });

    try {
      const res = await loadMyInterviews({
        userId: user.id,
        tabFilter: activeTab,
        searchQuery,
      });

      const metrics = await loadMyInterviewSummaryMetrics(user.id);
      const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';

      if (res.interviews.length === 0) {
        if (isDemoEnabled) {
          let filteredDemo = DEMO_INTERVIEWS;
          if (activeTab === 'action_required') {
            filteredDemo = DEMO_INTERVIEWS.filter((i) => i.status === 'awaiting_candidate_confirmation');
          } else if (activeTab === 'completed') {
            filteredDemo = [];
          } else if (activeTab === 'rescheduled') {
            filteredDemo = [];
          }

          if (filteredDemo.length === 0) {
            setInterviewsState({ status: 'empty' });
          } else {
            setInterviewsState({ status: 'success', data: filteredDemo });
          }
          setMetricsState({ status: 'success', data: DEMO_METRICS });
        } else {
          setInterviewsState({ status: 'empty' });
          setMetricsState({ status: 'success', data: metrics });
        }
      } else {
        setInterviewsState({ status: 'success', data: res.interviews });
        setMetricsState({ status: 'success', data: metrics });
      }
    } catch (err: any) {
      setInterviewsState({
        status: 'error',
        message: err.message || 'Failed to load interviews.',
      });
      setMetricsState({
        status: 'error',
        message: 'Could not load summary metrics.',
      });
    }
  }, [user, activeTab, searchQuery]);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const handleConfirmAttendance = async (interviewId: string, expectedUpdatedAt?: string) => {
    if (!user) return;
    setActionLoading(true);
    setActionError(null);

    try {
      await confirmMyAttendanceConcurrencySafe(user.id, interviewId, expectedUpdatedAt);
      await fetchInterviews();
    } catch (err: any) {
      setActionError(err.message || 'Failed to confirm attendance.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestReschedule = async (
    interviewId: string,
    reason: string,
    candidateNote?: string,
    expectedUpdatedAt?: string
  ) => {
    if (!user) return;
    setActionLoading(true);
    setActionError(null);

    try {
      await requestMyInterviewRescheduleConcurrencySafe(user.id, interviewId, reason, candidateNote, expectedUpdatedAt);
      await fetchInterviews();
    } catch (err: any) {
      setActionError(err.message || 'Failed to submit reschedule request.');
    } finally {
      setActionLoading(false);
    }
  };

  return {
    profile,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    interviewsState,
    metricsState,
    actionLoading,
    actionError,
    handleConfirmAttendance,
    handleRequestReschedule,
    refetch: fetchInterviews,
  };
}
