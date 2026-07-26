import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface CandidateSupportSectionErrorProps {
  message?: string;
  onRetry: () => void;
}

export function CandidateSupportSectionError({
  message = 'We could not update your support request state.',
  onRetry,
}: CandidateSupportSectionErrorProps) {
  return (
    <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl flex items-center justify-between gap-3 text-xs text-rose-800 dark:text-rose-300">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <span className="font-semibold">{message}</span>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-1 font-bold hover:underline shrink-0 text-rose-900 dark:text-rose-200"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
