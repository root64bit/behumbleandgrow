import React, { useState } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CandidateInterviewListItem } from '../../../services/candidate-interviews.service';
import { CandidateInterviewStatusBadge } from './CandidateInterviewStatusBadge';
import { CandidateInterviewTimeDisplay } from './CandidateInterviewTimeDisplay';
import { CandidateInterviewJoinState } from './CandidateInterviewJoinState';
import { CandidateInterviewConfirmDialog } from './CandidateInterviewConfirmDialog';
import { CandidateInterviewRescheduleDialog } from './CandidateInterviewRescheduleDialog';
import { parseInterviewStatus } from '../../../lib/candidate/interviewStatus';

interface Props {
  interview: CandidateInterviewListItem;
  onConfirmAttendance: (interviewId: string, updatedAt?: string) => Promise<void>;
  onRequestReschedule: (interviewId: string, reason: string, note?: string, updatedAt?: string) => Promise<void>;
  actionLoading: boolean;
}

export const CandidateInterviewCard: React.FC<Props> = ({
  interview,
  onConfirmAttendance,
  onRequestReschedule,
  actionLoading,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  const canonicalStatus = parseInterviewStatus(interview.status);
  const isActionRequired = canonicalStatus === 'awaiting_candidate_confirmation';
  const isConfirmed = canonicalStatus === 'confirmed';
  const isCancelled = canonicalStatus === 'cancelled';

  return (
    <div className={`p-5 bg-white border rounded-2xl shadow-xs space-y-4 text-left transition-all ${
      isActionRequired ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
    }`}>
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            REF: #{interview.id.slice(0, 8).toUpperCase()}
          </span>
          <h3 className="text-base font-extrabold text-[#00122B] leading-tight">{interview.job_title}</h3>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{interview.employer_display_name}</span>
          </div>
        </div>

        <CandidateInterviewStatusBadge status={interview.status} />
      </div>

      {/* Dual Time Display */}
      <CandidateInterviewTimeDisplay
        utcScheduledStart={interview.scheduled_at}
        candidateProfileTimeZone={interview.candidateProfileTimeZone}
      />

      {/* Join & Action Controls */}
      <div className="space-y-2 pt-1">
        <CandidateInterviewJoinState
          utcScheduledStart={interview.scheduled_at}
          durationMinutes={interview.duration_minutes}
          isConfirmed={isConfirmed}
          isCancelled={isCancelled}
          interviewId={interview.id}
        />

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {isActionRequired && (
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="flex-1 py-2 px-3 bg-secondary text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 active:scale-95 transition-all"
            >
              Confirm Attendance
            </button>
          )}

          {!isCancelled && canonicalStatus !== 'completed' && canonicalStatus !== 'reschedule_requested' && (
            <button
              onClick={() => setIsRescheduleOpen(true)}
              className="py-2 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs rounded-xl transition-all"
            >
              Request Reschedule
            </button>
          )}

          <Link
            to={`/candidate/interviews/${interview.id}`}
            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1 transition-all ml-auto"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Modals */}
      {isConfirmOpen && (
        <CandidateInterviewConfirmDialog
          interview={interview}
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={async () => {
            await onConfirmAttendance(interview.id, interview.updated_at);
            setIsConfirmOpen(false);
          }}
          loading={actionLoading}
        />
      )}

      {isRescheduleOpen && (
        <CandidateInterviewRescheduleDialog
          interview={interview}
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
          onSubmit={async (reason, note) => {
            await onRequestReschedule(interview.id, reason, note, interview.updated_at);
            setIsRescheduleOpen(false);
          }}
          loading={actionLoading}
        />
      )}
    </div>
  );
};
