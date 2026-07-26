import React from 'react';
import { useCandidateDashboard } from '../../hooks/candidate/useCandidateDashboard';
import CandidateWelcomeCard from '../../components/candidate/CandidateWelcomeCard';
import CandidateNextActionCard from '../../components/candidate/CandidateNextActionCard';
import CandidateJourneyTimeline from '../../components/candidate/CandidateJourneyTimeline';
import CandidateProfileReadiness from '../../components/candidate/CandidateProfileReadiness';
import CandidateDocumentSummary from '../../components/candidate/CandidateDocumentSummary';
import CandidateApplicationsSummary from '../../components/candidate/CandidateApplicationsSummary';
import CandidateInterviewSummary from '../../components/candidate/CandidateInterviewSummary';
import CandidateOfferSummary from '../../components/candidate/CandidateOfferSummary';
import CandidatePlacementSummary from '../../components/candidate/CandidatePlacementSummary';
import CandidateRecommendedJobs from '../../components/candidate/CandidateRecommendedJobs';
import CandidateNotificationSummary from '../../components/candidate/CandidateNotificationSummary';
import CandidateDashboardSkeleton from '../../components/candidate/CandidateDashboardSkeleton';
import CandidateDashboardEmptyState from '../../components/candidate/CandidateDashboardEmptyState';
import CandidateDashboardErrorState from '../../components/candidate/CandidateDashboardErrorState';

export default function CandidateDashboardPage() {
  const {
    summary,
    nextStep,
    journeySteps,
    profileSections,
    documents,
    applications,
    interview,
    offer,
    placement,
    recommendedJobs,
    notifications,
    fatalError,
    isFullLoading,
    refetch
  } = useCandidateDashboard();

  // 1. Full-page Loading State
  if (isFullLoading) {
    return <CandidateDashboardSkeleton />;
  }

  // 2. Fatal Error State (identity resolution failure or RLS block)
  if (fatalError || summary.error) {
    return <CandidateDashboardErrorState onRetry={refetch} />;
  }

  // 3. New Candidate Empty State (when summary is basic and no apps/docs exist)
  const isNewCandidate = 
    (!applications.data || applications.data.length === 0) &&
    (!documents.data || documents.data.length === 0) &&
    (!summary.data || summary.data.profileCompletionPercent < 30);

  if (isNewCandidate) {
    return <CandidateDashboardEmptyState />;
  }

  const summaryData = summary.data!;
  const journeyData = journeySteps.data || [];
  const profileData = profileSections.data || [];
  const docData = documents.data || [];
  const appData = applications.data || [];
  const jobData = recommendedJobs.data || [];
  const notifData = notifications.data || [];

  return (
    <div className="space-y-8 max-w-[1440px] mx-auto text-left pb-12">
      {/* 1. Welcome Greeting Banner & Profile Completeness Bar */}
      <CandidateWelcomeCard summary={summaryData} />

      {/* 2. Urgent Next Action Card */}
      {nextStep.data && <CandidateNextActionCard step={nextStep.data} />}

      {/* 3. Responsive 2-Column Core Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 10-Stage Career Journey Timeline */}
        <div className="space-y-6">
          <CandidateJourneyTimeline steps={journeyData} />
        </div>

        {/* Right Column: Profile, Documents, Interview, Offer, Placement & Active Apps */}
        <div className="space-y-6">
          {/* Profile & Document Readiness Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CandidateProfileReadiness 
              sections={profileData} 
              completionPercent={summaryData.profileCompletionPercent} 
            />
            <CandidateDocumentSummary documents={docData} />
          </div>

          {/* Conditional Offer Card (if active offer exists) */}
          {offer.data && <CandidateOfferSummary offer={offer.data} />}

          {/* Scheduled Interview Card (if upcoming interview exists) */}
          {interview.data && <CandidateInterviewSummary interview={interview.data} />}

          {/* Relocation & Placement Card (if placement record exists) */}
          {placement.data && <CandidatePlacementSummary placement={placement.data} />}

          {/* Active Job Applications Summary */}
          <CandidateApplicationsSummary applications={appData} />
        </div>
      </div>

      {/* 4. Recommended Opportunities Grid */}
      {jobData.length > 0 && <CandidateRecommendedJobs jobs={jobData} />}

      {/* 5. Safe Candidate Notifications */}
      {notifData.length > 0 && <CandidateNotificationSummary notifications={notifData} />}
    </div>
  );
}
