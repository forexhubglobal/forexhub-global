const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. ContentType
content = content.replace(
  /'omni-requests' \| 'reviews'/,
  "'omni-requests' | '3rdeye-requests' | 'reviews'"
);

// 2. useState
content = content.replace(
  /const \[omniRequestsList, setOmniRequestsList\] = useState<any\[\]>\(\[\]\);/,
  "const [omniRequestsList, setOmniRequestsList] = useState<any[]>([]);\n  const [thirdEyeRequestsList, setThirdEyeRequestsList] = useState<any[]>([]);"
);

// 3. fetch logic
const fetchLogic = `
    if (contentType === '3rdeye-requests') {
      fetch('/api/admin/3rdeye-requests')
        .then(res => res.json())
        .then(data => {
          if(data.success) setThirdEyeRequestsList(data.requests);
        })
        .catch(err => console.error(err));
    }
`;
content = content.replace(
  /if \(contentType === 'omni-requests'\) \{/,
  fetchLogic + "\n    if (contentType === 'omni-requests') {"
);

// 4. Tab
content = content.replace(
  /\{id: 'omni-requests', label: '🤖 OMNI AI PRO'\},/,
  "{id: 'omni-requests', label: '🤖 OMNI AI PRO'}, {id: '3rdeye-requests', label: '👁️ 3RDEYE PRO'},"
);

// 5. Hide select dropdown
content = content.replace(
  /contentType !== 'omni-requests' && contentType !== 'reviews'/,
  "contentType !== 'omni-requests' && contentType !== '3rdeye-requests' && contentType !== 'reviews'"
);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Admin patched for 3rdeye basics');
