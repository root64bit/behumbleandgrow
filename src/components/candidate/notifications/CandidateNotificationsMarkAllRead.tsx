import React from 'react';
import { CheckCheck } from 'lucide-react';

interface CandidateNotificationsMarkAllReadProps {
  unreadCount: number;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export function CandidateNotificationsMarkAllRead({
  unreadCount,
  onConfirm,
  isSubmitting = false,
}: CandidateNotificationsMarkAllReadProps) {
  if (unreadCount === 0) return null;

  return (
    <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
        <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>You have {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}.</span>
      </div>

      <button
        onClick={onConfirm}
        disabled={isSubmitting}
        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100 hover:underline shrink-0 disabled:opacity-50"
      >
        {isSubmitting ? 'Updating...' : 'Mark all as read'}
      </button>
    </div>
  );
}
