import { test, expect } from '@playwright/test';

const mockUser = {
  id: 'usr-cand-101',
  email: 'alex.candidate@example.com',
  user_metadata: { full_name: 'Alex Johnson', role: 'candidate' },
};

const mockCandidate = {
  id: 'cand-101',
  user_id: 'usr-cand-101',
  first_name: 'Alex',
  last_name: 'Johnson',
};

const mockPlacement = {
  id: 'plc-101',
  placement_reference: 'BHG-PLC-2026-000142',
  offer_id: 'ofr-101',
  application_id: 'app-101',
  candidate_id: 'cand-101',
  employer_id: 'emp-101',
  job_id: 'job-101',
  status: 'work_permit_in_progress',
  relocation_stage: 4,
  target_arrival_date: '2026-08-15',
  work_permit_status: 'Work Permit Application Submitted',
  work_permit_ref: 'WP-104821',
  visa_status: 'Scheduled after permit approval',
  visa_ref: 'VIS-991905',
  medical_status: 'completed',
  medical_clinic_name: 'Global Health Clinic',
  medical_appointment_date: '2026-10-18T10:00:00Z',
  biometric_status: 'not_required',
  travel_status: 'awaiting_visa',
  flight_confirmed: false,
  accommodation_status: 'arranged',
  accommodation_type: 'Employer Provided Initial Housing',
  accommodation_location: 'Dubai, UAE',
  accommodation_confirmed: true,
  onboarding_status: 'Contract Preparation',
  onboarding_start_date: '2026-08-20',
  onboarding_confirmed: false,
  updated_at: new Date().toISOString(),
  applications: {
    id: 'app-101',
    employer_disclosure_status: 'disclosed',
    employer_disclosed_at: '2026-07-20T10:00:00Z',
    jobs: {
      id: 'job-101',
      title: 'Senior Healthcare Specialist',
      location: 'Dubai, UAE',
    },
    employers: {
      id: 'emp-101',
      name: 'Dubai Central Hospital',
    },
  },
};

const mockMilestones = [
  { id: 'm1', placement_id: 'plc-101', step_number: 1, name: 'Offer Accepted', status: 'completed', date_display: 'Confirmed Oct 12, 2023' },
  { id: 'm2', placement_id: 'plc-101', step_number: 2, name: 'Documents Prepared', status: 'completed', date_display: 'Verified Oct 15, 2023' },
  { id: 'm3', placement_id: 'plc-101', step_number: 3, name: 'Medical Process', status: 'completed', date_display: 'Cleared Oct 18, 2023' },
  { id: 'm4', placement_id: 'plc-101', step_number: 4, name: 'Work Permit', status: 'in_progress', date_display: 'In progress - Government review' },
  { id: 'm5', placement_id: 'plc-101', step_number: 5, name: 'Visa Application', status: 'upcoming', date_display: 'Scheduled after permit approval' },
];

const mockActions = [
  {
    id: 'act-101',
    placement_id: 'plc-101',
    action_type: 'confirm_travel_readiness',
    title: 'Confirm Preferred Travel Window',
    description: 'Verify your departure readiness window prior to flight ticketing.',
    status: 'pending',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    version: 1,
  },
];

test.describe('Be Humble & Grow — Candidate Placement & Relocation E2E Suite', () => {
  test.setTimeout(45000);

  test.beforeEach(async ({ page }) => {
    await page.route('**/auth/v1/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUser),
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      const url = route.request().url();
      const acceptHeader = route.request().headers()['accept'] || '';

      if (url.includes('no-placement')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify({ id: 'cand-empty' }) : JSON.stringify([{ id: 'cand-empty' }]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(mockCandidate) : JSON.stringify([mockCandidate]),
      });
    });

    await page.route('**/rest/v1/placements*', async (route) => {
      const url = route.request().url();
      const acceptHeader = route.request().headers()['accept'] || '';

      if (url.includes('cand-empty')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(null) : JSON.stringify([]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(mockPlacement) : JSON.stringify([mockPlacement]),
      });
    });

    await page.route('**/rest/v1/placement_milestones*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMilestones),
      });
    });

    await page.route('**/rest/v1/placement_candidate_actions*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockActions),
      });
    });

    await page.route('**/rest/v1/placement_acknowledgements*', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'ack-101' }]),
      });
    });
  });

  test('1. Render placement overview, progress banner, timeline, and process cards', async ({ page }) => {
    await page.goto('/candidate/placement', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Placement & Relocation Status').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Senior Healthcare Specialist').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Dubai Central Hospital').first()).toBeVisible({ timeout: 15000 });

    // Check masked references
    await expect(page.getByText('WP-••••-4821').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('VIS-••••-1905').first()).toBeVisible({ timeout: 15000 });

    // Check timeline steps
    await expect(page.getByText('Offer Accepted').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Work Permit').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Opens candidate action acknowledgement modal and submits confirmation', async ({ page }) => {
    await page.goto('/candidate/placement', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Complete Action' }).click();
    await expect(page.getByText('Confirm Placement Action').first()).toBeVisible({ timeout: 15000 });

    const checkbox = page.getByRole('checkbox');
    await checkbox.check();
    await page.getByRole('button', { name: 'Submit Acknowledgement' }).click();
  });

  test('3. Renders empty state when candidate has no active placement', async ({ page }) => {
    await page.route('**/rest/v1/placements*', async (route) => {
      const acceptHeader = route.request().headers()['accept'] || '';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(null) : JSON.stringify([]),
      });
    });

    await page.goto('/candidate/placement', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('No placement process has started yet.').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('View Conditional Offers').first()).toBeVisible({ timeout: 15000 });
  });
});
