import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const CandidateOfferComplianceNotice: React.FC = () => {
  return (
    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
        <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Conditional Offer Compliance Disclaimer</span>
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">
        Conditional offers remain subject to employer confirmation, required documentation, work-permit approval and visa approval.
      </p>
    </div>
  );
};
