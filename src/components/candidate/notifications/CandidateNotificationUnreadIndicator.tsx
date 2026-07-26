import React from 'react';

interface CandidateNotificationUnreadIndicatorProps {
  isUnread: boolean;
}

export function CandidateNotificationUnreadIndicator({ isUnread }: CandidateNotificationUnreadIndicatorProps) {
  if (!isUnread) return null;

  return (
    <span
      className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500 shrink-0"
      title="Unread notification"
      aria-label="Unread notification"
    />
  );
}
