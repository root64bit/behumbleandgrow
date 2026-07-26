const fs = require('fs');

const raw = fs.readFileSync('C:\\Users\\IBZ\\.gemini\\antigravity\\brain\\3839e8ae-73c3-4a8e-b1d8-4c1cb32a4197\\.system_generated\\steps\\1087\\output.txt', 'utf8');
const data = JSON.parse(raw);

console.log(`Total Screens in Stitch Project: ${data.screens.length}\n`);
data.screens.forEach((s, idx) => {
  const screenId = s.name.split('/').pop();
  console.log(`${idx + 1}. [${screenId}] ${s.title} (${s.deviceType}, ${s.width}x${s.height})`);
});
