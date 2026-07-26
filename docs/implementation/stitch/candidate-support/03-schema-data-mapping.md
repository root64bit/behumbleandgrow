# Phase A12 — Schema & Data Mapping: Candidate Support Centre

## Database Schema & Foreign Key Chain

Candidate ownership path enforced via PostgreSQL RLS:
```text
auth.uid()
  → profiles.id
  → candidates.id
  → candidate_support_tickets.candidate_id
  → candidate_support_messages.ticket_id
  → candidate_support_attachments.ticket_id
```

### Table 1: `public.candidate_support_tickets`
| Field | Type | Constraint | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique ticket identifier |
| `ticket_reference` | VARCHAR(64) | UNIQUE NOT NULL | Candidate-facing ticket reference (e.g. BHG-SUP-2026-001284) |
| `candidate_id` | UUID | REFERENCES candidates(id) ON DELETE CASCADE | Candidate owner ID |
| `category` | VARCHAR(64) | CHECK (category IN ('application', ...)) | Category of inquiry |
| `subject` | VARCHAR(160) | CHECK (char_length(trim(subject)) >= 5) | Subject line |
| `description` | TEXT | CHECK (char_length(trim(description)) >= 20) | Detailed inquiry body |
| `status` | VARCHAR(32) | CHECK (status IN ('submitted', 'open', ...)) | Lifecycle status |
| `urgency` | VARCHAR(32) | CHECK (urgency IN ('normal', 'important', 'urgent')) | Urgency |
| `is_candidate_action_required` | BOOLEAN | DEFAULT false | Candidate response required flag |
| `closed_at` | TIMESTAMPTZ | NULL | Closed timestamp |
| `reopened_at` | TIMESTAMPTZ | NULL | Reopened timestamp |
| `reopen_count` | INT | DEFAULT 0 | Count of reopens |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Created timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last modified timestamp |

### Table 2: `public.candidate_support_messages`
| Field | Type | Constraint | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Message identifier |
| `ticket_id` | UUID | REFERENCES candidate_support_tickets(id) | Parent ticket ID |
| `author_role` | VARCHAR(32) | CHECK (author_role IN ('candidate', 'support', 'system')) | Author role |
| `author_display_name` | VARCHAR(128) | NOT NULL | Display name |
| `message_text` | TEXT | NOT NULL | Message content |
| `is_candidate_visible` | BOOLEAN | DEFAULT true | Filter flag (Candidates see true ONLY) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Created timestamp |

## RLS Security Policies
1. `candidate_support_tickets_select_own`:
   - `USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()))`
2. `candidate_support_messages_select_own`:
   - `USING (is_candidate_visible = true AND ticket_id IN (SELECT id FROM candidate_support_tickets WHERE candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())))`
3. Direct `INSERT`, `UPDATE`, `DELETE` operations are revoked from `authenticated` role. Mutations MUST execute via hardened `SECURITY DEFINER` RPCs (`create_my_candidate_support_ticket`, `reply_to_my_candidate_support_ticket`, `close_my_candidate_support_ticket`, `reopen_my_candidate_support_ticket`).
