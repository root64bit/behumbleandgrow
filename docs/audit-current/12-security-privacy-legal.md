# 12. Security, Privacy and Legal Readiness

## 12.1 Security Findings & Vulnerabilities

### 1. Hardcoded Firebase API Key in `.env` (CRITICAL)
- **Location**: `.env:L2`
- **Exposed Secret**: `VITE_FIREBASE_API_KEY=AIzaSyDvXvvPIfNZTZj0d-5-Q07FBAakvwqxCFw`
- **Remediation**: Revoke the key in Firebase Console and remove `.env` from Git tracking.

### 2. Client-Side Payment Verification Bypass (CRITICAL)
- **Location**: `src/components/portals/PortalManager.jsx`
- **Vulnerability**: Payment verification is unverified client string state. Candidates can bypass payment requirements by altering local React component state.

---

## 12.2 Data Privacy & Compliance (GDPR / UAE Data Law)
- **Candidate Consent**: Terms and Privacy Policy links exist in `PublicFooter.jsx`, but no explicit, version-tracked consent checkbox exists on candidate forms.
- **Data Subject Rights**: Right to access, export, and delete candidate PII (Account Deletion workflow) is **MISSING**.
