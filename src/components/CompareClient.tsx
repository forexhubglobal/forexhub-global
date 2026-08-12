"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CompareClient({ brokers }: { brokers: any[] }) {
  const [brokerA, setBrokerA] = useState(brokers[0]?.slug || '');
  const [brokerB, setBrokerB] = useState(brokers[1]?.slug || '');
  const [brokerC, setBrokerC] = useState(''); // Optional 3rd broker

  const dataA = brokers.find(b => b.slug === brokerA);
  const dataB = brokers.find(b => b.slug === brokerB);
  const dataC = brokers.find(b => b.slug === brokerC);

  // Helper function to highlight the best value
  const getBestValueClass = (valA: any, valB: any, valC: any, metric: 'min' | 'max' | 'spread') => {
    let numA = parseFloat(valA) || 0;
    let numB = parseFloat(valB) || 0;
    let numC = dataC ? (parseFloat(valC) || 0) : null;

    let isBestA = false;
    let isBestB = false;
    let isBestC = false;

    if (metric === 'min' || metric === 'spread') {
      // Lower is better
      const minVal = Math.min(numA, numB, numC !== null ? numC : Infinity);
      isBestA = numA === minVal;
      isBestB = numB === minVal;
      if (numC !== null) isBestC = numC === minVal;
    } else if (metric === 'max') {
      // Higher is better (e.g. rating, leverage)
      // Note: Leverage can be "UNLIMITED", which is technically the max
      if (valA?.toString().toLowerCase().includes('unlimited')) numA = 999999;
      if (valB?.toString().toLowerCase().includes('unlimited')) numB = 999999;
      if (valC?.toString().toLowerCase().includes('unlimited')) numC = 999999;

      const maxVal = Math.max(numA, numB, numC !== null ? numC : -Infinity);
      isBestA = numA === maxVal;
      isBestB = numB === maxVal;
      if (numC !== null) isBestC = numC === maxVal;
    }

    return {
      A: isBestA ? 'text-success-400 font-black drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'text-slate-300',
      B: isBestB ? 'text-success-400 font-black drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'text-slate-300',
      C: isBestC ? 'text-success-400 font-black drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'text-slate-300',
    };
  };

  const depositClasses = getBestValueClass(dataA?.minDeposit, dataB?.minDeposit, dataC?.minDeposit, 'min');
  const leverageClasses = getBestValueClass(dataA?.leverage, dataB?.leverage, dataC?.leverage, 'max');
  const spreadClasses = getBestValueClass(dataA?.spread, dataB?.spread, dataC?.spread, 'spread');
  const ratingClasses = getBestValueClass(dataA?.rating, dataB?.rating, dataC?.rating, 'max');

  return (
    <div className="mb-20">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden group">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-neon-purple/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none group-hover:bg-neon-blue/20 transition-all duration-700"></div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            
            {/* Broker A Selector */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-white/10 relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Broker 1</label>
              <select 
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue font-bold text-white transition-all outline-none"
                value={brokerA}
                onChange={(e) => setBrokerA(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate bg-black text-white">{b.title}</option>)}
              </select>
            </div>
            
            {/* Broker B Selector */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-white/10 relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Broker 2</label>
              <select 
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-purple focus:border-neon-purple font-bold text-white transition-all outline-none"
                value={brokerB}
                onChange={(e) => setBrokerB(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate bg-black text-white">{b.title}</option>)}
              </select>
              <div className="absolute top-1/2 -left-6 md:-left-4 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-black flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(188,19,254,0.5)] rotate-12 hidden md:flex">
                VS
              </div>
            </div>

            {/* Broker C Selector (Optional) */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-white/10 relative border-dashed">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Broker 3 (Pilihan)</label>
              <select 
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-success-500 focus:border-success-500 font-bold text-white transition-all outline-none"
                value={brokerC}
                onChange={(e) => setBrokerC(e.target.value)}
              >
                <option value="">-- Tiada --</option>
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate bg-black text-white">{b.title}</option>)}
              </select>
              <div className="absolute top-1/2 -left-6 md:-left-4 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-success-500 text-black flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(34,197,94,0.5)] rotate-12 hidden md:flex">
                VS
              </div>
            </div>

          </div>

          {(dataA || dataB || dataC) && (
            <div className="bg-black/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-4 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-xs w-[25%] sticky left-0 bg-black/80 backdrop-blur-md z-20">Kriteria Perbandingan</th>
                      
                      {/* Column A */}
                      {dataA && (
                        <th className={`p-6 border-b border-white/10 border-l border-white/5 text-center ${dataC ? 'w-[25%]' : 'w-[37.5%]'}`}>
                          <div className="w-20 h-20 rounded-2xl bg-[#09090b] border border-white/10 mx-auto flex items-center justify-center text-slate-300 font-bold mb-3 shadow-inner overflow-hidden">
                            {dataA.logo ? <img src={dataA.logo} alt={dataA.title} className="w-full h-full object-contain p-2" /> : <span>{dataA.title.charAt(0)}</span>}
                          </div>
                          <div className="text-xl font-black text-white notranslate">{dataA.title}</div>
                        </th>
                      )}

                      {/* Column B */}
                      {dataB && (
                        <th className={`p-6 border-b border-white/10 border-l border-white/5 text-center ${dataC ? 'w-[25%]' : 'w-[37.5%]'}`}>
                          <div className="w-20 h-20 rounded-2xl bg-[#09090b] border border-white/10 mx-auto flex items-center justify-center text-slate-300 font-bold mb-3 shadow-inner overflow-hidden">
                            {dataB.logo ? <img src={dataB.logo} alt={dataB.title} className="w-full h-full object-contain p-2" /> : <span>{dataB.title.charAt(0)}</span>}
                          </div>
                          <div className="text-xl font-black text-white notranslate">{dataB.title}</div>
                        </th>
                      )}

                      {/* Column C */}
                      {dataC && (
                        <th className="p-6 border-b border-white/10 border-l border-white/5 text-center w-[25%]">
                          <div className="w-20 h-20 rounded-2xl bg-[#09090b] border border-white/10 mx-auto flex items-center justify-center text-slate-300 font-bold mb-3 shadow-inner overflow-hidden">
                            {dataC.logo ? <img src={dataC.logo} alt={dataC.title} className="w-full h-full object-contain p-2" /> : <span>{dataC.title.charAt(0)}</span>}
                          </div>
                          <div className="text-xl font-black text-white notranslate">{dataC.title}</div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Rating Global</td>
                      {dataA && <td className={`p-5 text-center border-l border-white/5 text-lg ${ratingClasses.A}`}>⭐ {dataA.rating}/5.0</td>}
                      {dataB && <td className={`p-5 text-center border-l border-white/5 text-lg ${ratingClasses.B}`}>⭐ {dataB.rating}/5.0</td>}
                      {dataC && <td className={`p-5 text-center border-l border-white/5 text-lg ${ratingClasses.C}`}>⭐ {dataC.rating}/5.0</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Deposit Minima</td>
                      {dataA && <td className={`p-5 text-center border-l border-white/5 text-xl ${depositClasses.A}`}>${dataA.minDeposit}</td>}
                      {dataB && <td className={`p-5 text-center border-l border-white/5 text-xl ${depositClasses.B}`}>${dataB.minDeposit}</td>}
                      {dataC && <td className={`p-5 text-center border-l border-white/5 text-xl ${depositClasses.C}`}>${dataC.minDeposit}</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Max Leverage</td>
                      {dataA && <td className={`p-5 text-center border-l border-white/5 ${leverageClasses.A}`}>1:{dataA.leverage}</td>}
                      {dataB && <td className={`p-5 text-center border-l border-white/5 ${leverageClasses.B}`}>1:{dataB.leverage}</td>}
                      {dataC && <td className={`p-5 text-center border-l border-white/5 ${leverageClasses.C}`}>1:{dataC.leverage}</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Spread (EUR/USD)</td>
                      {dataA && <td className={`p-5 text-center border-l border-white/5 ${spreadClasses.A}`}>{dataA.spread} pips</td>}
                      {dataB && <td className={`p-5 text-center border-l border-white/5 ${spreadClasses.B}`}>{dataB.spread} pips</td>}
                      {dataC && <td className={`p-5 text-center border-l border-white/5 ${spreadClasses.C}`}>{dataC.spread} pips</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Badan Kawal Selia</td>
                      {dataA && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataA.regulators}</td>}
                      {dataB && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataB.regulators}</td>}
                      {dataC && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataC.regulators}</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Platform Trading</td>
                      {dataA && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataA.platforms}</td>}
                      {dataB && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataB.platforms}</td>}
                      {dataC && <td className="p-5 text-center text-sm font-medium text-slate-300 border-l border-white/5">{dataC.platforms}</td>}
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-slate-400 sticky left-0 bg-black/80 backdrop-blur-md z-10 text-sm">Akaun Islamic (Swap-Free)</td>
                      {dataA && <td className="p-5 text-center text-sm font-medium border-l border-white/5 text-slate-300">{dataA.swapFree}</td>}
                      {dataB && <td className="p-5 text-center text-sm font-medium border-l border-white/5 text-slate-300">{dataB.swapFree}</td>}
                      {dataC && <td className="p-5 text-center text-sm font-medium border-l border-white/5 text-slate-300">{dataC.swapFree}</td>}
                    </tr>

                    {/* ACTION BUTTONS */}
                    <tr>
                      <td className="p-5 sticky left-0 bg-black/80 backdrop-blur-md z-10"></td>
                      {dataA && (
                        <td className="p-5 border-l border-white/5">
                           {dataA.affiliateLink ? (
                             <a href={dataA.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-neon-blue text-black font-bold text-center rounded-xl hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                               Daftar {dataA.title}
                             </a>
                           ) : (
                             <div className="w-full py-4 bg-white/5 text-slate-500 font-bold text-center rounded-xl">Tiada Link</div>
                           )}
                           <Link href={`/broker/${dataA.slug}`} className="block w-full py-2 mt-2 text-center text-sm text-slate-400 hover:text-white transition-colors">Baca Review</Link>
                        </td>
                      )}
                      {dataB && (
                        <td className="p-5 border-l border-white/5">
                           {dataB.affiliateLink ? (
                             <a href={dataB.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-neon-purple text-white font-bold text-center rounded-xl hover:bg-neon-purple/80 hover:shadow-[0_0_15px_rgba(188,19,254,0.5)] transition-all">
                               Daftar {dataB.title}
                             </a>
                           ) : (
                             <div className="w-full py-4 bg-white/5 text-slate-500 font-bold text-center rounded-xl">Tiada Link</div>
                           )}
                           <Link href={`/broker/${dataB.slug}`} className="block w-full py-2 mt-2 text-center text-sm text-slate-400 hover:text-white transition-colors">Baca Review</Link>
                        </td>
                      )}
                      {dataC && (
                        <td className="p-5 border-l border-white/5">
                           {dataC.affiliateLink ? (
                             <a href={dataC.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-success-500 text-black font-bold text-center rounded-xl hover:bg-success-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all">
                               Daftar {dataC.title}
                             </a>
                           ) : (
                             <div className="w-full py-4 bg-white/5 text-slate-500 font-bold text-center rounded-xl">Tiada Link</div>
                           )}
                           <Link href={`/broker/${dataC.slug}`} className="block w-full py-2 mt-2 text-center text-sm text-slate-400 hover:text-white transition-colors">Baca Review</Link>
                        </td>
                      )}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
