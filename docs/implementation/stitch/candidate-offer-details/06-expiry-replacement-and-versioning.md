# Expiry, Replacement & Versioning — Phase A9

## Expiry Calculation Thresholds
- Uses server/reference time for deadline comparison.
- Evaluates 72h window (`valid`, `expiring_soon`, `expires_today`, `expired`).
- Expired offers disable decision buttons.

## Offer Replacement & Version Tracking
- Superseded offers display `CandidateOfferReplacementNotice.tsx` and disable acceptance/decline CTAs.
- Preserves historical version activity log.
