import React, { useState } from 'react';
import { useCandidateApplications } from '../../hooks/candidate/useCandidateApplications';
import { CandidateApplicationsHeader } from '../../components/candidate/applications/CandidateApplicationsHeader';
import { CandidateApplicationsSummary } from '../../components/candidate/applications/CandidateApplicationsSummary';
import { CandidateApplicationsTabs } from '../../components/candidate/applications/CandidateApplicationsTabs';
import { CandidateApplicationCard } from '../../components/candidate/applications/CandidateApplicationCard';
import { CandidateApplicationsPagination } from '../../components/candidate/applications/CandidateApplicationsPagination';
import { CandidateApplicationsEmptyState } from '../../components/candidate/applications/CandidateApplicationsEmptyState';
import { CandidateApplicationsNoResults } from '../../components/candidate/applications/CandidateApplicationsNoResults';
import { CandidateApplicationsSkeleton } from '../../components/candidate/applications/CandidateApplicationsSkeleton';
import { CandidateApplicationsErrorState } from '../../components/candidate/applications/CandidateApplicationsErrorState';
import { CandidateApplicationsSectionError } from '../../components/candidate/applications/CandidateApplicationsSectionError';
import type { Application } from '../../lib/supabase/types';

export default function CandidateApplicationsPage() {
  const {
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
    refetch,
  } = useCandidateApplications();

  const [withdrawTargetApp, setWithdrawTargetApp] = useState<Application | null>(null);

  if (applicationsState.status === 'loading') {
    return <CandidateApplicationsSkeleton />;
  }

  if (applicationsState.status === 'error') {
    return <CandidateApplicationsErrorState message={applicationsState.message} onRetry={refetch} />;
  }

  const applicationsList = applicationsState.status === 'success' ? applicationsState.data : [];

  const handleConfirmWithdraw = async () => {
    if (!withdrawTargetApp) return;
    await handleWithdraw(withdrawTargetApp.id);
    setWithdrawTargetApp(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 text-left">
      {/* Page Header with Search & Primary Action */}
      <CandidateApplicationsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Summary Metrics */}
      <CandidateApplicationsSummary summary={summary} />

      {/* Status Tabs Navigation */}
      <CandidateApplicationsTabs activeTab={statusFilter} onTabChange={setStatusFilter} />

      {/* Withdrawal Error Notice */}
      {withdrawError && (
        <CandidateApplicationsSectionError message={withdrawError} onRetry={refetch} />
      )}

      {/* Content Rendering */}
      {applicationsState.status === 'empty' ? (
        <CandidateApplicationsEmptyState />
      ) : applicationsList.length === 0 ? (
        <CandidateApplicationsNoResults
          onClearFilters={() => {
            setStatusFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {applicationsList.map((app) => (
            <CandidateApplicationCard
              key={app.id}
              application={app}
              onWithdrawClick={setWithdrawTargetApp}
            />
          ))}

          {/* Pagination */}
          <CandidateApplicationsPagination
            page={page}
            hasMore={hasMore}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Withdrawal Confirmation Dialog */}
      {withdrawTargetApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-extrabold text-[#00122B]">Confirm Application Withdrawal</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to withdraw your application for{' '}
              <span className="font-bold text-slate-900">
                {(withdrawTargetApp as any).jobs?.title || 'this position'}
              </span>
              ? This action will mark your dossier as withdrawn.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setWithdrawTargetApp(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdraw}
                disabled={withdrawLoading}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                {withdrawLoading ? 'Withdrawing...' : 'Withdraw Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
