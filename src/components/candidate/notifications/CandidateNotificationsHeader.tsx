import React from 'react';
import { Bell, CheckCheck, Settings } from 'lucide-react';

interface CandidateNotificationsHeaderProps {
  onMarkAllAsRead: () => void;
  isMarkingAll?: boolean;
  unreadCount?: number;
}

export function CandidateNotificationsHeader({
  onMarkAllAsRead,
  isMarkingAll = false,
  unreadCount = 0,
}: CandidateNotificationsHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4" />
          <span>Candidate Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Notifications Centre
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Review important updates about your job applications, interviews, conditional offers, document vault, and UAE relocation process.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            disabled={isMarkingAll}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        )}

        <a
          href="/candidate/settings"
          className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
          title="Notification settings"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Preferences</span>
        </a>
      </div>
    </header>
  );
}
