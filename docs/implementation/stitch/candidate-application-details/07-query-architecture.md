# Query Architecture & Resilient Section Loading

## Independent Section Queries (`Promise.allSettled`)
To ensure that a failure in a secondary connected resource (such as offers or interviews) does not prevent rendering the core application overview, data loading utilizes `Promise.allSettled`:

```ts
const [timelineRes, docsRes, interviewRes, offerRes, placementRes] = await Promise.allSettled([
  loadCandidateTimeline(applicationId),
  loadApplicationDocumentRequirements(userId),
  loadCandidateInterview(applicationId),
  loadCandidateOffer(applicationId),
  loadCandidatePlacement(applicationId),
]);
```

## Concurrency Protection on Withdrawal
Withdrawal verifies candidate ownership, allowed current status (`submitted`, `under_review`, `onboarding`, `employer_submitted`), and compares the previously loaded `updated_at` timestamp before executing mutation.
