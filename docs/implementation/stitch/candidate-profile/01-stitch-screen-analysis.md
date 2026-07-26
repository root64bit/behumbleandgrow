# Stitch Screen Analysis — Candidate Professional Profile

## Overview
- **Stitch Project Name:** Be Humble & Grow Portal
- **Stitch Project ID:** `projects/13654249462666228786`
- **Stitch Screen ID:** `886016231c624328a9d8985578242aff`
- **Screen Title:** My Profile
- **Target Canonical Route:** `/candidate/profile`
- **Canvas Dimensions:** 780px × 2566px (Device: MOBILE)

---

## 1. Visual Hierarchy & Canvas Layout
- **Header:** Sticky header with brand logo "Be Humble & Grow" and profile avatar.
- **Hero Card:**
  - Candidate Name: "Alexander Chen" (or authenticated user)
  - Candidate Reference ID: "ID: HG-99201-UX" (or `BHG-CAN-...`)
  - Eligibility Badge: "Eligible" (`text-[#006D44]`, check circle)
  - Profile Completion Radial Gauge: SVG ring with completion percentage (e.g. `85%`)
  - Primary Action Button: "Submit for Verification" (`bg-[#006D44] text-white`)
  - Secondary Action Button: "Edit Profile" (`border border-primary text-[#00122B]`)
- **Profile Sections (Accordion / Mobile Section Navigation):**
  1. Personal Information (Full Legal Name, Email, Masked Passport Number `•••• •••• 4402`)
  2. Professional Summary (8+ years experience narrative bio)
  3. Work Experience (Chronological timeline nodes with dot indicators & company roles)
  4. Education (Royal College of Art, University of Toronto, degree & study field)
  5. Skills & Competencies (Primary & secondary skill taxonomy)
  6. Languages (Spoken & written proficiency levels)
  7. Certifications (Issuing authority, dates, credential ID)
  8. Employment Preferences (Preferred emirates, minimum AED salary, shift preferences)
  9. Relocation Availability (Travel readiness, passport status, notice period)
- **Career Partner Callout Banner:** "Grow with Humble Partners" (`bg-[#0F2747] text-white`), team member avatars, career transition benefits description.
- **Bottom Navigation Bar:** Mobile bottom bar (`h-16`, rounded-t-xl, Profile tab active `#006D44`).

---

## 2. Color System & Typography
- **Primary Navy:** `#00122B` / `#0F2747` (`primary`, `primary-container`)
- **Emerald Green:** `#006D44` (`secondary`)
- **Light Emerald Container:** `#7DF7B6` / `#EAF7F1`
- **Surface Background:** `#FAF9FC` (`surface`)
- **Cards Background:** `#FFFFFF` (`surface-container-lowest`) with border `#C4C6CF` (`outline-variant`)
- **Typography:** Plus Jakarta Sans for headings, Inter for body and form fields.

---

## 3. Responsive Desktop Strategy
- **Mobile (390px):** Single-column accordion vertical layout with sticky save bar and mobile bottom nav.
- **Tablet (768px):** 2-Column layout: Hero card on top, tabbed/accordion section navigator.
- **Laptop/Desktop (1024px - 1440px):**
  - Full CandidateSidebar on left.
  - 2-Column main grid: Sticky Profile Summary & Completion Ring on left, 10-section form navigator on right.
