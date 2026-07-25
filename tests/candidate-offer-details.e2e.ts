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

test.describe('Be Humble & Grow — Candidate Offer Details & Decision E2E Suite', () => {
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
      if (url.includes('unowned-offer-999')) {
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
            updated_at: '2026-07-20T10:00:00Z',
            employers: {
              id: 'emp-1',
              name: 'Horizon Gulf Services LLC',
            },
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
            },
          },
        ]),
      });
    });

    await page.route('**/rest/v1/status_history*', async (route) => {
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

    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
    }, mockCandidateSession);
  });

  test('1. Render offer overview, compensation, benefits, and compliance notice', async ({ page }) => {
    await page.goto('/candidate/offers/ofr-101', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Conditional Offer Details').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Customer Service Representative').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('AED 4,500').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Conditional Offer Compliance Disclaimer').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Opens digital acceptance modal and requires legal declarations', async ({ page }) => {
    await page.goto('/candidate/offers/ofr-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Accept Offer' }).click();
    await expect(page.getByText('Accept Conditional Offer').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Accept Conditional Offer' })).toBeDisabled();
  });

  test('3. Completes acceptance workflow with typed signature', async ({ page }) => {
    await page.goto('/candidate/offers/ofr-101', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Accept Offer' }).click();

    const checkboxes = page.getByRole('checkbox');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    const input = page.getByPlaceholder('e.g. Amina Mabote');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('Amina Mabote');

    const submitBtn = page.getByRole('button', { name: 'Accept Conditional Offer' });
    await expect(submitBtn).toBeEnabled({ timeout: 10000 });
    await submitBtn.click();

    await expect(page.getByText('Conditional Offer Accepted').first()).toBeVisible({ timeout: 15000 });
  });

  test('4. Renders Offer Not Available for unowned offer ID', async ({ page }) => {
    await page.goto('/candidate/offers/unowned-offer-999', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Offer Not Available').first()).toBeVisible({ timeout: 15000 });
  });
});
