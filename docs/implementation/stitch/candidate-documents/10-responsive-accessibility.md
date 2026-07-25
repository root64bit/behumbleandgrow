# Responsive Adaptation & Accessibility Audit — Candidate Document Vault

## Viewport Coverage
- **320px - 390px (Mobile)**: Single column card layout, floating bottom upload button (`#006D44`), slide-up action sheet modal.
- **768px (Tablet)**: 2-Column document grid, modal dialogs centered in viewport.
- **1024px - 1440px (Desktop)**: Full sidebar navigation on left, 2-column main grid with sticky verification progress card on top.

## Accessibility Features (WCAG 2.2 AA)
- Single `<h1>` heading per page ("My Documents").
- Interactive controls have explicit `aria-label` or visible text labels.
- Key navigation and upload triggers support keyboard operation (`Enter`/`Space`) and visible focus rings.
- Color contrast ratios meet WCAG AA standards (Navy `#00122B` on `#FAF9FC`, Emerald `#006D44`).
- Document statuses feature both icon and text, avoiding reliance on color alone.
