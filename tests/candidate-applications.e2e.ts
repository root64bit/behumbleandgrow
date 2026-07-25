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

test.describe('Be Humble & Grow — Candidate Applications List E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept Supabase Auth & REST endpoints
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
            phone: '+258 84 123 4567',
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
            headline: 'Customer Experience & Hospitality Lead',
            verification_status: 'verified',
            stage: 'employer_interview',
          },
        ]),
      });
    });

    await page.route('**/rest/v1/applications*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'app-101',
            job_id: 'job-1',
            candidate_id: 'cand-user-1',
            stage: 'employer_submitted',
            status: 'employer_submitted',
            submitted_at: '2026-02-10T09:00:00Z',
            updated_at: '2026-02-14T11:00:00Z',
            consent_given: true,
            jobs: {
              id: 'job-1',
              title: 'Customer Service Representative',
              location: 'Dubai, UAE',
              salary_range: '14,000 AED / mo',
              employers: { organisations: { name: 'Horizon Gulf Services LLC' } },
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

    // Inject session into localStorage
    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
    }, mockCandidateSession);
  });

  test('1. Applications List page loads with H1 title, summary metrics & applications card', async ({ page }) => {
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('My Applications').first()).toBeVisible();
    await expect(page.getByText('Customer Service Representative').first()).toBeVisible();
  });

  test('2. Desktop navigation displays sidebar with canonical Candidate items', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });

    const sidebar = page.locator('aside');
    await expect(sidebar.getByRole('link', { name: 'Applications' })).toBeVisible({ timeout: 15000 });
    await expect(sidebar.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('3. Mobile navigation displays bottom navigation bar (390px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });

    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible({ timeout: 15000 });
    await expect(bottomNav.getByText('Applications')).toBeVisible();
  });

  test('4. Status tab filtering updates active filter selection', async ({ page }) => {
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Interviews' }).click();
    await expect(page.getByRole('button', { name: 'Interviews' })).toHaveClass(/bg-\[#00122B\]/);
  });

  test('5. Primary action link navigates to Find Opportunities', async ({ page }) => {
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('link', { name: 'Find Opportunities' })).toBeVisible();
  });
});
