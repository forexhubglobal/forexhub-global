"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function PipCalculator() {
  const [pair, setPair] = useState('EURUSD');
  const [tradeSize, setTradeSize] = useState('100000'); // 1 Standard Lot
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [result, setResult] = useState<number | null>(null);

  const calculatePip = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified calculation for demo purposes.
    // Usually standard lot (100k) on EURUSD = $10 / pip.
    const lotSize = parseFloat(tradeSize);
    
    let pipValue = 0;
    if (pair.includes('JPY')) {
      pipValue = (lotSize * 0.01) / 150; // Mock rate for JPY
    } else {
      pipValue = (lotSize * 0.0001) / 1; 
    }
    
    setResult(pipValue);
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
            <span className="text-white font-medium">Pip Calculator</span>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-neon-blue/10 rounded-2xl flex items-center justify-center text-neon-blue mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Kalkulator Pip</h1>
              <p className="text-slate-400">Kira dengan pantas nilai per pip mengikut matawang dan saiz lot anda.</p>
            </div>

            <form onSubmit={calculatePip} className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Pasangan Matawang (Pair)</label>
                <select 
                  className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                  value={pair}
                  onChange={(e) => setPair(e.target.value)}
                >
                  <option value="EURUSD">EUR/USD</option>
                  <option value="GBPUSD">GBP/USD</option>
                  <option value="USDJPY">USD/JPY</option>
                  <option value="XAUUSD">XAU/USD (Gold)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Saiz Dagangan (Unit)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                    value={tradeSize}
                    onChange={(e) => setTradeSize(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-400 font-medium">
                    (1 Lot = 100,000)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Matawang Akaun</label>
                <select 
                  className="w-full border border-white/20 rounded-xl px-4 py-3 bg-[#09090b] focus:ring-2 focus:ring-neon-blue outline-none"
                  value={accountCurrency}
                  onChange={(e) => setAccountCurrency(e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-neon-blue text-black font-bold hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Kira Nilai Pip
                </button>
              </div>
            </form>

            {result !== null && (
              <div className="mt-10 p-8 bg-success-50 border border-success-200 rounded-2xl text-center animate-fade-in-up">
                <div className="text-success-700 font-bold mb-2 uppercase tracking-wider text-sm">Nilai Pip Anda</div>
                <div className="text-4xl md:text-5xl font-extrabold text-success-600">
                  {accountCurrency === 'USD' ? '$' : '€'} {result.toFixed(2)}
                </div>
                <p className="text-success-800 text-sm mt-4 font-medium">
                  Setiap 1 pip pergerakan dalam <span className="font-bold">{pair}</span> akan untung/rugi bernilai {accountCurrency === 'USD' ? '$' : '€'}{result.toFixed(2)}.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
