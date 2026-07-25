import React from 'react';
import { Landmark } from 'lucide-react';
import { maskVisaReference } from '../../../lib/candidate/placementReferenceMasking';

interface Props {
  status: string;
  reference?: string | null;
}

export const CandidatePlacementVisaCard: React.FC<Props> = ({ status, reference }) => {
  const maskedRef = maskVisaReference(reference);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Landmark className="w-4 h-4 text-indigo-600" />
          <span>UAE Entry Permit & Visa</span>
        </h3>
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
          {status}
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Immigration Reference</div>
        <div className="text-sm font-mono font-bold text-slate-800">{maskedRef}</div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Entry permit issuance proceeds following official MOHRE work-permit clearance. Residence visa stamping takes place post-arrival in the UAE.
      </p>
    </div>
  );
};
