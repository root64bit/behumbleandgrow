import React from 'react';
import { Clock } from 'lucide-react';

interface CandidateNotificationStaleNoticeProps {
  message?: string;
}

export function CandidateNotificationStaleNotice({
  message = 'This action is no longer required or has expired.',
}: CandidateNotificationStaleNoticeProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 px-2.5 py-1.5 rounded-lg mt-2">
      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
