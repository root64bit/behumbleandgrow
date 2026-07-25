# Stitch Screen Analysis — Candidate Application Details & Timeline

## Screen Metadata
- **Project**: Be Humble & Grow Portal (`projects/13654249462666228786`)
- **Exact Candidate Screen ID**: `31420db8b9f34a52b78b4252920f8d79`
- **Confirmation of Candidate Screen**:
  - Title: `Application Details` (Width: 780px, Height: 2068px).
  - Verified distinct from Operations dossier screen `9a035632a6f7487f99c8f1bd24d70073` (`Application Details - Amina Mabote`).
  - Connected route: `My Applications` (`df902262e86147809e17a7aa33e86be7`) → `Application Details` (`31420db8b9f34a52b78b4252920f8d79`).
- **Canonical Route**: `/candidate/applications/:applicationId`

## Visual Hierarchy & Structural Layout
1. **Top Bar Header**:
   - Back button (`arrow_back`) returning to `/candidate/applications`.
   - Title: `Application Details` (`text-headline-md font-bold text-[#00122B]`).
   - Candidate corporate portrait avatar.

2. **Required Action Card**:
   - Status banner highlighting current candidate action (e.g. `check_circle` `"No action required"` or amber warning banner for document/screening upload).

3. **Job Summary Card**:
   - Job title: `Customer Service Representative` (`text-headline-md font-bold text-[#00122B]`).
   - Employer & location: e.g. `Global Connect Solutions • Dubai, UAE` (or generic disclosure `"Approved UAE Employer • Dubai, UAE"` depending on stage rules).
   - Job tags: `Full-time`, `Entry Level`, `Visa Sponsored`.

4. **Sticky Sub-Navigation Tabs**:
   - Horizontally scrollable sub-tabs: `Overview`, `Screening Answers`, `Documents`, `Payment`.

5. **Status Timeline Section**:
   - Heading: `Application Status` (`uppercase tracking-wider text-label-md`).
   - Vertical stage track with connectors:
     - Stage 1: `Application Submitted` (Completed - Green check badge)
     - Stage 2: `Payment Confirmed` (Completed - Green check badge /Waived fee notice)
     - Stage 3: `Initial Review` / `Employer Review` (Current active stage - Pulsing emerald ring)
     - Stage 4: `Interview Selection` / `Conditional Offer` (Future pending stage - Gray outline)

6. **Quick Info & Details Cards**:
   - Application ID badge: `#BHG-APP-2026-014589`.
   - Screening summary, document requirements link, interview/offer/placement status blocks, support escalation CTA.

## Design System Tokens
- **Primary Navy**: `#00122B`
- **Secondary Emerald**: `#006D44`
- **Surface Background**: `#FAF9FC`
- **Typography**: Plus Jakarta Sans (Headings), Inter (Body)
