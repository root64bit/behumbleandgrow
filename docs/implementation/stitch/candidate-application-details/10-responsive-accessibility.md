# Responsive & Accessibility Compliance

## Responsive Adaptations
- Tested across viewports: 320px, 375px, 390px, 430px, 768px, 1024px, 1440px.
- Mobile viewports display single-column vertical timeline and scrollable sub-tabs.
- Desktop viewports (1440px) render sticky top navigation and structured multi-column card layouts inside `CandidateLayout`.

## Accessibility (WCAG 2.2 AA)
- Single `<h1>` title per page.
- Accessible back navigation button (`aria-label="Back to My Applications"`).
- Keyboard-operable sub-tabs.
- ARIA live region support for section error recovery.
