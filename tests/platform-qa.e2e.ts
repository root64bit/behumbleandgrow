import { test, expect } from '@playwright/test';

test.describe('Platform QA E2E Verification', () => {
  test('should load landing page title and root element', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check page title
    await expect(page).toHaveTitle(/Be Humble & Grow/);

    // Verify main root container rendered
    const rootElement = page.locator('#root');
    await expect(rootElement).toBeVisible();
  });
});
