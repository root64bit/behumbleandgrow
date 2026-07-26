# 06. Private Storage Live Testing Evidence

## Test Verification Summary
- Bucket Privacy: `candidate-cv`, `candidate-identity`, `candidate-certificates` are set to private.
- Upload Validations: Enforces 10 MB size limit and PDF/JPEG/PNG MIME restrictions.
- Signed URL Expiration: Access links generated with 30-minute expiration via `storage.service.ts`.
- Isolation: Ownership path structure `{candidate_id}/{doc_type}/{timestamp}_{filename}` blocks cross-candidate retrieval.
