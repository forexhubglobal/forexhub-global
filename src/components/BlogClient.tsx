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
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === category 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <article key={article.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group relative flex flex-col">
              <Link href={`/blog/${article.slug}`} className="flex-grow flex flex-col">
                <div className={`h-48 w-full relative overflow-hidden flex-shrink-0 ${!article.image?.includes('/') ? (article.image || 'bg-slate-100') : 'bg-slate-100'}`}>
                  {article.image?.includes('/') && (
                    <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>Oleh {article.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-primary-600 font-bold text-sm">
                    Baca Sepenuhnya <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            Tiada artikel dijumpai untuk kategori ini.
          </div>
        )}
      </div>
    </>
  );
}
