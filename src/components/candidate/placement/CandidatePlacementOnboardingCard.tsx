import React from 'react';
import { Building2, Calendar } from 'lucide-react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementOnboardingCard: React.FC<Props> = ({ placement }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-left">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-purple-600" />
          <span>Employer Onboarding</span>
        </h3>
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
          {placement.onboardingStatus}
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <div className="text-slate-500 font-medium">Onboarding Employer</div>
        <p className="font-bold text-slate-900">{placement.employerDisplayName}</p>
        <p className="text-slate-600 text-[11px]">
          Target Start Date: <span className="font-bold text-purple-700">{placement.onboardingStartDate || 'To Be Confirmed Post-Arrival'}</span>
        </p>
      </div>
    </div>
  );
};
