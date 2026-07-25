# Responsive Adaptation & Accessibility Audit — Candidate Profile

## Viewport Coverage
- **320px - 390px (Mobile):** Single column vertical layout, section navigator scrollbar, bottom navigation bar (`h-16`, `rounded-t-xl`).
- **768px (Tablet):** 2-Column layout for forms, expand/collapse accordions.
- **1024px - 1440px (Desktop):** Full sidebar navigation on left, 2-column main grid with sticky completion card on right.

## Accessibility Features (WCAG 2.2 AA)
- Single `<h1>` heading per page ("My Profile").
- Interactive controls have explicit `aria-label` or visible `<label>` elements.
- Section navigation items support keyboard operation and focus rings.
- Colors meet minimum contrast ratios (Primary Navy `#00122B` on Light Background `#FAF9FC`, Emerald `#006D44`).
- Status is represented by both icon and text, not color alone.
