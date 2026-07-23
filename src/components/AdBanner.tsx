import { getDataBySlug } from '@/lib/markdown';

export default async function AdBanner({ slot }: { slot: 'hero' | 'article' | 'mobile' }) {
  const settings = await getDataBySlug('settings', 'main');
  
  if (!settings) return null;

  let imageUrl = '';
  let linkUrl = '';

  if (slot === 'hero') {
    imageUrl = settings.heroAdImage;
    linkUrl = settings.heroAdLink;
  } else if (slot === 'article') {
    imageUrl = settings.articleAdImage;
    linkUrl = settings.articleAdLink;
  } else if (slot === 'mobile') {
    imageUrl = settings.mobileAdImage;
    linkUrl = settings.mobileAdLink;
  }

  if (!imageUrl) return null;

  if (slot === 'mobile') {
    return (
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 p-2 animate-in slide-in-from-bottom duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto relative">
          <div className="absolute -top-6 right-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-t-md">Iklan</div>
          <a href={linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-16 rounded-lg overflow-hidden shadow-md bg-slate-900 flex items-center justify-center">
            <img src={imageUrl} alt="Advertisement" className="w-full h-full object-cover" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative z-20 ${slot === 'hero' ? 'max-w-7xl mx-auto px-4 mt-6 mb-2' : 'my-8'}`}>
      <div className="absolute -top-5 right-4 text-xs bg-slate-800/80 text-slate-300 px-3 py-1 rounded-t-lg backdrop-blur-sm border border-b-0 border-white/10">Iklan Tajaan</div>
      <a href={linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] relative bg-slate-900 flex items-center justify-center min-h-[100px]">
        <img src={imageUrl} alt="Advertisement" className="w-full object-cover md:max-h-[250px] max-h-[150px] aspect-[4/1] md:aspect-[8/1]" />
      </a>
    </div>
  );
}
