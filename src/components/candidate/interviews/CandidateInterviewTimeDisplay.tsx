import React from 'react';
import { Calendar, Clock, Globe } from 'lucide-react';
import { formatDualInterviewTime } from '../../../lib/candidate/interviewTime';

interface Props {
  utcScheduledStart?: string | null;
  candidateProfileTimeZone?: string | null;
}

export const CandidateInterviewTimeDisplay: React.FC<Props> = ({ utcScheduledStart, candidateProfileTimeZone }) => {
  const timeInfo = formatDualInterviewTime(utcScheduledStart, candidateProfileTimeZone);

  return (
    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5 text-left">
      <div className="flex items-center gap-2 text-xs font-bold text-[#00122B]">
        <Calendar className="w-4 h-4 text-[#006D44]" />
        <span>{timeInfo.dateString}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200/60">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Local Time ({timeInfo.candidateTimeZoneLabel})</span>
          </div>
          <p className="text-xs font-black text-slate-900">{timeInfo.candidateLocalTime}</p>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
            <Globe className="w-3 h-3 text-slate-400" />
            <span>{timeInfo.uaeTimeZoneLabel}</span>
          </div>
          <p className="text-xs font-black text-slate-900">{timeInfo.uaeTime}</p>
        </div>
      </div>

      {timeInfo.isBrowserFallback && (
        <p className="text-[10px] text-slate-400 italic">Displayed using your device time zone.</p>
      )}
    </div>
  );
};
