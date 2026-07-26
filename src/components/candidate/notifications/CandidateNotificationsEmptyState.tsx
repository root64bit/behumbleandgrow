import React from 'react';
import { Link } from 'react-router-dom';
import { BellOff, ArrowRight } from 'lucide-react';

export function CandidateNotificationsEmptyState() {
  return (
    <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-300">
        <BellOff className="w-6 h-6" />
      </div>

      <div className="max-w-md mx-auto space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
          You have no notifications yet
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Updates about your job applications, document vault, interview schedules, conditional offers, and placement process will appear here.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/candidate/dashboard"
          className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
