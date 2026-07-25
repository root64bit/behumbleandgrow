# Responsive Design & Accessibility Audit — Candidate Placement

## Viewport Coverage
- **Mobile (320px - 430px)**: Single column stack, touch-optimized dialog buttons (minimum 44px height), wrap for references.
- **Tablet (768px)**: 2-column bento grid for process cards.
- **Desktop (1024px - 1440px)**: Max-width container (`max-w-4xl`) inside CandidateLayout.

## WCAG 2.2 AA Compliance
- Single `<h1>` heading for main screen title.
- High-contrast text colors on Navy (`#00122b`) and Light Surface (`#faf9fc`) backgrounds.
- Accessible full date strings for screen readers.
- Focus trap inside `CandidatePlacementAcknowledgementDialog.tsx`.
