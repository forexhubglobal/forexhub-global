import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataBySlug } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function PammDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pamm = await getDataBySlug('pamm', slug);

  if (!pamm) {
    notFound();
  }

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/pamm" className="hover:text-primary-600">PAMM</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{pamm.title}</span>
          </div>

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 opacity-50 rounded-bl-full"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex flex-shrink-0 items-center justify-center text-slate-700 font-bold text-3xl shadow-sm overflow-hidden relative">
                {pamm.logo ? (
                  <img src={pamm.logo} alt={pamm.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{pamm.title.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{pamm.title}</h1>
                <p className="text-slate-500 font-medium text-lg mb-4">Diuruskan oleh: <span className="text-slate-800">{pamm.manager}</span></p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-bold border border-primary-100">
                    Pulangan: {pamm.monthlyReturn} Sebulan
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${pamm.riskLevel === 'Low' ? 'bg-success-50 text-success-700 border-success-100' : pamm.riskLevel === 'High' ? 'bg-danger-50 text-danger-700 border-danger-100' : 'bg-gold-50 text-gold-700 border-gold-100'}`}>
                    Risiko: {pamm.riskLevel}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <a href={pamm.pammLink || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Copy Sekarang
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Maklumat Asas */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Maklumat Strategi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Strategi</span>
                    <span className="font-semibold text-slate-900">{pamm.strategy}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Deposit Min</span>
                    <span className="font-semibold text-slate-900">${pamm.minInvest}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Tahap Risiko</span>
                    <span className="font-semibold text-slate-900">{pamm.riskLevel}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Anggaran Pulangan</span>
                    <span className="font-semibold text-slate-900">{pamm.monthlyReturn}</span>
                  </div>
                </div>
              </section>

              {/* Dynamic Content Markdown */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-primary-600 hover:prose-a:text-primary-700" 
                     dangerouslySetInnerHTML={{ __html: pamm.contentHtml }} 
                />
              </section>

            </div>

            {/* Sidebar Sticky */}
            <div className="md:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Amaran Risiko PAMM</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Prestasi masa lalu (past performance) bukanlah jaminan untuk keuntungan masa hadapan. Sila buat kajian anda sendiri (DYOR) sebelum melaburkan wang ke dalam mana-mana akaun PAMM atau Copytrade.
                </p>
                <div className="space-y-3">
                  <a href={pamm.pammLink || '#'} target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-primary-600 text-white text-center rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors shadow-md">
                    Buka Akaun Copytrade
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
