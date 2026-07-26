import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, LifeBuoy } from 'lucide-react';

interface CandidateDashboardErrorStateProps {
  onRetry: () => void;
}

export default function CandidateDashboardErrorState({ onRetry }: CandidateDashboardErrorStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-8 text-center space-y-6 max-w-xl mx-auto shadow-md">
      <div className="w-16 h-16 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold font-headline-md text-[#00122B] dark:text-white">
          We could not load your workspace.
        </h2>
        <p className="text-xs sm:text-sm text-[#44474E] dark:text-slate-400 leading-relaxed max-w-md mx-auto">
          We encountered a connection or authorization issue while retrieving your candidate record. Please retry or reach out to our platform support team.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-[#00122B] hover:bg-[#0F2747] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          to="/candidate/support"
          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#00122B] dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors active:scale-95"
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
}
