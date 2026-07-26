import React from 'react';
import { useCandidateNotifications } from '../../hooks/candidate/useCandidateNotifications';
import { CandidateNotificationsHeader } from '../../components/candidate/notifications/CandidateNotificationsHeader';
import { CandidateNotificationsSummary } from '../../components/candidate/notifications/CandidateNotificationsSummary';
import { CandidateNotificationsTabs } from '../../components/candidate/notifications/CandidateNotificationsTabs';
import { CandidateNotificationsSearch } from '../../components/candidate/notifications/CandidateNotificationsSearch';
import { CandidateNotificationCard } from '../../components/candidate/notifications/CandidateNotificationCard';
import { CandidateNotificationsPagination } from '../../components/candidate/notifications/CandidateNotificationsPagination';
import { CandidateNotificationsSkeleton } from '../../components/candidate/notifications/CandidateNotificationsSkeleton';
import { CandidateNotificationsEmptyState } from '../../components/candidate/notifications/CandidateNotificationsEmptyState';
import { CandidateNotificationsNoResults } from '../../components/candidate/notifications/CandidateNotificationsNoResults';
import { CandidateNotificationsSectionError } from '../../components/candidate/notifications/CandidateNotificationsSectionError';
import { CandidateNotificationsConflictState } from '../../components/candidate/notifications/CandidateNotificationsConflictState';
import { CandidateNotificationsErrorState } from '../../components/candidate/notifications/CandidateNotificationsErrorState';

export default function CandidateNotificationsPage() {
  const {
    notificationsState,
    summaryState,
    activeTab,
    searchQuery,
    pagination,
    mutation,
    setActiveTab,
    setSearchQuery,
    refreshNotifications,
    loadMoreNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    archiveNotification,
  } = useCandidateNotifications();

  // Fatal Error state
  if (notificationsState.status === 'error') {
    return (
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <CandidateNotificationsErrorState
          message={notificationsState.message}
          onRetry={refreshNotifications}
        />
      </main>
    );
  }

  // Initial Loading state
  if (notificationsState.status === 'loading' && summaryState.status === 'loading') {
    return (
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <CandidateNotificationsSkeleton />
      </main>
    );
  }

  const notifications = notificationsState.status === 'success' ? notificationsState.data : [];
  const summary = summaryState.status === 'success' ? summaryState.data : { unreadCount: 0, actionRequiredCount: 0, todayCount: 0, importantCount: 0 };
  const isInboxEmpty = notificationsState.status === 'empty' && activeTab === 'all' && !searchQuery;

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-left">
      {/* Header */}
      <CandidateNotificationsHeader
        unreadCount={summary.unreadCount}
        onMarkAllAsRead={markAllAsRead}
        isMarkingAll={mutation.status === 'submitting' && mutation.action === 'mark_all_read'}
      />

      {/* Summary Metrics */}
      <CandidateNotificationsSummary summary={summary} />

      {/* Concurrency Conflict Alert */}
      {mutation.status === 'conflict' && (
        <CandidateNotificationsConflictState onRefresh={refreshNotifications} />
      )}

      {/* Section Mutation Error Notice */}
      {mutation.status === 'error' && (
        <CandidateNotificationsSectionError
          message={mutation.error}
          onRetry={refreshNotifications}
        />
      )}

      {/* Tabs & Search controls */}
      <div className="space-y-3 pt-2">
        <CandidateNotificationsTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadCount={summary.unreadCount}
          actionRequiredCount={summary.actionRequiredCount}
        />

        <CandidateNotificationsSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Genuine Empty Inbox State */}
      {isInboxEmpty ? (
        <CandidateNotificationsEmptyState />
      ) : notifications.length === 0 ? (
        /* No Filter Matches State */
        <CandidateNotificationsNoResults
          onClearFilters={() => {
            setActiveTab('all');
            setSearchQuery('');
          }}
        />
      ) : (
        /* Notification Card List */
        <div className="space-y-3">
          {notifications.map((n) => (
            <CandidateNotificationCard
              key={n.id}
              notification={n}
              onMarkAsRead={markAsRead}
              onMarkAsUnread={markAsUnread}
              onArchive={archiveNotification}
              isMutating={mutation.status === 'submitting' && mutation.notificationId === n.id}
            />
          ))}

          {/* Cursor Pagination */}
          <CandidateNotificationsPagination
            hasMore={pagination.hasMore}
            isLoadingMore={pagination.isLoadingMore}
            onLoadMore={loadMoreNotifications}
            error={pagination.error}
          />
        </div>
      )}
    </main>
  );
}
