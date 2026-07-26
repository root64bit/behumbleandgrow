export type NotificationLifecycleState =
  | 'unread'
  | 'read'
  | 'archived'
  | 'expired'
  | 'retracted'
  | 'action_required'
  | 'action_completed';

export interface NotificationStatusInfo {
  state: NotificationLifecycleState;
  label: string;
  badgeVariant: 'unread' | 'read' | 'archived' | 'expired' | 'retracted' | 'action_required' | 'action_completed';
}

export function resolveNotificationStatus(params: {
  readAt?: string | null;
  archivedAt?: string | null;
  expiresAt?: string | null;
  isRetracted?: boolean;
  isActionRequired?: boolean;
}): NotificationStatusInfo {
  const { readAt, archivedAt, expiresAt, isRetracted, isActionRequired } = params;
  const now = new Date();

  if (isRetracted) {
    return { state: 'retracted', label: 'Retracted', badgeVariant: 'retracted' };
  }

  if (archivedAt) {
    return { state: 'archived', label: 'Archived', badgeVariant: 'archived' };
  }

  if (expiresAt && new Date(expiresAt) < now) {
    return { state: 'expired', label: 'Action Expired', badgeVariant: 'expired' };
  }

  if (isActionRequired && !readAt) {
    return { state: 'action_required', label: 'Action Required', badgeVariant: 'action_required' };
  }

  if (!readAt) {
    return { state: 'unread', label: 'Unread', badgeVariant: 'unread' };
  }

  return { state: 'read', label: 'Read', badgeVariant: 'read' };
}
