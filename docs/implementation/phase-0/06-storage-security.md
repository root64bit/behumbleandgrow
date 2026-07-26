# 06. Private Storage Bucket & Upload Security Policy

## Storage Buckets Specification

| Bucket Name | Public Access | Target Document Types | Max File Size | Allowed MIME Types | Access Protocol |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `candidate-cv` | Disabled (Private) | Curriculum Vitae, Resumes | 10 MB | PDF, JPEG, PNG | Signed URL (30m expiry) |
| `candidate-identity` | Disabled (Private) | Passports, ID Cards | 10 MB | PDF, JPEG, PNG | Signed URL (30m expiry) |
| `candidate-certificates` | Disabled (Private) | Diplomas, Degrees, Training | 10 MB | PDF, JPEG, PNG | Signed URL (30m expiry) |
| `application-documents` | Disabled (Private) | Job screening attachments | 10 MB | PDF, JPEG, PNG | Signed URL (30m expiry) |
| `offer-documents` | Disabled (Private) | Employment offer letters | 10 MB | PDF | Signed URL (30m expiry) |
| `employer-documents` | Disabled (Private) | Trade licenses, CR docs | 10 MB | PDF, JPEG, PNG | Signed URL (30m expiry) |
| `placement-documents` | Disabled (Private) | Visa copies, Flight tickets | 10 MB | PDF | Signed URL (30m expiry) |

## Object Naming Convention
- Object Key Path: `{candidate_id}/{document_type}/{timestamp}_{sanitized_file_name}`
- Sanitization: All special characters replaced with underscores to prevent path traversal attacks.
