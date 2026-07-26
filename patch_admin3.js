const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Replace state variables
content = content.replace(/const \[ibMainLink, setIbMainLink\] = useState\(''\);/, `const [exnessLink, setExnessLink] = useState('');
  const [xmLink, setXmLink] = useState('');
  const [hfmLink, setHfmLink] = useState('');
  const [monetaLink, setMonetaLink] = useState('');
  const [cptLink, setCptLink] = useState('');`);

// Replace reset values
content = content.replace(/setIbMainLink\(''\);/, `setExnessLink('');
    setXmLink('');
    setHfmLink('');
    setMonetaLink('');
    setCptLink('');`);

// Replace fetch parsing
content = content.replace(/setIbMainLink\(item\.mainLink \|\| ''\);/, `const links = JSON.parse(item.brokerLinks || '{}');
              setExnessLink(links.exness || '');
              setXmLink(links.xm || '');
              setHfmLink(links.hfm || '');
              setMonetaLink(links.moneta || '');
              setCptLink(links['cpt-markets'] || '');`);

// Replace submit payload
content = content.replace(/mainLink: ibMainLink/, "brokerLinks: JSON.stringify({ exness: exnessLink, xm: xmLink, hfm: hfmLink, moneta: monetaLink, 'cpt-markets': cptLink })");

// Replace UI inputs
const oldUI = `<h3 className="text-lg font-bold text-neon-blue border-b border-white/10 pb-2 mb-4">Referral Link Utama IB</h3>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-300 mb-2">Link Pendaftaran IB (Semua butang akan dihalakan ke link ini)</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={ibMainLink} onChange={(e) => setIbMainLink(e.target.value)} placeholder="Contoh: https://one.exness-track.com/... ATAU linktree ejen" />
                  </div>`;

const newUI = `<h3 className="text-lg font-bold text-neon-blue border-b border-white/10 pb-2 mb-4">Link Affiliate Broker (Tinggalkan kosong jika tiada)</h3>
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
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Moneta Markets Referral Link</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={monetaLink} onChange={(e) => setMonetaLink(e.target.value)} placeholder="https://www.monetamarkets.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">CPT Markets Referral Link</label>
                    <input type="url" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={cptLink} onChange={(e) => setCptLink(e.target.value)} placeholder="https://www.cptmarkets.com/..." />
                  </div>`;

content = content.replace(oldUI, newUI);

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Successfully reverted IB inputs to 5 brokers');
