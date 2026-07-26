# 09 — Private Storage Security Audit

| Bucket | Public Access | Ownership Enforcement | Upload Intent Scoped | Signed URL TTL | Live Tested |
|---|---:|---|---:|---|---:|
| `candidate-cv` | Private | `auth.uid()` -> Candidate | Yes | 15 Minutes | Mocked |
| `candidate-identity` | Private | `auth.uid()` -> Candidate | Yes | 15 Minutes | Mocked |
| `candidate-certificates` | Private | `auth.uid()` -> Candidate | Yes | 15 Minutes | Mocked |
| `offer-documents` | Private | `auth.uid()` -> Candidate | Read-only | 15 Minutes | Mocked |
| `support-attachments` | Private | `auth.uid()` -> Ticket Owner | Yes | 15 Minutes | Mocked |

*Storage Security Policies*:
- All buckets are non-public (`public = false`).
- Signed URLs are generated server-side with short 15-minute expiration time-to-live (TTL).
- Signed URLs are never persisted in PostgreSQL database tables or client local storage.
