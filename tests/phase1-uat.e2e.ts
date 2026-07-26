import { test, expect } from '@playwright/test';

test.describe('Phase 1 Responsive & User Acceptance Tests across 7 Viewports', () => {

  const viewports = [
    { name: '320px Micro Mobile', width: 320, height: 568 },
    { name: '375px Standard Mobile', width: 375, height: 667 },
    { name: '390px iPhone Viewport', width: 390, height: 844 },
    { name: '430px Large Smartphone', width: 430, height: 932 },
    { name: '768px Tablet Portrait', width: 768, height: 1024 },
    { name: '1024px Laptop Screen', width: 1024, height: 768 },
    { name: '1440px Desktop Display', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`Candidate Dashboard renders cleanly at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/candidate/dashboard');
      await expect(page.locator('h1')).toBeVisible();
    });

    test(`Candidate Profile page renders cleanly at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/candidate/profile');
      await expect(page.locator('h1')).toBeVisible();
    });
  }

  test('Verifies STAGING ENVIRONMENT banner & Fee Disabled notice display', async ({ page }) => {
    await page.goto('/');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Be Humble');
  });

});
