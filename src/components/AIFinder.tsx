"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AIFinder({ 
  sponsoredName, 
  sponsoredLogo, 
  sponsoredLink 
}: { 
  sponsoredName?: string;
  sponsoredLogo?: string;
  sponsoredLink?: string;
}) {
  const router = useRouter();
  const [modalAmt, setModalAmt] = useState('$500');
  const [instrument, setInstrument] = useState('Gold');
  const [requirements, setRequirements] = useState<string[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'matched' | 'error'>('idle');

  const toggleRequirement = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter(r => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setStatus('loading');
    
    try {
      const payload = {
        name,
        phone,
        modalAmt,
        instrument,
        requirements: requirements.join(', '),
      };
      
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          if (sponsoredName) {
            setStatus('matched');
          } else {
            router.push('/compare');
          }
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="ai-finder" className="py-24 relative overflow-hidden z-10">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neon-purple/20 text-neon-purple text-sm font-bold mb-6 shadow-[0_0_15px_rgba(188,19,254,0.3)] border border-neon-purple/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Ciri Eksklusif
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              AI Broker Finder
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
              Tidak pasti broker mana yang sesuai? Beritahu sistem AI kami tentang modal, gaya trading dan keperluan anda. Kami akan padankan anda dengan broker yang paling tepat dalam masa 10 saat.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['Analisis gaya trading peribadi', 'Padanan berdasarkan modal sebenar', 'Cadangan bebas dan telus'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green shadow-[0_0_10px_rgba(0,255,157,0.3)] border border-neon-green/30">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,243,255,0.15)] relative overflow-hidden">
            {/* Cyber grid overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-neon-blue mb-2 uppercase tracking-wider">Berapa anggaran modal anda?</label>
                <div className="grid grid-cols-2 gap-3">
                  {['$10', '$50', '$500', '$1000+'].map((val) => (
                    <button 
                      key={val} 
                      onClick={() => setModalAmt(val)}
                      className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${modalAmt === val ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'bg-black/50 border-white/10 text-slate-400 hover:border-neon-blue/50 hover:text-white'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neon-blue mb-2 uppercase tracking-wider">Instrumen utama?</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Gold', 'Forex', 'Crypto', 'Indices'].map((val) => (
                    <button 
                      key={val} 
                      onClick={() => setInstrument(val)}
                      className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all duration-300 ${instrument === val ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.4)]' : 'bg-black/50 border-white/10 text-slate-400 hover:border-neon-purple/50 hover:text-white'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neon-blue mb-2 uppercase tracking-wider">Keperluan khusus?</label>
                <div className="flex flex-wrap gap-2">
                  {['Swap Free', 'Copy Trading', 'Bonus', 'Spread Rendah'].map((val) => (
                    <button 
                      key={val} 
                      onClick={() => toggleRequirement(val)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 ${requirements.includes(val) ? 'bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_10px_rgba(0,255,157,0.3)]' : 'bg-black/50 border-white/10 text-slate-400 hover:border-neon-green/50 hover:text-white'}`}
                    >
                      + {val}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleOpenModal}
                className="w-full py-4 mt-4 bg-gradient-to-r from-neon-blue to-neon-purple text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:shadow-[0_0_30px_rgba(188,19,254,0.8)] flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Cari Broker Saya Sekarang
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-neon-blue/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,243,255,0.2)] relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-neon-pink hover:bg-neon-pink/10 transition-colors bg-white/5 border border-white/10 rounded-full p-2 z-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            {status === 'matched' && sponsoredName ? (
              <div className="text-center py-2 animate-in fade-in zoom-in duration-300">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  #1 Padanan Terbaik AI
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 shadow-inner">
                  {sponsoredLogo ? (
                    <img src={sponsoredLogo} alt={sponsoredName} className="w-24 h-24 object-contain mx-auto rounded-xl mb-4 bg-white p-2 border border-slate-200" />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-4xl font-black">
                      {sponsoredName.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white mb-1">{sponsoredName}</h3>
                  <p className="text-sm text-slate-400">Broker ini memenuhi 98% kriteria yang anda perlukan (termasuk {instrument}).</p>
                </div>
                
                <a 
                  href={sponsoredLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all transform hover:-translate-y-1 mb-4 uppercase tracking-wider"
                >
                  Buka Akaun Sekarang
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
                
                <button 
                  onClick={() => router.push('/compare')}
                  className="text-sm text-slate-400 hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  Atau lihat senarai perbandingan penuh
                </button>
              </div>
            ) : status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,255,157,0.4)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Maklumat Diterima!</h3>
                <p className="text-neon-blue">Sistem AI sedang menganalisis padanan terbaik untuk anda...</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-2">Langkah Terakhir!</h3>
                <p className="text-slate-400 text-sm mb-6 font-light">Sila masukkan nama dan nombor telefon untuk melihat hasil padanan broker terbaik anda.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-neon-blue mb-2">Nama Penuh</label>
                    <input 
                      type="text" required
                      className="w-full border border-white/10 rounded-xl px-4 py-3 bg-black/50 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="Cth: Ali bin Abu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neon-blue mb-2">Nombor Telefon (WhatsApp)</label>
                    <input 
                      type="tel" required
                      className="w-full border border-white/10 rounded-xl px-4 py-3 bg-black/50 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                      value={phone} onChange={e => setPhone(e.target.value)}
                      placeholder="Cth: 0123456789"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-neon-pink text-sm font-bold animate-pulse">Terdapat ralat. Sila cuba lagi.</p>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none mt-4 uppercase tracking-wider"
                  >
                    {status === 'loading' ? 'Menganalisis...' : 'Lihat Padanan Saya Sekarang'}
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">Maklumat anda adalah sulit dan selamat.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
