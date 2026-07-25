import React from 'react';
import { useCandidateInterviews } from '../../hooks/candidate/useCandidateInterviews';
import { CandidateInterviewsHeader } from '../../components/candidate/interviews/CandidateInterviewsHeader';
import { CandidateInterviewsSummary } from '../../components/candidate/interviews/CandidateInterviewsSummary';
import { CandidateInterviewsTabs } from '../../components/candidate/interviews/CandidateInterviewsTabs';
import { CandidateInterviewsSearch } from '../../components/candidate/interviews/CandidateInterviewsSearch';
import { CandidateInterviewCard } from '../../components/candidate/interviews/CandidateInterviewCard';
import { CandidateInterviewsPreparationSummary } from '../../components/candidate/interviews/CandidateInterviewsPreparationSummary';
import { CandidateInterviewsSkeleton } from '../../components/candidate/interviews/CandidateInterviewsSkeleton';
import { CandidateInterviewsEmptyState } from '../../components/candidate/interviews/CandidateInterviewsEmptyState';
import { CandidateInterviewsErrorState } from '../../components/candidate/interviews/CandidateInterviewsErrorState';
import { AlertCircle } from 'lucide-react';

export default function CandidateInterviewsPage() {
  const {
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
    refetch,
  } = useCandidateInterviews();

  if (interviewsState.status === 'loading') {
    return <CandidateInterviewsSkeleton />;
  }

  if (interviewsState.status === 'error') {
    return <CandidateInterviewsErrorState message={interviewsState.message} onRetry={refetch} />;
  }

  const metrics =
    metricsState.status === 'success'
      ? metricsState.data
      : {
          upcomingCount: 0,
          actionRequiredCount: 0,
          thisWeekCount: 0,
          completedCount: 0,
          rescheduleRequestedCount: 0,
        };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 text-left">
      {/* Header Bar */}
      <CandidateInterviewsHeader />

      {/* Summary Metrics */}
      <CandidateInterviewsSummary metrics={metrics} />

      {/* Search & Filters Bar */}
      <CandidateInterviewsSearch value={searchQuery} onChange={setSearchQuery} />

      {/* Horizontal Filter Tabs */}
      <CandidateInterviewsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actionRequiredCount={metrics.actionRequiredCount}
      />

      {/* Action Error Banner */}
      {actionError && (
        <div className="p-3.5 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Main List Content */}
      {interviewsState.status === 'empty' ? (
        <CandidateInterviewsEmptyState />
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {interviewsState.data.map((interview) => (
              <CandidateInterviewCard
                key={interview.id}
                interview={interview}
                onConfirmAttendance={handleConfirmAttendance}
                onRequestReschedule={handleRequestReschedule}
                actionLoading={actionLoading}
              />
            ))}
          </div>

          {/* Mandatory Preparation Checklist */}
          <CandidateInterviewsPreparationSummary />
        </div>
      )}
    </div>
  );
}
