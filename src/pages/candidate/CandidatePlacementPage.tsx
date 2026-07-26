import React from 'react';
import { useCandidatePlacement } from '../../hooks/candidate/useCandidatePlacement';
import { CandidatePlacementHeader } from '../../components/candidate/placement/CandidatePlacementHeader';
import { CandidatePlacementOverview } from '../../components/candidate/placement/CandidatePlacementOverview';
import { CandidatePlacementCurrentStatusCard } from '../../components/candidate/placement/CandidatePlacementCurrentStatusCard';
import { CandidatePlacementNextAction } from '../../components/candidate/placement/CandidatePlacementNextAction';
import { CandidatePlacementTimeline } from '../../components/candidate/placement/CandidatePlacementTimeline';
import { CandidatePlacementDocumentReadinessCard } from '../../components/candidate/placement/CandidatePlacementDocumentReadinessCard';
import { CandidatePlacementWorkPermitCard } from '../../components/candidate/placement/CandidatePlacementWorkPermitCard';
import { CandidatePlacementVisaCard } from '../../components/candidate/placement/CandidatePlacementVisaCard';
import { CandidatePlacementMedicalCard } from '../../components/candidate/placement/CandidatePlacementMedicalCard';
import { CandidatePlacementTravelCard } from '../../components/candidate/placement/CandidatePlacementTravelCard';
import { CandidatePlacementAccommodationCard } from '../../components/candidate/placement/CandidatePlacementAccommodationCard';
import { CandidatePlacementOnboardingCard } from '../../components/candidate/placement/CandidatePlacementOnboardingCard';
import { CandidatePlacementComplianceNotice } from '../../components/candidate/placement/CandidatePlacementComplianceNotice';
import { CandidatePlacementSupportCard } from '../../components/candidate/placement/CandidatePlacementSupportCard';
import { CandidatePlacementSkeleton } from '../../components/candidate/placement/CandidatePlacementSkeleton';
import { CandidatePlacementEmptyState } from '../../components/candidate/placement/CandidatePlacementEmptyState';
import { CandidatePlacementErrorState } from '../../components/candidate/placement/CandidatePlacementErrorState';
import { CandidatePlacementConflictState } from '../../components/candidate/placement/CandidatePlacementConflictState';

export default function CandidatePlacementPage() {
  const {
    placementState,
    roadmapState,
    timelineState,
    actionsState,
    nextAction,
    acknowledgementMutation,
    refreshPlacement,
    completeAcknowledgement,
  } = useCandidatePlacement();

  if (placementState.status === 'loading') {
    return <CandidatePlacementSkeleton />;
  }

  if (placementState.status === 'error') {
    return (
      <CandidatePlacementErrorState
        message={placementState.message}
        onRetry={refreshPlacement}
      />
    );
  }

  if (placementState.status === 'empty' || !placementState.data) {
    return <CandidatePlacementEmptyState />;
  }

  const placement = placementState.data;
  const roadmap = roadmapState.status === 'success' ? roadmapState.data : [];
  const timeline = timelineState.status === 'success' ? timelineState.data : [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left pb-16">
      {/* Header */}
      <CandidatePlacementHeader placement={placement} />

      {/* Overview Hero */}
      <CandidatePlacementOverview placement={placement} roadmap={roadmap} />

      {/* Conflict notice */}
      {acknowledgementMutation.status === 'conflict' && (
        <CandidatePlacementConflictState onReload={refreshPlacement} />
      )}

      {/* Current Status Card */}
      <CandidatePlacementCurrentStatusCard placement={placement} />

      {/* Next Action Priority Card */}
      <CandidatePlacementNextAction action={nextAction} onComplete={completeAcknowledgement} />

      {/* Milestone Timeline */}
      <CandidatePlacementTimeline timeline={timeline} currentStage={placement.relocationStage} />

      {/* Detailed Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CandidatePlacementDocumentReadinessCard />
        <CandidatePlacementMedicalCard placement={placement} />
        <CandidatePlacementWorkPermitCard status={placement.workPermitStatus} reference={placement.workPermitRef} />
        <CandidatePlacementVisaCard status={placement.visaStatus} reference={placement.visaRef} />
        <CandidatePlacementTravelCard placement={placement} />
        <CandidatePlacementAccommodationCard placement={placement} />
        <CandidatePlacementOnboardingCard placement={placement} />
      </div>

      {/* Legal & Support */}
      <CandidatePlacementComplianceNotice />
      <CandidatePlacementSupportCard />
    </div>
  );
}
