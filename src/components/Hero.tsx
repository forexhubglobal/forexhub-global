import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-24 md:pb-32 overflow-hidden px-2 sm:px-0">
      {/* Background decoration (Dark) */}
      <div className="absolute inset-0 z-[-2] bg-[#09090b]/80"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-20" style={{ backgroundImage: 'linear-gradient(#bc13fe 1px, transparent 1px), linear-gradient(90deg, #bc13fe 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl shadow-[0_0_20px_rgba(0,243,255,0.4)] border border-neon-blue/50 mb-8 animate-float cursor-default hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] hover:border-neon-purple/50 transition-all duration-500">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-blue shadow-[0_0_8px_rgba(0,243,255,1)]"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-neon-blue tracking-[0.2em] uppercase">Forex Global #1 Broker</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] relative">
          {/* Mind-blowing aura behind text */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-gradient-to-r from-neon-blue/30 via-neon-purple/30 to-neon-pink/30 blur-[80px] pointer-events-none rounded-full animate-pulse"></span>
          
          <span className="relative drop-shadow-2xl">Cari Broker Forex Yang <br className="hidden md:block" /></span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-gradient drop-shadow-[0_0_15px_rgba(188,19,254,0.8)] pb-2 inline-block">
            Sesuai Untuk Anda
          </span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light px-2 sm:px-0">
          Bandingkan spread, regulation, bonus, cashback, platform dan ciri broker sebelum membuka akaun secara <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">telus dan pantas.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-2 sm:px-0 relative z-20">
          <Link href="/compare" className="group w-full sm:w-auto px-8 py-4 bg-black/50 backdrop-blur-md border-2 border-neon-blue text-neon-blue rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)] hover:bg-neon-blue hover:text-black flex items-center justify-center gap-3 uppercase tracking-wider overflow-hidden relative">
            <span className="absolute inset-0 w-full h-full -ml-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45 transition-all duration-500 group-hover:ml-full"></span>
            <span className="relative z-10">Compare Broker</span>
            <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <Link href="#omni-terminal" className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white border-0 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(188,19,254,0.6)] hover:shadow-[0_0_50px_rgba(255,0,127,0.9)] hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-wider relative overflow-hidden">
            <span className="absolute inset-0 w-full h-full -ml-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-45 transition-all duration-500 group-hover:ml-full"></span>
            <svg className="w-6 h-6 text-white animate-pulse relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
            </svg>
            <span className="relative z-10 drop-shadow-md">Claim Indicator</span>
          </Link>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto border-t border-white/10 pt-8 sm:pt-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
          
          <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/5">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">50+</div>
            <div className="text-[10px] sm:text-sm font-medium text-neon-blue mt-1 sm:mt-2 uppercase tracking-widest">Broker Dinilai</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/5">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">10k+</div>
            <div className="text-[10px] sm:text-sm font-medium text-neon-purple mt-1 sm:mt-2 uppercase tracking-widest">Review Pengguna</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/5">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">100%</div>
            <div className="text-[10px] sm:text-sm font-medium text-neon-green mt-1 sm:mt-2 uppercase tracking-widest">Data Telus</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/5">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">24/7</div>
            <div className="text-[10px] sm:text-sm font-medium text-neon-pink mt-1 sm:mt-2 uppercase tracking-widest">Update Pasaran</div>
          </div>
        </div>
      </div>
    </section>
  );
}
