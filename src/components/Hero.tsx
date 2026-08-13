import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28 md:pt-36 pb-20 sm:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Premium Minimalist Background */}
      <div className="absolute inset-0 z-[-2] bg-[#09090b]"></div>
      
      {/* Subtle modern mesh gradient overlay (no grids, no loud neon) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-800/20 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Elegant Minimalist Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Forex Global #1 Broker</span>
        </div>

        {/* Premium Typography - Clean, solid colors, NO gradients, NO glow. Add pointer-events-none to block Google Translate hover */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight mb-8 leading-[1.05] pointer-events-none">
          Cari Broker Forex <br className="hidden md:block" />
          <span className="text-slate-300">Sesuai Untuk Anda</span>
        </h1>
        
        {/* Description - clean readability. Add pointer-events-none */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light pointer-events-none">
          Bandingkan spread, regulasi, bonus, platform dan ciri broker sebelum membuka akaun secara telus dan pantas.
        </p>

        {/* Clean Buttons - No neon, no pulsing, pure utility and elegance */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/compare" className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-slate-200 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2">
            Bandingkan Broker
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <Link href="#omni-terminal" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white hover:bg-white/10 border border-white/10 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2">
            Claim Indicator
          </Link>
        </div>

        {/* Minimalist Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-12 relative">
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">50+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Broker Dinilai</div>
          </div>
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">10k+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Review Pengguna</div>
          </div>
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">100%</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Data Telus</div>
          </div>
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">24/7</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Update Pasaran</div>
          </div>
        </div>
      </div>
    </section>
  );
}
