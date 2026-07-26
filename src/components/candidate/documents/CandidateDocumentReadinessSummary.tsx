import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import type { DocumentReadinessResult } from '../../../lib/candidate/documentReadiness';

interface Props {
  readiness: DocumentReadinessResult;
  onUploadClick?: () => void;
}

export const CandidateDocumentReadinessSummary: React.FC<Props> = ({ readiness, onUploadClick }) => {
  const { score, totalRequired, uploadedRequired, approvedRequired, rejectedCount, expiringSoonCount } = readiness;

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-left">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#006D44]" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verification Progress</h2>
        </div>
        <span className="text-xs font-extrabold text-[#006D44] bg-emerald-50 px-2 py-0.5 rounded-full">
          {score}% Complete
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-[#006D44] h-full transition-all duration-500 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-600">
        <p>
          {score === 100
            ? 'All required platform documents uploaded and undergoing verification.'
            : 'Upload your International Passport / National ID to reach 100% and start interviewing.'}
        </p>

        {rejectedCount > 0 && (
          <div className="flex items-center gap-1 text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{rejectedCount} document replacement required</span>
          </div>
        )}

        {expiringSoonCount > 0 && (
          <div className="flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{expiringSoonCount} document expiring soon</span>
          </div>
        )}
      </div>
    </div>
  );
};
