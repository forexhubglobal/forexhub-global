import Hero from '@/components/Hero';
import TopBrokers from '@/components/TopBrokers';
import AIFinder from '@/components/AIFinder';
import ToolsPreview from '@/components/ToolsPreview';
import RecentArticles from '@/components/RecentArticles';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <main className="bg-[#09090b] text-slate-100 min-h-screen selection:bg-neon-blue selection:text-black">
        <div className="relative overflow-hidden">
          {/* Cyberpunk Glow Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Hero />
            <TopBrokers />
            <AIFinder />
            <ToolsPreview />
            <RecentArticles />
          </div>
        </div>
      </main>

    </>
  );
}
