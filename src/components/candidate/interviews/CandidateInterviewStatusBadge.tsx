import React from 'react';
import { getInterviewStatusDetails } from '../../../lib/candidate/interviewStatus';

interface Props {
  status?: string | null;
}

export const CandidateInterviewStatusBadge: React.FC<Props> = ({ status }) => {
  const details = getInterviewStatusDetails(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${details.badgeStyle}`}>
      <span>{details.label}</span>
    </span>
  );
};
