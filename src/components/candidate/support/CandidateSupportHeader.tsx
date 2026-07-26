import React from 'react';
import { LifeBuoy, Plus } from 'lucide-react';

interface CandidateSupportHeaderProps {
  onOpenCreate: () => void;
}

export function CandidateSupportHeader({ onOpenCreate }: CandidateSupportHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <LifeBuoy className="w-4 h-4" />
          <span>Candidate Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Support Centre
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Get help with your profile, job applications, documents, interview schedules, conditional offers, and UAE placement process.
        </p>
      </div>

      <div className="shrink-0">
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Support Request</span>
        </button>
      </div>
    </header>
  );
}
