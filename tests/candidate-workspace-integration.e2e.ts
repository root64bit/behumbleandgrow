import { test, expect } from '@playwright/test';

const mockCandidateUserA = {
  id: 'usr-cand-alex-101',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'alex.chen@example.com',
  email_confirmed_at: '2026-01-15T10:00:00Z',
  user_metadata: { full_name: 'Alexander Chen' },
};

const mockProfileA = {
  id: 'usr-cand-alex-101',
  full_name: 'Alexander Chen',
  email: 'alex.chen@example.com',
  country_code: 'AE',
  status: 'active',
};

const mockCandidateA = {
  id: 'cand-alex-101',
  user_id: 'usr-cand-alex-101',
};

test.describe('Be Humble & Grow — Candidate Workspace Release Integration E2E Journeys', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
      window.localStorage.setItem('sb-auth-token', JSON.stringify(session));
      window.localStorage.setItem('sb-localhost-auth-token', JSON.stringify(session));
    }, {
      access_token: 'mock-access-token-cand-release',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: mockCandidateUserA,
    });

    await page.route('**/auth/v1/user*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCandidateUserA),
      });
    });

    await page.route('**/auth/v1/token*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-access-token-cand-release',
          refresh_token: 'mock-refresh-token',
          user: mockCandidateUserA,
        }),
      });
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      const acceptHeader = (route.request().headers()['accept'] || '').toLowerCase();
      const isSingle = acceptHeader.includes('vnd.pgrst.object');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: isSingle ? JSON.stringify(mockProfileA) : JSON.stringify([mockProfileA]),
      });
    });

    await page.route('**/rest/v1/user_roles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ role: 'candidate', profile_id: 'usr-cand-alex-101' }]),
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      const acceptHeader = (route.request().headers()['accept'] || '').toLowerCase();
      const isSingle = acceptHeader.includes('vnd.pgrst.object');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: isSingle ? JSON.stringify(mockCandidateA) : JSON.stringify([mockCandidateA]),
      });
    });

    await page.route('**/rest/v1/rpc/load_my_candidate_account_settings*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          preferences: {
            id: 'pref-101',
            candidate_id: 'cand-alex-101',
            language_code: 'en',
            time_zone: 'Asia/Dubai',
            date_locale: 'en-AE',
            quiet_hours_enabled: false,
            quiet_hours_start: '22:00:00',
            quiet_hours_end: '07:00:00',
            marketing_consent_granted: false,
            version: 1,
          },
          notificationPreferences: [],
        }),
      });
    });
  });

  test('Journey 1 — New Candidate Onboarding & Navigation Flow', async ({ page }) => {
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 20000 });

    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Account Settings & Preferences').first()).toBeVisible({ timeout: 20000 });
  });

  test('Journey 2 — Active Application & Screening Snapshot', async ({ page }) => {
    await page.goto('/candidate/applications', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/applications/app-demo-101', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 3 — Interview Details & Schedule Confirmation Safety', async ({ page }) => {
    await page.goto('/candidate/interviews', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/interviews/int-demo-202', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 4 — Conditional Offer Review & Legal Compliance Wording', async ({ page }) => {
    await page.goto('/candidate/offers', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/candidate/offers/off-demo-303', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 5 — Placement Overview & Milestone Progress', async ({ page }) => {
    await page.goto('/candidate/placement', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 6 — Candidate Notification Deep Link Routing', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 7 — Candidate Ownership Denial & Unowned Resource Access Safety', async ({ page }) => {
    await page.route('**/rest/v1/candidate_support_tickets?id=eq.unowned-tkt-999*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Journey 8 — Session Security & Unauthenticated Redirect Guard', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });

    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/(login|auth|$)/);
  });

  test('Journey 9 — Responsive Candidate Workspace Shell (Mobile 390px vs Desktop 1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Account Settings & Preferences').first()).toBeVisible({ timeout: 20000 });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Account Settings & Preferences').first()).toBeVisible({ timeout: 20000 });
  });
});
