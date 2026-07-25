# Stitch Screen Analysis — Candidate Interviews List

## Screen Metadata
- **Project**: Be Humble & Grow Portal (`projects/13654249462666228786`)
- **Exact Candidate Screen ID**: `c64b81f49f5c491d968886d8725878cc`
- **Title**: `My Interviews` (Width: 780px, Height: 3054px, Mobile)
- **Verified Distinct From**:
  - `464a03ed4fef43699e28bdfebff6e5a0` (`Interview Details & Feedback` - Phase A7)
  - `5aa788927c7549279b46b36ad402ceda` (`Interview Management` - Operations)
  - `13cc7cda3c32435ca15590d02bd7be1f` (`Recruiter Pipeline` - Recruiter Partner)
- **Canonical Route**: `/candidate/interviews`

## Visual Hierarchy & Structural Layout
1. **Top Bar & Header**:
   - Menu button & corporate logo / avatar.
   - Title: `My Interviews` (`font-headline-lg-mobile text-[#00122B]`).
   - Subtitle: `Track and manage your upcoming career growth opportunities.`

2. **Horizontal Status Tabs**:
   - `Upcoming`, `Action Required` (Awaiting Confirmation), `Completed`, `Rescheduled`, `All`.

3. **High Priority Action Banner**:
   - Amber alert banner highlighting `Attendance Confirmation Required` with action buttons: `Confirm Attendance` and `View Details`.

4. **Dual Time Display Grid**:
   - **Candidate Local Time**: Formatted in candidate local time zone (e.g. `10:00 AM CAT / SAST / EAT`).
   - **UAE Time**: Formatted in `Asia/Dubai` GST (`01:00 PM GST`).

5. **Interview Cards**:
   - Job title & employer display name (masked as `"Approved UAE Employer"` prior to disclosure authorization).
   - Date, dual time, format (`Video Interview` / `In-Person`).
   - Status badge (`Confirmed`, `Pending`, `Rescheduled`).
   - Deep link CTA button: `View Details` → `/candidate/interviews/:interviewId`.

6. **Interview Preparation Insights**:
   - Bento cards highlighting prep tips & checklist.
