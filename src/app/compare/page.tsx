import { getAllData } from '@/lib/markdown';
import CompareClient from '@/components/CompareClient';

export const dynamic = 'force-dynamic';

export default function ComparePage() {
  const allBrokers = getAllData('brokers');
  // Jangan papar broker yang telah disembunyikan (isHidden === 'true')
  const brokers = allBrokers.filter(b => b.isHidden !== 'true');

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Perbandingan <span className="text-neon-blue">Matrix Broker</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Bandingkan ciri-ciri utama setiap broker secara sebelah-menyebelah untuk membuat keputusan yang tepat sebelum mula berdagang.
            </p>
          </div>

          <CompareClient brokers={brokers} />

          <div className="mt-20 mb-8 text-center">
            <h3 className="text-3xl font-black text-white">Jadual Perbandingan Penuh</h3>
            <p className="text-slate-400 mt-2 text-lg">Perbandingan matriks serentak untuk semua broker berdaftar.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl shadow-lg border border-white/10 overflow-hidden relative">
            {brokers.length === 0 ? (
              <div className="p-16 text-center text-slate-400">Tiada data broker untuk dibandingkan.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="py-6 px-6 font-bold text-slate-200 text-sm tracking-wider uppercase bg-white/5 border-b-2 border-white/10 border-r w-48 sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Ciri / Broker
                      </th>
                      {brokers.map(broker => (
                        <th key={broker.slug} className="py-6 px-6 bg-[#09090b] border-b-2 border-white/10 text-center min-w-[200px]">
                          <div className="flex flex-col items-center justify-center gap-3">
                            {broker.logo ? (
                              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm relative border border-white/10 bg-black/40 backdrop-blur-md">
                                <img src={broker.logo} alt={broker.title} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-md text-white font-black text-xl">
                                {broker.title.charAt(0)}
                              </div>
                            )}
                            <span className="font-black text-white text-lg notranslate">{broker.title}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    
                    {/* Rating */}
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-300 bg-black/40 backdrop-blur-md border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Penilaian (Rating)
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-5 px-6 text-center bg-black/40 backdrop-blur-md">
                          <div className="inline-flex items-center gap-1 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                            <span className="text-gold-500 text-sm">⭐</span>
                            <span className="font-bold text-gold-700">{broker.rating || 'N/A'}/5.0</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Deposit Minima */}
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-300 bg-[#09090b] border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Deposit Minima
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-5 px-6 text-center bg-[#09090b]">
                          <span className="font-bold text-white text-lg">${broker.minDeposit || 'N/A'}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Leverage */}
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-300 bg-black/40 backdrop-blur-md border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Leverage Maksimum
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-5 px-6 text-center bg-black/40 backdrop-blur-md">
                          <span className="font-semibold text-neon-blue bg-neon-blue/10 px-3 py-1 rounded-lg border border-primary-100">{broker.leverage || 'N/A'}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Spread */}
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-300 bg-[#09090b] border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Spread (Bermula)
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-5 px-6 text-center bg-[#09090b]">
                          <span className="font-medium text-slate-300">{broker.spread ? `${broker.spread} pips` : 'N/A'}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Regulators */}
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-300 bg-black/40 backdrop-blur-md border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Kawal Selia
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-5 px-6 text-center bg-black/40 backdrop-blur-md">
                          <div className="flex flex-wrap justify-center gap-1 max-w-[180px] mx-auto">
                            {broker.regulators ? broker.regulators.split(',').map((reg: string, i: number) => (
                              <span key={i} className="text-xs font-bold bg-white/5 text-slate-400 px-2 py-1 rounded-md border border-white/10">
                                {reg.trim()}
                              </span>
                            )) : 'N/A'}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Action */}
                    <tr className="border-t-2 border-white/10">
                      <td className="py-6 px-6 font-bold text-slate-200 bg-white/5 border-r sticky left-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.03)]">
                        Tindakan
                      </td>
                      {brokers.map(broker => (
                        <td key={broker.slug} className="py-6 px-6 text-center bg-[#09090b]">
                          <div className="flex flex-col gap-2 max-w-[150px] mx-auto">
                            <a 
                              href={`/broker/${broker.slug}`}
                              className="w-full inline-block text-sm font-bold text-neon-blue hover:text-neon-blue hover:underline transition-colors"
                            >
                              Baca Ulasan
                            </a>
                            {broker.affiliateLink && (
                              <a 
                                href={broker.affiliateLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full inline-block bg-neon-blue text-black font-bold hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
                              >
                                Buka Akaun
                              </a>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>
      </main>

    </div>
  );
}
