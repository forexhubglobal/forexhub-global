import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function PammList() {
  const pammAccounts = getAllData('pamm');

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Senarai Akaun PAMM & Copytrade</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ikuti trader profesional (Fund Manager) dan gandakan modal anda secara automatik tanpa perlu trade sendiri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pammAccounts.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500">Tiada akaun PAMM dijumpai. Sila tambah di Admin Dashboard.</p>
              </div>
            ) : pammAccounts.map((pamm: any) => (
              <div key={pamm.slug} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col group">
                <div className="p-6 pb-0 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shadow-sm shrink-0 overflow-hidden relative">
                      {pamm.logo ? (
                        <img src={pamm.logo} alt={pamm.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{pamm.title.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors">{pamm.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{pamm.manager}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl mb-6">
                    <div>
                      <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Pulangan Bulanan</span>
                      <span className="block font-bold text-slate-900">{pamm.monthlyReturn}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Strategi</span>
                      <span className="block font-bold text-slate-900">{pamm.strategy}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Tahap Risiko</span>
                      <span className={`block font-bold ${pamm.riskLevel === 'Low' ? 'text-success-600' : pamm.riskLevel === 'High' ? 'text-danger-600' : 'text-gold-600'}`}>
                        {pamm.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Min. Invest</span>
                      <span className="block font-bold text-slate-900">${pamm.minInvest}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 mt-auto">
                  <Link href={`/pamm/${pamm.slug}`} className="flex-1 py-3 px-4 bg-white border border-slate-300 text-center text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    Info
                  </Link>
                  {pamm.pammLink && (
                    <a href={pamm.pammLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 bg-primary-600 text-white text-center font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md shadow-primary-500/20">
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
