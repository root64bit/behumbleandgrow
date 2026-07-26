import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CandidateSupportActionRequiredNoticeProps {
  message?: string;
}

export function CandidateSupportActionRequiredNotice({
  message = 'Support has requested additional details from you to resolve this inquiry.',
}: CandidateSupportActionRequiredNoticeProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 px-3 py-2 rounded-xl mt-2">
      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
