import { chromium } from '@playwright/test';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to live site...');
  await page.goto('https://behumbleandgrow-indol.vercel.app', { waitUntil: 'networkidle' });
  
  const artifactDir = 'C:\\Users\\IBZ\\.gemini\\antigravity\\brain\\3839e8ae-73c3-4a8e-b1d8-4c1cb32a4197';
  const outputPath = path.join(artifactDir, 'live_homepage_screenshot.png');
  
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log('Screenshot saved to:', outputPath);
  
  await browser.close();
}

main().catch(console.error);
