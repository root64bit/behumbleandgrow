import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const CandidateDocumentSectionError: React.FC<Props> = ({
  message = 'Section failed to load document details.',
  onRetry,
}) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-left">
      <div className="flex items-center gap-2 text-xs text-red-800">
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
