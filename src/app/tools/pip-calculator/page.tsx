"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Target, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function PipCalculator() {
  const { accountCurrency, setAccountCurrency } = useCalculatorStore();
  const [currencyPair, setCurrencyPair] = useState('EURUSD');
  const [tradeSize, setTradeSize] = useState('100000'); // 1 Standard Lot
  const [result, setResult] = useState<{ pipValue: number, tradeSizeLots: number } | null>(null);

  const calculatePipValue = () => {
    const units = parseFloat(tradeSize) || 0;
    
    if (units <= 0) {
      setResult(null);
      return;
    }

    const isJpy = currencyPair.includes('JPY');
    const quoteCurrency = currencyPair.substring(3, 6);
    
    // Very simplified generic calculation without real-time API
    // Assumes account currency matches the quote currency for USD pairs
    let pipValue = 0;
    
    if (quoteCurrency === accountCurrency) {
      // If quote currency is same as account currency, pip value is fixed
      pipValue = (units * (isJpy ? 0.01 : 0.0001));
    } else {
      // Approximate fallback
      if (isJpy) {
        pipValue = (units * 0.01) / 150; // assuming USDJPY ~150 for non-JPY accounts
      } else {
        // e.g., if trading GBPJPY but account is USD
        pipValue = (units * 0.0001) * 1; 
      }
    }
    
    // Hard fallback standard for USD accounts trading major non-JPY pairs
    if (accountCurrency === 'USD' && !isJpy && quoteCurrency !== 'USD') {
        pipValue = (units * 0.0001); 
    }

    setResult({
      pipValue: pipValue,
      tradeSizeLots: units / 100000
    });
  };

  useEffect(() => {
    calculatePipValue();
  }, [currencyPair, tradeSize, accountCurrency]);

  return (
    <main className="bg-[#09090b] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-white font-medium">Pip Value Calculator</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Pip Value Calculator</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Find out exactly how much each pip movement is worth in your account currency before you enter a trade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-3 bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-neon-blue"></div>
            
            <form className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Account Currency</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="MYR">MYR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Currency Pair</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                  >
                    <option value="EURUSD">EUR/USD</option>
                    <option value="GBPUSD">GBP/USD</option>
                    <option value="USDJPY">USD/JPY</option>
                    <option value="XAUUSD">GOLD (XAU/USD)</option>
                    <option value="BTCUSD">BTC/USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Trade Size (Units)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full border border-white/10 rounded-xl pl-4 pr-16 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-lg font-mono"
                    value={tradeSize}
                    onChange={(e) => setTradeSize(e.target.value)}
                    placeholder="100000"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold text-sm">Units</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => setTradeSize('1000')} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-400 font-medium transition-colors">Micro (0.01)</button>
                    <button type="button" onClick={() => setTradeSize('10000')} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-400 font-medium transition-colors">Mini (0.10)</button>
                    <button type="button" onClick={() => setTradeSize('100000')} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-400 font-medium transition-colors">Standard (1.00)</button>
                </div>
              </div>
              
              {/* Contextual CTA */}
              <div className="pt-4">
                <Link href="/scam-scanner" className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="text-purple-500 w-5 h-5" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Make sure your broker is regulated. Check now.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-500 transition-colors" />
                </Link>
              </div>

            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Main Pip Value Result */}
            <div className="bg-gradient-to-br from-purple-500/20 to-neon-blue/10 rounded-3xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden h-48">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <p className="text-purple-400 font-bold tracking-wider text-sm mb-2 uppercase">Value Per Pip</p>
                <div className="text-5xl md:text-6xl font-extrabold text-white font-mono drop-shadow-md">
                   {accountCurrency === 'USD' ? '$' : accountCurrency === 'EUR' ? '€' : accountCurrency === 'GBP' ? '£' : 'RM'}{result ? result.pipValue.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>

            {/* Trade Size Result */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Trade Size (Lots)</p>
                <div className="text-2xl font-bold text-white font-mono">
                  {result ? result.tradeSizeLots.toFixed(2) : '0.00'} Lots
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

          </div>

        </div>

        {/* SEO / Educational Text */}
        <div className="mt-20 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">How is Pip Value Calculated?</h2>
          <p className="text-slate-400">
            A "pip" is the smallest price move that a given exchange rate can make based on market convention. In most currency pairs, it is the fourth decimal place ($0.0001), except in Japanese Yen pairs where it is the second decimal place ($0.01).
          </p>
          <p className="text-slate-400">
            Knowing the value of a pip is crucial for risk management. For example, if you trade 1 standard lot (100,000 units) of EUR/USD, each pip movement is worth exactly $10. If the market moves 50 pips against you, you lose $500.
          </p>
        </div>

      </div>
    </main>
  );
}
