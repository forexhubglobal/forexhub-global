import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';
import BlogClient from '@/components/BlogClient';

export const dynamic = 'force-dynamic';

export default function BlogList() {
  const articles = getAllArticles();

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Artikel & Analisis Kewangan</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tingkatkan ilmu trading anda dengan panduan komprehensif, ulasan pasaran, dan tip dari pakar ForexHub Global.
            </p>
          </div>

          {/* Client Component untuk Filter Kategori */}
          <BlogClient initialArticles={articles} />
        </div>
      </main>
    </>
  );
}
