# Stitch Screen Analysis — Candidate Dashboard

## Overview
- **Stitch Project Name:** Be Humble & Grow Portal
- **Stitch Project ID:** `projects/13654249462666228786`
- **Stitch Screen ID:** `51d25ad15925402088cc0c3035815122`
- **Screen Title:** Candidate Dashboard
- **Target Canonical Route:** `/candidate/dashboard`
- **Canvas Dimensions:** 780px × 2506px (Device: MOBILE)

---

## 1. Canvas & Responsive Layout Structure
- **Design Paradigm:** Mobile-first layout with clean vertical stack and bento-grid card sections.
- **Top App Bar:** Fixed header (`h-16`) containing menu toggle, brand title ("Be Humble & Grow"), and candidate avatar picture.
- **Main Container:** Padding (`px-4`), top margin offset (`pt-20`), stack spacing (`space-y-8`), bottom padding (`pb-20`).
- **Bottom Navigation Bar:** Fixed bottom bar (`h-16`) with 5 primary items (Home, Jobs, Applications, Alerts, Profile).

---

## 2. Color Palette & Visual System
- **Primary Navy:** `#00122B` / `#0F2747` (`primary`, `primary-container`)
- **Emerald Green:** `#006D44` (`secondary`)
- **Light Emerald Container:** `#7DF7B6` / `#EAF7F1` (`secondary-container`)
- **On Secondary Container:** `#007147`
- **Amber/Gold Accent:** `#FFDEA9` (`tertiary-fixed`), text `#5F4100` (`on-tertiary-fixed-variant`)
- **Surface Background:** `#FAF9FC` (`surface`)
- **Card Background:** `#FFFFFF` (`surface-container-lowest`) with border `#C4C6CF` (`outline-variant`)
- **Muted Text:** `#44474E` (`on-surface-variant`)
- **Subtle Elevation Shadow:** `shadow-[0px_4px_12px_rgba(15,39,71,0.05)]`

---

## 3. Typography Hierarchy
- **Headings Font:** Plus Jakarta Sans (`headline-lg-mobile`: 28px/1.3, `headline-md`: 24px/1.4, `headline-lg`: 32px)
- **Body Font:** Inter (`body-lg`: 18px, `body-md`: 16px, `body-sm`: 14px, `label-md`: 14px font-semibold, `label-sm`: 12px font-medium)
- **Status Badges:** 10px uppercase tracking-wider font-bold.

---

## 4. Dashboard Sections & Visual Components Hierarchy

### 4.1 Header Bar
- Menu toggle icon (`material-symbols-outlined` -> `menu`)
- Brand Title: "Be Humble & Grow" (Navy bold heading)
- Candidate Avatar: Rounded full avatar (`border-2 border-primary-fixed`)

### 4.2 Candidate Welcome & Profile Progress Card
- Greeting: "Welcome, Alex" (or authenticated candidate name)
- Subtitle: "Your career journey is 75% complete. You're almost there!"
- Progress Card:
  - Label: "Profile Completeness" (14px semibold)
  - Percentage: "75%" (Emerald text)
  - Bar: Track `#E3E2E5`, Fill `#006D44` (Emerald, rounded-full)

### 4.3 Urgent Actions (Bento Grid)
- Heading: "Urgent Actions"
- Action Item 1: Complete Eligibility Assessment (Background `#7DF7B6`, icon `assignment_turned_in`)
- Action Item 2: Upload Passport (Background `#FFDEA9`, icon `upload_file`)

### 4.4 Application Journey (Vertical Timeline)
- Heading: "Application Journey"
- Timeline Container: Card with vertical line (`bg-outline-variant`) connecting step nodes.
- Step 1 (Completed): Check mark node (`bg-secondary`, white check icon) -> "Application Submitted", "Completed on Oct 12, 2023"
- Step 2 (Active/Current): Pulsing dot node (`bg-secondary-container border-2 border-secondary`) -> "Interviewing", "Technical round scheduled for tomorrow at 2:00 PM", CTA button "Join Meeting" (`bg-primary text-white`)
- Step 3 (Pending/Upcoming): Hourglass icon node (`bg-surface-container-highest`) -> "Offer Negotiation", "Estimated: Early November"

### 4.5 Recommended Jobs (Horizontal Scroll / Desktop Grid)
- Heading: "Recommended for You" + CTA "View All"
- Horizontal scroll container (`overflow-x-auto snap-x hide-scrollbar`)
- Job Cards:
  - Card 1: Employer Logo, Tag "High Match" (`bg-secondary-container`), Title "Senior UX Architect", Employer "Global Nexus • London (Remote)", Skill tags (Figma, React, Design Systems), Salary "$120k - $150k", Bookmark button.
  - Card 2: Employer Logo, Tag "Featured" (`bg-tertiary-fixed`), Title "Product Strategy Lead", Employer "FinEdge Int. • Singapore", Skill tags (Leadership, MBA, Agile), Salary "$140k - $180k", Bookmark button.

### 4.6 Bottom Navigation (Mobile)
- Fixed bottom container (`h-16`, rounded-t-xl, `bg-white`, border-t)
- Navigation Items: Home (active), Jobs, Applications, Alerts, Profile.

---

## 5. Responsive & Layout Adaptation Strategy for Desktop
- **Mobile (390px):** Mobile-first single-column stacked layout with top app header & bottom navigation bar.
- **Tablet (768px):** Collapsible sidebar layout, 2-column grid for Urgent Actions and Profile Readiness.
- **Laptop/Desktop (1024px - 1440px):**
  - Desktop CandidateSidebar with Candidate Workspace identity badge.
  - Multi-column bento grid for Welcome, Profile Readiness, and Document Status.
  - 2-Column layout: Journey Timeline on left column, Urgent Actions & Interview/Offer/Placement summaries on right column.
  - Multi-column grid for Recommended UAE Jobs.

---

## 6. Gaps & Missing States in Stitch Design vs Production Requirements
1. **Mock Names/Currencies:** Stitch uses "Alex", "$120k-$150k" USD, and "London/Singapore". Production requires authenticated candidate profile data (or fallback "Amina Mabote" / "BHG-CAN-003821"), AED salary display, and UAE placement journey context.
2. **Missing States:** Stitch design only displays loaded state. Production requires:
   - Full Skeleton Loading State (`CandidateDashboardSkeleton`)
   - Error Failure State ("We could not load your workspace" + Try Again & Support CTAs)
   - Empty/New Candidate State (No active applications/interviews/offers yet -> onboarding CTAs)
   - Real-time data states (documents status, interview countdown, conditional offer warnings).
