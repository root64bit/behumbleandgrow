import React from 'react';
import { Video, Lock, Clock, ExternalLink } from 'lucide-react';
import { calculateInterviewAccessWindow } from '../../../lib/candidate/interviewAccessWindow';

interface Props {
  utcScheduledStart?: string | null;
  durationMinutes?: number;
  isConfirmed?: boolean;
  isCancelled?: boolean;
  interviewId: string;
}

export const CandidateInterviewJoinState: React.FC<Props> = ({
  utcScheduledStart,
  durationMinutes = 30,
  isConfirmed = false,
  isCancelled = false,
  interviewId,
}) => {
  const windowInfo = calculateInterviewAccessWindow(
    utcScheduledStart,
    durationMinutes,
    isConfirmed,
    isCancelled
  );

  if (windowInfo.state === 'available_now') {
    return (
      <a
        href={`/candidate/interviews/${interviewId}?action=join`}
        className="w-full py-2.5 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <Video className="w-4 h-4 text-emerald-300" />
        <span>Join Video Room</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    );
  }

  if (windowInfo.state === 'available_soon') {
    return (
      <div className="w-full py-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
        <span>{windowInfo.label}</span>
      </div>
    );
  }

  if (windowInfo.state === 'not_confirmed') {
    return (
      <div className="w-full py-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-amber-600" />
        <span>Confirm attendance to activate room access</span>
      </div>
    );
  }

  return (
    <div className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5">
      <Lock className="w-3.5 h-3.5" />
      <span>{windowInfo.label}</span>
    </div>
  );
};
