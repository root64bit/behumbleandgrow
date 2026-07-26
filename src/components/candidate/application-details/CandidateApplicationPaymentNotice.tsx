import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const CandidateApplicationPaymentNotice: React.FC = () => {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#006D44]" />
        <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
          Fee & Payment Status
        </h3>
      </div>

      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
        <p className="text-xs font-extrabold text-[#006D44]">
          Application fee disabled during the closed technical pilot.
        </p>
        <p className="text-[11px] text-slate-600">
          The £15 fee covers candidate registration, profile administration, preliminary eligibility review, document processing and application support. Payment does not guarantee employment, employer selection, work-permit approval or visa approval.
        </p>
      </div>
    </div>
  );
};
