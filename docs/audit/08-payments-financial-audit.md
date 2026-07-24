# 8. Payments and Financial Audit

## 8.1 Verification Fee (£15 / $150 AED) Workflow Audit
- **Planned Workflow**: Candidates pay a £15 verification fee to cover background document verification before employer submission.
- **Current State**: `MOCK IMPLEMENTATION`
- **Implementation Reality**:
  - Payment checkout UI button does not trigger Stripe Checkout or Square SDK.
  - Payment status is static text in `PortalManager.jsx` (`Paid ($150 AED)`).
  - No server-side endpoint exists to confirm payment capture or verify payment webhook payloads.

---

## 8.2 Financial Security Helper Evaluation (`paymentSecurity.js`)

```javascript
// src/lib/paymentSecurity.js snippet
export function evaluateRefundApproval(amount, requesterId, approverId) {
  const HIGH_VALUE_THRESHOLD = 500.00;
  if (amount > HIGH_VALUE_THRESHOLD) {
    if (!approverId) return { approved: false, requires_secondary_approval: true };
    if (requesterId === approverId) return { approved: false, reason: 'Conflict of Interest' };
  }
  return { approved: true };
}
```

### Key Financial Controls Checked:
1. **Dual Approval (Four-Eyes Principle)**: Correctly requires secondary approver for refunds exceeding $500.00.
2. **Conflict of Interest Prevention**: Denies refund approval if requester ID matches approver ID.
3. **Stripe Webhook Signature Verification**: Implemented in `verifyWebhookSignature`, but checks `process.versions.node` which is absent in client browser environments.

---

## 8.3 Legal & Merchant Provider Eligibility Risk
- **Merchant Entity Legal Status**: Legality of charging job candidate application/verification fees varies by jurisdiction. Under standard recruitment regulations (e.g. UK Employment Agencies Act 1973 and UAE Labour Law), charging jobseekers placement fees is strictly regulated or prohibited.
- **Provider Eligibility**: Stripe & Square require explicit compliance verification for recruitment platforms charging candidate fees before granting production merchant processing capabilities.
