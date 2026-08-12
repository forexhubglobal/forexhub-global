"use client";

import { useEffect, useRef, useState } from 'react';
import { Activity, Zap, Clock, TrendingUp } from 'lucide-react';

interface InsightData {
  happening: string;
  why: string;
  nextEvent: string;
}

export default function MarketDashboard() {
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);
  const widgetContainer = useRef<HTMLDivElement>(null);

  // Fetch AI Market Insight
  useEffect(() => {
    async function fetchInsight() {
      try {
        const res = await fetch('/api/market-insight');
        const data = await res.json();
        setInsight(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, []);

  // Load TradingView Mini Charts
  useEffect(() => {
    if (!widgetContainer.current) return;
    if (widgetContainer.current.querySelector('script')) return; // prevent duplicate

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "1D",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "tabs": [
          {
            "title": "Forex & Commodities",
            "symbols": [
              { "s": "OANDA:XAUUSD", "d": "Gold" },
              { "s": "OANDA:EURUSD", "d": "EUR/USD" },
              { "s": "OANDA:GBPUSD", "d": "GBP/USD" },
              { "s": "OANDA:USDJPY", "d": "USD/JPY" },
              { "s": "FX_IDC:USDMYR", "d": "USD/MYR" },
              { "s": "OANDA:WTICOUSD", "d": "WTI Crude" }
            ],
            "originalTitle": "Forex"
          },
          {
            "title": "Indices & Crypto",
            "symbols": [
              { "s": "BINANCE:BTCUSD", "d": "Bitcoin" },
              { "s": "INDEX:SPX", "d": "S&P 500" },
              { "s": "INDEX:DXY", "d": "US Dollar Index" },
              { "s": "US10Y", "d": "US 10Y Yield" },
              { "s": "BursaMalaysia:FBMKLCI", "d": "KLCI" }
            ]
          }
        ]
      }`;
    widgetContainer.current.appendChild(script);
  }, []);

  return (
    <section className="relative pt-10 pb-20 border-t border-white/5 bg-gradient-to-b from-black to-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-blue"></span>
              </span>
              <h2 className="text-neon-blue font-bold tracking-widest text-sm uppercase">Market Intelligence Hub</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Malaysia's Financial Engine</h3>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            Data pasaran masa nyata dan analisis kepintaran buatan (AI) yang dijanakan khusus untuk membantu keputusan dagangan anda hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: TradingView Overview */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-[500px] shadow-2xl relative group">
             <div className="absolute inset-0 z-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10 w-full h-full p-2" ref={widgetContainer}>
                {/* TV Widget loads here */}
             </div>
          </div>

          {/* Right: AI Copilot Briefing */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none group-hover:bg-neon-purple/40 transition-colors"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-neon-purple" />
                  AI Market Copilot
                </h4>
                <div className="text-xs font-bold px-2 py-1 bg-neon-purple/20 text-neon-purple rounded-md uppercase">Live Sync</div>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col justify-center items-center space-y-4">
                  <div className="w-8 h-8 border-4 border-white/10 border-t-neon-purple rounded-full animate-spin"></div>
                  <p className="text-slate-500 text-sm animate-pulse">Menjana analisis pasaran...</p>
                </div>
              ) : insight ? (
                <div className="flex-1 space-y-6 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      Apa yang sedang berlaku?
                    </h5>
                    <p className="text-slate-200 text-sm leading-relaxed">{insight.happening}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-neon-blue" />
                      Kenapa market bergerak?
                    </h5>
                    <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">{insight.why}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-danger-500" />
                      Acara Tumpuan (Watchlist)
                    </h5>
                    <p className="text-danger-200 text-sm font-medium leading-relaxed p-3 bg-danger-500/10 border border-danger-500/20 rounded-xl">
                      {insight.nextEvent}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Quick CTA */}
            <a href="#compare-brokers" className="block bg-gradient-to-r from-neon-blue to-purple-600 p-[1px] rounded-2xl group transition-transform hover:-translate-y-1">
              <div className="bg-black rounded-2xl p-4 flex items-center justify-between group-hover:bg-black/80 transition-colors">
                <div>
                  <h4 className="text-white font-bold text-sm">Trade This Market</h4>
                  <p className="text-slate-400 text-xs">Cari broker dengan spread terendah</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  &rarr;
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
