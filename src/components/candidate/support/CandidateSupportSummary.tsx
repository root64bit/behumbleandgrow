import React from 'react';
import { MessageSquare, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { CandidateSupportSummary } from '../../../services/candidate-support.service';

interface CandidateSupportSummaryProps {
  summary: CandidateSupportSummary;
}

export function CandidateSupportSummaryCards({ summary }: CandidateSupportSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Open Requests */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-700 dark:text-emerald-300">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.openCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Active Requests</p>
        </div>
      </div>

      {/* Response Required */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.actionRequiredCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Response Required</p>
        </div>
      </div>

      {/* Awaiting Support */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-700 dark:text-blue-300">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.awaitingSupportCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Awaiting Support</p>
        </div>
      </div>

      {/* Resolved */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.resolvedCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Resolved</p>
        </div>
      </div>
    </div>
  );
}
