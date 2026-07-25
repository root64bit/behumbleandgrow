# Stitch Screen Analysis — Candidate Applications List (`My Applications`)

## Screen Metadata
- **Project**: Be Humble & Grow Portal (`projects/13654249462666228786`)
- **Screen ID**: `df902262e86147809e17a7aa33e86be7`
- **Canonical Route**: `/candidate/applications`
- **Device Viewport**: Mobile (780px canvas width, 2206px canvas height)

## Visual Hierarchy & Structural Layout
1. **Header Bar (`<header>`)**:
   - Fixed top app bar (`h-16 bg-surface shadow-[0px_4px_12px_rgba(15,39,71,0.05)]`).
   - Left action: Menu drawer button (`menu`) & platform title `Be Humble & Grow` (`text-headline-md font-bold text-[#00122B]`).
   - Right action: Candidate corporate portrait avatar (`w-10 h-10 rounded-full border-2 border-surface bg-[#0F2747]`).

2. **Title & Search Section**:
   - Page Heading: `My Applications` (`text-headline-lg-mobile font-bold text-[#00122B]`).
   - Search input container with `search` icon (`placeholder="Search applications..."`).

3. **Horizontal Category / Status Tabs Navigation**:
   - Horizontally scrollable pill tabs (`flex overflow-x-auto hide-scrollbar gap-stack-sm`): `All`, `Drafts`, `Active`, `Action Required`, `Interviews`, `Offers`.
   - Selected active tab: `bg-[#00122B] text-white rounded-full`.
   - Unselected tab: `bg-[#EFEDF0] text-[#44474E] hover:bg-[#E9E7EB] rounded-full`.

4. **Application Cards List**:
   - **High Priority Action Card (Warning State)**:
     - Top action banner: `Action Required: Upload missing passport` (`bg-[#FFDAD6]/40 text-[#93000A] text-label-sm border-b border-[#BA1A1A]/10`).
     - Job Title: `Customer Service Representative` (`text-body-lg font-bold text-[#1B1B1E]`).
     - Employer Name / Generic Disclosure: `Horizon Gulf Services LLC` (or generic disclosure `"Approved UAE Employer"` depending on stage rules).
     - Location & Reference Badge: `location_on` `Dubai, UAE` | `tag` `REF: 882910`.
     - Stage & Progress Track: `Status: Initial Review` | Progress: `30%` emerald bar (`bg-[#006D44]`).
     - Action CTA: `Upload Document` button (`bg-[#006D44] text-white py-2.5 rounded-lg font-label-md`).
   - **Standard Application Cards**:
     - Job title, employer display, location, reference badge, stage progress percentage (e.g. `Under Evaluation` 55%, `Interviewing` 85%).

5. **Pagination Counter & Empty Space**:
   - Summary counter: `Showing 3 of 12 applications` (`text-label-sm text-outline opacity-40`).

6. **Mobile Bottom Navigation Shell**:
   - Fixed bottom nav bar (`h-16 border-t bg-surface-container-lowest rounded-t-xl`).
   - Items: `Home`, `Jobs`, `Applications` (active `#006D44` filled `assignment` icon), `Alerts`, `Profile`.

## Design System Tokens
- **Primary Navy**: `#00122B`
- **Secondary Emerald**: `#006D44`
- **Surface Background**: `#FAF9FC`
- **Typography**: Plus Jakarta Sans (Headings), Inter (Body)
