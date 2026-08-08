'use client';
import { useState } from 'react';

export default function ScamScannerPage() {
  const [brokerName, setBrokerName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{score: number, status: string, reason: string, source: string} | null>(null);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brokerName) return;
    
    setIsScanning(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/scan-broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brokerName })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Gagal mengimbas');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  // Determine colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';
    if (score <= 30) return 'text-neon-green drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]';
    return 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]';
  };

  const getBgColor = (score: number) => {
    if (score >= 70) return 'bg-red-500/10 border-red-500/50';
    if (score <= 30) return 'bg-green-500/10 border-green-500/50';
    return 'bg-yellow-500/10 border-yellow-500/50';
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 py-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            Live <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">Red Flag</span> Scanner
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Gunakan teknologi AI kami untuk mengimbas sebarang broker di seluruh dunia. Dapatkan skor risiko (Scam Score) secara masa nyata sebelum anda meleburkan wang.
          </p>
        </div>

        <form onSubmit={handleScan} className="relative max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-neon-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-black border border-slate-800 rounded-2xl p-2">
              <input 
                type="text" 
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                placeholder="Taip nama broker... (Cth: OmegaPro, OctaFX, dll)" 
                className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder:text-slate-600 font-mono text-lg"
                disabled={isScanning}
              />
              <button 
                type="submit"
                disabled={isScanning || !brokerName}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isScanning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scanning...
                  </>
                ) : (
                  'Imbas'
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/30">
            {error}
          </div>
        )}

        {isScanning && !result && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative w-32 h-32 border-4 border-slate-800 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-red-500/40 origin-bottom-left animate-[spin_2s_linear_infinite]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="relative z-10 font-mono text-slate-400">ANALYZING</div>
            </div>
            <p className="mt-4 font-mono text-sm text-red-400 animate-pulse">Menghubungi Pangkalan Data Global...</p>
          </div>
        )}

        {result && (
          <div className={`mt-8 p-8 rounded-3xl border backdrop-blur-md animate-fade-in-up ${getBgColor(result.score)}`}>
            <div className="text-center mb-8">
              <div className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-2">Scam Probability Score</div>
              <div className={`text-8xl font-black ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
              <div className={`text-2xl font-bold mt-2 ${getScoreColor(result.score)}`}>
                Status: {result.status.toUpperCase()}
              </div>
            </div>

            <div className="bg-black/50 rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Penemuan AI & Forensik:</h3>
              <p className="text-lg text-slate-200 leading-relaxed">
                {result.reason}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>Diimbas pada: {new Date().toLocaleString('ms-MY')}</span>
                <span>Sumber: {result.source}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
