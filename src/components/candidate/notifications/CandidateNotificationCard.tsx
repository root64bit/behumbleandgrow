import React from 'react';
import { Check, Mail, Archive } from 'lucide-react';
import { CandidateNotificationItem } from '../../../services/candidate-notifications.service';
import { CandidateNotificationCategoryIcon } from './CandidateNotificationCategoryIcon';
import { CandidateNotificationPriorityBadge } from './CandidateNotificationPriorityBadge';
import { CandidateNotificationUnreadIndicator } from './CandidateNotificationUnreadIndicator';
import { CandidateNotificationTimestamp } from './CandidateNotificationTimestamp';
import { CandidateNotificationAction } from './CandidateNotificationAction';
import { CandidateNotificationStaleNotice } from './CandidateNotificationStaleNotice';
import { resolveNotificationCategoryLabel } from '../../../lib/candidate/notificationCategory';

interface CandidateNotificationCardProps {
  notification: CandidateNotificationItem;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onArchive: (id: string) => void;
  isMutating?: boolean;
}

export function CandidateNotificationCard({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  isMutating = false,
}: CandidateNotificationCardProps) {
  const isUnread = !notification.readAt;
  const isExpired = notification.expiresAt ? new Date(notification.expiresAt) < new Date() : false;
  const categoryLabel = resolveNotificationCategoryLabel(notification.category);

  return (
    <article
      className={`p-4 rounded-xl border transition-all ${
        isUnread
          ? 'bg-white dark:bg-slate-900 border-slate-300/80 dark:border-slate-700 shadow-xs'
          : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Category Icon & Titles */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              isUnread
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <CandidateNotificationCategoryIcon category={notification.category} className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <CandidateNotificationUnreadIndicator isUnread={isUnread} />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {categoryLabel}
              </span>
              <CandidateNotificationPriorityBadge priority={notification.priority} />
            </div>

            {/* Escaped Plain Text Title & Summary */}
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {notification.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed whitespace-pre-wrap break-words">
              {notification.summary}
            </p>

            {isExpired && <CandidateNotificationStaleNotice />}

            {/* Action Deep Link */}
            <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <CandidateNotificationAction
                category={notification.category}
                entityType={notification.entityType}
                entityId={notification.entityId}
                actionUrl={notification.actionUrl}
              />

              {/* Card Row Mutations */}
              <div className="flex items-center gap-1">
                {isUnread ? (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    disabled={isMutating}
                    className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                    title="Mark as read"
                    aria-label="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Mark read</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onMarkAsUnread(notification.id)}
                    disabled={isMutating}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                    title="Mark as unread"
                    aria-label="Mark as unread"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Unread</span>
                  </button>
                )}

                {notification.isArchivable && (
                  <button
                    onClick={() => onArchive(notification.id)}
                    disabled={isMutating}
                    className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                    title="Archive notification"
                    aria-label="Archive notification"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Archive</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <CandidateNotificationTimestamp timestamp={notification.createdAt} />
      </div>
    </article>
  );
}
