import Link from 'next/link';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default function AcademyList() {
  // Get articles and filter by 'Edukasi' or 'Panduan' or 'Analisis Teknikal'
  const allArticles = getAllData('articles');
  const academy = allArticles.filter(article => 
    article.category === 'Edukasi' || 
    article.category === 'Panduan' || 
    article.category === 'Analisis Teknikal'
  );

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ForexHub Academy</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Tingkatkan kemahiran trading anda dari tahap asas hingga menjadi profesional dengan modul panduan percuma kami.
            </p>
          </div>

          {academy.length === 0 ? (
            <div className="text-center py-12 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-slate-400">
              Tiada artikel edukasi dijumpai.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academy.map((article) => (
                <article key={article.slug} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-shadow group relative">
                  <Link href={`/blog/${article.slug}`}>
                    <div className={`h-48 w-full relative overflow-hidden ${!article.image?.includes('/') ? (article.image || 'bg-white/5') : 'bg-white/5'}`}>
                      {article.image?.includes('/') && (
                        <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-black/40 backdrop-blur-md/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>Oleh {article.author}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center text-neon-blue font-bold text-sm">
                        Mulakan Pembelajaran <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
