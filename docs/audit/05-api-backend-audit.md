# 5. API and Backend Audit

## 5.1 Backend Architecture Overview
- **Backend Framework**: **NONE**
- **Server Environment**: Client-only React Application built with Vite.
- **Serverless / Edge Functions**: None present in repository.
- **REST / GraphQL Endpoints**: Zero endpoint routes exist.

---

## 5.2 API & Backend Inventory

| Endpoint Area | Expected Method | Purpose | Auth Check | Validation | DB Connection | Backend Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | Candidate registration | 🔴 None | 🔴 None | 🔴 None | `MISSING` | No backend file |
| `/api/auth/login` | POST | Identity login & JWT issuance | 🔴 None | 🔴 None | 🔴 None | `MISSING` | No backend file |
| `/api/candidate/profile` | GET/PUT | Candidate profile management | 🔴 None | 🔴 None | 🔴 None | `MISSING` | Frontend uses local state |
| `/api/candidate/upload-intent` | POST | Generate pre-signed storage URL | 🔴 None | 🔴 Client Stub | 🔴 None | `STUB ONLY` | `storageSecurity.js` |
| `/api/jobs` | GET | List published vacancies | 🔴 None | 🔴 None | 🔴 None | `MISSING` | Frontend hardcoded |
| `/api/payments/checkout` | POST | Initialize £15 verification payment | 🔴 None | 🔴 None | 🔴 None | `MISSING` | No payment SDK |
| `/api/payments/webhook` | POST | Webhook signature verification | 🔴 None | 🔴 Client Stub | 🔴 None | `STUB ONLY` | `paymentSecurity.js` |
| `/api/refunds/approve` | POST | Dual approval refund execution | 🔴 None | 🔴 Client Stub | 🔴 None | `STUB ONLY` | `paymentSecurity.js` |

---

## 5.3 Technical Analysis of Helper Stubs in `src/lib/`

1. **`src/lib/authMiddleware.js`**: Contains `authorizeRequest` and `createAuditEvent` functions. Designed for Express/Next.js request contexts (`req`, `claims`), but never called by any active API server or client handler.
2. **`src/lib/paymentSecurity.js`**: Contains `verifyWebhookSignature` (Stripe HMAC check) and `evaluateRefundApproval` ($500 threshold dual-approval checker). Contains `require('crypto')` call inside Node check, which fails if executed directly in browser environments without polyfills.
3. **`src/lib/storageSecurity.js`**: Contains `createUploadIntent` and `generateSignedUrl`. Generates simulated cryptographic tokens using `Buffer.from(...).toString('base64url')` in client memory.
