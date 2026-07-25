# Schema & Data Mapping — Candidate Professional Profile

## Overview
Maps Candidate Profile sections to existing PostgreSQL database tables in `src/lib/supabase/types.ts`.

---

## Database Table & Schema Mapping

| Profile Section | Database Table | Primary Key | Ownership Column | RLS Status | Save Method |
|---|---|---|---|---|---|
| Personal Info | `profiles` & `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `upsert`/`update` |
| Contact Info | `profiles` & `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` |
| Professional Summary | `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` (`headline`, `bio`) |
| Work Experience | `work_experiences` | `id` | `candidate_id = auth.uid()` | Protected | Supabase `insert`/`update`/`delete` |
| Education | `educations` | `id` | `candidate_id = auth.uid()` | Protected | Supabase `insert`/`update`/`delete` |
| Skills | `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` (`skills` text array) |
| Languages | `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` (`languages` text array) |
| Certifications | `candidate_documents` | `id` | `candidate_id = auth.uid()` | Protected | Supabase `insert`/`update`/`delete` |
| Employment Preferences | `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` (`preferred_location`, etc.) |
| Relocation Availability | `candidates` | `id` | `id = auth.uid()` | Protected | Supabase `update` (`current_location`, etc.) |

---

## Key RLS & Authorization Rules
1. Every query & mutation filters strictly by `id = auth.uid()` or `candidate_id = auth.uid()`.
2. Candidates cannot edit verification status, application status, or internal reviewer notes.
3. In-memory demo data runs ONLY when `import.meta.env.DEV && VITE_DEMO_DATA_ENABLED === 'true'`.
