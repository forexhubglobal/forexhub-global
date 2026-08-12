"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Briefcase, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function MarginCalculator() {
  const { accountBalance, accountCurrency, setAccountCurrency } = useCalculatorStore();
  const [currencyPair, setCurrencyPair] = useState('EURUSD');
  const [leverage, setLeverage] = useState('100');
  const [lotSize, setLotSize] = useState('1');
  const [result, setResult] = useState<{ requiredMargin: number, freeMargin: number, marginLevel: number } | null>(null);

  const calculateMargin = () => {
    const lev = parseFloat(leverage) || 0;
    const lots = parseFloat(lotSize) || 0;
    const balance = parseFloat(accountBalance) || 0;
    
    if (lev <= 0 || lots <= 0) {
      setResult(null);
      return;
    }

    const isJpy = currencyPair.includes('JPY');
    const quoteCurrency = currencyPair.substring(3, 6);
    const baseCurrency = currencyPair.substring(0, 3);
    
    // Very simplified generic calculation without real-time API
    // Assumes base currency == account currency OR account is USD and base is EUR/GBP
    let requiredMargin = 0;
    
    if (baseCurrency === accountCurrency) {
      requiredMargin = (lots * 100000) / lev;
    } else {
      // Rough approximation for EURUSD/GBPUSD trading on USD account
      let exchangeRate = 1.0;
      if (baseCurrency === 'EUR') exchangeRate = 1.10;
      if (baseCurrency === 'GBP') exchangeRate = 1.25;
      if (baseCurrency === 'XAU') exchangeRate = 2000;
      if (baseCurrency === 'BTC') exchangeRate = 60000;
      
      requiredMargin = ((lots * 100000) * exchangeRate) / lev;
    }

    const freeMargin = balance - requiredMargin;
    const marginLevel = balance > 0 && requiredMargin > 0 ? (balance / requiredMargin) * 100 : 0;

    setResult({
      requiredMargin,
      freeMargin,
      marginLevel
    });
  };

  useEffect(() => {
    calculateMargin();
  }, [currencyPair, leverage, lotSize, accountCurrency, accountBalance]);

  return (
    <main className="bg-[#09090b] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-white font-medium">Margin Calculator</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Margin Calculator</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Calculate the exact amount of funds required to hold your position open, based on your broker's leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-3 bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-neon-blue"></div>
            
            <form className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Account Currency</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
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
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
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
                  <label className="block text-sm font-bold text-slate-300 mb-2">Leverage</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 font-bold">1:</span>
                    </div>
                    <input 
                      type="number" 
                      className="w-full border border-white/10 rounded-xl pl-10 pr-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-mono"
                      value={leverage}
                      onChange={(e) => setLeverage(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Trade Size (Lots)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-mono"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Contextual CTA */}
              <div className="pt-4">
                <Link href="/compare" className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="text-orange-500 w-5 h-5" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Need higher leverage? Compare brokers.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" />
                </Link>
              </div>

            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Main Required Margin Result */}
            <div className="bg-gradient-to-br from-orange-500/20 to-black/40 rounded-3xl p-8 border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden h-48">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Briefcase className="w-24 h-24 text-orange-500" />
              </div>
              <div className="relative z-10">
                <p className="text-orange-400 font-bold tracking-wider text-sm mb-2 uppercase">Required Margin</p>
                <div className="text-5xl md:text-6xl font-extrabold text-white font-mono drop-shadow-md">
                   {accountCurrency === 'USD' ? '$' : accountCurrency === 'EUR' ? '€' : 'RM'}{result ? result.requiredMargin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                </div>
              </div>
            </div>

            {/* Margin Level & Free Margin */}
            {result && accountBalance && parseFloat(accountBalance) > 0 && (
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Free Margin</p>
                    <div className={`text-xl font-bold font-mono ${result.freeMargin < 0 ? 'text-danger-500' : 'text-success-500'}`}>
                      {result.freeMargin < 0 ? '-' : ''}{accountCurrency === 'USD' ? '$' : '€'}{Math.abs(result.freeMargin).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-white/5 rounded-full h-2">
                   <div 
                     className={`h-2 rounded-full ${result.marginLevel < 100 ? 'bg-danger-500' : result.marginLevel < 300 ? 'bg-yellow-500' : 'bg-success-500'}`} 
                     style={{ width: `${Math.min(result.marginLevel, 100)}%` }}
                   ></div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-slate-400 text-sm font-medium">Margin Level</p>
                  <p className={`text-sm font-bold font-mono ${result.marginLevel < 100 ? 'text-danger-500' : 'text-white'}`}>
                    {result.marginLevel.toFixed(1)}%
                  </p>
                </div>
                
                {result.marginLevel < 100 && (
                  <p className="text-xs text-danger-400 font-medium mt-2">
                    Warning: Insufficient funds to open this position. You are facing a margin call.
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
