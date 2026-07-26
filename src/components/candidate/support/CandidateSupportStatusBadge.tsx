import React from 'react';
import { resolveSupportStatus } from '../../../lib/candidate/supportStatus';

interface CandidateSupportStatusBadgeProps {
  status: string;
  isActionRequired?: boolean;
}

export function CandidateSupportStatusBadge({ status, isActionRequired = false }: CandidateSupportStatusBadgeProps) {
  const info = resolveSupportStatus({ status, isCandidateActionRequired: isActionRequired });

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${info.badgeClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      <span>{info.label}</span>
    </span>
  );
}
