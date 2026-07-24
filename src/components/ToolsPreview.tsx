"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ToolsPreview() {
  const tools = [
    { name: 'Pip Calculator', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { name: 'Lot Size Calculator', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { name: 'Margin Calculator', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Profit Calculator', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ];

  return (
    <section className="py-20 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">Trading Tools Percuma</h2>
            <p className="text-slate-400 font-light">
              Gunakan kalkulator kami untuk merancang entry anda dengan tepat. Pengurusan risiko adalah kunci utama kejayaan dalam trading.
            </p>
          </div>
          <Link href="/tools" className="mt-4 md:mt-0 text-neon-blue font-bold hover:text-white flex items-center gap-1 transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            Lihat Semua Tools
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {tools.map((tool) => (
            <Link key={tool.name} href={`/tools/${tool.name.toLowerCase().replace(/ /g, '-')}`} className="bg-black/40 backdrop-blur-md/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-neon-blue/50 hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all group flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-slate-300 mb-4 group-hover:scale-110 group-hover:bg-neon-blue group-hover:text-black group-hover:border-neon-blue group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tool.icon}></path>
                </svg>
              </div>
              <h3 className="font-bold text-slate-300 group-hover:text-white transition-colors">{tool.name}</h3>
            </Link>
          ))}
        </div>

        {/* OMNI AI Terminal Promotion - CYBERPUNK THEME */}
        <div id="omni-terminal" className="mt-20 bg-slate-950 rounded-2xl border border-cyan-500/30 p-8 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] relative overflow-hidden group">
          {/* Neon Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-600/30 transition-all duration-700"></div>
          
          {/* Cyberpunk Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400 text-xs font-mono font-bold mb-6 tracking-widest uppercase">
                <span className="w-2 h-2 bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                System // Exclusive Access
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight uppercase">
                OMNI AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">TERMINAL</span>
              </h3>
              <p className="text-slate-400 mb-6 text-lg font-mono text-sm leading-relaxed">
                <span className="text-cyan-400 font-bold">&gt; INITIALIZING...</span><br/>
                Unlock <span className="font-bold text-white">FREE</span> access to our premium trading algorithm. Requirement: Register an account with our verified network brokers.
              </p>
              
              <ul className="space-y-4 mb-8 font-mono text-sm">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 text-cyan-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Automated Market Analysis
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 text-cyan-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  High-Precision Entry/Exit Nodes
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 text-cyan-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Adaptive Risk Protocol
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
              {/* Decorative Corner Lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/50"></div>
              
              <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Request Override
              </h4>
              <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider">Fill credentials to receive access token via secure WhatsApp comms.</p>
              
              <OmniForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OmniForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    try {
      const res = await fetch('/api/save-omni-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-none p-6 text-center animate-fade-in-up">
        <div className="w-16 h-16 border-2 border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h5 className="text-lg font-mono font-bold text-cyan-400 mb-2 uppercase tracking-widest">Access Granted</h5>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">
          Token verified. Awaiting secure WhatsApp transmission for node activation instructions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group relative">
        <label className="block text-[10px] font-mono text-cyan-500 mb-1 uppercase tracking-[0.2em] group-focus-within:text-cyan-300 transition-colors">&gt;&gt; User_Name</label>
        <div className="relative">
          <input 
            type="text" 
            name="name"
            required
            className="w-full bg-black/50 border border-slate-700 border-b-cyan-500/50 px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 focus:bg-cyan-900/10 outline-none transition-all placeholder:text-slate-400"
            placeholder="ENTER_DESIGNATION"
          />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-500/20 group-focus-within:bg-cyan-400 transition-colors"></div>
        </div>
      </div>
      <div className="group relative">
        <label className="block text-[10px] font-mono text-cyan-500 mb-1 uppercase tracking-[0.2em] group-focus-within:text-cyan-300 transition-colors">&gt;&gt; Network_ID [Email]</label>
        <div className="relative">
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-black/50 border border-slate-700 border-b-cyan-500/50 px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 focus:bg-cyan-900/10 outline-none transition-all placeholder:text-slate-400"
            placeholder="ESTABLISH_CONNECTION"
          />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-500/20 group-focus-within:bg-cyan-400 transition-colors"></div>
        </div>
      </div>
      <div className="group relative">
        <label className="block text-[10px] font-mono text-cyan-500 mb-1 uppercase tracking-[0.2em] group-focus-within:text-cyan-300 transition-colors">&gt;&gt; Comms_Link [WhatsApp]</label>
        <div className="relative">
          <input 
            type="tel" 
            name="phone"
            required
            className="w-full bg-black/50 border border-slate-700 border-b-cyan-500/50 px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 focus:bg-cyan-900/10 outline-none transition-all placeholder:text-slate-400"
            placeholder="012XXXXXXXX"
          />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-500/20 group-focus-within:bg-cyan-400 transition-colors"></div>
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full relative overflow-hidden bg-cyan-950 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 hover:text-cyan-300 font-mono font-bold uppercase tracking-[0.2em] py-4 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all mt-4 group"
      >
        <span className="relative z-10">{loading ? 'PROCESSING...' : 'INITIALIZE DOWNLOAD'}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </button>
    </form>
  );
}
