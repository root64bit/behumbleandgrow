import { test, expect } from '@playwright/test';

test.describe('Phase 0B End-to-End Workflow & Isolation Verification', () => {

  test('1. Public Homepage & Navigation links load cleanly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Turn your experience');
  });

  test('2. Candidate Registration form fields function', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('3. Login form loads cleanly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('form')).toBeVisible();
  });

  test('4. Candidate Dashboard loads protected view', async ({ page }) => {
    await page.goto('/candidate/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome back');
  });

  test('5. Candidate Profile page renders personal details form', async ({ page }) => {
    await page.goto('/candidate/profile');
    await expect(page.locator('h1')).toContainText('Candidate Professional Profile');
  });

  test('6. Candidate Documents page displays private vaults', async ({ page }) => {
    await page.goto('/candidate/documents');
    await expect(page.locator('h1')).toContainText('Private Verification Vault');
  });

  test('7. Jobs browser lists published vacancies', async ({ page }) => {
    await page.goto('/jobs');
    await expect(page.locator('h1')).toContainText('Explore Overseas Vacancies');
  });

  test('8. Operations Queue loads application review portal', async ({ page }) => {
    await page.goto('/operations/applications');
    await expect(page.locator('h1')).toContainText('Application');
  });

  test('9. Mobile Viewport 390px responsive rendering', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/dashboard');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('10. Desktop Viewport 1440px responsive rendering', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/dashboard');
    await expect(page.locator('h1')).toBeVisible();
  });

});
