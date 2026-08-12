const fs = require('fs');
const path = require('path');

function copyAndReplace(src, dest) {
  let content = fs.readFileSync(src, 'utf8');
  content = content.replace(/omni-ai/g, '3rdeye');
  content = content.replace(/Omni AI/g, '3RDEYE');
  content = content.replace(/OMNI AI/g, '3RDEYE');
  content = content.replace(/omni-request/g, '3rdeye-request');
  content = content.replace(/omni-requests/g, '3rdeye-requests');
  content = content.replace(/OmniAIRequestPage/g, 'ThirdEyeRequestPage');
  
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
}

copyAndReplace('src/app/omni-ai/page.tsx', 'src/app/3rdeye/page.tsx');
copyAndReplace('src/app/api/omni-request/route.ts', 'src/app/api/3rdeye-request/route.ts');
copyAndReplace('src/app/api/admin/omni-requests/route.ts', 'src/app/api/admin/3rdeye-requests/route.ts');
console.log('Files copied and replaced successfully.');
