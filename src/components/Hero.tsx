import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background decoration (Dark) */}
      <div className="absolute inset-0 z-[-2] bg-[#09090b]/80"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-20" style={{ backgroundImage: 'linear-gradient(#bc13fe 1px, transparent 1px), linear-gradient(90deg, #bc13fe 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.3)] border border-neon-blue/30 mb-8 animate-float">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
          </span>
          <span className="text-sm font-medium text-neon-blue tracking-wider uppercase">Forex Global #1 Broker</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-lg">
          Cari Broker Forex Yang <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-glow drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">Sesuai Untuk Anda</span>
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          Bandingkan spread, regulation, bonus, cashback, platform dan ciri broker sebelum membuka akaun secara <span className="font-semibold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">telus dan pantas.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link href="/compare" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-wide">
            Compare Broker
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <Link href="#omni-terminal" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white border-0 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(188,19,254,0.5)] hover:shadow-[0_0_40px_rgba(188,19,254,0.8)] transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-wide">
            <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
            </svg>
            Claim Free Indicator
          </Link>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
          
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">50+</div>
            <div className="text-sm font-medium text-neon-blue mt-2 uppercase tracking-widest">Broker Dinilai</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">10k+</div>
            <div className="text-sm font-medium text-neon-purple mt-2 uppercase tracking-widest">Review Pengguna</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">100%</div>
            <div className="text-sm font-medium text-neon-green mt-2 uppercase tracking-widest">Data Telus</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">24/7</div>
            <div className="text-sm font-medium text-neon-pink mt-2 uppercase tracking-widest">Update Pasaran</div>
          </div>
        </div>
      </div>
    </section>
  );
}
