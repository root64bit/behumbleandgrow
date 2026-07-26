# 13 — Safe Deep Link & URL Routing Audit

- **Internal Navigation Allowlist**: All notification clicks and dashboard card deep links validate destination routes against an explicit internal allowlist (`/candidate/*`).
- **Malicious Navigation Rejection**: Arbitrary external URLs, `javascript:` schemes, and un-sanitized open redirects are rejected by `notificationDeepLink.ts`.
- **Dynamic Parameter Safety**: Route IDs (e.g. `:applicationId`, `:interviewId`, `:offerId`) are validated against regex format (`^[a-zA-Z0-9_-]+$`). Destination pages verify ownership before rendering data.
