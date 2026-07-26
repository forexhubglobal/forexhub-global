const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Replace state variables
content = content.replace(/const \[exnessLink, setExnessLink\] = useState\(''\);\s*const \[xmLink, setXmLink\] = useState\(''\);\s*const \[hfmLink, setHfmLink\] = useState\(''\);/, "const [ibMainLink, setIbMainLink] = useState('');");

// Replace reset values
content = content.replace(/setExnessLink\(''\);\s*setXmLink\(''\);\s*setHfmLink\(''\);/, "setIbMainLink('');");

// Replace fetch parsing
content = content.replace(/const links = JSON\.parse\(item\.brokerLinks \|\| '\{\}'\);\s*setExnessLink\(links\.exness \|\| ''\);\s*setXmLink\(links\.xm \|\| ''\);\s*setHfmLink\(links\.hfm \|\| ''\);/, "setIbMainLink(item.mainLink || '');");

// Replace submit payload
content = content.replace(/brokerLinks: JSON\.stringify\(\{ exness: exnessLink, xm: xmLink, hfm: hfmLink \}\)/, "mainLink: ibMainLink");

// Replace UI inputs
const oldUI = `<h3 className="text-lg font-bold text-neon-blue border-b border-white/10 pb-2 mb-4">Link Affiliate Broker (Tinggalkan kosong jika tiada)</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Exness Referral Link</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={exnessLink} onChange={(e) => setExnessLink(e.target.value)} placeholder="https://one.exness-track.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">XM Referral Link</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={xmLink} onChange={(e) => setXmLink(e.target.value)} placeholder="https://clicks.pipaffiliates.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">HFM Referral Link</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={hfmLink} onChange={(e) => setHfmLink(e.target.value)} placeholder="https://www.hfm.com/..." />
                  </div>`;

const newUI = `<h3 className="text-lg font-bold text-neon-blue border-b border-white/10 pb-2 mb-4">Referral Link Utama IB</h3>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-300 mb-2">Link Pendaftaran IB (Semua butang akan dihalakan ke link ini)</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={ibMainLink} onChange={(e) => setIbMainLink(e.target.value)} placeholder="Contoh: https://one.exness-track.com/... ATAU linktree ejen" />
                  </div>`;

content = content.replace(oldUI, newUI);

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Successfully simplified IB inputs');
