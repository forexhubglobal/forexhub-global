"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCalculatorStore } from '@/store/calculatorStore';
import { TrendingUp, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';

export default function ProfitCalculator() {
  const { accountCurrency, setAccountCurrency } = useCalculatorStore();
  const [currencyPair, setCurrencyPair] = useState('EURUSD');
  const [openPrice, setOpenPrice] = useState('1.1000');
  const [closePrice, setClosePrice] = useState('1.1050');
  const [lotSize, setLotSize] = useState('1');
  const [direction, setDirection] = useState('Buy');
  const [result, setResult] = useState<{ profit: number, pips: number } | null>(null);

  const calculateProfit = () => {
    const open = parseFloat(openPrice) || 0;
    const close = parseFloat(closePrice) || 0;
    const lots = parseFloat(lotSize) || 0;
    
    if (open <= 0 || close <= 0 || lots <= 0) {
      setResult(null);
      return;
    }

    const isJpy = currencyPair.includes('JPY');
    const quoteCurrency = currencyPair.substring(3, 6);
    const multiplier = isJpy ? 100 : 10000;
    
    // Calculate Pips
    let pips = 0;
    if (direction === 'Buy') {
      pips = (close - open) * multiplier;
    } else {
      pips = (open - close) * multiplier;
    }
    
    // Calculate Pip Value
    let pipValue = 0;
    if (quoteCurrency === accountCurrency) {
      pipValue = (lots * 100000 * (isJpy ? 0.01 : 0.0001));
    } else {
      if (isJpy) {
        pipValue = (lots * 100000 * 0.01) / 150; // Mock rate
      } else {
        pipValue = (lots * 100000 * 0.0001) * 1; 
      }
    }
    
    // Fallback standard for USD
    if (accountCurrency === 'USD' && !isJpy && quoteCurrency !== 'USD') {
        pipValue = (lots * 100000 * 0.0001); 
    }

    const profit = pips * pipValue;
    
    setResult({
      profit,
      pips
    });
  };

  useEffect(() => {
    calculateProfit();
  }, [currencyPair, openPrice, closePrice, lotSize, direction, accountCurrency]);

  return (
    <main className="bg-[#09090b] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-white font-medium">Profit Calculator</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-500/10 text-success-500 mb-6">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Profit & Loss Calculator</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Accurately forecast your potential profit or loss based on your entry and exit prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-3 bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success-500 to-neon-blue"></div>
            
            <form className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Trade Direction</label>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setDirection('Buy')}
                      className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${direction === 'Buy' ? 'bg-success-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-black/50 text-slate-400 border border-white/10 hover:bg-white/5'}`}
                    >
                      Long (Buy)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setDirection('Sell')}
                      className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${direction === 'Sell' ? 'bg-danger-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-black/50 text-slate-400 border border-white/10 hover:bg-white/5'}`}
                    >
                      Short (Sell)
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Currency Pair</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-success-500 focus:border-success-500 outline-none transition-all"
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                  >
                    <option value="EURUSD">EUR/USD</option>
                    <option value="GBPUSD">GBP/USD</option>
                    <option value="USDJPY">USD/JPY</option>
                    <option value="XAUUSD">GOLD (XAU/USD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Account Currency</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-success-500 focus:border-success-500 outline-none transition-all"
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MYR">MYR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Position Size (Lots)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-success-500 focus:border-success-500 outline-none transition-all font-mono"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Open Price</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-success-500 focus:border-success-500 outline-none transition-all font-mono"
                    value={openPrice}
                    onChange={(e) => setOpenPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Close Price</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-success-500 focus:border-success-500 outline-none transition-all font-mono"
                    value={closePrice}
                    onChange={(e) => setClosePrice(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Contextual CTA */}
              <div className="pt-4">
                <Link href="/academy" className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-success-500 w-5 h-5" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Want to increase your win rate? Learn strategies.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-success-500 transition-colors" />
                </Link>
              </div>

            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Main Profit/Loss Result */}
            <div className={`rounded-3xl p-8 border flex flex-col items-center justify-center text-center relative overflow-hidden h-48 transition-colors ${result && result.profit >= 0 ? 'bg-gradient-to-br from-success-500/20 to-black/40 border-success-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-gradient-to-br from-danger-500/20 to-black/40 border-danger-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                {result && result.profit >= 0 ? <TrendingUp className="w-24 h-24 text-success-500" /> : <AlertTriangle className="w-24 h-24 text-danger-500" />}
              </div>
              <div className="relative z-10">
                <p className={`font-bold tracking-wider text-sm mb-2 uppercase ${result && result.profit >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
                  {result && result.profit >= 0 ? 'Estimated Profit' : 'Estimated Loss'}
                </p>
                <div className={`text-5xl md:text-6xl font-extrabold font-mono drop-shadow-md ${result && result.profit >= 0 ? 'text-white' : 'text-danger-500'}`}>
                   {result && result.profit < 0 ? '-' : ''}{accountCurrency === 'USD' ? '$' : accountCurrency === 'EUR' ? '€' : 'RM'}{result ? Math.abs(result.profit).toFixed(2) : '0.00'}
                </div>
              </div>
            </div>

            {/* Pips Result */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Pip Difference</p>
                <div className={`text-2xl font-bold font-mono ${result && result.pips >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                  {result ? (result.pips > 0 ? '+' : '') + result.pips.toFixed(1) : '0.0'} Pips
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
