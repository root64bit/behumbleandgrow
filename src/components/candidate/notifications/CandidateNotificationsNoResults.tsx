import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface CandidateNotificationsNoResultsProps {
  onClearFilters: () => void;
}

export function CandidateNotificationsNoResults({ onClearFilters }: CandidateNotificationsNoResultsProps) {
  return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-500">
        <SearchX className="w-5 h-5" />
      </div>

      <div className="max-w-sm mx-auto space-y-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          No notifications match these filters
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Try clearing your search query or selecting another category tab to view updates.
        </p>
      </div>

      <div>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters & Search</span>
        </button>
      </div>
    </div>
  );
}
