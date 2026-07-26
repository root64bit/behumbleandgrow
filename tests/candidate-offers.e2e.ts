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

test.describe('Be Humble & Grow — Candidate Conditional Offers E2E Suite', () => {
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

    await page.route('**/rest/v1/offers*', async (route) => {
      const url = route.request().url();
      if (url.includes('empty-user')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'ofr-101',
            application_id: 'app-101',
            employer_id: 'emp-1',
            salary: 4500,
            currency: 'AED',
            status: 'sent_to_candidate',
            valid_until: '2026-08-05T23:59:59Z',
            created_at: '2026-07-20T10:00:00Z',
            applications: {
              id: 'app-101',
              candidate_id: 'cand-user-1',
              stage: 'offer_issued',
              status: 'offer_issued',
              employer_disclosure_status: 'disclosed',
              employer_disclosed_at: '2026-07-20T10:00:00Z',
              jobs: {
                id: 'job-1',
                title: 'Customer Service Representative',
                location: 'Dubai, UAE',
              },
              employers: {
                id: 'emp-1',
                name: 'Horizon Gulf Services LLC',
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

  test('1. Conditional Offers page loads header, summary metrics, and compliance notice', async ({ page }) => {
    await page.goto('/candidate/offers', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Conditional Offers').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Active Offers').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Conditional Offer Compliance Disclaimer').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Displays active offer card with salary AED 4,500 and View Offer CTA', async ({ page }) => {
    await page.goto('/candidate/offers', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Customer Service Representative').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('AED 4,500').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('link', { name: 'View Offer' }).first()).toBeVisible({ timeout: 15000 });
  });

  test('3. Filters offers by status tabs and search query', async ({ page }) => {
    await page.goto('/candidate/offers', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Accepted' }).click();
    await page.getByRole('button', { name: 'All Offers' }).click();

    await page.getByPlaceholder('Search by position, offer ref, or employer...').fill('Customer Service');
    await expect(page.getByText('Customer Service Representative').first()).toBeVisible({ timeout: 15000 });
  });

  test('4. Navigates to Applications workspace from header link', async ({ page }) => {
    await page.goto('/candidate/offers', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'View Applications' }).first().click();
    await expect(page).toHaveURL(/\/candidate\/applications$/);
  });
});
