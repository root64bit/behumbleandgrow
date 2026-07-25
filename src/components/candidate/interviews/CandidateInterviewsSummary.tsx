import React from 'react';
import { Calendar, AlertCircle, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import type { CandidateInterviewSummaryMetrics } from '../../../services/candidate-interviews.service';

interface Props {
  metrics: CandidateInterviewSummaryMetrics;
}

export const CandidateInterviewsSummary: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Upcoming</span>
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-xl font-black text-[#00122B]">{metrics.upcomingCount}</p>
      </div>

      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl shadow-xs space-y-1">
        <div className="flex items-center justify-between text-amber-800">
          <span className="text-[11px] font-bold uppercase tracking-wider">Action Required</span>
          <AlertCircle className="w-4 h-4 text-amber-600" />
        </div>
        <p className="text-xl font-black text-amber-900">{metrics.actionRequiredCount}</p>
      </div>

      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs space-y-1">
        <div className="flex items-center justify-between text-[#006D44]">
          <span className="text-[11px] font-bold uppercase tracking-wider">This Week</span>
          <Clock className="w-4 h-4 text-[#006D44]" />
        </div>
        <p className="text-xl font-black text-[#006D44]">{metrics.thisWeekCount}</p>
      </div>

      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
          <CheckCircle2 className="w-4 h-4 text-slate-500" />
        </div>
        <p className="text-xl font-black text-slate-800">{metrics.completedCount}</p>
      </div>
    </div>
  );
};
