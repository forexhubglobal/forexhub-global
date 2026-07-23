"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ProfitCalculator() {
  const [openPrice, setOpenPrice] = useState('1.1000');
  const [closePrice, setClosePrice] = useState('1.1050');
  const [lotSize, setLotSize] = useState('1');
  const [direction, setDirection] = useState('Buy');
  const [result, setResult] = useState<number | null>(null);

  const calculateProfit = (e: React.FormEvent) => {
    e.preventDefault();
    const open = parseFloat(openPrice);
    const close = parseFloat(closePrice);
    const lots = parseFloat(lotSize);
    
    // Simplistic formula for EURUSD (1 lot = 100,000)
    let pips = 0;
    if (direction === 'Buy') {
      pips = (close - open) * 10000;
    } else {
      pips = (open - close) * 10000;
    }
    
    const profit = pips * (lots * 10);
    setResult(profit);
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
            <span className="text-slate-900 font-medium">Profit Calculator</span>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Kalkulator Untung/Rugi</h1>
              <p className="text-slate-600">Anggarkan potensi keuntungan atau kerugian untuk posisi anda.</p>
            </div>

            <form onSubmit={calculateProfit} className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Arah Dagangan</label>
                <select 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                >
                  <option value="Buy">Buy (Long)</option>
                  <option value="Sell">Sell (Short)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Saiz Lot</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Harga Buka (Open Price)</label>
                <input 
                  type="number" 
                  step="0.0001"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={openPrice}
                  onChange={(e) => setOpenPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Harga Tutup (Close Price)</label>
                <input 
                  type="number" 
                  step="0.0001"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                  value={closePrice}
                  onChange={(e) => setClosePrice(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1">
                  Kira Untung/Rugi
                </button>
              </div>
            </form>

            {result !== null && (
              <div className={`mt-10 p-8 border rounded-2xl text-center animate-fade-in-up ${result >= 0 ? 'bg-success-50 border-success-200' : 'bg-danger-50 border-danger-200'}`}>
                <div className={`font-bold mb-2 uppercase tracking-wider text-sm ${result >= 0 ? 'text-success-700' : 'text-danger-700'}`}>
                  {result >= 0 ? 'Potensi Keuntungan' : 'Potensi Kerugian'}
                </div>
                <div className={`text-4xl md:text-5xl font-extrabold ${result >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  ${Math.abs(result).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
