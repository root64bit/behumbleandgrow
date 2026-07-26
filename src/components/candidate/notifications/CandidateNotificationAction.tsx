import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CandidateNotificationCategory } from '../../../lib/candidate/notificationCategory';
import { resolveCandidateNotificationRoute } from '../../../lib/candidate/notificationDeepLink';

interface CandidateNotificationActionProps {
  category: CandidateNotificationCategory;
  entityType?: string | null;
  entityId?: string | null;
  actionUrl?: string | null;
}

export function CandidateNotificationAction({
  category,
  entityType,
  entityId,
  actionUrl,
}: CandidateNotificationActionProps) {
  const { route, label } = resolveCandidateNotificationRoute({
    category,
    entityType,
    entityId,
    rawActionUrl: actionUrl,
  });

  return (
    <Link
      to={route}
      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
      title={label}
    >
      <span>{label}</span>
      <ChevronRight className="w-3.5 h-3.5" />
    </Link>
  );
}
