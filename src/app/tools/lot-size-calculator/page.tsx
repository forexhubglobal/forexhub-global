"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LotSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState('1000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [stopLossPips, setStopLossPips] = useState('50');
  const [result, setResult] = useState<{ riskAmount: number, lotSize: number } | null>(null);

  const calculateLotSize = (e: React.FormEvent) => {
    e.preventDefault();
    
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercent);
    const slPips = parseFloat(stopLossPips);
    
    // Formula: Risk Amount = (Balance * Risk) / 100
    const riskAmount = (balance * risk) / 100;
    
    // Assume standard $10 per pip for 1 standard lot
    // Lot Size = Risk Amount / (SL Pips * Pip Value per Standard Lot)
    const lotSize = riskAmount / (slPips * 10);
    
    setResult({ riskAmount, lotSize });
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-primary-600">Tools</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Lot Size Calculator</span>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Kalkulator Saiz Lot (Risk Management)</h1>
              <p className="text-slate-600">Lindungi akaun anda dengan mengira lot yang tepat berdasarkan risiko yang anda sanggup ambil.</p>
            </div>

            <form onSubmit={calculateLotSize} className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Baki Akaun (USD)</label>
                <input 
                  type="number" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Risiko (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-slate-400 font-bold">%</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Stop Loss (Pip)</label>
                <input 
                  type="number" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Kira Saiz Lot
                </button>
              </div>
            </form>

            {result !== null && (
              <div className="mt-10 grid grid-cols-2 gap-4 animate-fade-in-up">
                <div className="p-6 bg-danger-50 border border-danger-200 rounded-2xl text-center">
                  <div className="text-danger-700 font-bold mb-1 uppercase tracking-wider text-xs">Jumlah Risiko (Rugi)</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-danger-600">
                    ${result.riskAmount.toFixed(2)}
                  </div>
                </div>
                <div className="p-6 bg-primary-50 border border-primary-200 rounded-2xl text-center">
                  <div className="text-primary-700 font-bold mb-1 uppercase tracking-wider text-xs">Lot Yang Disyorkan</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-600">
                    {result.lotSize.toFixed(3)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
