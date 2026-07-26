# 04 — Authoritative Candidate Ownership Map & Data Flow

| Resource | Actual ownership chain | Candidate read | Candidate mutation | RLS Policy |
|---|---|---:|---:|---|
| Candidate Profile | `auth.uid() = profiles.id` | Internal `auth.uid()` | RPC / Restricted RLS | `profiles_select_own` |
| Candidate Record | `profiles.id -> candidates.user_id` | Internal `auth.uid()` | Restricted RLS | `candidates_select_own` |
| Documents | `candidates.id -> candidate_documents.candidate_id` | Internal lookup | Upload RPC / Storage | `documents_candidate_own` |
| Applications | `candidates.id -> applications.candidate_id` | Internal lookup | Withdraw RPC only | `applications_candidate_own` |
| Interviews | `applications.id -> interviews.application_id` | Internal lookup | Confirm RPC only | `interviews_candidate_own` |
| Conditional Offers | `applications.id -> offers.application_id` | Internal lookup | Accept/Decline RPC | `offers_candidate_own` |
| Placement & Relocation | `applications.id -> candidate_placements.application_id` | Internal lookup | Ack RPC only | `placement_candidate_own` |
| Notifications | `candidates.id -> candidate_notifications.candidate_id` | Internal lookup | Read/Archive RPC | `notifications_candidate_own` |
| Support Tickets | `candidates.id -> support_tickets.candidate_id` | Internal lookup | Create/Reply RPC | `support_tickets_candidate_own` |
| Account Preferences | `candidates.id -> candidate_preferences.candidate_id` | Internal lookup | Preference RPC | `preferences_candidate_own` |
| Notification Preferences | `candidates.id -> candidate_notification_preferences.candidate_id` | Internal lookup | Preference RPC | `notif_pref_candidate_own` |

*Security Enforcement Note*: All Candidate-facing service methods and RPCs derive ownership internally from `auth.uid()`. Client caller parameters like `candidateId` or `userId` are ignored or validated strictly against internal identity.
