# 09 — Private Storage Security Audit

| Bucket Name | Bucket Exists | Private Policy (`public = false`) | Candidate A Own Path Access | Candidate B Path Denied | Anonymous Access Denied | Signed URL Expiry | Malware Scanning Status | Live Result |
|---|---:|---:|---:|---:|---:|---:|---|---|
| `candidate-cv` | Verified | Private | Allowed | Denied | Denied | 15 Minutes | Not Implemented (MIME check only) | Verified (Mocked) / REQUIRES LIVE DEPLOYMENT |
| `candidate-identity` | Verified | Private | Allowed | Denied | Denied | 15 Minutes | Not Implemented (MIME check only) | Verified (Mocked) / REQUIRES LIVE DEPLOYMENT |
| `candidate-certificates` | Verified | Private | Allowed | Denied | Denied | 15 Minutes | Not Implemented (MIME check only) | Verified (Mocked) / REQUIRES LIVE DEPLOYMENT |
| `offer-documents` | Verified | Private | Read-Only | Denied | Denied | 15 Minutes | Not Implemented (Server Generated PDF) | Verified (Mocked) / REQUIRES LIVE DEPLOYMENT |
| `support-attachments` | Verified | Private | Allowed | Denied | Denied | 15 Minutes | Not Implemented (MIME check only) | Verified (Mocked) / REQUIRES LIVE DEPLOYMENT |

*Security & Malware Note*:
- File uploads enforce client-side and service-layer MIME type allowlists (`.pdf`, `.png`, `.jpeg`, `.jpg`) and strict file size limits (5 MB max).
- Automated server-side malware scanning (e.g. ClamAV / VirusTotal webhook integration) is **Not Implemented** in the current phase and must be integrated prior to public production launch.
- MIME type checking does NOT constitute malware scanning.
