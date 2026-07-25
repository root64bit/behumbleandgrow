# Stitch Screen Analysis — Phase A9: Candidate Conditional Offer Details & Decision Workflow

## Stitch Screen Identity
- **Stitch Project Name**: Be Humble & Grow Portal
- **Stitch Project ID**: `projects/13654249462666228786`
- **Target Screen Title**: Conditional Offer Details ("Review Offer | Be Humble & Grow")
- **Target Screen ID**: `5d12fe82b279439bb9a92ce2b4f6400d`
- **Device Type**: MOBILE (780px x 2828px)
- **Canonical Route**: `/candidate/offers/:offerId`
- **Page Component**: `src/pages/candidate/CandidateOfferDetailsPage.tsx`

## Visual & Functional Hierarchy
1. **Top Bar**: Menu/Back arrow navigation (`arrow_back`), workspace title `Be Humble & Grow`, and candidate avatar.
2. **Hero Section**: Dark navy card (`#00122B`), `Conditional Offer` badge, *"Congratulations! Review your employment details below."* title.
3. **Reference & Expiry Grid**:
   - Offer Reference (e.g. `BHG-OFR-2026-001284`)
   - Expiry Date & Countdown (e.g. `5 August 2026`)
4. **Conditional Notice Card**: Amber warning card (`bg-tertiary-fixed`) with `verified_user` icon stating MOHRE work permit and visa clearance dependencies.
5. **Compensation Bento Grid**:
   - Monthly Base Salary (`AED 4,500 / month`)
   - Accommodation status (`Included`)
   - Transport status (`Included`)
6. **Benefits & Terms Accordions**:
   - Benefits Package (Health Insurance, Annual Leave, Flight Allowance)
   - Contractual Conditions (Probation Period, Notice Period, Working Hours)
7. **Required Offer Documents Card**: Secure preview/download of formal offer letter and job description.
8. **Decision Action Bar & Modals**:
   - Primary `Accept Offer` CTA button -> opens Digital Acceptance Modal with legal declarations & typed signature (`I ACCEPT`).
   - Secondary `Decline Offer` button -> opens Decline Confirmation Modal with reason selection.
   - Secondary `Request Clarification` CTA -> deep links to `/candidate/support`.

## Key Differences & Integration Strategy
- Existing page was a placeholder or mock component.
- The new implementation connects to safe `candidate-offer-details.service.ts` using candidate-scoped relational query, 72h expiry calculator, Level 3 server-verified secure document access, and concurrency-protected acceptance/decline mutations.
