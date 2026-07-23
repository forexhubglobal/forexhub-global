import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function PropFirmList() {
  const propFirms = getAllData('prop-firms');

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Senarai Prop Firm Terbaik</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Bandingkan firma prop terkemuka yang menawarkan modal besar kepada trader yang terbukti konsisten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propFirms.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
                Tiada rekod Prop Firm dijumpai. Tambah Prop Firm di Admin Dashboard.
              </div>
            ) : propFirms.map((firm) => (
              <div key={firm.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-700 shadow-sm relative">
                    {firm.logo ? (
                      <img src={firm.logo} alt={firm.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>{firm.title.charAt(0)}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Max Funding</div>
                    <div className="text-2xl font-bold text-primary-600">${Number(firm.maxFunding || 0).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{firm.title}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Yuran Bermula</span>
                      <span className="font-bold text-slate-900">${firm.fee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Profit Split</span>
                      <span className="font-bold text-success-600">Up to {firm.profitSplit}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto flex gap-3">
                  <Link href={`/prop-firm/${firm.slug}`} className="flex-1 py-3 px-4 bg-white border border-slate-300 text-center text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-sm">
                    Review
                  </Link>
                  {firm.affiliateLink && (
                    <a href={firm.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 bg-primary-600 border border-primary-600 text-white text-center font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm">
                      Daftar
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
