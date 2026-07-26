import React from 'react';
import { Video, Calendar, Clock, Globe, Briefcase } from 'lucide-react';
import type { CandidateInterviewDetailData } from '../../../services/candidate-interview-details.service';
import { formatDualInterviewTime } from '../../../lib/candidate/interviewTime';
import { parseInterviewStatus } from '../../../lib/candidate/interviewStatus';

interface Props {
  detail: CandidateInterviewDetailData;
  onRequestJoin: () => void;
  actionLoading: boolean;
}

export const CandidateInterviewHeroCard: React.FC<Props> = ({ detail, onRequestJoin, actionLoading }) => {
  const timeInfo = formatDualInterviewTime(detail.scheduled_at, detail.candidateProfileTimeZone);
  const canonical = parseInterviewStatus(detail.status);
  const isConfirmed = canonical === 'confirmed';

  return (
    <div className="bg-[#00122B] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-6 text-left">
      {/* Top Details */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#006D44] text-white text-[11px] font-extrabold uppercase tracking-wider">
            {detail.format}
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">{detail.job_title}</h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>{detail.employer_display_name}</span>
          </div>
        </div>

        <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white font-black">
          <Video className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      {/* Dual Time Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
            <span className="font-bold text-white">{timeInfo.dateString}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Local Time</span>
            <span className="font-bold text-white">{timeInfo.candidateLocalTime}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 col-span-2 pt-2 border-t border-slate-800/60">
          <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{timeInfo.uaeTimeZoneLabel}</span>
            <span className="font-bold text-white">{timeInfo.uaeTime}</span>
          </div>
        </div>
      </div>

      {/* Join Action Button */}
      <button
        onClick={onRequestJoin}
        disabled={actionLoading}
        className={`w-full py-3.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
          isConfirmed
            ? 'bg-[#006D44] hover:bg-[#005232] text-white active:scale-95'
            : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
        }`}
      >
        <Video className="w-4 h-4 text-emerald-300" />
        <span>{actionLoading ? 'Verifying Access...' : 'Join Video Interview Room'}</span>
      </button>
    </div>
  );
};
