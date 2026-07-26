import React from 'react';
import { getOfferStatusConfig } from '../../../lib/candidate/offerStatus';

interface Props {
  status: string;
}

export const CandidateOfferStatusBadge: React.FC<Props> = ({ status }) => {
  const config = getOfferStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${config.badgeClass}`}
    >
      {config.label}
    </span>
  );
};
