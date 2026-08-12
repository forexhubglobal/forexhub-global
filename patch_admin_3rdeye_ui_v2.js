const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

const regex = /\{contentType === 'omni-requests' \? \([\s\S]*?\) : contentType === 'omni-leads' \? \(/;
const match = content.match(regex);
if (!match) {
  console.log('Regex failed');
  process.exit(1);
}

let omniBlock = match[0];
let innerBlock = omniBlock.replace(") : contentType === 'omni-leads' ? (", "");

let thirdEyeBlock = innerBlock;
thirdEyeBlock = thirdEyeBlock.replace(/omni-requests/g, '3rdeye-requests');
thirdEyeBlock = thirdEyeBlock.replace(/Omni AI Pro/g, '3RDEYE PRO');
thirdEyeBlock = thirdEyeBlock.replace(/omniRequestsList/g, 'thirdEyeRequestsList');
thirdEyeBlock = thirdEyeBlock.replace(/setOmniRequestsList/g, 'setThirdEyeRequestsList');

let replacement = thirdEyeBlock + ") : " + omniBlock;
content = content.replace(regex, replacement);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Success');
