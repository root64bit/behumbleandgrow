# 17 — Demo, Mock & Fallback Behaviour Audit

- **Environment Flag**: `VITE_DEMO_DATA_ENABLED` defaults to `false`.
- **Production Protection**: Production build paths do not load sample records or inject demo candidates. Unowned resource queries return 404 Not Found or empty results.
- **Service Audit**: Inspected `candidate-offer-details.service.ts`, `placementDeadline.ts`, `candidate-support.service.ts`, `candidate-notifications.service.ts`. Fallback demo data is active ONLY when `VITE_DEMO_DATA_ENABLED === 'true'` in local development environment.
