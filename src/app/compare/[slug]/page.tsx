import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBrokerBySlug, brokers } from '@/data/brokers';

export default async function CompareResult({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const slugs = slug.split('-vs-');
  if (slugs.length !== 2) {
    notFound();
  }

  const broker1 = getBrokerBySlug(slugs[0]);
  const broker2 = getBrokerBySlug(slugs[1]);

  if (!broker1 || !broker2) {
    notFound();
  }

  const comparisonPoints = [
    { label: 'Rating Keseluruhan', key: 'rating', format: (val: any) => `⭐ ${val}` },
    { label: 'Skor Keseluruhan', key: 'overallScore' },
    { label: 'Spread', key: 'spread' },
    { label: 'Deposit Min', key: 'deposit' },
    { label: 'Pengeluaran', key: 'withdrawal' },
    { label: 'Platform', key: 'platform' },
    { label: 'Leverage', key: 'leverage' },
    { label: 'Bonus', key: 'bonus' },
    { label: 'Cashback', key: 'cashback' },
    { label: 'Copy Trading', key: 'copyTrading' },
    { label: 'PAMM', key: 'pamm' },
    { label: 'Regulation', key: 'regulation' },
  ];

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-neon-blue">Home</Link>
            <span>/</span>
            <Link href="/compare" className="hover:text-neon-blue">Compare</Link>
            <span>/</span>
            <span className="text-white font-medium">{broker1.name} vs {broker2.name}</span>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {broker1.name} <span className="text-slate-400 font-medium text-3xl">vs</span> {broker2.name}
            </h1>
            <p className="text-lg text-slate-400">Bandingkan ciri-ciri utama sebelah-menyebelah</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/10 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-[#09090b]">
              <div className="p-6 flex items-center justify-center">
                <Link href="/compare" className="text-sm font-semibold text-neon-blue hover:text-neon-blue underline">
                  Tukar Broker
                </Link>
              </div>
              <div className="p-6 text-center border-l border-white/10">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${broker1.color} flex items-center justify-center text-white font-bold text-xl shadow-md mb-4`}>
                  {broker1.logo}
                </div>
                <h2 className="font-bold text-xl text-white mb-4">{broker1.name}</h2>
                <button className="w-full bg-black hover:bg-black/60 text-white py-2 rounded-lg font-semibold transition-colors text-sm">Buka Akaun</button>
              </div>
              <div className="p-6 text-center border-l border-white/10">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${broker2.color} flex items-center justify-center text-white font-bold text-xl shadow-md mb-4`}>
                  {broker2.logo}
                </div>
                <h2 className="font-bold text-xl text-white mb-4">{broker2.name}</h2>
                <button className="w-full bg-black hover:bg-black/60 text-white py-2 rounded-lg font-semibold transition-colors text-sm">Buka Akaun</button>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-slate-100">
              {comparisonPoints.map((point) => (
                <div key={point.key} className="grid grid-cols-3 hover:bg-[#09090b] transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-slate-300 bg-[#09090b]/50">
                    {point.label}
                  </div>
                  <div className="p-4 md:p-6 text-sm text-white text-center font-medium border-l border-white/10">
                    {point.format ? point.format((broker1 as any)[point.key]) : (broker1 as any)[point.key]}
                  </div>
                  <div className="p-4 md:p-6 text-sm text-white text-center font-medium border-l border-white/10">
                    {point.format ? point.format((broker2 as any)[point.key]) : (broker2 as any)[point.key]}
                  </div>
                </div>
              ))}
            </div>

            {/* Pros & Cons Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-white/10 bg-[#09090b]">
              <div className="p-8">
                <h3 className="font-bold text-white mb-6 text-center">Kelebihan {broker1.name}</h3>
                <ul className="space-y-3">
                  {broker1.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-success-700 text-sm">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-white mb-6 text-center">Kelebihan {broker2.name}</h3>
                <ul className="space-y-3">
                  {broker2.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-success-700 text-sm">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}
