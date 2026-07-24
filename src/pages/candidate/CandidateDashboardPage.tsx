import React from 'react';
import CandidateLayout from '../../layouts/CandidateLayout';
import CandidateHeaderBanner from '../../components/candidate/CandidateHeaderBanner';
import CandidateJourneyTracker from '../../components/candidate/CandidateJourneyTracker';
import NextStepCard from '../../components/candidate/NextStepCard';
import ProfileCompletionCard from '../../components/candidate/ProfileCompletionCard';
import DocumentReadinessCard from '../../components/candidate/DocumentReadinessCard';
import RecommendedJobsWidget from '../../components/candidate/RecommendedJobsWidget';
import ActiveApplicationsWidget from '../../components/candidate/ActiveApplicationsWidget';
import CandidateInterviewCard from '../../components/candidate/CandidateInterviewCard';
import ConditionalOfferCard from '../../components/candidate/ConditionalOfferCard';
import CandidatePlacementCard from '../../components/candidate/CandidatePlacementCard';

import { CandidateService } from '../../services/candidate.service';

export default function CandidateDashboardPage() {
  const candidate = CandidateService.getCandidateSummary();
  const nextStep = CandidateService.getNextStep();
  const journeySteps = CandidateService.getJourneySteps();
  const profileSections = CandidateService.getProfileSections();
  const documents = CandidateService.getDocuments();
  const jobs = CandidateService.getRecommendedJobs();
  const applications = CandidateService.getApplications();
  const interviews = CandidateService.getInterviews();
  const offer = CandidateService.getConditionalOffer();
  const placement = CandidateService.getPlacementProgress();

  return (
    <CandidateLayout>
      {/* 1. Dynamic Greeting Header Banner */}
      <CandidateHeaderBanner candidate={candidate} />

      {/* 2. Priority Required Action (Your Next Step) */}
      <NextStepCard step={nextStep} />

      {/* 3. 10-Stage Visual Career Journey Tracker */}
      <CandidateJourneyTracker steps={journeySteps} />

      {/* 4. Profile & Document Readiness Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCompletionCard 
          percentage={candidate.profileCompletionPercent} 
          sections={profileSections} 
        />
        <DocumentReadinessCard documents={documents} />
      </div>

      {/* 5. Active Video Interview & Conditional Offer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interviews.length > 0 && <CandidateInterviewCard interview={interviews[0]} />}
        {offer && <ConditionalOfferCard offer={offer} />}
      </div>

      {/* 6. Active Applications & Mobility Placement Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveApplicationsWidget applications={applications} />
        {placement && <CandidatePlacementCard placement={placement} />}
      </div>

      {/* 7. Recommended UAE Opportunities */}
      <RecommendedJobsWidget jobs={jobs} />
    </CandidateLayout>
  );
}
