import React from 'react';
import { AlertCircle } from 'lucide-react';

export const CandidateOfferReplacementNotice: React.FC = () => {
  return (
    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2 text-left">
      <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
      <span>This offer has been superseded by an updated offer version issued by the employer.</span>
    </div>
  );
};
