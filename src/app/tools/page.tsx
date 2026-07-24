import Link from 'next/link';
import { getDataBySlug } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function ToolsList() {
  const settings = await getDataBySlug('settings', 'tetapan-utama');
  const sponsorName = settings?.sponsoredBrokerName;
  const sponsorLogo = settings?.sponsoredBrokerLogo;
  const sponsorLink = settings?.sponsoredBrokerLink;
  const tools = [
    { name: 'Kalkulator Pip', slug: 'pip-calculator', desc: 'Kira nilai satu pip untuk mana-mana pasangan matawang.', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { name: 'Kalkulator Lot Size', slug: 'lot-size-calculator', desc: 'Kira saiz lot yang tepat berdasarkan peratusan risiko anda.', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { name: 'Kalkulator Margin', slug: 'margin-calculator', desc: 'Kira margin yang diperlukan untuk membuka posisi baru.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Kalkulator Untung/Rugi', slug: 'profit-calculator', desc: 'Anggarkan potensi keuntungan atau kerugian untuk posisi anda.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ];

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Trading Tools Percuma</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Kalkulator penting untuk membantu anda menguruskan risiko dan merancang entry dengan lebih tepat.
            </p>
            {sponsorName && (
              <a href={sponsorLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md/5 border border-white/20 px-5 py-2.5 rounded-full shadow-sm hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:border-neon-blue/50 transition-all mt-6 backdrop-blur-md">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dibawakan Khas Oleh</span>
                {sponsorLogo ? (
                  <img src={sponsorLogo} alt={sponsorName} className="h-6 object-contain drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]" />
                ) : (
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-lg drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">{sponsorName}</span>
                )}
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-neon-blue/50 hover:shadow-[0_0_25px_rgba(0,243,255,0.2)] transition-all group">
                <div className="w-16 h-16 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl flex items-center justify-center text-neon-blue mb-6 group-hover:scale-110 group-hover:bg-neon-blue group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tool.icon}></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-colors">{tool.name}</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {tool.desc}
                </p>
                <div className="text-neon-blue font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 group-hover:text-neon-purple transition-all">
                  Guna Sekarang
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
