const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Replace bg-slate-50 focus:ring-2
content = content.replace(/bg-slate-50 focus:ring-2/g, 'bg-slate-50 text-slate-900 focus:ring-2');

// Replace bg-white focus:ring-2
content = content.replace(/bg-white focus:ring-2/g, 'bg-white text-slate-900 focus:ring-2');

// Replace bg-white focus:ring-danger
content = content.replace(/bg-white focus:ring-danger/g, 'bg-white text-slate-900 focus:ring-danger');

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Admin page updated.');
