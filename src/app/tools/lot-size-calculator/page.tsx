"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Calculator, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LotSizeCalculator() {
  const { accountBalance, setAccountBalance, accountCurrency, setAccountCurrency, riskPercent, setRiskPercent } = useCalculatorStore();
  const [stopLossPips, setStopLossPips] = useState('50');
  const [currencyPair, setCurrencyPair] = useState('EURUSD');
  const [result, setResult] = useState<{ riskAmount: number, lotSize: number, units: number } | null>(null);

  // Simple pip value estimator (Assuming USD account)
  // For precise calculation, we need live exchange rates.
  const calculatePipValue = (pair: string) => {
    const isJpy = pair.includes('JPY');
    const quoteCurrency = pair.substring(3, 6);
    
    // Standard lot size = 100,000 units
    if (quoteCurrency === 'USD') return 10; // e.g. EURUSD, GBPUSD
    if (isJpy) return 1000 / 150; // Approx $6.66 for JPY pairs (assuming USDJPY is 150)
    return 10; // Fallback
  };

  const calculateLotSize = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const slPips = parseFloat(stopLossPips) || 0;
    
    if (balance <= 0 || risk <= 0 || slPips <= 0) {
      setResult(null);
      return;
    }

    const riskAmount = (balance * risk) / 100;
    const pipValue = calculatePipValue(currencyPair);
    const lotSize = riskAmount / (slPips * pipValue);
    
    setResult({ 
      riskAmount, 
      lotSize,
      units: lotSize * 100000
    });
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateLotSize();
  }, [accountBalance, riskPercent, stopLossPips, currencyPair]);

  return (
    <main className="bg-[#09090b] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-white font-medium">Position Size Calculator</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-blue/10 text-neon-blue mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Position Size Calculator</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Calculate your exact lot size and risk amount before entering a trade. Protect your capital like a professional trader.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-3 bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-purple-500"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={calculateLotSize}>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Account Currency</label>
                  <select 
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all"
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
                    className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all"
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
                <label className="block text-sm font-bold text-slate-300 mb-2">Account Balance</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full border border-white/10 rounded-xl pl-8 pr-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all text-lg font-mono"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Risk (%)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.1"
                      className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all font-mono"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center text-slate-500 font-bold">%</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Stop Loss (Pips)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full border border-white/10 rounded-xl px-4 py-3.5 bg-black/50 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all font-mono"
                      value={stopLossPips}
                      onChange={(e) => setStopLossPips(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center text-slate-500 font-bold text-sm">Pips</div>
                  </div>
                </div>
              </div>
              
              {/* Contextual CTA inside the tool */}
              <div className="pt-4">
                <Link href="/broker" className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="text-yellow-500 w-5 h-5" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Trade with low spreads to avoid slippage.</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-neon-blue transition-colors" />
                </Link>
              </div>

            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Main Lot Size Result */}
            <div className="bg-gradient-to-br from-neon-blue/20 to-purple-500/10 rounded-3xl p-8 border border-neon-blue/30 shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden h-48">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calculator className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <p className="text-neon-blue font-bold tracking-wider text-sm mb-2 uppercase">Recommended Lot Size</p>
                <div className="text-5xl md:text-6xl font-extrabold text-white font-mono drop-shadow-md">
                  {result ? result.lotSize.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>

            {/* Risk Amount Result */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Money at Risk</p>
                <div className="text-2xl font-bold text-danger-500 font-mono">
                  ${result ? result.riskAmount.toFixed(2) : '0.00'}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-danger-500/10 flex items-center justify-center text-danger-500">
                <span className="font-bold">-</span>
              </div>
            </div>

            {/* Units Result */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Position Units</p>
                <div className="text-2xl font-bold text-white font-mono">
                  {result ? result.units.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

          </div>

        </div>

        {/* SEO / Educational Text at the bottom */}
        <div className="mt-20 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">Why is Position Sizing Important?</h2>
          <p className="text-slate-400">
            Professional traders do not guess their lot sizes. A forex position size calculator helps you manage your risk precisely. If you decide to risk 1% of your account per trade, the calculator will tell you exactly what lot size to use based on your stop loss distance.
          </p>
          <p className="text-slate-400">
            Failing to calculate your position size can lead to outsized losses, exposing your trading account to margin calls and blown accounts. Always use proper risk management.
          </p>
        </div>

      </div>
    </main>
  );
}
