import React from 'react';
import { Clock } from 'lucide-react';
import { calculateOfferExpiry } from '../../../lib/candidate/offerExpiry';

interface Props {
  expiresAt?: string;
}

export const CandidateOfferExpiryNotice: React.FC<Props> = ({ expiresAt }) => {
  const expiry = calculateOfferExpiry(expiresAt);

  return (
    <div className="flex items-center gap-1.5 text-left">
      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <span className={`px-2 py-0.5 rounded-md border text-[11px] ${expiry.badgeClass}`}>
        {expiry.label}
      </span>
    </div>
  );
};
