import React from 'react';
import { Building2, Lock } from 'lucide-react';

interface Props {
  displayName: string;
  authorised: boolean;
}

export const CandidateOfferEmployerDisplay: React.FC<Props> = ({ displayName, authorised }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold text-left">
      {authorised ? (
        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
      ) : (
        <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      )}
      <span className={authorised ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium italic'}>
        {displayName}
      </span>
    </div>
  );
};
