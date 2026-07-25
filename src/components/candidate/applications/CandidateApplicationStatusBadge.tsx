import React from 'react';
import { getApplicationStatusLabel } from '../../../lib/candidate/applicationStatus';

interface Props {
  status: string;
}

export const CandidateApplicationStatusBadge: React.FC<Props> = ({ status }) => {
  const label = getApplicationStatusLabel(status);
  const s = status?.toLowerCase() || '';

  if (['rejected', 'withdrawn', 'closed'].includes(s)) {
    return (
      <span className="px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-[11px] font-bold">
        {label}
      </span>
    );
  }

  if (['employer_interview', 'interview_scheduled'].includes(s)) {
    return (
      <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-[11px] font-bold">
        {label}
      </span>
    );
  }

  if (['offer_issued', 'offer_accepted', 'placed'].includes(s)) {
    return (
      <span className="px-2.5 py-0.5 bg-emerald-50 text-[#006D44] border border-emerald-200 rounded-full text-[11px] font-bold">
        {label}
      </span>
    );
  }

  return (
    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[11px] font-bold">
      {label}
    </span>
  );
};
