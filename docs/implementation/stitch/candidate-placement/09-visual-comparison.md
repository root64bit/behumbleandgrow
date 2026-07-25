# Visual Comparison — Stitch vs Implementation

## Visual Comparison Table

| Interface Element | Stitch Screen Design (`36cf8cb692fb423f879170166d2d57fa`) | React Implementation (`/candidate/placement`) | Status |
|---|---|---|---|
| Workspace Header | Top app bar with brand title & Candidate avatar | CandidateLayout shell with workspace breadcrumbs & reference pill | Matched |
| Hero Overview | Navy `#00122b` banner with progress percentage | `CandidatePlacementOverview.tsx` matching Navy palette & 10-stage bar | Matched |
| Current Status Card | White bento card with status label & MOHRE notice | `CandidatePlacementCurrentStatusCard.tsx` with legal disclaimer | Matched |
| Vertical Timeline | 7-step vertical milestone tracker with check icons | `CandidatePlacementTimeline.tsx` with step indicators & dates | Matched |
| Document Vault Card | Candidate documents status card with Vault CTA | `CandidatePlacementDocumentReadinessCard.tsx` linked to `/candidate/documents` | Matched |
| Medical Appointment Card | Date badge, clinic name, health clearance notice | `CandidatePlacementMedicalCard.tsx` with clinic & clearance badge | Matched |
| Travel & Flight Card | Lock state prior to visa issuance | `CandidatePlacementTravelCard.tsx` with locked or issued itinerary | Matched |
| Placement Support Banner | Navy card with dedicated placement officer chat CTA | `CandidatePlacementSupportCard.tsx` linked to `/candidate/support` | Matched |
