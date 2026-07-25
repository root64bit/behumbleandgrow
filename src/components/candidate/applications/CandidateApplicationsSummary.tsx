import React from 'react';
import { Briefcase, AlertTriangle, Video, Gift, CheckCircle2 } from 'lucide-react';
import type { ApplicationsSummary } from '../../../hooks/candidate/useCandidateApplications';

interface Props {
  summary: ApplicationsSummary;
}

export const CandidateApplicationsSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-left">
      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total</span>
          <Briefcase className="w-4 h-4 text-slate-400" />
        </div>
        <div className="text-xl font-black text-[#00122B]">{summary.total}</div>
      </div>

      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider">Active</span>
          <CheckCircle2 className="w-4 h-4 text-[#006D44]" />
        </div>
        <div className="text-xl font-black text-[#006D44]">{summary.active}</div>
      </div>

      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider">Action Required</span>
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xl font-black text-amber-600">{summary.actionRequired}</div>
      </div>

      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider">Interviews</span>
          <Video className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-xl font-black text-purple-600">{summary.interviews}</div>
      </div>

      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1 col-span-2 md:col-span-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider">Offers</span>
          <Gift className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl font-black text-emerald-600">{summary.offers}</div>
      </div>
    </div>
  );
};
