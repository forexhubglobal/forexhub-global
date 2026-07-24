import { notFound } from 'next/navigation';
import Link from 'next/link';
import BrokerReviews from '@/components/BrokerReviews';
import { getDataBySlug } from '@/lib/markdown';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const broker = await getDataBySlug('brokers', slug);
  
  if (!broker) return { title: 'Broker Tidak Dijumpai' };

  return {
    title: `Review ${broker.title} Malaysia: Spread, Bonus & Kelebihan ${new Date().getFullYear()}`,
    description: `Adakah ${broker.title} broker yang bagus? Baca ulasan penuh tentang spread, jenis akaun, leverage, dan regulation sebelum mendaftar.`,
    openGraph: {
      title: `Review Penuh ${broker.title}`,
      description: `Bandingkan ciri-ciri, bonus dan platform trading ${broker.title} di ForexHub Global.`,
      images: broker.logo ? [{ url: broker.logo, width: 800, height: 600 }] : [],
    }
  };
}

export default async function BrokerDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = await getDataBySlug('brokers', slug);

  if (!broker) {
    notFound();
  }

  // Schema.org JSON-LD for FinancialProduct / Review
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'FinancialService',
      'name': broker.title,
      'image': broker.logo || '',
      'description': `Broker forex ${broker.title}`,
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': broker.rating || '4.5',
      'bestRating': '5',
      'worstRating': '1',
    },
    'author': {
      '@type': 'Organization',
      'name': 'ForexHub Global'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#09090b] min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/broker" className="hover:text-neon-blue transition-colors">Broker</Link>
            <span>/</span>
            <span className="text-white font-medium">{broker.title}</span>
          </div>

          {/* Hero Header */}
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 mb-8 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-bl-full pointer-events-none group-hover:bg-neon-purple/10 transition-colors`}></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className={`w-24 h-24 rounded-2xl bg-black/40 backdrop-blur-md/5 border border-white/20 flex flex-shrink-0 items-center justify-center text-slate-300 font-bold text-3xl shadow-sm overflow-hidden relative backdrop-blur-md group-hover:border-neon-blue/50 transition-colors`}>
                {broker.logo ? (
                  <img src={broker.logo} alt={broker.title} className="w-full h-full object-contain p-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                ) : (
                  <span>{broker.title.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all">{broker.title} Review</h1>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-1 bg-gold-500/10 text-gold-400 px-3 py-1 rounded-full text-sm font-bold border border-gold-500/30 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">
                    ⭐ {broker.rating}/5.0 Skor Keseluruhan
                  </span>
                  <span className="inline-flex items-center bg-black/40 backdrop-blur-md/5 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                    Regulated: {broker.regulators}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <a href={broker.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full md:w-auto bg-gradient-to-r from-neon-blue to-primary-600 hover:from-neon-blue hover:to-neon-purple text-black px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6)] transition-all transform hover:-translate-y-1">
                  Buka Akaun
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Maklumat Asas & Spesifikasi */}
              <section className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Spesifikasi Penuh Broker</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {/* Basic */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-2 gap-4">
                    <span className="text-slate-400 shrink-0">Regulators</span>
                    <span className="font-semibold text-white text-right break-words min-w-0">{broker.regulators ? broker.regulators.split(',').map((s: string) => s.trim()).join(', ') : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Deposit Min</span>
                    <span className="font-semibold text-white text-right">${broker.minDeposit || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Max Leverage</span>
                    <span className="font-semibold text-white text-right">{broker.leverage || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Spread Bermula</span>
                    <span className="font-bold text-neon-green text-right">{broker.spread || '-'} pips</span>
                  </div>

                  {/* Extended */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Platform Trading</span>
                    <span className="font-semibold text-white text-right">{broker.platforms || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Jenis Akaun</span>
                    <span className="font-semibold text-white text-right">{broker.accountTypes || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Instrumen Dagangan</span>
                    <span className="font-semibold text-white text-right">{broker.assetClasses || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Trading Desk</span>
                    <span className="font-semibold text-white text-right">{broker.tradingDesk || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Matawang Asas</span>
                    <span className="font-semibold text-white text-right">{broker.baseCurrencies || '-'}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-white/5 pb-2 gap-4">
                    <span className="text-slate-400 shrink-0">Deposit / Keluaran</span>
                    <span className="font-semibold text-white text-right text-xs sm:text-sm break-words min-w-0">{broker.fundingMethods ? broker.fundingMethods.split(',').map((s: string) => s.trim()).join(', ') : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Akaun Islamic (Swap Free)</span>
                    <span className="font-semibold text-white text-right">{broker.swapFree || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-400">Copy Trading</span>
                    <span className="font-semibold text-white text-right">{broker.copyTrading || '-'}</span>
                  </div>
                </div>
              </section>

              {/* Dynamic Content Markdown */}
              <section className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
                <div className="prose prose-invert prose-lg prose-slate max-w-none prose-headings:text-white prose-a:text-neon-blue hover:prose-a:text-neon-purple" 
                     dangerouslySetInnerHTML={{ __html: broker.contentHtml }} 
                />
              </section>

              {/* User Reviews Section */}
              <BrokerReviews slug={slug} />

            </div>

            {/* Sidebar Sticky */}
            <div className="md:col-span-1">
              <div className="md:sticky md:top-28 bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 group hover:border-neon-purple/30 transition-colors">
                <h3 className="font-bold text-white mb-4 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-colors">Bandingkan {broker.title}</h3>
                <p className="text-sm text-slate-400 mb-6">Adakah ini broker terbaik untuk anda? Bandingkan dengan broker popular lain.</p>
                <div className="space-y-3">
                  <Link href="/compare" className="block w-full py-3 px-4 bg-black/40 backdrop-blur-md/5 border border-white/10 text-white text-center rounded-xl text-sm font-bold hover:bg-neon-purple/20 hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] transition-all">
                    Lihat Semua Perbandingan
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
