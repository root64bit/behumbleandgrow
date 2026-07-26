# 08 — Component & Query Architecture

## Component Tree
```text
CandidateNotificationsPage
 ├── CandidateNotificationsHeader
 ├── CandidateNotificationsSummary
 ├── CandidateNotificationsTabs
 ├── CandidateNotificationsSearch
 ├── CandidateNotificationsMarkAllRead
 ├── CandidateNotificationCard List
 │    ├── CandidateNotificationCategoryIcon
 │    ├── CandidateNotificationPriorityBadge
 │    ├── CandidateNotificationUnreadIndicator
 │    ├── CandidateNotificationTimestamp
 │    ├── CandidateNotificationAction
 │    └── CandidateNotificationStaleNotice
 ├── CandidateNotificationsPagination
 ├── CandidateNotificationsEmptyState
 ├── CandidateNotificationsNoResults
 ├── CandidateNotificationsSectionError
 ├── CandidateNotificationsConflictState
 └── CandidateNotificationsErrorState
```
