import React from 'react';
import { Clock, Info } from 'lucide-react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';
import { resolvePlacementStatusInfo } from '../../../lib/candidate/placementStatus';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementCurrentStatusCard: React.FC<Props> = ({ placement }) => {
  const statusInfo = resolvePlacementStatusInfo(placement.status);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Status</div>
          <h3 className="text-lg font-bold text-slate-900">{statusInfo.label}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{statusInfo.description}</p>
        </div>
      </div>

      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold">Notice:</span> Official processing times are subject to UAE MOHRE, Immigration authorities and international regulations.
        </p>
      </div>
    </div>
  );
};
