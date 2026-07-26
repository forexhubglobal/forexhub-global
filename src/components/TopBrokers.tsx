import Link from 'next/link';
import Image from 'next/image';
import { getAllData } from '@/lib/markdown';

export default async function TopBrokers() {
  const allBrokers = getAllData('brokers');
  
  // Tapis broker yang hanya mengaktifkan 'isAd' dan TIDAK disembunyikan (isHidden !== 'true')
  const sponsoredBrokers = allBrokers.filter(b => b.isAd === 'true' && b.isHidden !== 'true');
  
  // Ambil 4 broker teratas untuk dipaparkan di homepage
  const topBrokers = sponsoredBrokers.slice(0, 4);

  // Jika tiada broker, paparkan placeholder
  const displayBrokers = topBrokers.length > 0 ? topBrokers : [
    { title: 'Moneta Markets', rating: '4.9', spread: '0.0 Pips', logo: '', isAd: 'true' },
    { title: 'Exness', rating: '4.8', spread: '0.0 Pips', logo: '', isAd: 'false' },
    { title: 'XM', rating: '4.7', spread: '0.6 Pips', logo: '', isAd: 'true' },
    { title: 'HFM', rating: '4.7', spread: '1.0 Pips', logo: '', isAd: 'false' },
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">Top Global Preferred Broker</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Senarai broker forex terbaik berdasarkan penilaian ketat, review pengguna sebenar dan tawaran paling menguntungkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBrokers.map((broker: any, index: number) => (
            <div 
              key={broker.title || index} 
              className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:shadow-[0_0_30px_rgba(188,19,254,0.3)] transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Top Banner for #1 */}
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-gold-500 to-yellow-300 text-black text-xs font-black px-4 py-1 rounded-bl-xl z-10 shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                  #1 PILIHAN
                </div>
              )}
              
              {/* Logo Area */}
              <div className="w-full h-20 relative mb-6 p-2 rounded-xl bg-black/40 backdrop-blur-md/5 border border-white/10 flex items-center justify-center group-hover:border-neon-blue/50 transition-colors">
                {broker.logo ? (
                  <div className="relative w-full h-full">
                    <Image src={broker.logo} alt={broker.title} fill className="object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                  </div>
                ) : (
                  <div className="text-xl font-black text-slate-400">{broker.title.substring(0, 2).toUpperCase()}</div>
                )}
                
                {/* AD Badge */}
                {broker.isAd === 'true' && (
                  <div className="absolute bottom-1 right-1 bg-neon-purple text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(188,19,254,0.8)] tracking-widest">
                    AD
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 notranslate group-hover:text-neon-blue transition-colors">{broker.title}</h3>
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(parseFloat(broker.rating || '5')) ? 'text-gold-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="font-bold text-slate-300 ml-1">{broker.rating || '5.0'}</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-slate-400">Spread</span>
                  <span className="font-semibold text-neon-green">{broker.spread || 'Rendah'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-slate-400">Min Deposit</span>
                  <span className="font-semibold text-white">${broker.minDeposit || '10'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Max Leverage</span>
                  <span className="font-semibold text-white">{broker.leverage || '1:1000'}</span>
                </div>
              </div>

              <Link href={broker.slug ? `/broker/${broker.slug}` : '#'} className="block w-full py-3 px-4 bg-black/40 backdrop-blur-md/5 hover:bg-neon-blue/20 text-neon-blue text-center font-bold rounded-xl transition-all border border-white/10 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                Baca Review
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/compare" className="inline-flex items-center gap-2 text-neon-blue font-bold hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            Lihat Senarai Penuh Broker
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
