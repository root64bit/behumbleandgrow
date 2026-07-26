# 04a — Authoritative Schema Inventory & Table Reconciliation

| Domain | Actual Table / View Name | Primary Key | Candidate Ownership Foreign Key | Status / Discriminator Field | Migration Source |
|---|---|---|---|---|---|
| Profiles | `public.profiles` | `id` (uuid) | `id = auth.uid()` | `status` (`'active'`, `'suspended'`) | `20260724000001_security_schema.sql` |
| Candidate Records | `public.candidates` | `id` (uuid) | `user_id = profiles.id` | N/A | `20260724000001_security_schema.sql` |
| Document Vault | `public.candidate_documents` | `id` (uuid) | `candidate_id = candidates.id` | `status` (`'pending'`, `'verified'`, `'rejected'`) | `20260724000001_security_schema.sql` |
| Applications | `public.applications` | `id` (uuid) | `candidate_id = candidates.id` | `status`, `employer_disclosure_status` | `20260724000001_security_schema.sql` |
| Interviews | `public.interviews` | `id` (uuid) | `application_id -> applications.candidate_id` | `status` (`'scheduled'`, `'completed'`, `'cancelled'`) | `20260724000001_security_schema.sql` |
| Conditional Offers | `public.offers` | `id` (uuid) | `application_id -> applications.candidate_id` | `status` (`'issued'`, `'accepted'`, `'declined'`, `'expired'`) | `20260724000001_security_schema.sql` |
| Placement & Relocation | `public.candidate_placements` | `id` (uuid) | `candidate_id = candidates.id` | `stage`, `status` (`'in_progress'`, `'completed'`) | `20260725000001_candidate_placement.sql` |
| Notifications Centre | `public.candidate_notifications` | `id` (uuid) | `candidate_id = candidates.id` | `read_at` (timestamp, null if unread) | `20260726000001_candidate_notifications.sql` |
| Support Tickets | `public.candidate_support_tickets` | `id` (uuid) | `candidate_id = candidates.id` | `status`, `urgency` | `20260726000002_candidate_support.sql` |
| Support Messages | `public.candidate_support_messages` | `id` (uuid) | `ticket_id -> candidate_support_tickets.candidate_id` | `author_role` (`'candidate'`, `'support'`) | `20260726000002_candidate_support.sql` |
| Support Attachments | `public.candidate_support_attachments` | `id` (uuid) | `message_id -> ticket_id -> candidate_id` | N/A | `20260726000002_candidate_support.sql` |
| Candidate Preferences | `public.candidate_preferences` | `id` (uuid) | `candidate_id = candidates.id` | N/A | `20260726000003_candidate_account_settings.sql` |
| Notification Preferences | `public.candidate_notification_preferences` | `id` (uuid) | `candidate_id = candidates.id` | `category` (9 canonical categories) | `20260726000003_candidate_account_settings.sql` |
