# Candidate Actions & Deadlines — Candidate Placement

## Priority Resolution Order
1. `replace_document` (Priority 1)
2. `upload_document` (Priority 2)
3. `confirm_personal_info` (Priority 3)
4. `confirm_availability` (Priority 4)
5. `book_medical` (Priority 5)
6. `review_itinerary` (Priority 6)
7. `confirm_travel_readiness` (Priority 7)
8. `review_accommodation` (Priority 8)
9. `acknowledge_onboarding` (Priority 9)
10. `contact_support` (Priority 10)

## Concurrency Protection
- Candidate acknowledgement mutations require `version` matching the loaded action state token (`expectedVersion`).
- Version mismatch throws a concurrency conflict error and triggers `CandidatePlacementConflictState`.
