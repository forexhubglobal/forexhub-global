'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OmniAIRequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tvUsername: '',
    plan: 'trial',
    brokerAccount: ''
  });
  
  const [status, setStatus] = useState<{type: 'idle' | 'loading' | 'success' | 'error', message: string}>({ type: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Menghantar permohonan...' });

    try {
      const res = await fetch('/api/omni-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus({ type: 'success', message: 'Berjaya! Permohonan anda sedang diproses. Akses akan diberikan ke dalam akaun TradingView anda dalam masa 24 jam.' });
        setFormData({ name: '', phone: '', tvUsername: '', plan: 'trial', brokerAccount: '' });
      } else {
        const errorData = await res.json();
        setStatus({ type: 'error', message: errorData.error || 'Gagal menghantar permohonan. Sila cuba lagi.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Masalah rangkaian. Sila pastikan internet anda stabil.' });
    }
  };

  return (
    <div className="bg-[#09090b] text-slate-300 min-h-screen selection:bg-neon-blue selection:text-black">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-16 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            MOHON AKSES <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">OMNI AI PRO</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Dapatkan isyarat trading (signal) berketepatan tinggi terus di dalam akaun TradingView anda. 
            Sila isi borang di bawah dengan tepat untuk menerima akses eksklusif ini.
          </p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md relative z-10 shadow-2xl">
          {status.type === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-green/50 shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                <svg className="w-10 h-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Permohonan Berjaya Dihantar!</h2>
              <p className="text-slate-400 mb-8">{status.message}</p>
              <button 
                onClick={() => setStatus({ type: 'idle', message: '' })}
                className="bg-neon-blue text-black font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all uppercase tracking-wider"
              >
                Hantar Permohonan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {status.type === 'error' && (
                <div className="p-4 bg-danger-900/30 border border-danger-500/50 rounded-xl text-danger-400 font-semibold text-sm">
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Nama Penuh <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" name="name" required
                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all placeholder-slate-600"
                    placeholder="Contoh: Ahmad Albab"
                    value={formData.name} onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">No. Telefon (WhatsApp) <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" name="phone" required
                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all placeholder-slate-600"
                    placeholder="Contoh: 0123456789"
                    value={formData.phone} onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-neon-blue mb-2">TradingView Username (ID) <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" name="tvUsername" required
                    className="w-full bg-neon-blue/5 border border-neon-blue/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-neon-blue focus:border-neon-blue outline-none transition-all placeholder-slate-600 font-mono"
                    placeholder="Sila salin tepat nama pengguna TV anda (bukan e-mel)"
                    value={formData.tvUsername} onChange={handleChange}
                  />
                  <p className="text-xs text-slate-500 mt-2">Pastikan ID adalah tepat kerana akses indikator akan disalurkan terus ke ID ini.</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-300 mb-4">Pilihan Pelan Akses <span className="text-danger-500">*</span></label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Trial Option */}
                    <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none ${formData.plan === 'trial' ? 'border-neon-purple bg-neon-purple/10' : 'border-white/10 bg-[#09090b] hover:bg-white/5'}`}>
                      <input type="radio" name="plan" value="trial" className="sr-only" checked={formData.plan === 'trial'} onChange={handleChange} />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className={`block text-sm font-bold mb-1 uppercase tracking-wider ${formData.plan === 'trial' ? 'text-neon-purple' : 'text-slate-300'}`}>Percubaan PERCUMA</span>
                          <span className="mt-1 flex items-center text-sm text-slate-400">Akses Penuh OMNI AI PRO selama 5 Hari berturut-turut. Tiada komitmen.</span>
                        </span>
                      </span>
                      <svg className={`h-5 w-5 ${formData.plan === 'trial' ? 'text-neon-purple' : 'text-transparent'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </label>

                    {/* VIP Option */}
                    <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none ${formData.plan === 'vip' ? 'border-neon-green bg-neon-green/10' : 'border-white/10 bg-[#09090b] hover:bg-white/5'}`}>
                      <input type="radio" name="plan" value="vip" className="sr-only" checked={formData.plan === 'vip'} onChange={handleChange} />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className={`block text-sm font-bold mb-1 uppercase tracking-wider ${formData.plan === 'vip' ? 'text-neon-green' : 'text-slate-300'}`}>Akses Penuh 1 Bulan (Deposit)</span>
                          <span className="mt-1 flex items-center text-sm text-slate-400">Untuk pendaftar broker di bawah IB ForexHub yang telah membuat deposit wang.</span>
                        </span>
                      </span>
                      <svg className={`h-5 w-5 ${formData.plan === 'vip' ? 'text-neon-green' : 'text-transparent'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </label>
                  </div>
                </div>

                {formData.plan === 'vip' && (
                  <div className="md:col-span-2 p-5 bg-neon-green/5 border border-neon-green/20 rounded-xl">
                    <label className="block text-sm font-bold text-neon-green mb-2">No. Akaun Trading / Bukti Deposit <span className="text-danger-500">*</span></label>
                    <input 
                      type="text" name="brokerAccount" required
                      className="w-full bg-[#09090b] border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-neon-green focus:border-neon-green outline-none transition-all placeholder-slate-600"
                      placeholder="Masukkan No Akaun Broker Exness/XM dsb"
                      value={formData.brokerAccount} onChange={handleChange}
                    />
                    <p className="text-xs text-slate-400 mt-2">Pihak Admin akan menyemak akaun anda sebelum meluluskan akses TradingView.</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 mt-8">
                <button 
                  type="submit" 
                  disabled={status.type === 'loading'}
                  className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all uppercase tracking-wider text-lg
                    ${status.type === 'loading' 
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(189,0,255,0.5)]'
                    }
                  `}
                >
                  {status.type === 'loading' ? 'Menghantar Data...' : 'Mohon Akses Sekarang'}
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">
                  Dengan menghantar borang ini, anda bersetuju dengan Terma dan Syarat ForexHub Global.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
