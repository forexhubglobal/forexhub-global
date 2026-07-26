import Link from 'next/link';
import { getDataBySlug } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function BonusDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bonus = await getDataBySlug('bonus', slug);

  if (!bonus) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Bonus Tidak Dijumpai</h1>
          <Link href="/bonus" className="text-neon-blue font-bold hover:underline">
            Kembali ke Senarai Bonus
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/10 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left mb-12 border-b border-white/10 pb-12">
              <div className="w-32 h-32 rounded-2xl bg-[#09090b] border border-white/10 overflow-hidden flex items-center justify-center font-bold text-slate-300 shadow-sm relative shrink-0">
                {bonus.logo ? (
                  <img src={bonus.logo} alt={bonus.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{bonus.title.charAt(0)}</span>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="inline-block bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm font-bold mb-4">
                  {bonus.bonusType}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{bonus.title}</h1>
                <div className="text-4xl md:text-5xl font-extrabold text-gold-500 mb-6">{bonus.bonusAmount}</div>
                
                <a href={bonus.bonusLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-block py-4 px-8 bg-neon-blue text-black font-bold text-white font-bold rounded-xl hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all shadow-lg shadow-primary-500/30 transform hover:-translate-y-1">
                  Tebus Bonus Sekarang
                </a>
              </div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:text-white prose-a:text-neon-blue hover:prose-a:text-neon-blue" 
                 dangerouslySetInnerHTML={{ __html: bonus.contentHtml }} 
            />
          </div>

        </div>
      </main>
    </>
  );
}
