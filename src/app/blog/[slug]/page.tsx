import { notFound } from 'next/navigation';
import { getArticleData } from '@/lib/markdown';
import { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleData(slug);
  
  if (!article) return { title: 'Artikel Tidak Dijumpai' };

  return {
    title: `${article.title} | ForexHub Global`,
    description: article.excerpt || `Baca artikel penuh mengenai ${article.title} di ForexHub Global.`,
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      images: article.image ? [{ url: article.image, width: 1200, height: 630 }] : [],
    }
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  // Schema.org JSON-LD for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'image': article.image ? [article.image] : [],
    'datePublished': article.date,
    'dateModified': article.date,
    'author': [{
      '@type': 'Person',
      'name': article.author || 'ForexHub Team'
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-slate-50 min-h-screen pb-16">
        
        {/* Article Header */}
        <div className={`w-full h-[400px] md:h-[500px] relative flex items-end justify-center pb-16 ${(!article.image || !article.image.includes('/')) ? (article.image || 'bg-slate-800') : 'bg-slate-900'}`}>
          
          {article.image && article.image.includes('/') && (
            <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full mt-24">
            <div className="mb-6">
              <span className="bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
                  {article.author.charAt(0)}
                </div>
                <span>{article.author}</span>
              </div>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <article className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <p className="lead text-xl text-slate-600 font-medium mb-8">
              {article.excerpt}
            </p>
            
            <AdBanner slot="article" />
            
            {/* Markdown Content */}
            <div 
              className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-primary-600 hover:prose-a:text-primary-700"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
            
            {/* Share / Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Forex</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Broker</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-500">Kongsi Artikel:</span>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-600 hover:text-white transition-colors">F</button>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-600 hover:text-white transition-colors">T</button>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-600 hover:text-white transition-colors">W</button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
