# 13. Pilot Risk Register & Mitigation Strategy

## Risk Register

| Risk Item | Severity | Mitigation Strategy | Status |
| :--- | :--- | :--- | :--- |
| Candidate Data Exposure | Critical | Row-Level Security (RLS) policies verified by Vitest isolation suite | Mitigated |
| Accidental Live Payments | High | Application fee hard-disabled via feature flag `VITE_APPLICATION_FEE_ENABLED=false` | Mitigated |
| Unverified Document Exposure | High | Short-lived signed URLs (30-min expiry) with MIME/size limits | Mitigated |
| Push Notification Delivery Failure | Low | In-App notification fallback active when browser FCM push is blocked | Mitigated |
