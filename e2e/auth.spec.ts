import { test, expect } from '@playwright/test';

const STAGING_URL = process.env.VITE_APP_URL || 'https://behumbleandgrow-staging.vercel.app';

test.describe('Phase 2 Playwright Hosted Authentication Verification Suite', () => {

  test('1. Redirects unauthenticated user accessing /candidate to /login', async ({ page }) => {
    await page.goto(`${STAGING_URL}/candidate`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('2. Redirects unauthenticated user accessing /operations to /login', async ({ page }) => {
    await page.goto(`${STAGING_URL}/operations`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('3. Redirects unauthenticated user accessing /superadmin to /login', async ({ page }) => {
    await page.goto(`${STAGING_URL}/superadmin`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('4. Displays non-enumerating generic success message on forgot password', async ({ page }) => {
    await page.goto(`${STAGING_URL}/forgot-password`);
    await page.fill('input[type="email"]', 'nonexistent.user.test@example.com');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Check your inbox')).toBeVisible({ timeout: 10000 });
  });

  test('5. Prevents candidate registration without disclaimer consent', async ({ page }) => {
    await page.goto(`${STAGING_URL}/register`);
    await page.fill('input[name="fullName"]', 'Test Candidate');
    await page.fill('input[type="email"]', 'candidate.e2e@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    // Should display validation warning
    await expect(page.locator('text=disclaimer')).toBeVisible({ timeout: 5000 });
  });
});
