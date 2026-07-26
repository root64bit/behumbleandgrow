# 21 — Full Responsive Viewport Audit

- **Tested Breakpoints**:
  - `320px` (Ultra Mobile): No horizontal scroll. Text wraps cleanly. Floating save bars fit viewport width.
  - `375px` & `390px` (Standard Mobile): Bottom navigation bar renders cleanly without overlapping content.
  - `430px` (Large Mobile): Hero cards and metric grids stack vertically.
  - `768px` (Tablet): Sidebar collapsible drawer and 2-column grid layout active.
  - `1024px` & `1440px` (Desktop): Full desktop sidebar, topbar user menu, and multi-column workspace cards active.
- **Layout Overflow Protection**: All long candidate references, employer names, and email addresses use `truncate` or `break-words`.
