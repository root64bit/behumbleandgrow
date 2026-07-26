import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCandidateInterviewDetails } from '../../hooks/candidate/useCandidateInterviewDetails';
import { CandidateInterviewDetailsHeader } from '../../components/candidate/interview-details/CandidateInterviewDetailsHeader';
import { CandidateInterviewHeroCard } from '../../components/candidate/interview-details/CandidateInterviewHeroCard';
import { CandidateInterviewAttendanceCard } from '../../components/candidate/interview-details/CandidateInterviewAttendanceCard';
import { CandidateInterviewPreparationChecklist } from '../../components/candidate/interview-details/CandidateInterviewPreparationChecklist';
import { CandidateInterviewRequiredDocuments } from '../../components/candidate/interview-details/CandidateInterviewRequiredDocuments';
import { CandidateInterviewInstructions } from '../../components/candidate/interview-details/CandidateInterviewInstructions';
import { CandidateInterviewJobContext } from '../../components/candidate/interview-details/CandidateInterviewJobContext';
import { CandidateInterviewRescheduleModal } from '../../components/candidate/interview-details/CandidateInterviewRescheduleModal';
import { CandidateInterviewDetailsSkeleton } from '../../components/candidate/interview-details/CandidateInterviewDetailsSkeleton';
import { CandidateInterviewDetailsNotFound } from '../../components/candidate/interview-details/CandidateInterviewDetailsNotFound';
import { CandidateInterviewDetailsErrorState } from '../../components/candidate/interview-details/CandidateInterviewDetailsErrorState';
import { AlertCircle } from 'lucide-react';

export default function CandidateInterviewDetailsPage() {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  const {
    detailState,
    actionLoading,
    actionError,
    meetingAccessResult,
    handleConfirmAttendance,
    handleRequestReschedule,
    handleRequestMeetingAccess,
    togglePreparationItem,
    refetch,
  } = useCandidateInterviewDetails(interviewId);

  if (detailState.status === 'loading') {
    return <CandidateInterviewDetailsSkeleton />;
  }

  if (detailState.status === 'not_found') {
    return <CandidateInterviewDetailsNotFound />;
  }

  if (detailState.status === 'error') {
    return <CandidateInterviewDetailsErrorState message={detailState.message} onRetry={refetch} />;
  }

  const detail = detailState.data;

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-24 text-left">
      {/* Header Bar */}
      <CandidateInterviewDetailsHeader interviewId={detail.id} />

      {/* Action / Security Error Banner */}
      {actionError && (
        <div className="p-3.5 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Meeting Access Failure Banner */}
      {meetingAccessResult && !meetingAccessResult.success && (
        <div className="p-3.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>{meetingAccessResult.message}</span>
        </div>
      )}

      {/* Hero Card with Video Join CTA */}
      <CandidateInterviewHeroCard
        detail={detail}
        onRequestJoin={handleRequestMeetingAccess}
        actionLoading={actionLoading}
      />

      {/* Application & Role Summary Context */}
      <CandidateInterviewJobContext
        jobId={detail.job_id}
        jobTitle={detail.job_title}
        applicationId={detail.application_id}
        employerDisplayName={detail.employer_display_name}
      />

      {/* Attendance Confirmation Status Card */}
      <CandidateInterviewAttendanceCard
        detail={detail}
        onConfirm={handleConfirmAttendance}
        onOpenReschedule={() => setIsRescheduleOpen(true)}
        loading={actionLoading}
      />

      {/* Preparation Checklist */}
      <CandidateInterviewPreparationChecklist
        items={detail.preparationItems}
        onToggleItem={togglePreparationItem}
      />

      {/* Required Documents Status */}
      <CandidateInterviewRequiredDocuments documents={detail.requiredDocuments} />

      {/* Candidate Instructions */}
      <CandidateInterviewInstructions instructions={detail.instructions} />

      {/* Reschedule Modal */}
      {isRescheduleOpen && (
        <CandidateInterviewRescheduleModal
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
          onSubmit={async (reason, note) => {
            await handleRequestReschedule(reason, note);
            setIsRescheduleOpen(false);
          }}
          loading={actionLoading}
        />
      )}
    </div>
  );
}
