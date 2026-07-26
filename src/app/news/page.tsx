import LiveNewsFeed from '@/components/LiveNewsFeed';

export const metadata = {
  title: 'Berita Kewangan Terkini - ForexHub Global',
  description: 'Berita pasaran kewangan masa nyata, liputan forex, kripto, dan saham global.',
};

export default function NewsList() {
  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Berita Pasaran Kewangan Terkini</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Sistem AI kami menyedut kemas kini terkini secara langsung mengenai pasaran forex, kripto, saham dan dasar ekonomi global dari sumber terkemuka.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 overflow-hidden p-2 sm:p-6 min-h-[850px] relative">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 w-full h-full">
              <LiveNewsFeed />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
