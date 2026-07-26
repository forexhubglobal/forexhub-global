"use client";

import { useState } from 'react';

export default function CompareClient({ brokers }: { brokers: any[] }) {
  const [brokerA, setBrokerA] = useState(brokers[0]?.slug || '');
  const [brokerB, setBrokerB] = useState(brokers[1]?.slug || '');

  const dataA = brokers.find(b => b.slug === brokerA);
  const dataB = brokers.find(b => b.slug === brokerB);

  return (
    <div className="mb-20">
      <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-neon-purple/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none group-hover:bg-neon-blue/20 transition-all duration-700"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Perbandingan "Head-to-Head"</span>
            <svg className="w-8 h-8 text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.8)] rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-12">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Pilih Broker Pertama</label>
              <select 
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue font-bold text-white shadow-sm transition-all outline-none"
                value={brokerA}
                onChange={(e) => setBrokerA(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate bg-black text-white">{b.title}</option>)}
              </select>
            </div>
            
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(188,19,254,0.5)] rotate-12">
                VS
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Pilih Broker Kedua</label>
              <select 
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-neon-purple focus:border-neon-purple font-bold text-white shadow-sm transition-all outline-none"
                value={brokerB}
                onChange={(e) => setBrokerB(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate bg-black text-white">{b.title}</option>)}
              </select>
            </div>
          </div>

          {dataA && dataB && (
            <div className="bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-lg backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 backdrop-blur-md/5">
                    <th className="p-4 border-b border-white/10 text-slate-300 font-medium">Ciri-ciri</th>
                    <th className="p-6 border-b border-white/10 border-l border-white/10 text-center w-[40%]">
                      <div className="w-16 h-16 rounded-xl bg-black/40 backdrop-blur-md/5 border border-white/20 mx-auto flex items-center justify-center text-slate-300 font-bold mb-3 shadow-sm overflow-hidden relative backdrop-blur-md">
                        {dataA.logo ? <img src={dataA.logo} alt={dataA.title} className="w-full h-full object-contain p-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]" /> : <span>{dataA.title.charAt(0)}</span>}
                      </div>
                      <div className="text-xl font-bold text-white notranslate drop-shadow-md">{dataA.title}</div>
                    </th>
                    <th className="p-6 border-b border-white/10 border-l border-white/10 text-center w-[40%]">
                      <div className="w-16 h-16 rounded-xl bg-black/40 backdrop-blur-md/5 border border-white/20 mx-auto flex items-center justify-center text-slate-300 font-bold mb-3 shadow-sm overflow-hidden relative backdrop-blur-md">
                        {dataB.logo ? <img src={dataB.logo} alt={dataB.title} className="w-full h-full object-contain p-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]" /> : <span>{dataB.title.charAt(0)}</span>}
                      </div>
                      <div className="text-xl font-bold text-white notranslate drop-shadow-md">{dataB.title}</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-black/40 backdrop-blur-md/5 transition-colors">
                    <td className="p-4 font-semibold text-slate-300">Rating Global</td>
                    <td className="p-4 text-center font-bold text-gold-400 border-l border-white/10 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">{dataA.rating}/5.0</td>
                    <td className="p-4 text-center font-bold text-gold-400 border-l border-white/10 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">{dataB.rating}/5.0</td>
                  </tr>
                  <tr className="hover:bg-black/40 backdrop-blur-md/5 transition-colors">
                    <td className="p-4 font-semibold text-slate-300">Deposit Minimum</td>
                    <td className="p-4 text-center font-bold text-white border-l border-white/10">${dataA.minDeposit}</td>
                    <td className="p-4 text-center font-bold text-white border-l border-white/10">${dataB.minDeposit}</td>
                  </tr>
                  <tr className="hover:bg-black/40 backdrop-blur-md/5 transition-colors">
                    <td className="p-4 font-semibold text-slate-300">Max Leverage</td>
                    <td className="p-4 text-center font-medium text-white border-l border-white/10">{dataA.leverage}</td>
                    <td className="p-4 text-center font-medium text-white border-l border-white/10">{dataB.leverage}</td>
                  </tr>
                  <tr className="hover:bg-black/40 backdrop-blur-md/5 transition-colors">
                    <td className="p-4 font-semibold text-slate-300">Spread EUR/USD</td>
                    <td className="p-4 text-center font-bold text-neon-green border-l border-white/10">{dataA.spread} pips</td>
                    <td className="p-4 text-center font-bold text-neon-green border-l border-white/10">{dataB.spread} pips</td>
                  </tr>
                  <tr className="hover:bg-black/40 backdrop-blur-md/5 transition-colors">
                    <td className="p-4 font-semibold text-slate-300">Regulators</td>
                    <td className="p-4 text-center text-sm font-medium text-slate-300 border-l border-white/10">{dataA.regulators}</td>
                    <td className="p-4 text-center text-sm font-medium text-slate-300 border-l border-white/10">{dataB.regulators}</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-6 bg-black/40 backdrop-blur-md/5 border-t border-white/10 grid grid-cols-2 gap-4">
                <a href={`/broker/${dataA.slug}`} className="block text-center py-3 px-4 bg-black/40 backdrop-blur-md/10 text-white font-bold rounded-xl border border-white/20 hover:bg-neon-blue/20 hover:border-neon-blue/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all">Baca Review {dataA.title}</a>
                <a href={`/broker/${dataB.slug}`} className="block text-center py-3 px-4 bg-black/40 backdrop-blur-md/10 text-white font-bold rounded-xl border border-white/20 hover:bg-neon-purple/20 hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] transition-all">Baca Review {dataB.title}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
