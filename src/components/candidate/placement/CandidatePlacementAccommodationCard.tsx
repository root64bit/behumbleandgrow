import React from 'react';
import { Home, ShieldCheck } from 'lucide-react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementAccommodationCard: React.FC<Props> = ({ placement }) => {
  const isConfirmed = placement.accommodationConfirmed;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-left">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Home className="w-4 h-4 text-emerald-600" />
          <span>Housing & Accommodation</span>
        </h3>
        <span
          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
            isConfirmed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {isConfirmed ? 'Housing Arranged' : 'Pending Scheduling'}
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <div className="text-slate-500 font-medium">Accommodation Status</div>
        <p className="font-bold text-slate-900">
          {placement.accommodationType || 'Employer Provided Initial Relocation Accommodation'}
        </p>
        <p className="text-slate-600 text-[11px]">
          Location: {placement.accommodationLocation || 'Dubai, UAE'}
        </p>
      </div>
    </div>
  );
};
