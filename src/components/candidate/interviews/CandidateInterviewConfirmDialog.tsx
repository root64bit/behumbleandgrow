import React from 'react';
import { CheckCircle2, AlertTriangle, Calendar, Clock } from 'lucide-react';
import type { CandidateInterviewListItem } from '../../../services/candidate-interviews.service';
import { formatDualInterviewTime } from '../../../lib/candidate/interviewTime';

interface Props {
  interview: CandidateInterviewListItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export const CandidateInterviewConfirmDialog: React.FC<Props> = ({
  interview,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;
  const timeInfo = formatDualInterviewTime(interview.scheduled_at, interview.candidateProfileTimeZone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 text-left">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#006D44]" />
          <h3 className="text-base font-extrabold text-[#00122B]">Confirm Interview Attendance</h3>
        </div>

        <p className="text-xs text-slate-600">
          Please confirm your availability for this video interview slot with{' '}
          <span className="font-bold text-[#00122B]">{interview.employer_display_name}</span>.
        </p>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
          <div className="font-bold text-slate-900">{interview.job_title}</div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeInfo.dateString}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Local: {timeInfo.candidateLocalTime} | UAE: {timeInfo.uaeTime}</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 text-[#006D44] border border-emerald-200 rounded-xl text-[11px]">
          Confirming attendance reserves your slot and sends a notification to the employer recruitment team.
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-secondary hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            {loading ? 'Confirming...' : 'I Confirm Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
};
