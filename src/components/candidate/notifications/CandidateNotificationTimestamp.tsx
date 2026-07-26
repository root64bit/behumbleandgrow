import React from 'react';
import { formatNotificationRelativeTime, formatNotificationAccessibleDate } from '../../../lib/candidate/notificationTime';

interface CandidateNotificationTimestampProps {
  timestamp: string;
}

export function CandidateNotificationTimestamp({ timestamp }: CandidateNotificationTimestampProps) {
  const relativeText = formatNotificationRelativeTime(timestamp);
  const fullDateText = formatNotificationAccessibleDate(timestamp);

  return (
    <time
      dateTime={timestamp}
      title={fullDateText}
      aria-label={fullDateText}
      className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0"
    >
      {relativeText}
    </time>
  );
}
