# Stitch Screen Analysis — Phase A8: Candidate Conditional Offers List

## Stitch Project Details
- **Stitch Project Name**: Be Humble & Grow Portal
- **Stitch Project ID**: `projects/13654249462666228786`
- **Candidate Offer Details Screen (Phase A9)**: `5d12fe82b279439bb9a92ce2b4f6400d` ("Review Offer | Be Humble & Grow")
- **Candidate Workspace Route**: `/candidate/offers`
- **Current Page**: `src/pages/candidate/CandidateOffersPage.tsx`

## Screen Design & Hierarchy
1. **AppBar**: Top header with Candidate Avatar and workspace branding.
2. **Page Header**: Title `Conditional Offers`, description *"Review conditional offers issued through your applications and track your response deadlines."*, and primary CTA `View Applications` (`/candidate/applications`).
3. **Summary Metrics**: Highlighting total active, action-required, accepted, expiring soon, and historical offers.
4. **Tabs & Filter Bar**:
   - Status Tabs: `Active`, `Action Required`, `Accepted`, `Expired`, `Declined`, `All`
   - Search: Job title, reference number, or disclosed employer
   - Filters & Sort: Expiry date, proposed start date, position
5. **Offer Cards Grid**:
   - Candidate-facing offer reference (e.g. `BHG-OFR-2026-001284`)
   - Job title & location (`Customer Service Representative`, `Dubai, UAE`)
   - Authorised Employer display (`Horizon Gulf Services LLC` or `Approved UAE Employer`)
   - Base salary & currency (`AED 4,500/mo`)
   - Structured benefit badges (Housing, Transport, Health Insurance)
   - Expiry countdown & status badge
   - Primary action: `View Offer` (`/candidate/offers/:offerId`)
6. **Compliance Disclaimer**: Short warning notice on conditional nature (subject to document verification, MOHRE work-permit clearance, and medical fitness).
