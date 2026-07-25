# Document Status Model & Canonical Mapping

## Canonical Database Statuses
- `pending`: Document uploaded, awaiting Operations review.
- `under_review`: Operations team currently reviewing document.
- `approved`: Operations team approved document.
- `rejected`: Operations team rejected document with Candidate-visible reason.
- `replacement_requested`: Operations team requested an updated document version.
- `superseded`: Prior document version replaced by a newer version.
- `archived`: Document archived.

## Human-Readable Display Labels
- `approved` → `"Verified"`
- `pending` → `"Pending Review"`
- `under_review` → `"Under Review"`
- `rejected` → `"Rejected"`
- `replacement_requested` → `"Replacement Requested"`
- `not_uploaded` → `"Missing"`
- `superseded` → `"Superseded"`

## Expiry Calculation Model
Expiry health is calculated separately from review status:
- Expiry threshold: 90 days before `expiry_date`.
- `expiring_soon`: Valid document with `0 < daysRemaining <= 90`.
- `expired`: Document with `daysRemaining <= 0`.
