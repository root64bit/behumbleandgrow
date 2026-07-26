import React from 'react';
import { Bell, AlertCircle, Calendar, AlertTriangle } from 'lucide-react';
import { CandidateNotificationSummary } from '../../../services/candidate-notifications.service';

interface CandidateNotificationsSummaryProps {
  summary: CandidateNotificationSummary;
}

export function CandidateNotificationsSummary({ summary }: CandidateNotificationsSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Unread Card */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-700 dark:text-emerald-300">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.unreadCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Unread</p>
        </div>
      </div>

      {/* Action Required Card */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.actionRequiredCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Action Required</p>
        </div>
      </div>

      {/* Today Card */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-700 dark:text-blue-300">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.todayCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Today</p>
        </div>
      </div>

      {/* Important Card */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-700 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {summary.importantCount}
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Important</p>
        </div>
      </div>
    </div>
  );
}
