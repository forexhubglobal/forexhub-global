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
      <main className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/broker" className="hover:text-primary-600">Broker</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{broker.title}</span>
          </div>

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-slate-50 opacity-50 rounded-bl-full`}></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className={`w-24 h-24 rounded-2xl bg-white border border-slate-200 flex flex-shrink-0 items-center justify-center text-slate-700 font-bold text-3xl shadow-sm overflow-hidden relative`}>
                {broker.logo ? (
                  <img src={broker.logo} alt={broker.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{broker.title.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{broker.title} Review</h1>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 px-3 py-1 rounded-full text-sm font-bold border border-gold-200">
                    ⭐ {broker.rating}/5.0 Skor Keseluruhan
                  </span>
                  <span className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                    Regulated: {broker.regulators}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <a href={broker.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Buka Akaun
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Maklumat Asas & Spesifikasi */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Spesifikasi Penuh Broker</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {/* Basic */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2 gap-4">
                    <span className="text-slate-500 shrink-0">Regulators</span>
                    <span className="font-semibold text-slate-900 text-right break-words min-w-0">{broker.regulators ? broker.regulators.split(',').map((s: string) => s.trim()).join(', ') : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Deposit Min</span>
                    <span className="font-semibold text-slate-900 text-right">${broker.minDeposit || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Max Leverage</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.leverage || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Spread Bermula</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.spread || '-'} pips</span>
                  </div>

                  {/* Extended */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Platform Trading</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.platforms || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Jenis Akaun</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.accountTypes || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Instrumen Dagangan</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.assetClasses || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Trading Desk</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.tradingDesk || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Matawang Asas</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.baseCurrencies || '-'}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2 gap-4">
                    <span className="text-slate-500 shrink-0">Deposit / Keluaran</span>
                    <span className="font-semibold text-slate-900 text-right text-xs sm:text-sm break-words min-w-0">{broker.fundingMethods ? broker.fundingMethods.split(',').map((s: string) => s.trim()).join(', ') : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Akaun Islamic (Swap Free)</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.swapFree || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Copy Trading</span>
                    <span className="font-semibold text-slate-900 text-right">{broker.copyTrading || '-'}</span>
                  </div>
                </div>
              </section>

              {/* Dynamic Content Markdown */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-primary-600 hover:prose-a:text-primary-700" 
                     dangerouslySetInnerHTML={{ __html: broker.contentHtml }} 
                />
              </section>

              {/* User Reviews Section */}
              <BrokerReviews slug={slug} />

            </div>

            {/* Sidebar Sticky */}
            <div className="md:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Bandingkan {broker.title}</h3>
                <p className="text-sm text-slate-500 mb-4">Adakah ini broker terbaik untuk anda? Bandingkan dengan broker popular lain.</p>
                <div className="space-y-3">
                  <Link href="/compare" className="block w-full py-2 px-4 bg-primary-600 text-white text-center rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
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
