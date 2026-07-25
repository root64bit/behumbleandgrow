import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const CandidatePlacementComplianceNotice: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-1.5">
      <div className="flex items-center space-x-2 text-slate-900 font-bold">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Legal & Regulatory Placement Disclaimer</span>
      </div>
      <p className="leading-relaxed text-[11px] text-slate-600">
        Mobility progress tracking and milestone estimates remain subject to official approval by the UAE Ministry of Human Resources & Emiratisation (MOHRE), UAE Federal Authority for Identity, Citizenship, Customs & Port Security (ICP), medical fitness clearance and final employer confirmation.
      </p>
    </div>
  );
};
