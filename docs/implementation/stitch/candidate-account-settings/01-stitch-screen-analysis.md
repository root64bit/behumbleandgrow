# 01 — Stitch Screen Analysis: Candidate Account Settings & Preferences

## 1. Overview & Location
- **Stitch Project ID**: `projects/13654249462666228786`
- **Target Candidate Screens**:
  - `886016231c624328a9d8985578242aff` ("My Profile & Workspace Settings", 780px × 2566px, MOBILE)
  - `8e9dddebe7c4473da05eb2f743b1ff71` ("Notifications & Preferences", 780px × 1912px, MOBILE)
- **Canonical Route**: `/candidate/settings`
- **Navigation Origin**: Candidate Workspace Header & Bottom Navigation Bar -> Profile / Settings

## 2. Layout Structure & Visual Architecture
1. **Header & Context Badge**:
   - Header badge: `Candidate Workspace`
   - Primary Title: `Account Settings & Preferences`
   - Candidate Reference Pill: `BHG-CAND-XXXXXX`
2. **Account Identity Summary Card**:
   - Full legal name display
   - Account email & verification badge (`Verified`)
   - Country badge (`AE`)
   - Password update action trigger
3. **Preferences Bento Grid**:
   - Interface Language selection cards (English / Portuguese)
   - IANA Time Zone dropdown with browser detection suggestion
4. **Quiet Hours Control Card**:
   - Quiet hours enable toggle
   - Start local time picker (`22:00`)
   - End local time picker (`07:00`)
   - In-app availability notice
5. **Marketing & Optional Communications Consent**:
   - Separate product update toggle
   - Explicit transactional notification notice
6. **Notification Category Delivery Grid**:
   - Category cards (Account, System, Interview, Offer, Placement, Document, Support, Application, Profile)
   - Mandatory policy badge for non-disableable channels
   - Channel checkboxes for In-App, Push, and Email
7. **Floating Save & Unsaved Changes Bar**:
   - Appears when dirty form state is present
   - Actions: `Save Changes` and `Discard`
