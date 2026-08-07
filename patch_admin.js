const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Add omni-requests to ContentType
content = content.replace(
  /type ContentType = 'articles' \| 'brokers' \| 'prop-firms' \| 'bonus' \| 'pamm' \| 'leads' \| 'omni-leads' \| 'reviews' \| 'scams' \| 'settings' \| 'ibs';/,
  "type ContentType = 'articles' | 'brokers' | 'prop-firms' | 'bonus' | 'pamm' | 'leads' | 'omni-leads' | 'omni-requests' | 'reviews' | 'scams' | 'settings' | 'ibs';"
);

// 2. Add omniRequestsList state
content = content.replace(
  /const \[scamsList, setScamsList\] = useState<any\[\]>\(\[\]\);/,
  "const [scamsList, setScamsList] = useState<any[]>([]);\n  const [omniRequestsList, setOmniRequestsList] = useState<any[]>([]);"
);

// 3. Add useEffect fetch logic for omni-requests
const fetchLogic = `
    if (contentType === 'omni-requests') {
      fetch('/api/admin/omni-requests')
        .then(res => res.json())
        .then(data => {
          if (data.success) setOmniRequestsList(data.requests);
        })
        .catch(err => console.error(err));
      return;
    }
`;
content = content.replace(
  /if \(contentType === 'omni-leads'\) {/,
  fetchLogic + "\n    if (contentType === 'omni-leads') {"
);

// 4. Add Tab Button
const tabButton = `
            <button onClick={() => setContentType('omni-requests')} className={\`w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 \${contentType === 'omni-requests' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-600 hover:bg-primary-50'}\`}>
              <span className="text-xl">🤖</span> OMNI AI PRO
            </button>
`;
content = content.replace(
  /<button onClick=\{\(\) => setContentType\('omni-leads'\)\}/,
  tabButton + "\n            <button onClick={() => setContentType('omni-leads')}"
);

// 5. Add UI Block for omni-requests
const uiBlock = `
            ) : contentType === 'omni-requests' ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🤖</span> Pengurusan Akses Omni AI Pro
                </h2>
                
                {status.type && (
                  <div className={\`p-4 rounded-xl mb-6 font-semibold \${status.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'}\`}>
                    {status.message}
                  </div>
                )}

                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => {
                      const pending = omniRequestsList.filter(r => r.status === 'pending');
                      if (pending.length === 0) return alert('Tiada permohonan baru.');
                      const usernames = pending.map(r => r.tvUsername).join(', ');
                      navigator.clipboard.writeText(usernames);
                      alert(pending.length + ' username dicopy! Sila paste di TradingView.');
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors"
                  >
                    Copy Pending Usernames
                  </button>
                  <button 
                    onClick={() => {
                      const revoked = omniRequestsList.filter(r => r.status === 'expired' || r.status === 'blocked');
                      if (revoked.length === 0) return alert('Tiada pengguna untuk dibuang.');
                      const usernames = revoked.map(r => r.tvUsername).join(', ');
                      navigator.clipboard.writeText(usernames);
                      alert(revoked.length + ' username dicopy! Sila remove dari TradingView.');
                    }}
                    className="bg-danger-600 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors"
                  >
                    Copy Revoke Usernames
                  </button>
                </div>

                {omniRequestsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    Tiada permohonan dijumpai.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white border border-slate-200 rounded-xl shadow-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-slate-50">
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Klien</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">TV Username</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Pelan & Tarikh</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Status</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm text-right">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {omniRequestsList.map(req => (
                          <tr key={req.slug} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900 text-sm">{req.name}</div>
                              <div className="text-xs text-slate-500">{req.phone}</div>
                              {req.brokerAccount && <div className="text-xs text-primary-600 font-bold mt-1">Acc: {req.brokerAccount}</div>}
                            </td>
                            <td className="py-3 px-4 text-sm font-mono text-slate-800 font-bold">
                              {req.tvUsername}
                            </td>
                            <td className="py-3 px-4">
                              <div className={\`text-xs font-bold px-2 py-0.5 inline-block rounded \${req.plan === 'vip' ? 'bg-success-100 text-success-700' : 'bg-primary-100 text-primary-700'}\`}>
                                {req.plan === 'vip' ? 'VIP (30 Hari)' : 'TRIAL (5 Hari)'}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">Mula: {new Date(req.requestDate).toLocaleDateString('ms-MY')}</div>
                              <div className={\`text-xs mt-0.5 \${new Date() > new Date(req.expiryDate) ? 'text-danger-600 font-bold' : 'text-slate-500'}\`}>
                                Luput: {new Date(req.expiryDate).toLocaleDateString('ms-MY')}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={\`text-xs font-bold px-2 py-1 rounded-full \${
                                req.status === 'active' ? 'bg-success-100 text-success-700' :
                                req.status === 'pending' ? 'bg-warning-100 text-warning-700' :
                                'bg-danger-100 text-danger-700'
                              }\`}>
                                {req.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right flex flex-col gap-2 justify-end">
                              {req.status === 'pending' && (
                                <button 
                                  onClick={async () => {
                                    const res = await fetch('/api/admin/omni-requests', {
                                      method: 'POST', headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ slug: req.slug, status: 'active' })
                                    });
                                    if(res.ok) {
                                      const updated = omniRequestsList.map(r => r.slug === req.slug ? {...r, status: 'active'} : r);
                                      setOmniRequestsList(updated);
                                    }
                                  }}
                                  className="text-xs font-bold text-success-600 hover:text-white border border-success-600 hover:bg-success-600 px-3 py-1 rounded transition-colors"
                                >
                                  Lulus (Active)
                                </button>
                              )}
                              {(req.status === 'active' || req.status === 'pending') && (
                                <button 
                                  onClick={async () => {
                                    if(confirm('Pasti ingin block/remove klien ini? (Zero balance)')) {
                                      const res = await fetch('/api/admin/omni-requests', {
                                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ slug: req.slug, status: 'blocked' })
                                      });
                                      if(res.ok) {
                                        const updated = omniRequestsList.map(r => r.slug === req.slug ? {...r, status: 'blocked'} : r);
                                        setOmniRequestsList(updated);
                                      }
                                    }
                                  }}
                                  className="text-xs font-bold text-danger-600 hover:text-white border border-danger-600 hover:bg-danger-600 px-3 py-1 rounded transition-colors"
                                >
                                  Zero Balance (Block)
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
`;
content = content.replace(
  /\) : contentType === 'omni-leads' \? \(/,
  uiBlock + "\n            ) : contentType === 'omni-leads' ? ("
);

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Admin page patched successfully.');
