import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function BonusList() {
  const bonuses = getAllData('bonus');

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Promosi & Bonus Broker</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tebus pelbagai bonus menarik dari broker yang diyakini. Dari No Deposit Bonus sehinggalah ke rebat dan pertandingan trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bonuses.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
                Tiada promosi dijumpai buat masa ini. Tambah promosi di Admin Dashboard.
              </div>
            ) : bonuses.map((bonus) => (
              <div key={bonus.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col relative group">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {bonus.bonusType}
                  </span>
                </div>
                
                <a href={bonus.bonusLink || '#'} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-700 shadow-sm relative group-hover:scale-105 transition-transform">
                      {bonus.logo ? (
                        <img src={bonus.logo} alt={bonus.title} className="w-full h-full object-cover" />
                      ) : (
                        <span>{bonus.title.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 pb-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{bonus.title}</h3>
                    <div className="text-3xl font-extrabold text-gold-500 mb-4 group-hover:text-gold-600 transition-colors">{bonus.bonusAmount}</div>
                  </div>
                </a>

                <div className="px-6 pb-4 flex-grow">
                   <div className="prose prose-sm text-slate-600 line-clamp-3">
                     <p>{bonus.excerpt || 'Rebut peluang keemasan ini untuk memulakan dagangan tanpa risiko kewangan anda.'}</p>
                   </div>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto flex flex-col gap-3">
                  <a href={bonus.bonusLink || '#'} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-primary-600 text-white text-center font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm">
                    Tebus Bonus / Daftar
                  </a>
                  <Link href={`/bonus/${bonus.slug}`} className="w-full py-2 px-4 bg-white text-slate-600 border border-slate-300 text-center font-bold rounded-xl hover:bg-slate-50 hover:text-primary-600 transition-all shadow-sm text-sm">
                    Baca Penerangan Penuh
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
