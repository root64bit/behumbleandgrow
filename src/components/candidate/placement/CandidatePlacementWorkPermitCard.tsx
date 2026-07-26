import React from 'react';
import { FileCheck, ShieldCheck } from 'lucide-react';
import { maskWorkPermitReference } from '../../../lib/candidate/placementReferenceMasking';

interface Props {
  status: string;
  reference?: string | null;
}

export const CandidatePlacementWorkPermitCard: React.FC<Props> = ({ status, reference }) => {
  const maskedRef = maskWorkPermitReference(reference);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-purple-600" />
          <span>MOHRE Work Permit</span>
        </h3>
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
          {status}
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Reference</div>
        <div className="text-sm font-mono font-bold text-slate-800">{maskedRef}</div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Work permit application is submitted directly to the UAE Ministry of Human Resources & Emiratisation (MOHRE). Official processing remains under authority review.
      </p>
    </div>
  );
};
