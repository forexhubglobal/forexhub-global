import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function BrokerList() {
  const brokers = getAllData('brokers');

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Direktori Broker Forex</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Semak senarai penuh broker yang beroperasi di Malaysia. Kami menilai setiap aspek untuk memastikan anda memilih platform yang betul.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    <th className="p-4 border-b border-white/10">Broker</th>
                    <th className="p-4 border-b border-white/10 text-center">Rating</th>
                    <th className="p-4 border-b border-white/10">Spread</th>
                    <th className="p-4 border-b border-white/10">Regulators</th>
                    <th className="p-4 border-b border-white/10 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {brokers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">Tiada broker dijumpai. Tambah broker di Admin Dashboard.</td>
                    </tr>
                  ) : brokers.map((broker) => (
                    <tr key={broker.slug} className="hover:bg-[#09090b] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 font-bold shadow-sm overflow-hidden relative`}>
                            {broker.logo ? (
                              <img src={broker.logo} alt={broker.title} className="w-full h-full object-cover" />
                            ) : (
                              <span>{broker.title.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-lg notranslate">{broker.title}</div>
                            <div className="text-sm text-slate-400">Min Deposit: ${broker.minDeposit}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-gold-50 px-2 py-1 rounded-md text-gold-600 font-bold">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          {broker.rating}
                        </div>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">{broker.spread} pips</td>
                      <td className="p-4 text-slate-300 font-medium text-sm">{broker.regulators}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/broker/${broker.slug}`} className="inline-flex px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 text-slate-300 rounded-lg hover:bg-[#09090b] transition-colors font-semibold text-sm shadow-sm">
                            Info
                          </Link>
                          {broker.affiliateLink && (
                            <a href={broker.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-4 py-2 bg-neon-blue text-black font-bold border border-primary-600 text-white rounded-lg hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:border-primary-700 transition-colors font-semibold text-sm shadow-sm">
                              Daftar
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
