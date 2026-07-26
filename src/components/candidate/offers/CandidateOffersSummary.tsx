import React from 'react';
import { CandidateOfferSummaryMetrics } from '../../../services/candidate-offers.service';

interface Props {
  summary?: CandidateOfferSummaryMetrics;
  loading?: boolean;
}

export const CandidateOffersSummary: React.FC<Props> = ({ summary, loading }) => {
  if (loading || !summary) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Offers</p>
        <p className="text-2xl font-extrabold text-[#00122B]">{summary.total}</p>
      </div>

      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl shadow-xs space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Action Required</p>
        <p className="text-2xl font-extrabold text-amber-900">{summary.actionRequired}</p>
      </div>

      <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl shadow-xs space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Accepted</p>
        <p className="text-2xl font-extrabold text-emerald-900">{summary.accepted}</p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Expiring Soon</p>
        <p className="text-2xl font-extrabold text-rose-700">{summary.expiringSoon}</p>
      </div>
    </div>
  );
};
