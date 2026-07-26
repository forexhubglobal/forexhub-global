import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataBySlug } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function PropFirmDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = await getDataBySlug('prop-firms', slug);

  if (!firm) {
    notFound();
  }

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-neon-blue">Home</Link>
            <span>/</span>
            <Link href="/prop-firm" className="hover:text-neon-blue">Prop Firm</Link>
            <span>/</span>
            <span className="text-white font-medium">{firm.title}</span>
          </div>

          {/* Hero Header */}
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/10 mb-8 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-[#09090b] opacity-50 rounded-bl-full`}></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className={`w-24 h-24 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex flex-shrink-0 items-center justify-center text-slate-300 font-bold text-3xl shadow-sm overflow-hidden relative`}>
                {firm.logo ? (
                  <img src={firm.logo} alt={firm.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{firm.title.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{firm.title} Review</h1>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 px-3 py-1 rounded-full text-sm font-bold border border-gold-200">
                    Max Funding: ${Number(firm.maxFunding || 0).toLocaleString()}
                  </span>
                  <span className="inline-flex items-center bg-white/5 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                    Profit Split: Up to {firm.profitSplit}%
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <a href={firm.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full md:w-auto bg-neon-blue text-black font-bold hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Maklumat Asas */}
              <section className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Maklumat Prop Firm</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Yuran Bermula</span>
                    <span className="font-semibold text-white">${firm.fee}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Funding</span>
                    <span className="font-semibold text-white">${Number(firm.maxFunding || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Profit Split</span>
                    <span className="font-semibold text-success-600">{firm.profitSplit}%</span>
                  </div>
                </div>
              </section>

              {/* Dynamic Content Markdown */}
              <section className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10">
                <div className="prose prose-lg prose-slate max-w-none prose-headings:text-white prose-a:text-neon-blue hover:prose-a:text-neon-blue" 
                     dangerouslySetInnerHTML={{ __html: firm.contentHtml }} 
                />
              </section>

            </div>

            {/* Sidebar Sticky */}
            <div className="md:col-span-1">
              <div className="sticky top-28 bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10">
                <h3 className="font-bold text-white mb-4 text-lg">Berminat dengan {firm.title}?</h3>
                <p className="text-sm text-slate-400 mb-6">Ambil cabaran hari ini dan mula berdagang dengan modal yang lebih besar.</p>
                <a href={firm.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-neon-blue text-black font-bold text-white text-center rounded-xl text-sm font-bold shadow-md hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-colors">
                  Daftar di Web Rasmi
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
