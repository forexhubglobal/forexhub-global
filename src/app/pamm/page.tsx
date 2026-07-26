import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function PammList() {
  const pammAccounts = getAllData('pamm');

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Senarai Akaun PAMM & Copytrade</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ikuti trader profesional (Fund Manager) dan gandakan modal anda secara automatik tanpa perlu trade sendiri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pammAccounts.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-slate-400">Tiada akaun PAMM dijumpai. Sila tambah di Admin Dashboard.</p>
              </div>
            ) : pammAccounts.map((pamm: any) => (
              <div key={pamm.slug} className="bg-black/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/10 overflow-hidden hover:shadow-lg transition-all flex flex-col group">
                <div className="p-6 pb-0 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#09090b] border border-white/10 flex items-center justify-center font-bold text-slate-300 shadow-sm shrink-0 overflow-hidden relative">
                      {pamm.logo ? (
                        <img src={pamm.logo} alt={pamm.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{pamm.title.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white group-hover:text-neon-blue transition-colors">{pamm.title}</h3>
                      <p className="text-sm text-slate-400 font-medium">{pamm.manager}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4 bg-[#09090b] p-4 rounded-2xl mb-6">
                    <div>
                      <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Pulangan Bulanan</span>
                      <span className="block font-bold text-white">{pamm.monthlyReturn}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Strategi</span>
                      <span className="block font-bold text-white">{pamm.strategy}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Tahap Risiko</span>
                      <span className={`block font-bold ${pamm.riskLevel === 'Low' ? 'text-success-600' : pamm.riskLevel === 'High' ? 'text-danger-600' : 'text-gold-600'}`}>
                        {pamm.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Min. Invest</span>
                      <span className="block font-bold text-white">${pamm.minInvest}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#09090b] border-t border-white/10 flex gap-3 mt-auto">
                  <Link href={`/pamm/${pamm.slug}`} className="flex-1 py-3 px-4 bg-black/40 backdrop-blur-md border border-white/20 text-center text-slate-300 font-bold rounded-xl hover:bg-[#09090b] transition-colors shadow-sm">
                    Info
                  </Link>
                  {pamm.pammLink && (
                    <a href={pamm.pammLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 bg-neon-blue text-black font-bold text-white text-center font-bold rounded-xl hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-colors shadow-md shadow-primary-500/20">
                      Copy Sekarang
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
