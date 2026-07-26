import React from 'react';
import { getCandidateDecisionConfig } from '../../../lib/candidate/offerStatus';

interface Props {
  decision: string;
}

export const CandidateOfferDecisionBadge: React.FC<Props> = ({ decision }) => {
  const config = getCandidateDecisionConfig(decision);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${config.badgeClass}`}
    >
      {config.label}
    </span>
  );
};
