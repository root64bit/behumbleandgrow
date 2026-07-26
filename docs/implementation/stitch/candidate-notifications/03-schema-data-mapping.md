# 03 — Schema Data Mapping & Ownership Chain

## Ownership Chain
```text
auth.uid() -> public.profiles.id -> public.candidates.id -> public.candidate_notifications.candidate_id
```

## Schema & RLS Matrix

| Notification Field | Database Column | Ownership / Protection | RLS Policy |
|---|---|---|---|
| Notification ID | `id` (UUID) | System generated | Candidate `SELECT` only |
| Candidate Owner ID | `candidate_id` (UUID) | Foreign key to `candidates.id` | Candidate `SELECT` only |
| Category | `category` (VARCHAR) | Check constraint (9 categories) | Candidate `SELECT` only |
| Title | `title` (VARCHAR) | Escaped plain text | Candidate `SELECT` only |
| Summary | `summary` (TEXT) | Escaped plain text | Candidate `SELECT` only |
| Priority | `priority` (VARCHAR) | Check constraint (`normal`, `important`, `urgent`) | Candidate `SELECT` only |
| Entity Type | `entity_type` (VARCHAR) | Used for safe deep link resolution | Candidate `SELECT` only |
| Entity ID | `entity_id` (UUID) | Target entity ID | Candidate `SELECT` only |
| Read Timestamp | `read_at` (TIMESTAMPTZ) | Updated via `mark_my_candidate_notification_read` RPC | RPC security definer |
| Archive Timestamp | `archived_at` (TIMESTAMPTZ) | Updated via `archive_my_candidate_notification` RPC | RPC security definer |
| Deduplication Key | `dedupe_key` (VARCHAR) | Unique constraint `(candidate_id, dedupe_key)` | Database constraint |
