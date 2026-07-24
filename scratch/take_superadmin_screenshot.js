import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  console.log('Navigating to Super Admin Dashboard...');
  await page.goto('http://localhost:5173/superadmin/dashboard', { waitUntil: 'networkidle' });
  
  const outputPath = 'C:\\Users\\IBZ\\.gemini\\antigravity\\brain\\3839e8ae-73c3-4a8e-b1d8-4c1cb32a4197\\super_admin_dashboard_screenshot.png';
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Screenshot saved to: ${outputPath}`);
  
  await browser.close();
})();
