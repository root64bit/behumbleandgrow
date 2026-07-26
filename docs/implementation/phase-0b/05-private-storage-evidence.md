# 05. Private Document Storage Evidence

## Storage Specifications
- Private buckets: `candidate-cv`, `candidate-identity`, `candidate-certificates`.
- File limits: 10 MB maximum, restricted MIME types (PDF, JPEG, PNG).
- Short-lived access: Signed URLs with 30-minute expiration generated via `storage.service.ts`.
- Isolation: Ownership-based object paths `{candidate_id}/{doc_type}/{timestamp}_{file_name}` ensure Candidate B cannot read Candidate A documents.
