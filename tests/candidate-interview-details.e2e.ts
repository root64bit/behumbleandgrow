import { test, expect } from '@playwright/test';

const mockCandidateSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: {
    id: 'cand-user-1',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'candidate@behumbleandgrow.com',
    email_confirmed_at: '2026-01-01T00:00:00Z',
    user_metadata: {
      full_name: 'Amina Mabote',
    },
  },
};

test.describe('Be Humble & Grow — Candidate Interview Details E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/auth/v1/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCandidateSession.user),
      });
    });

    await page.route('**/auth/v1/token*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCandidateSession),
      });
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'cand-user-1',
            email: 'candidate@behumbleandgrow.com',
            full_name: 'Amina Mabote',
            country_code: 'MZ',
            status: 'active',
          },
        ]),
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'cand-user-1',
            headline: 'Senior UX Designer',
            verification_status: 'verified',
            stage: 'employer_interview',
          },
        ]),
      });
    });

    await page.route('**/rest/v1/interviews*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'int-101',
            application_id: 'app-101',
            candidate_id: 'cand-user-1',
            scheduled_at: '2026-07-30T10:00:00Z',
            duration_minutes: 45,
            format: 'Video Interview',
            status: 'awaiting_candidate_confirmation',
            meeting_url: 'https://meet.google.com/abc-defg-hij',
            updated_at: '2026-07-25T12:00:00Z',
            applications: {
              id: 'app-101',
              job_id: 'job-1',
              candidate_id: 'cand-user-1',
              stage: 'employer_interview',
              status: 'employer_interview',
              jobs: {
                id: 'job-1',
                title: 'Senior UX Designer',
                location: 'Dubai, UAE',
                employer_id: 'emp-1',
              },
            },
          },
        ]),
      });
    });

    await page.route('**/rest/v1/user_roles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'ur-1',
            profile_id: 'cand-user-1',
            role: 'candidate',
          },
        ]),
      });
    });

    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
    }, mockCandidateSession);
  });

  test('1. Interview Details page loads with hero card, job title and dual time', async ({ page }) => {
    await page.goto('/candidate/interviews/int-101', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Senior UX Designer').first()).toBeVisible();
    await expect(page.getByText('Your Attendance Status').first()).toBeVisible();
  });

  test('2. Displays Preparation Checklist and Required Documents sections', async ({ page }) => {
    await page.goto('/candidate/interviews/int-101', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Preparation Checklist').first()).toBeVisible();
    await expect(page.getByText('Required Documents').first()).toBeVisible();
  });

  test('3. Opens Reschedule request modal from attendance card', async ({ page }) => {
    await page.goto('/candidate/interviews/int-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Request Reschedule' }).first().click();
    await expect(page.getByText('Reason for Rescheduling').first()).toBeVisible();
  });

  test('4. Back button navigates to My Interviews list', async ({ page }) => {
    await page.goto('/candidate/interviews/int-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Back to My Interviews' }).click();
    await expect(page).toHaveURL(/\/candidate\/interviews$/);
  });

  test('5. Unowned or non-existent interview displays safe Interview Not Available state', async ({ page }) => {
    await page.goto('/candidate/interviews/unowned-interview-999', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Interview Not Available').first()).toBeVisible({ timeout: 15000 });
  });
});
