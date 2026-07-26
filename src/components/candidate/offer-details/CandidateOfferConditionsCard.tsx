import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const CandidateOfferConditionsCard: React.FC = () => {
  return (
    <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-2 text-left">
      <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Conditional Offer Clearance Requirements</span>
      </div>
      <p className="text-xs text-amber-900 leading-relaxed">
        This offer is subject to successful document verification, background checks, medical fitness, work-permit approval and final UAE entry visa authorization. Official employment begins once legal labor clearances are issued.
      </p>
    </div>
  );
};
