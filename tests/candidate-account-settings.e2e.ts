import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Candidate Account Settings & Preferences E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Inject mock authenticated session
    await page.addInitScript(() => {
      const session = {
        access_token: 'mock-access-token-cand-settings',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        user: {
          id: 'cand-user-settings-123',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'alexander.chen@example.com',
          email_confirmed_at: '2026-01-15T10:00:00Z',
          user_metadata: { full_name: 'Alexander Chen' },
        },
      };

      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
      window.localStorage.setItem('sb-auth-token', JSON.stringify(session));
      window.localStorage.setItem('sb-localhost-auth-token', JSON.stringify(session));
    });

    // Mock PostgREST & Auth endpoints
    await page.route('**/auth/v1/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'cand-user-settings-123',
          email: 'alexander.chen@example.com',
          email_confirmed_at: '2026-01-15T10:00:00Z',
          user_metadata: { full_name: 'Alexander Chen' },
        }),
      });
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'cand-user-settings-123',
          full_name: 'Alexander Chen',
          email: 'alexander.chen@example.com',
          country_code: 'AE',
        }),
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'cand-99201-ux',
          user_id: 'cand-user-settings-123',
        }),
      });
    });

    await page.route('**/rest/v1/rpc/load_my_candidate_account_settings', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          preferences: {
            id: 'pref-1',
            candidate_id: 'cand-99201-ux',
            language_code: 'en',
            time_zone: 'Asia/Dubai',
            date_locale: 'en-AE',
            quiet_hours_enabled: false,
            quiet_hours_start: '22:00:00',
            quiet_hours_end: '07:00:00',
            marketing_consent_granted: false,
            version: 1,
          },
          notificationPreferences: [
            { id: 'np-1', candidate_id: 'cand-99201-ux', category: 'account', in_app_enabled: true, push_enabled: true, email_enabled: true, version: 1 },
            { id: 'np-2', candidate_id: 'cand-99201-ux', category: 'interview', in_app_enabled: true, push_enabled: true, email_enabled: true, version: 1 },
            { id: 'np-3', candidate_id: 'cand-99201-ux', category: 'offer', in_app_enabled: true, push_enabled: true, email_enabled: true, version: 1 },
            { id: 'np-4', candidate_id: 'cand-99201-ux', category: 'application', in_app_enabled: true, push_enabled: true, email_enabled: true, version: 1 },
          ],
        }),
      });
    });
  });

  test('1. Render Account Settings header, identity summary card, and candidate reference', async ({ page }) => {
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Account Settings & Preferences').first()).toBeVisible();
    await expect(page.getByText('BHG-CAND-CAND-9').first()).toBeVisible();
    await expect(page.getByText('Alexander Chen').first()).toBeVisible();
    await expect(page.getByText('alexander.chen@example.com').first()).toBeVisible();
  });

  test('2. Change preferred language and verify unsaved changes save bar', async ({ page }) => {
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    await page.getByText('Português (Moçambique)').first().click();

    // Verify floating save bar appears
    await expect(page.getByText('You have unsaved changes')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  test('3. Change Candidate time zone and verify time zone options', async ({ page }) => {
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    const tzSelect = page.locator('select').first();
    await expect(tzSelect).toBeVisible();
    await tzSelect.selectOption('Africa/Maputo');

    await expect(page.getByText('You have unsaved changes')).toBeVisible();
  });

  test('4. Configure quiet hours start and end times', async ({ page }) => {
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    // Enable quiet hours switch
    const quietSwitch = page.locator('input[type="checkbox"]').first();
    await quietSwitch.click({ force: true });

    await expect(page.getByText('Quiet Hours Start')).toBeVisible();
    await expect(page.getByText('Quiet Hours End')).toBeVisible();
  });

  test('5. Open Update Password modal and validate minimum 8 characters rule', async ({ page }) => {
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Update Password' }).first().click();
    await expect(page.getByRole('heading', { name: 'Update Password' })).toBeVisible();

    await page.getByPlaceholder('Minimum 8 characters').fill('123');
    await page.getByPlaceholder('Re-enter new password').fill('123');
    await page.getByRole('button', { name: 'Save New Password' }).click();

    await expect(page.getByText('Password must be at least 8 characters long.')).toBeVisible();
  });

  test('6. Save changes and verify success notification in save bar', async ({ page }) => {
    await page.route('**/rest/v1/rpc/update_my_candidate_preferences', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'pref-1',
          candidate_id: 'cand-99201-ux',
          language_code: 'pt',
          time_zone: 'Africa/Maputo',
          date_locale: 'en-AE',
          quiet_hours_enabled: false,
          quiet_hours_start: '22:00:00',
          quiet_hours_end: '07:00:00',
          marketing_consent_granted: false,
          version: 2,
        }),
      });
    });

    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });
    await page.getByText('Português (Moçambique)').first().click();

    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Your account preferences have been saved successfully.')).toBeVisible({ timeout: 15000 });
  });

  test('7. Mobile viewport layout responsiveness (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/settings', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Account Settings & Preferences').first()).toBeVisible();
  });
});
