# 5. Responsive UX and Accessibility Audit

## 5.1 Mobile Viewport Matrix (320px – 1920px)

| Viewport Width | Screen Tested | Visual Layout | Horizontal Scroll | Touch Targets | Mobile Drawer | Verdict / Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **320px (iPhone SE)** | Public Homepage | 🟡 Compact | 🔴 Table overflow | 🟡 Small (< 44px) | 🔴 Missing | `NEEDS MOBILE FIXES` |
| **360px (Android Small)** | Employer Modal | 🔴 Modal cut off | 🟢 Clean | 🟡 Small | 🔴 Missing | `NEEDS MOBILE FIXES` |
| **375px (iPhone 13 Mini)** | Candidate Portal | 🟢 Responsive | 🟢 Clean | 🟢 Good | 🔴 Missing | `PASSES WITH WARNINGS` |
| **390px (iPhone 14 Pro)** | Partner Portal | 🟢 Responsive | 🟢 Clean | 🟢 Good | 🔴 Missing | `PASSES WITH WARNINGS` |
| **430px (iPhone 14 Pro Max)**| Ops Console | 🟢 Responsive | 🟢 Clean | 🟢 Good | 🔴 Missing | `PASSES WITH WARNINGS` |
| **768px (iPad Mini)** | Compliance Review | 🟢 2-Column Grid | 🟢 Clean | 🟢 Good | N/A | `PASS` |
| **1024px (iPad Pro)** | Admin Governance | 🟢 4-Column Grid | 🟢 Clean | 🟢 Good | N/A | `PASS` |
| **1440px (Desktop)** | Entire Platform | 🟢 Full Layout | 🟢 Clean | 🟢 Good | N/A | `EXCELLENT` |
| **1920px (FHD Desktop)** | Entire Platform | 🟢 Centered Max-W | 🟢 Clean | 🟢 Good | N/A | `EXCELLENT` |

---

## 5.2 Accessibility Audit (WCAG 2.2 AA)
1. **Keyboard Navigation & Focus Trapping**: Modals (`EmployerJobCreateModal.jsx`, `FinanceRefundApprovalModal.jsx`) do not implement focus trapping or `Escape` key close handlers.
2. **Accessible Labels**: Action buttons in `CandidateVerificationVault.jsx` use raw icons without `aria-label="Verify document"` text.
3. **Contrast Ratios**: Small muted subtitles (`text-slate-400` on `bg-white`) fail the 4.5:1 minimum contrast ratio.
