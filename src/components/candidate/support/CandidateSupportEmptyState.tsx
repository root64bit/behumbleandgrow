import React from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, Plus, Home } from 'lucide-react';

interface CandidateSupportEmptyStateProps {
  onCreateRequest: () => void;
}

export function CandidateSupportEmptyState({ onCreateRequest }: CandidateSupportEmptyStateProps) {
  return (
    <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-300">
        <LifeBuoy className="w-6 h-6" />
      </div>

      <div className="max-w-md mx-auto space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
          You have no support requests yet
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Create a support request when you need help with your profile, job application, documents, video interview, conditional offer, or placement process.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={onCreateRequest}
          className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Support Request</span>
        </button>

        <Link
          to="/candidate/dashboard"
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
