# 11. Payment and Monetisation Audit

## 11.1 Verification Fee (£15 / $150 AED) Workflow
- **Fee Target**: Candidate verification and background document screening fee.
- **Provider Status**: No payment SDK (Stripe or Square) is imported in `package.json`.
- **Payment Verification Engine**: Verification payment state is hardcoded text (`Paid ($150 AED)`).

---

## 11.2 Financial Helper Logic (`src/lib/paymentSecurity.js`)

```javascript
// Dual Approval Logic Evaluation
export function evaluateRefundApproval(amount, requesterId, approverId) {
  const HIGH_VALUE_THRESHOLD = 500.00;
  if (amount > HIGH_VALUE_THRESHOLD) {
    if (!approverId) return { approved: false, requires_secondary_approval: true };
    if (requesterId === approverId) return { approved: false, reason: 'Conflict of Interest' };
  }
  return { approved: true };
}
```

- **Evaluation**: Logic correctly implements the four-eyes dual approval requirement for refunds > $500.00, but is triggered only via local modal state in `FinanceRefundApprovalModal.jsx`.

---

## 11.3 Merchant Legal & Regulatory Risk
- **Recruitment Licensing**: Charging candidate placement or verification fees is subject to strict statutory rules in the UK (Employment Agencies Act 1973) and UAE Labour Regulations. Merchant account approval from Stripe/Square requires explicit legal verification of fee structure compliance.
