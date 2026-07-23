"use client";

import { useEffect, useRef } from 'react';

export default function LiveTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    // Check if script already exists to prevent duplicates on re-renders
    if (container.current.querySelector('script')) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "description": "Gold",
            "proName": "OANDA:XAUUSD"
          },
          {
            "description": "EUR/USD",
            "proName": "OANDA:EURUSD"
          },
          {
            "description": "GBP/USD",
            "proName": "OANDA:GBPUSD"
          },
          {
            "description": "USD/JPY",
            "proName": "OANDA:USDJPY"
          },
          {
            "description": "WTI Crude Oil",
            "proName": "OANDA:WTICOUSD"
          },
          {
            "description": "Bitcoin",
            "proName": "BINANCE:BTCUSD"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="bg-[#131722] border-b border-slate-800">
      <div className="tradingview-widget-container relative z-50 h-[46px]" ref={container}>
        <div className="tradingview-widget-container__widget h-full"></div>
      </div>
    </div>
  );
}
