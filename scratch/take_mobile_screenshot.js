import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  console.log('Navigating to live Candidate Dashboard on mobile (390px)...');
  await page.goto('https://behumbleandgrow-indol.vercel.app/candidate/dashboard', { waitUntil: 'networkidle' });
  
  const outputPath = 'C:\\Users\\IBZ\\.gemini\\antigravity\\brain\\3839e8ae-73c3-4a8e-b1d8-4c1cb32a4197\\mobile_candidate_dashboard.png';
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Mobile screenshot saved to: ${outputPath}`);
  
  await browser.close();
})();
