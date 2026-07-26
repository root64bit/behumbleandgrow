import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface CandidateNotificationPriorityBadgeProps {
  priority: 'normal' | 'important' | 'urgent';
}

export function CandidateNotificationPriorityBadge({ priority }: CandidateNotificationPriorityBadgeProps) {
  if (priority === 'normal') return null;

  if (priority === 'urgent') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 px-2 py-0.5 rounded-full">
        <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
        <span>URGENT</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
      <span>IMPORTANT</span>
    </span>
  );
}
