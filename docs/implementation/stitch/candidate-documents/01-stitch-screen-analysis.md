# Stitch Screen Analysis — Candidate Document Vault (`My Documents`)

## Screen Metadata
- **Project**: Be Humble & Grow Portal (`projects/13654249462666228786`)
- **Screen ID**: `116b946e36c54c548a61689965571fe6`
- **Canonical Route**: `/candidate/documents`
- **Device Viewport**: Mobile (780px canvas width, 2592px canvas height)

## Visual Hierarchy & Structural Layout
1. **Header Bar (`<header>`)**:
   - Fixed top app bar (`h-16 bg-surface shadow-[0px_4px_12px_rgba(15,39,71,0.05)]`).
   - Left action: Back arrow icon (`arrow_back`) with page title `My Documents` (`text-headline-md font-bold text-[#00122B]`).
   - Right action: Candidate avatar badge (`w-8 h-8 rounded-full border border-outline-variant`).

2. **Verification Progress / Document Readiness Summary Card**:
   - Surface card container (`p-stack-lg rounded-xl bg-surface-container-lowest border border-outline-variant`).
   - Section header: `VERIFICATION PROGRESS` (`text-label-md uppercase tracking-wider text-on-surface-variant`).
   - Percentage badge: `66% Complete` (`text-secondary font-bold text-[#006D44]`).
   - Progress Track: 2/3 filled emerald bar (`bg-[#006D44] h-2 rounded-full`).
   - Guidance copy: *"Upload your National ID to reach 100% and start interviewing."*

3. **Document Cards List**:
   - **Verified Document (CV / Resume)**:
     - Card container with emerald accent icon container (`bg-secondary-container/20`).
     - Status: `Verified` (`check_circle` icon in `#006D44`).
     - Actions: `Preview` (`visibility`) & `Replace` (`refresh`).
   - **Under Review Document (International Passport)**:
     - Card container with amber accent icon container (`bg-tertiary-container/10`).
     - Status: `Under Review` (`pending` icon in `#BA8503`).
     - Actions: `Preview` (`visibility`) & `Delete` (`delete`).
   - **Missing Required Document (National ID)**:
     - Dashed border container (`border-2 border-dashed border-outline-variant bg-surface-container-low/50`).
     - Headline: `National ID` with copy *"Required for identity verification"*.
     - Action CTA: `Upload Now` pill button (`bg-[#00122B] text-white rounded-full`).

4. **Floating Action Bar & Upload Sheet**:
   - Fixed bottom action bar: Floating CTA `Upload Document` (`bg-[#006D44] text-white shadow-lg h-14 rounded-xl`).
   - Action Sheet (`#uploadSheet`): Slide-up modal with backdrop overlay (`bg-black/40 backdrop-blur-[2px]`).
   - Source choices: `Camera`, `Gallery`, `Files`.

5. **Mobile Bottom Navigation Shell**:
   - Fixed bottom nav bar (`h-16 border-t bg-surface-container-lowest`).
   - Items: `Home`, `Jobs`, `Documents` (active `#006D44`), `Alerts`, `Profile`.

## Design System Tokens
- **Primary Navy**: `#00122B`
- **Secondary Emerald**: `#006D44`
- **Surface Background**: `#FAF9FC`
- **Typography**: Plus Jakarta Sans (Headings), Inter (Body)
