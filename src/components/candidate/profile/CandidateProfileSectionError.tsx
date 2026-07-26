import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  sectionName: string;
  errorMessage: string;
  onRetry?: () => void;
}

export const CandidateProfileSectionError: React.FC<Props> = ({ sectionName, errorMessage, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left flex items-start justify-between gap-3">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xs font-bold text-red-900">Failed to load {sectionName}</h3>
          <p className="text-[11px] text-red-700 mt-0.5">{errorMessage}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-2.5 py-1 bg-white border border-red-300 text-red-800 text-[11px] font-semibold rounded-md flex items-center gap-1 hover:bg-red-100/50"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
