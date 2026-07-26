# Schema & Storage Mapping — Candidate Document Vault

## Database Tables & Storage Mapping

| Concern | Actual Table / Bucket | Ownership Relationship | RLS / Storage Policy | Read Method | Write Method |
|---|---|---|---|---|---|
| User Identity | `profiles` | `id = auth.uid()` | `profiles_select_policy` | `supabase.from('profiles').select()` | Supabase Auth / User |
| Candidate Record | `candidates` | `id = profiles.id` | `candidates_select_policy` | `supabase.from('candidates').select()` | Server / Candidate |
| Document Metadata | `candidate_documents` | `candidate_id = candidates.id` | `candidate_documents_policy` (Candidate reads/writes own) | `supabase.from('candidate_documents').select()` | `supabase.from('candidate_documents').insert()` |
| Status Audit History | `status_history` | `entity_id = candidate_documents.id` | `status_history_policy` | `supabase.from('status_history').select()` | Server / Candidate Action |
| Private Document Storage (CV) | Storage Bucket `candidate-cv` | Path: `{candidate_id}/candidate-cv/{timestamp}_{filename}` | Private Storage Policy (`auth.uid() = (storage.foldername(name))[1]`) | `supabase.storage.from('candidate-cv').createSignedUrl(path, 1800)` | `supabase.storage.from('candidate-cv').upload()` |
| Private Document Storage (ID) | Storage Bucket `candidate-identity` | Path: `{candidate_id}/candidate-identity/{timestamp}_{filename}` | Private Storage Policy (`auth.uid() = (storage.foldername(name))[1]`) | `supabase.storage.from('candidate-identity').createSignedUrl(path, 1800)` | `supabase.storage.from('candidate-identity').upload()` |
| Private Document Storage (Certs) | Storage Bucket `candidate-certificates` | Path: `{candidate_id}/candidate-certificates/{timestamp}_{filename}` | Private Storage Policy (`auth.uid() = (storage.foldername(name))[1]`) | `supabase.storage.from('candidate-certificates').createSignedUrl(path, 1800)` | `supabase.storage.from('candidate-certificates').upload()` |

## Verification Status Model
- `pending`: Document uploaded, awaiting Operations review.
- `under_review`: Operations team currently reviewing document.
- `verified` / `approved`: Operations team approved document.
- `rejected`: Operations team rejected document with Candidate-visible reason.
- `replacement_requested`: Operations team requested an updated document version.
- `expiring_soon`: Valid document expiring within 90 days.
- `expired`: Document expired.
