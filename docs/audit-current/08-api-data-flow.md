# 8. API and Data Flow Audit

## 8.1 Current Data Flow Architecture
- **Data Flow Type**: 100% Client-Side In-Memory State.
- **Persistence**: Data mutations (e.g. creating jobs, verifying candidate documents, toggling partner risk status) exist only within React component state (`useState`) and revert to default values upon page refresh.

---

## 8.2 Endpoint Inventory & Implementation Status

| Feature Workflow | Target Endpoint | HTTP Method | Expected Auth | Current Code Implementation | Production Status |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Candidate Registration** | `/api/auth/register` | POST | Anonymous | None | `MISSING` |
| **Candidate Document Upload**| `/api/documents/intent` | POST | Bearer JWT | `createUploadIntent` in `storageSecurity.js` | `STUB ONLY` |
| **Pre-Signed Document View** | `/api/documents/sign` | GET | Bearer JWT | `generateSignedUrl` in `storageSecurity.js` | `STUB ONLY` |
| **Fee Payment Intent** | `/api/payments/checkout`| POST | Bearer JWT | None | `MISSING` |
| **Stripe Webhook Listener** | `/api/webhooks/stripe` | POST | HMAC Signature | `verifyWebhookSignature` in `paymentSecurity.js` | `STUB ONLY` |
| **Refund Dual Approval** | `/api/finance/refund` | POST | MFA Bearer JWT | `evaluateRefundApproval` in `paymentSecurity.js` | `STUB ONLY` |

---

## 8.3 Security Defect in Helper Stubs
- **Environment Context Bug**: `verifyWebhookSignature` in `src/lib/paymentSecurity.js` attempts to execute `require('crypto')` when Node version checks pass. Calling this function directly inside browser client bundles will cause runtime bundler errors unless polyfilled.
