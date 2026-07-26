const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Update ContentType
content = content.replace(/type ContentType = (.*?);/, 'type ContentType = $1 | \'ibs\';');

// 2. Add IB State
const stateInsertion = `
  // IBs State
  const [ibTiktok, setIbTiktok] = useState('');
  const [exnessLink, setExnessLink] = useState('');
  const [xmLink, setXmLink] = useState('');
  const [hfmLink, setHfmLink] = useState('');
`;
content = content.replace('// Scams State', stateInsertion + '\n  // Scams State');

// 3. Reset Form
const resetInsertion = `
    setIbTiktok('');
    setExnessLink('');
    setXmLink('');
    setHfmLink('');
`;
content = content.replace(/setScamStatus\('Sah Scam'\);/, "setScamStatus('Sah Scam');" + resetInsertion);

// 4. Set Values on Fetch (in useEffect)
// Find the exact line where it sets pamm values in useEffect
const pammEffectTarget = `          } else if (contentType === 'pamm') {
            setLogo(item.logo || '');
            setManager(item.manager || '');`;
const fetchInsertion = `          } else if (contentType === 'ibs') {
            setIbTiktok(item.tiktok || '');
            try {
              const links = JSON.parse(item.brokerLinks || '{}');
              setExnessLink(links.exness || '');
              setXmLink(links.xm || '');
              setHfmLink(links.hfm || '');
            } catch(e) {}
` + pammEffectTarget;
content = content.replace(pammEffectTarget, fetchInsertion);

// 5. Submit Payload (in handleSubmit)
const pammSubmitTarget = `    } else if (contentType === 'pamm') {
      payload = { ...payload, logo, manager, strategy, monthlyReturn, riskLevel, minInvest, pammLink };`;
const payloadInsertion = `    } else if (contentType === 'ibs') {
      payload = { ...payload, tiktok: ibTiktok, brokerLinks: JSON.stringify({ exness: exnessLink, xm: xmLink, hfm: hfmLink }) };
` + pammSubmitTarget;
content = content.replace(pammSubmitTarget, payloadInsertion);

// 6. Add Tab
content = content.replace(/{id: 'settings', label: '⚙️ Tetapan Umum'}/, "{id: 'settings', label: '⚙️ Tetapan Umum'}, {id: 'ibs', label: '🤝 Pengurusan IB'}");

// 7. Add Form UI
const formUI = `
            ) : contentType === 'ibs' ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-300 mb-2">Nama IB <span className="text-neon-blue">*</span></label>
                    <input type="text" required className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Cth: Khairi" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-300 mb-2">TikTok Username (Tanpa @)</label>
                    <input type="text" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none font-medium text-slate-300" value={ibTiktok} onChange={(e) => setIbTiktok(e.target.value)} placeholder="Cth: khairi_trade" />
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-bold text-neon-blue border-b border-white/10 pb-2 mb-4">Link Affiliate Broker (Tinggalkan kosong jika tiada)</h3>
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
                  
                  <div className="md:col-span-2 pt-6">
                    <button type="submit" disabled={status.type === 'loading'} className="w-full md:w-auto bg-neon-blue hover:bg-neon-blue/80 text-black font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.4)] disabled:opacity-50 transition-all">
                      {status.type === 'loading' ? 'Menyimpan...' : (selectedSlug === 'new' ? '+ Tambah IB' : 'Simpan Kemas Kini')}
                    </button>
                  </div>
                </div>
              </form>
`;
content = content.replace(/\)\s*:\s*\(\s*<>\s*\{status\.type && \(/, formUI + '            ) : (\n              <>\n                {status.type && (');

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Admin Page Updated successfully');
