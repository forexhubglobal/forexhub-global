import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export default function RecentArticles() {
  // Hanya ambil 3 artikel terkini
  const articles = getAllArticles().slice(0, 3);

  return (
    <section className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4 drop-shadow-md">
              Artikel & Analisis Kewangan
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Tingkatkan ilmu trading anda dengan panduan komprehensif dan ulasan pasaran dari pakar.
            </p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-neon-blue font-bold hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            Lihat Semua Artikel
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all duration-300 group flex flex-col transform hover:-translate-y-2">
              <Link href={`/blog/${article.slug}`} className="flex-grow flex flex-col">
                <div className={`h-48 w-full relative overflow-hidden flex-shrink-0 ${!article.image.includes('/') ? article.image : 'bg-black'}`}>
                  {article.image.includes('/') && (
                    <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-black/60 border border-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-neon-blue font-mono mb-3 uppercase tracking-wider">
                    <span>{article.date}</span>
                    <span className="text-slate-400">•</span>
                    <span>Oleh {article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow font-light">
                    {article.excerpt}
                  </p>
                  <div className="text-neon-blue font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto uppercase tracking-wide">
                    Baca Sepenuhnya
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-neon-blue font-bold hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            Lihat Semua Artikel
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
