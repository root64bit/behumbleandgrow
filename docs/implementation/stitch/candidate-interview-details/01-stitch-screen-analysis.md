# Stitch Screen Analysis — Candidate Interview Details

## Screen Metadata
- **Project**: Be Humble & Grow Portal (`projects/13654249462666228786`)
- **Exact Candidate Screen ID**: `0b34be9d0368449bbdfb164f1ea143c2`
- **Title**: `Interview Details` (Width: 780px, Height: 3044px, Mobile)
- **Verified Distinct From**:
  - `464a03ed4fef43699e28bdfebff6e5a0` (`Interview Details & Feedback` - Operations / Employer evaluation screen)
  - `5aa788927c7549279b46b36ad402ceda` (`Interview Management` - Operations)
  - `13cc7cda3c32435ca15590d02bd7be1f` (`Recruiter Pipeline` - Recruiter Partner)
- **Canonical Route**: `/candidate/interviews/:interviewId`

## Visual Hierarchy & Structural Layout
1. **Top AppBar Header**:
   - Back button (`arrow_back`) -> returns to `/candidate/interviews`.
   - Title: `Interview`
   - Candidate User Avatar in top right corner.

2. **Interview Hero Card**:
   - Category badge: e.g. `Technical Interview` / `Video Interview`.
   - Job Title: e.g. `Senior UX Designer`.
   - Employer & Team: e.g. `Design Systems Team • Global Corp` (or masked `"Approved UAE Employer"` prior to disclosure authorization).
   - Employer logo avatar.
   - Dual Date & Time grid (Candidate Local Time vs UAE `Asia/Dubai` time).
   - **Join Action Button**: `Join Video Interview` (Protected behind server access-window check).

3. **Attendance Confirmation Card**:
   - Heading: `Your Attendance` with `how_to_reg` icon.
   - Body text: *"Please confirm your availability for this session or request a different time slot if needed."*
   - Controlled buttons: `Confirm` and `Reschedule`.

4. **Preparation Checklist (Bento Style Grid)**:
   - Bento items for reviewing case study / job description, technical camera/mic check, and preparing questions.

5. **Required Documents Section**:
   - Required document status cards (Portfolio, Photo ID) with vault status & replacement actions.

6. **Instructions Section**:
   - Step-by-step instructions (`01.`, `02.`, `03.`).

7. **Reschedule Bottom Sheet / Dialog**:
   - Request reschedule modal with date picker, reason dropdown, message, and submission CTA.
