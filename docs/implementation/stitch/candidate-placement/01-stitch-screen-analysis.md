# Stitch Screen Analysis — Candidate Placement & Relocation Status

## Screen Identity
- **Screen Title**: Placement & Relocation Status
- **Stitch Screen ID**: `36cf8cb692fb423f879170166d2d57fa`
- **Stitch Project ID**: `projects/13654249462666228786`
- **Canonical Route**: `/candidate/placement`
- **Workspace**: Candidate Workspace (`CandidateLayout`)

## Visual Hierarchy & Component Breakdown
1. **Header & Brand Navigation**:
   - Header with title `Placement Progress | Be Humble & Grow` and Candidate profile avatar.
2. **Hero Aspirational Banner**:
   - Dark Navy banner (`#00122b` / `bg-primary-container`) displaying greeting (`Almost There, Alex!`), progress percentage (`60% complete`), and current focus (`securing your work permit`).
3. **Current Action & Status Card**:
   - Status badge (`Work Permit Submitted`), estimated duration (`5-7 business days`), and government legal disclaimer notice.
4. **Vertical Progress Tracker (Placement Timeline)**:
   - 7-step sequential relocation pathway (`Offer Accepted`, `Documents Prepared`, `Medical Process`, `Work Permit`, `Visa Application`, `Travel Arrangements`, `Arrival & Onboarding`).
5. **Detailed Bento Sections**:
   - **Candidate Documents Card**: Status of uploaded documents with CTA `View All Documents` (`/candidate/documents`).
   - **Medical Appointment Card**: Appointment date (`18 Oct`), clinic name (`Global Health Clinic`), and clearance status.
   - **Travel Details Card**: Flight & arrival details card with lock icon state prior to visa issuance.
6. **Support & Assistance Banner**:
   - Dedicated placement officer chat CTA (`Message Us` -> `/candidate/support`).

## Responsive & Accessibility Intent
- Fluid 320px to 1440px layout using CandidateLayout shell.
- Full keyboard accessibility, aria-live status announcements, and touch target optimization.
- Dark mode compatibility using Navy (`#00122b`) brand palette.
