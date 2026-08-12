"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ShieldCheck, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

export default function BrokerFinder({ initialBrokers }: { initialBrokers: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [filterAccount, setFilterAccount] = useState('All');
  const [filterDeposit, setFilterDeposit] = useState('All');
  const [filterIslamic, setFilterIslamic] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter Logic
  const filteredBrokers = useMemo(() => {
    return initialBrokers.filter((broker) => {
      // 1. Search Name
      const matchesSearch = broker.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Platform
      const matchesPlatform = filterPlatform === 'All' || 
        (broker.platforms && broker.platforms.toLowerCase().includes(filterPlatform.toLowerCase()));
      
      // 3. Account Type
      let matchesAccount = true;
      if (filterAccount !== 'All') {
        const accTypeLower = broker.accountTypes?.toLowerCase() || '';
        if (filterAccount === 'Cent/Micro') {
          matchesAccount = accTypeLower.includes('cent') || accTypeLower.includes('micro');
        } else if (filterAccount === 'ECN/Raw') {
          matchesAccount = accTypeLower.includes('ecn') || accTypeLower.includes('raw');
        } else if (filterAccount === 'Standard') {
          matchesAccount = accTypeLower.includes('standard');
        }
      }

      // 4. Deposit
      let matchesDeposit = true;
      if (filterDeposit !== 'All') {
        const depositNum = parseFloat(broker.minDeposit) || 0;
        if (filterDeposit === 'Under $10') matchesDeposit = depositNum <= 10;
        if (filterDeposit === '$10 - $50') matchesDeposit = depositNum > 10 && depositNum <= 50;
        if (filterDeposit === 'Over $50') matchesDeposit = depositNum > 50;
      }

      // 5. Islamic
      let matchesIslamic = true;
      if (filterIslamic !== 'All') {
        const swapLower = broker.swapFree?.toLowerCase() || '';
        if (filterIslamic === 'Yes') {
           matchesIslamic = swapLower.includes('ada') || swapLower.includes('yes');
        }
      }

      return matchesSearch && matchesPlatform && matchesAccount && matchesDeposit && matchesIslamic;
    });
  }, [initialBrokers, searchTerm, filterPlatform, filterAccount, filterDeposit, filterIslamic]);

  return (
    <div className="space-y-8">
      
      {/* Search and Filters Bar */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari broker... (Cth: Exness, XM)" 
              className="w-full bg-[#09090b] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-neon-blue outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full md:w-auto px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${showFilters ? 'bg-neon-blue text-black' : 'bg-[#09090b] text-slate-300 border border-white/10 hover:bg-white/5'}`}
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Tutup Tapisan' : 'Tapisan Lanjutan'}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 animate-fade-in-up">
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Platform</label>
               <select className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-neon-blue" value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
                 <option value="All">Semua Platform</option>
                 <option value="MT4">MetaTrader 4 (MT4)</option>
                 <option value="MT5">MetaTrader 5 (MT5)</option>
                 <option value="cTrader">cTrader</option>
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jenis Akaun</label>
               <select className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-neon-blue" value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)}>
                 <option value="All">Semua Jenis</option>
                 <option value="Cent/Micro">Cent / Micro (Sesuai Beginner)</option>
                 <option value="Standard">Standard</option>
                 <option value="ECN/Raw">ECN / Raw Spread (Zero Spread)</option>
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Deposit Minima</label>
               <select className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-neon-blue" value={filterDeposit} onChange={(e) => setFilterDeposit(e.target.value)}>
                 <option value="All">Semua</option>
                 <option value="Under $10">Bawah $10</option>
                 <option value="$10 - $50">$10 - $50</option>
                 <option value="Over $50">Atas $50</option>
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Akaun Islamic (Swap-Free)</label>
               <select className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-neon-blue" value={filterIslamic} onChange={(e) => setFilterIslamic(e.target.value)}>
                 <option value="All">Semua</option>
                 <option value="Yes">Ya (Wajib Ada)</option>
               </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-slate-400 text-sm font-medium px-2">
        <span>Menjumpai <strong className="text-white text-lg">{filteredBrokers.length}</strong> broker yang sepadan</span>
        <Link href="/compare" className="text-neon-blue hover:underline font-bold flex items-center gap-1">
          Bandingkan Broker <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Broker Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBrokers.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-black/40 border border-white/10 rounded-3xl">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
                <Search className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Tiada Broker Dijumpai</h3>
             <p className="text-slate-400">Cuba ubah tapisan anda untuk melihat lebih banyak hasil.</p>
             <button onClick={() => { setFilterPlatform('All'); setFilterAccount('All'); setFilterDeposit('All'); setFilterIslamic('All'); setSearchTerm(''); }} className="mt-4 px-6 py-2 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors">
               Reset Filter
             </button>
          </div>
        ) : (
          filteredBrokers.map((broker) => (
            <div key={broker.slug} className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] group relative flex flex-col">
              
              {/* Highlight Ribbon */}
              {broker.rating === "5" && (
                 <div className="absolute top-4 right-[-35px] bg-gold-500 text-black text-[10px] font-black uppercase tracking-widest py-1 px-10 rotate-45 z-10 shadow-lg">
                   Top Rated
                 </div>
              )}

              <div className="p-6 md:p-8 flex-1">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Logo */}
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#09090b] border border-white/10 flex items-center justify-center p-2 relative overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                    {broker.logo ? (
                      <img src={broker.logo} alt={broker.title} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl font-black text-slate-500">{broker.title.charAt(0)}</span>
                    )}
                  </div>

                  {/* Info Header */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-1">
                       <h3 className="text-2xl font-black text-white notranslate">{broker.title}</h3>
                       <div className="flex items-center gap-1 bg-gold-500/10 px-2 py-1 rounded-md border border-gold-500/20">
                         <span className="text-gold-500 text-xs">⭐</span>
                         <span className="text-gold-400 font-bold text-sm">{broker.rating}/5</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-medium mb-4">
                       <ShieldCheck className="w-3.5 h-3.5 text-success-500" />
                       Dikawal selia: <span className="text-slate-300 truncate max-w-[150px] md:max-w-[200px]" title={broker.regulators}>{broker.regulators}</span>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                       <div className="bg-[#09090b] rounded-xl p-3 border border-white/5">
                         <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Deposit Min</p>
                         <p className="text-white font-bold">${broker.minDeposit}</p>
                       </div>
                       <div className="bg-[#09090b] rounded-xl p-3 border border-white/5">
                         <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Spread (EUR/USD)</p>
                         <p className="text-neon-green font-bold">{broker.spread} pips</p>
                       </div>
                       <div className="bg-[#09090b] rounded-xl p-3 border border-white/5">
                         <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Max Leverage</p>
                         <p className="text-white font-bold">{broker.leverage}</p>
                       </div>
                       <div className="bg-[#09090b] rounded-xl p-3 border border-white/5">
                         <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Platform</p>
                         <p className="text-slate-300 font-medium text-xs truncate" title={broker.platforms}>{broker.platforms}</p>
                       </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2">
                       {broker.swapFree?.toLowerCase().includes('ada') && (
                         <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20">
                           <CheckCircle2 className="w-3 h-3" /> Swap-Free (Islamic)
                         </span>
                       )}
                       {broker.accountTypes?.toLowerCase().includes('ecn') && (
                         <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20">
                           <TrendingUp className="w-3 h-3" /> ECN / Raw
                         </span>
                       )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-white/5 bg-[#09090b]/50 flex gap-3">
                 <Link href={`/broker/${broker.slug}`} className="flex-1 py-3 text-center rounded-xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                   Baca Review
                 </Link>
                 {broker.affiliateLink ? (
                   <TrackedLink href={broker.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-center rounded-xl font-bold text-black bg-neon-blue hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                     Daftar Sekarang
                   </TrackedLink>
                 ) : (
                   <div className="flex-1 py-3 text-center rounded-xl font-bold text-slate-500 bg-black border border-white/5 cursor-not-allowed">
                     Tiada Link
                   </div>
                 )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
