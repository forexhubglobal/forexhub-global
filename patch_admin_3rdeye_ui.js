const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

const omniBlockStart = `          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            {contentType === 'omni-requests' ? (`;

const startIndex = content.indexOf(omniBlockStart);
if (startIndex === -1) {
  console.log("Could not find start");
  process.exit(1);
}

const endIndex = content.indexOf(") : contentType === 'omni-leads' ? (", startIndex);
if (endIndex === -1) {
  console.log("Could not find end");
  process.exit(1);
}

const innerStart = startIndex + omniBlockStart.length;
const innerBlock = content.substring(innerStart, endIndex);

let thirdEyeBlock = innerBlock;
thirdEyeBlock = thirdEyeBlock.replace(/omni-requests/g, '3rdeye-requests');
thirdEyeBlock = thirdEyeBlock.replace(/Omni AI Pro/g, '3RDEYE PRO');
thirdEyeBlock = thirdEyeBlock.replace(/omniRequestsList/g, 'thirdEyeRequestsList');
thirdEyeBlock = thirdEyeBlock.replace(/setOmniRequestsList/g, 'setThirdEyeRequestsList');

let newContent = content.substring(0, startIndex + 88) + 
                 "{contentType === '3rdeye-requests' ? (" +
                 thirdEyeBlock +
                 ") : contentType === 'omni-requests' ? (" +
                 innerBlock +
                 content.substring(endIndex);

fs.writeFileSync('src/app/admin/page.tsx', newContent, 'utf8');
console.log('UI Block duplicated for 3rdeye');
