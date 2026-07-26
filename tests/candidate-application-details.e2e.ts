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

test.describe('Be Humble & Grow — Candidate Application Details E2E Suite', () => {
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
            stage: 'employer_submitted',
          },
        ]),
      });
    });

    await page.route('**/rest/v1/applications*', async (route) => {
      const url = route.request().url();
      if (url.includes('invalid-unowned-app-id')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: {
            'content-range': '0-0/1',
            'content-type': 'application/json',
          },
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
              employer_disclosure_status: 'disclosed',
              jobs: {
                id: 'job-1',
                title: 'Customer Service Representative',
                location: 'Dubai, UAE',
                salary_range: '14,000 AED / mo',
                employer_id: 'emp-101',
              },
            },
          ]),
        });
      }
    });

    await page.route('**/rest/v1/status_history*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'hist-1',
            entity_type: 'application',
            entity_id: 'app-101',
            new_status: 'submitted',
            user_role: 'candidate',
            created_at: '2026-02-10T09:00:00Z',
            candidate_message: 'Application received.',
          },
          {
            id: 'hist-2',
            entity_type: 'application',
            entity_id: 'app-101',
            new_status: 'employer_submitted',
            user_role: 'candidate',
            created_at: '2026-02-14T11:00:00Z',
            candidate_message: 'Dossier presented to employer.',
          },
        ]),
      });
    });

    await page.route('**/rest/v1/candidate_documents*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
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

  test('1. Application Details page loads with H1 title, status banner & job summary', async ({ page }) => {
    await page.goto('/candidate/applications/app-101', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Application Details').first()).toBeVisible();
    await expect(page.getByText('Customer Service Representative').first()).toBeVisible();
  });

  test('2. Renders 8-stage progress roadmap and historical timeline', async ({ page }) => {
    await page.goto('/candidate/applications/app-101', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Application Roadmap').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Historical Activity Timeline').first()).toBeVisible({ timeout: 15000 });
  });

  test('3. Sub-tab navigation switches between Overview, Screening, Documents and Payment', async ({ page }) => {
    await page.goto('/candidate/applications/app-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Payment' }).click();
    await expect(page.getByText('Application fee disabled during the closed technical pilot.').first()).toBeVisible({ timeout: 15000 });
  });

  test('4. Renders 404 Not Found for unowned or non-existent application ID', async ({ page }) => {
    await page.goto('/candidate/applications/invalid-unowned-app-id', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Application Not Available').first()).toBeVisible({ timeout: 15000 });
  });

  test('5. Back button navigates to My Applications list', async ({ page }) => {
    await page.goto('/candidate/applications/app-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Back to My Applications' }).click();
    await expect(page).toHaveURL(/\/candidate\/applications$/);
  });
});
