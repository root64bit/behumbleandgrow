# Responsive & Accessibility Compliance Matrix — Candidate Dashboard

## 1. Responsive Viewport Adaptations

| Viewport Width | Device Target | Layout Adaptation | Sidebar / Header Behavior |
|---|---|---|---|
| 320px - 390px | Small Mobile | Single column stacked layout, horizontal scroll snap for jobs | Sticky Header + Fixed Bottom Navigation Bar |
| 430px | Large Mobile | Single column stacked layout, full-width bento cards | Sticky Header + Fixed Bottom Navigation Bar |
| 768px | Tablet | 2-column bento grids for progress and documents | Collapsible Desktop Sidebar + Top Bar |
| 1024px | Laptop | 2-column main grid: Journey on left, Actions & Summaries on right | Expanded/Collapsible Sidebar |
| 1440px | Desktop | Max width 1600px, multi-column grid for recommended jobs | Full Desktop Candidate Sidebar with Workspace Badge |

---

## 2. Accessibility Checklist (WCAG 2.2 AA)
- [x] **Heading Hierarchy:** Single `<h1>` per page ("Welcome, [Name]" / "Candidate Workspace"), sequential `<h2>`, `<h3>`, `<h4>`.
- [x] **Color Contrast:** All text meets 4.5:1 minimum contrast ratio against `#FAF9FC` and `#FFFFFF` backgrounds.
- [x] **Keyboard Navigation:** All interactive cards, buttons, tabs, and links receive visible focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-500`).
- [x] **Screen Reader Support:** Icon-only buttons include `aria-label` or `sr-only` text. Timeline stages describe current, completed, and pending states via `aria-current="step"`.
- [x] **Touch Target Sizes:** All interactive elements maintain a minimum 44px × 44px clickable area on mobile.
- [x] **Status Integrity:** Statuses are represented by clear text labels and icons, not color alone.
