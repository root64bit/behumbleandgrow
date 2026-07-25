const { chromium } = require('@playwright/test');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Starting Vite preview server...');
  const server = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    shell: true,
    stdio: 'pipe'
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const browser = await chromium.launch();
  const viewports = [
    { name: '320px', width: 320, height: 800 },
    { name: '390px', width: 390, height: 844 },
    { name: '768px', width: 768, height: 1024 },
    { name: '1024px', width: 1024, height: 900 },
    { name: '1440px', width: 1440, height: 1080 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    console.log(`Capturing ${vp.name}...`);
    try {
      await page.goto('http://localhost:4173/candidate/dashboard', { waitUntil: 'networkidle', timeout: 10000 });
    } catch (e) {
      await page.goto('http://localhost:4173/candidate/dashboard', { waitUntil: 'domcontentloaded' });
    }
    const screenshotPath = path.join(outputDir, `candidate_dashboard_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);
    await page.close();
  }

  await browser.close();
  server.kill();
  console.log('Responsive screenshot capture complete!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
