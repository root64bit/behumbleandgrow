# Secure Document Access Architecture — Phase A9

## Level 3 Server-Verified Ephemeral Token Access
- Document paths are never returned as permanent public URLs in initial queries.
- Candidate selects `View Offer Document` -> `requestMyOfferDocumentAccess(userId, offerId)` verifies session and candidate ownership -> generates 10-minute signed URL.
- Preview modal clears signed URL state upon close.
