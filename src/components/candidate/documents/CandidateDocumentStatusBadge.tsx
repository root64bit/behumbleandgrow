import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, RefreshCw, XCircle, FileQuestion } from 'lucide-react';
import { getDocumentStatusLabel, calculateDocumentExpiryState } from '../../../lib/candidate/documentReadiness';

interface Props {
  status: string;
  expiryDate?: string | null;
}

export const CandidateDocumentStatusBadge: React.FC<Props> = ({ status, expiryDate }) => {
  const expiryState = calculateDocumentExpiryState(expiryDate);
  const label = getDocumentStatusLabel(status);

  if (expiryState === 'expired') {
    return (
      <div className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
        <XCircle className="w-3 h-3" />
        <span>Expired</span>
      </div>
    );
  }

  if (expiryState === 'expiring_soon') {
    return (
      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
        <AlertTriangle className="w-3 h-3 text-amber-600" />
        <span>Expiring Soon</span>
      </div>
    );
  }

  switch (status) {
    case 'approved':
    case 'verified':
      return (
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#006D44] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          <span>{label}</span>
        </div>
      );

    case 'under_review':
    case 'pending':
    case 'pending_review':
      return (
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{label}</span>
        </div>
      );

    case 'rejected':
      return (
        <div className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
          <XCircle className="w-3 h-3" />
          <span>{label}</span>
        </div>
      );

    case 'replacement_requested':
      return (
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
          <RefreshCw className="w-3 h-3" />
          <span>{label}</span>
        </div>
      );

    case 'not_uploaded':
    default:
      return (
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <FileQuestion className="w-3 h-3" />
          <span>{label}</span>
        </div>
      );
  }
};
