import Link from 'next/link';
import Globe from './Globe';

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 pb-24 sm:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#030303]">
      
      {/* GOD-TIER AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep space void */}
        <div className="absolute inset-0 bg-[#030303]"></div>
        
        {/* Rotating Digital Earth (WebGL) */}
        <Globe />

        {/* Majestic Aurora Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] animate-[pulse_8s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-gradient-to-tl from-cyan-600/20 via-blue-600/10 to-transparent blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate-reverse]"></div>
        
        {/* Subtle Starlight / Dust overlay (using css radial gradients for a premium feel without cliché grids) */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* Premium Glass Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative group overflow-hidden">
          {/* Edge light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
          
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300 tracking-[0.2em] uppercase relative z-10">Forex Global #1 Broker</span>
        </div>

        {/* Majestic Typography - Kept pointer-events-none for Translate fix */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 tracking-tight mb-8 leading-[1.05] pointer-events-none drop-shadow-2xl">
          Cari Broker Forex <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl rounded-full"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              Sesuai Untuk Anda
            </span>
          </span>
        </h1>
        
        {/* Sophisticated Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light pointer-events-none">
          Bandingkan spread, regulasi, bonus, platform dan ciri broker sebelum membuka akaun secara <strong className="font-medium text-slate-200">telus dan pantas.</strong>
        </p>

        {/* High-End Interactive Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full sm:w-auto">
          {/* Primary Button - Liquid Metal / Glass hybrid */}
          <Link href="/compare" className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 overflow-hidden">
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-opacity group-hover:opacity-90"></div>
            {/* Inner Glow / Bevel */}
            <div className="absolute inset-0 rounded-xl border border-white/20 mix-blend-overlay"></div>
            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            
            <span className="relative text-white drop-shadow-md">Bandingkan Broker</span>
            <svg className="w-4 h-4 relative text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>

          {/* Secondary Button - Deep Frosted Glass */}
          <Link href="#omni-terminal" className="group w-full sm:w-auto px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.2] rounded-xl font-semibold text-slate-200 text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
            </svg>
            Claim Indicator
          </Link>
        </div>

        {/* Premium Glass Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl relative">
          {/* Subtle top divider line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="pt-8 flex flex-col items-center justify-center pointer-events-none group">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight drop-shadow-sm">50+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-3 font-semibold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Broker Dinilai</div>
          </div>
          <div className="pt-8 flex flex-col items-center justify-center pointer-events-none group">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight drop-shadow-sm">10k+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-3 font-semibold uppercase tracking-widest group-hover:text-blue-400 transition-colors">Review Pengguna</div>
          </div>
          <div className="pt-8 flex flex-col items-center justify-center pointer-events-none group">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight drop-shadow-sm">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-3 font-semibold uppercase tracking-widest group-hover:text-purple-400 transition-colors">Data Telus</div>
          </div>
          <div className="pt-8 flex flex-col items-center justify-center pointer-events-none group">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight drop-shadow-sm">24/7</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-3 font-semibold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Update Pasaran</div>
          </div>
        </div>
      </div>
    </section>
  );
}
