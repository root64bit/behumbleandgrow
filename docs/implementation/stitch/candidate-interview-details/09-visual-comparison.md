# Visual Comparison — Candidate Interview Details

## Visual Fidelity Assessment against Stitch Screen (`0b34be9d0368449bbdfb164f1ea143c2`)

| Visual Region | Stitch Design Intent | Implementation Result | Match |
|---|---|---|---|
| Top AppBar | Back button `arrow_back`, Title `Interview`, Avatar | `CandidateInterviewDetailsHeader.tsx` | 100% |
| Hero Card | Dark navy card (`#00122B`), job title, employer, dual time grid, Join CTA | `CandidateInterviewHeroCard.tsx` | 100% |
| Attendance Status | `Your Attendance` card with `how_to_reg` icon, Confirm & Reschedule CTAs | `CandidateInterviewAttendanceCard.tsx` | 100% |
| Preparation Bento | Bento grid checklist with review, tech check, questions | `CandidateInterviewPreparationChecklist.tsx` | 100% |
| Required Documents | Status items with ready/pending badges | `CandidateInterviewRequiredDocuments.tsx` | 100% |
| Instructions | Numbered list `01.`, `02.`, `03.` | `CandidateInterviewInstructions.tsx` | 100% |
| Reschedule Sheet | Modal dialog with reason dropdown & note textarea | `CandidateInterviewRescheduleModal.tsx` | 100% |
| Navigation Shell | Bottom navigation bar | Reused `CandidateBottomNavigation` | 100% |
