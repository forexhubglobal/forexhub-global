'use client';

import { useState } from 'react';
import Link from 'next/link';

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  date: string;
  author: string;
};

export default function BlogClient({ initialArticles }: { initialArticles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Review', 'Panduan', 'Edukasi', 'Analisis Teknikal', 'Berita'];

  const filteredArticles = activeCategory === 'Semua' 
    ? initialArticles 
    : initialArticles.filter(article => article.category === activeCategory);

  return (
    <>
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === category 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-black shadow-[0_0_15px_rgba(0,243,255,0.5)] border-transparent' 
                : 'bg-black/40 backdrop-blur-md border border-white/20 text-slate-300 hover:bg-black/40 backdrop-blur-md/10 hover:text-white hover:border-neon-blue/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <article key={article.slug} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:shadow-[0_0_20px_rgba(188,19,254,0.2)] hover:border-neon-purple/50 transition-all group relative flex flex-col">
              <Link href={`/blog/${article.slug}`} className="flex-grow flex flex-col">
                <div className={`h-48 w-full relative overflow-hidden flex-shrink-0 ${!article.image?.includes('/') ? (article.image || 'bg-black') : 'bg-black'}`}>
                  {article.image?.includes('/') && (
                    <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="absolute -top-10 right-4 w-12 h-12 bg-neon-purple/20 rounded-full blur-[20px] pointer-events-none group-hover:bg-neon-blue/30 transition-all"></div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3 relative z-10">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>Oleh {article.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all line-clamp-2 relative z-10">
                    {article.title}
                  </h2>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3 flex-grow relative z-10">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-neon-purple font-bold text-sm relative z-10 group-hover:text-neon-blue transition-colors">
                    Baca Sepenuhnya <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400 bg-black/40 backdrop-blur-md/5 rounded-2xl border border-white/10 border-dashed">
            Tiada artikel dijumpai untuk kategori ini.
          </div>
        )}
      </div>
    </>
  );
}
