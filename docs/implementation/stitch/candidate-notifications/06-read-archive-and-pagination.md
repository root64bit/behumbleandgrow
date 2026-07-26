# 06 — Read, Archive, and Database Cursor Pagination

## Cursor Pagination
- Default ordering: `created_at DESC, id DESC`.
- Cursor pair: `(cursorCreatedAt, cursorId)`.
- SQL clause: `created_at < cursorCreatedAt OR (created_at = cursorCreatedAt AND id < cursorId)`.

## Optimistic Updates & Rollback
- Mark read, mark unread, and archive operations apply optimistic state updates in React hook `useCandidateNotifications`.
- If RPC fails or returns a concurrency conflict error, state is rolled back to previous snapshot and section error is displayed.
