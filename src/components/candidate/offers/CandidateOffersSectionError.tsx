import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  message: string;
  onRetry: () => void;
}

export const CandidateOffersSectionError: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-center justify-between gap-3 text-left">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
        <span>{message}</span>
      </div>
      <button
        onClick={onRetry}
        className="px-3 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shrink-0 flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Retry</span>
      </button>
    </div>
  );
};
