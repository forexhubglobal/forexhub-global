import { getAllData } from '@/lib/markdown';
import BrokerFinder from '@/components/BrokerFinder';

export const dynamic = 'force-dynamic';

export default function BrokerList() {
  const allBrokers = getAllData('brokers');
  // Jangan papar broker yang telah disembunyikan (isHidden === 'true')
  const brokers = allBrokers.filter(b => b.isHidden !== 'true');

  return (
    <>
      <main className="bg-[#09090b] min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Direktori <span className="text-neon-blue">Broker Global</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Cari dan tapis broker Forex terbaik di Malaysia berdasarkan modal, gaya trading, dan platform pilihan anda.
            </p>
          </div>

          <BrokerFinder initialBrokers={brokers} />
          
        </div>
      </main>
    </>
  );
}
