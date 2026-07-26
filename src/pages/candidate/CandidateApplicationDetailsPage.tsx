import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCandidateApplicationDetails } from '../../hooks/candidate/useCandidateApplicationDetails';
import { CandidateApplicationDetailsHeader } from '../../components/candidate/application-details/CandidateApplicationDetailsHeader';
import { CandidateApplicationJobSummary } from '../../components/candidate/application-details/CandidateApplicationJobSummary';
import { CandidateApplicationRoadmap } from '../../components/candidate/application-details/CandidateApplicationRoadmap';
import { CandidateApplicationStageTimeline } from '../../components/candidate/application-details/CandidateApplicationStageTimeline';
import { CandidateApplicationScreeningSummary } from '../../components/candidate/application-details/CandidateApplicationScreeningSummary';
import { CandidateApplicationDocumentRequirements } from '../../components/candidate/application-details/CandidateApplicationDocumentRequirements';
import { CandidateApplicationInterviewSummary } from '../../components/candidate/application-details/CandidateApplicationInterviewSummary';
import { CandidateApplicationOfferSummary } from '../../components/candidate/application-details/CandidateApplicationOfferSummary';
import { CandidateApplicationPlacementSummary } from '../../components/candidate/application-details/CandidateApplicationPlacementSummary';
import { CandidateApplicationPaymentNotice } from '../../components/candidate/application-details/CandidateApplicationPaymentNotice';
import { CandidateApplicationSupportCard } from '../../components/candidate/application-details/CandidateApplicationSupportCard';
import { CandidateApplicationDetailsSkeleton } from '../../components/candidate/application-details/CandidateApplicationDetailsSkeleton';
import { CandidateApplicationDetailsNotFound } from '../../components/candidate/application-details/CandidateApplicationDetailsNotFound';
import { CandidateApplicationDetailsErrorState } from '../../components/candidate/application-details/CandidateApplicationDetailsErrorState';
import { CandidateApplicationStatusBadge } from '../../components/candidate/applications/CandidateApplicationStatusBadge';
import { resolveCandidateNextAction } from '../../lib/candidate/applicationNextAction';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function CandidateApplicationDetailsPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const {
    detailsState,
    timelineEvents,
    activeTab,
    setActiveTab,
    withdrawLoading,
    withdrawError,
    handleWithdraw,
    refetch,
  } = useCandidateApplicationDetails(applicationId);

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  if (detailsState.status === 'loading') {
    return <CandidateApplicationDetailsSkeleton />;
  }

  if (detailsState.status === 'not_found') {
    return <CandidateApplicationDetailsNotFound />;
  }

  if (detailsState.status === 'error') {
    return <CandidateApplicationDetailsErrorState message={detailsState.message} onRetry={refetch} />;
  }

  const { application, screeningAnswers, documents, interview, offer, placement } = detailsState.data;
  const nextAction = resolveCandidateNextAction(application as any);

  const subTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'screening', label: 'Screening Answers' },
    { id: 'documents', label: 'Documents' },
    { id: 'payment', label: 'Payment' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 text-left">
      {/* Top Bar Header with Candidate Avatar / Initials */}
      <CandidateApplicationDetailsHeader />

      {/* Primary Status Banner */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-slate-400 block">Current Status</span>
          <div className="mt-0.5">
            <CandidateApplicationStatusBadge status={application.status} />
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 block">Application Ref</span>
          <span className="text-xs font-mono font-bold text-[#00122B]">
            #{application.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Required Candidate Next Action Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-extrabold text-[#006D44] uppercase tracking-wider block">
            {nextAction.title}
          </span>
          <p className="text-xs text-slate-700 font-medium">{nextAction.description}</p>
        </div>
        <Link
          to={nextAction.route}
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1 flex-shrink-0"
        >
          <span>{nextAction.buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Job Summary Card with Employer Disclosure */}
      <CandidateApplicationJobSummary application={application} />

      {/* Sticky Sub-Navigation Tabs */}
      <div className="sticky top-16 bg-[#FAF9FC] z-30 pt-1 pb-2 border-b border-slate-200">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#006D44] text-[#006D44]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Authoritative 8-Stage Progress Roadmap */}
          <CandidateApplicationRoadmap stage={application.stage} />

          {/* Connected Resource Summary Cards */}
          <CandidateApplicationInterviewSummary interview={interview} />
          <CandidateApplicationOfferSummary offer={offer} />
          <CandidateApplicationPlacementSummary placement={placement} />

          {/* Actual Historical Activity Timeline */}
          <CandidateApplicationStageTimeline events={timelineEvents} />

          {/* Support Escalation */}
          <CandidateApplicationSupportCard applicationId={application.id} />
        </div>
      )}

      {activeTab === 'screening' && (
        <CandidateApplicationScreeningSummary screeningAnswers={screeningAnswers} />
      )}

      {activeTab === 'documents' && (
        <CandidateApplicationDocumentRequirements documents={documents} />
      )}

      {activeTab === 'payment' && (
        <CandidateApplicationPaymentNotice />
      )}

      {/* Withdrawal Option */}
      {!['placed', 'withdrawn', 'rejected'].includes(application.status) && (
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="text-xs text-slate-500 hover:text-red-700 font-semibold"
          >
            Withdraw Application
          </button>
        </div>
      )}

      {/* Withdrawal Modal Dialog */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-extrabold text-[#00122B]">Confirm Withdrawal</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to withdraw this application? This action is permanent and will notify recruitment operations.
            </p>

            {withdrawError && (
              <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{withdrawError}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsWithdrawOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleWithdraw();
                  setIsWithdrawOpen(false);
                }}
                disabled={withdrawLoading}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                {withdrawLoading ? 'Processing...' : 'Withdraw Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
