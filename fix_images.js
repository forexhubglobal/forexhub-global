const fs = require('fs');
const path = require('path');
const dir = 'content/articles';
const files = fs.readdirSync(dir);

for (const f of files) {
  if (!f.endsWith('.md')) continue;
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  if (content.includes('.ai/prompt/')) {
    // Match both with and without quotes
    content = content.replace(/image:\s*"?\/images\/.*\.ai\/prompt\/.*"?/g, 'image: "bg-gradient-to-br from-indigo-900 to-black"');
    fs.writeFileSync(fp, content);
    console.log('Fixed', f);
  }
}
