import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  sectionName: string;
  onRetry?: () => void;
}

export const CandidatePlacementSectionError: React.FC<Props> = ({ sectionName, onRetry }) => {
  return (
    <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 text-left flex items-center justify-between text-rose-900 text-xs">
      <div className="flex items-center space-x-2.5">
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
        <span>We could not load the {sectionName}.</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-rose-200 text-rose-800 rounded-lg text-[11px] font-bold hover:bg-rose-100 transition-colors shrink-0"
        >
          <RefreshCw className="w-3 h-3 text-rose-600" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
