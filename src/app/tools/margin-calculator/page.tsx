"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MarginCalculator() {
  const [accountBalance, setAccountBalance] = useState('1000');
  const [leverage, setLeverage] = useState('100');
  const [lotSize, setLotSize] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const calculateMargin = (e: React.FormEvent) => {
    e.preventDefault();
    const lots = parseFloat(lotSize);
    const lev = parseFloat(leverage);
    // Simple margin formula for EUR/USD (1 lot = 100k)
    // Margin = (Contract Size * Lots) / Leverage
    const margin = (100000 * lots) / lev;
    setResult(margin);
  };

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-neon-blue">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-neon-blue">Tools</Link>
            <span>/</span>
            <span className="text-white font-medium">Margin Calculator</span>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-neon-blue/10 rounded-2xl flex items-center justify-center text-neon-blue mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Kalkulator Margin</h1>
              <p className="text-slate-400">Kira margin yang diperlukan untuk membuka posisi baru.</p>
            </div>

            <form onSubmit={calculateMargin} className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Baki Akaun (USD)</label>
                <input 
                  type="number" 
                  className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Leverage (1:?)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 font-bold">1:</div>
                  <input 
                    type="number" 
                    className="w-full border border-white/20 rounded-xl pl-10 pr-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Saiz Lot (Unit)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-neon-blue text-black font-bold hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Kira Margin
                </button>
              </div>
            </form>

            {result !== null && (
              <div className="mt-10 p-8 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl text-center animate-fade-in-up">
                <div className="text-neon-blue font-bold mb-2 uppercase tracking-wider text-sm">Margin Diperlukan</div>
                <div className="text-4xl md:text-5xl font-extrabold text-neon-blue">
                  ${result.toFixed(2)}
                </div>
                <p className="text-primary-800 text-sm mt-4 font-medium">
                  Anda memerlukan margin sebanyak ${result.toFixed(2)} untuk membuka posisi sebanyak {lotSize} Lot pada leverage 1:{leverage}.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
