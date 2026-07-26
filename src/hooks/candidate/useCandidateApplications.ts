import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { loadMyApplications, withdrawMyApplication } from '../../services/candidate-applications.service';
import type { Application } from '../../lib/supabase/types';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export interface ApplicationsSummary {
  total: number;
  active: number;
  actionRequired: number;
  interviews: number;
  offers: number;
  closed: number;
}

const DEMO_APPLICATIONS: Application[] = [
  {
    id: 'app-demo-1',
    job_id: 'job-101',
    candidate_id: 'cand-demo',
    stage: 'onboarding',
    status: 'submitted',
    submitted_at: '2026-02-10T09:00:00Z',
    updated_at: '2026-02-14T11:00:00Z',
    consent_given: true,
    jobs: {
      id: 'job-101',
      title: 'Customer Service Representative',
      location: 'Dubai, UAE',
      salary_range: '14,000 AED / mo',
      employers: { organisations: { name: 'Horizon Gulf Services LLC' } },
    },
    action_required_message: 'Action Required: Upload missing passport',
  } as any,
  {
    id: 'app-demo-2',
    job_id: 'job-102',
    candidate_id: 'cand-demo',
    stage: 'employer_submitted',
    status: 'employer_submitted',
    submitted_at: '2026-02-05T14:30:00Z',
    updated_at: '2026-02-12T16:20:00Z',
    consent_given: true,
    jobs: {
      id: 'job-102',
      title: 'Administrative Assistant',
      location: 'Abu Dhabi, UAE',
      salary_range: '16,500 AED / mo',
      employers: { organisations: { name: 'Global Tech Solutions' } },
    },
  } as any,
  {
    id: 'app-demo-3',
    job_id: 'job-103',
    candidate_id: 'cand-demo',
    stage: 'employer_interview',
    status: 'employer_interview',
    submitted_at: '2026-01-20T10:15:00Z',
    updated_at: '2026-02-15T08:45:00Z',
    consent_given: true,
    jobs: {
      id: 'job-103',
      title: 'Logistics Coordinator',
      location: 'Sharjah, UAE',
      salary_range: '18,000 AED / mo',
      employers: { organisations: { name: 'TransGulf Logistics' } },
    },
  } as any,
];

export function useCandidateApplications() {
  const { user } = useAuth();
  const [applicationsState, setApplicationsState] = useState<ResourceState<Application[]>>({ status: 'loading' });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!user) return;
    setApplicationsState({ status: 'loading' });

    try {
      const result = await loadMyApplications({
        userId: user.id,
        statusFilter,
        searchQuery,
        page,
        limit: 10,
      });

      const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';

      if (result.applications.length === 0) {
        if (isDemoEnabled && page === 1 && !searchQuery && statusFilter === 'all') {
          setApplicationsState({ status: 'success', data: DEMO_APPLICATIONS });
          setHasMore(false);
        } else {
          setApplicationsState({ status: 'empty', data: [] });
          setHasMore(false);
        }
      } else {
        setApplicationsState({ status: 'success', data: result.applications });
        setHasMore(result.hasMore);
      }
    } catch (err: any) {
      setApplicationsState({
        status: 'error',
        message: err.message || 'Failed to load candidate applications',
      });
    }
  }, [user, statusFilter, searchQuery, page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleWithdraw = async (applicationId: string) => {
    if (!user) return;
    setWithdrawLoading(true);
    setWithdrawError(null);

    try {
      await withdrawMyApplication(user.id, applicationId);
      await fetchApplications();
    } catch (err: any) {
      setWithdrawError(err.message || 'Failed to withdraw application.');
    } finally {
      setWithdrawLoading(false);
    }
  };

  const applicationsList = applicationsState.status === 'success' ? applicationsState.data : [];

  const summary: ApplicationsSummary = {
    total: applicationsList.length,
    active: applicationsList.filter((a) => !['rejected', 'withdrawn', 'closed'].includes(a.status?.toLowerCase())).length,
    actionRequired: applicationsList.filter((a) => (a as any).action_required_message || a.stage === 'onboarding').length,
    interviews: applicationsList.filter((a) => a.stage === 'employer_interview').length,
    offers: applicationsList.filter((a) => ['offer_issued', 'offer_accepted'].includes(a.stage)).length,
    closed: applicationsList.filter((a) => ['rejected', 'withdrawn', 'closed'].includes(a.status?.toLowerCase())).length,
  };

  return {
    applicationsState,
    summary,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    hasMore,
    withdrawLoading,
    withdrawError,
    handleWithdraw,
    refetch: fetchApplications,
  };
}
