import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface CandidateNotificationsConflictStateProps {
  onRefresh: () => void;
}

export function CandidateNotificationsConflictState({ onRefresh }: CandidateNotificationsConflictStateProps) {
  return (
    <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="font-semibold">
          This notification state was modified in another session. Refreshing details.
        </span>
      </div>
      <button
        onClick={onRefresh}
        className="flex items-center gap-1 font-bold hover:underline shrink-0 text-amber-950 dark:text-amber-100"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Refresh</span>
      </button>
    </div>
  );
}
