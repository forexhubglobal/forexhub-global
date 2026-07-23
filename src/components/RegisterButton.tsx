"use client";
import { useState } from 'react';

export default function RegisterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requirements: 'Mendaftar dari butang Daftar Percuma Header',
        }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:inline-flex bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap text-sm shrink-0"
      >
        Daftar Percuma
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative transform transition-all">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            {!success ? (
              <>
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Akses VIP Percuma!</h3>
                  <p className="text-slate-500">Daftar sekarang untuk dapatkan akses eksklusif ke Group Signal VIP & Indicator Premium.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Penuh</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white"
                      placeholder="Contoh: Ahmad Ali"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombor WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white"
                      placeholder="Contoh: 0123456789"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
                  >
                    {loading ? 'Memproses...' : 'Dapatkan Akses Sekarang 🚀'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 animate-fade-in-up">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Tahniah! 🎉</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">Pendaftaran anda berjaya. Sila klik butang di bawah untuk menyertai komuniti Telegram VIP kami sekarang.</p>
                <a 
                  href="https://t.me/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center items-center py-4 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold rounded-xl shadow-lg shadow-[#0088cc]/30 transition-all transform hover:-translate-y-1 text-lg"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.31-.346-.116l-6.405 4.025-2.766-.865c-.6-.185-.612-.6.125-.89l10.814-4.17c.5-.192.95.115.782.905z"/></svg>
                  Join Telegram VIP
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-6 text-sm font-semibold text-slate-500 hover:text-slate-700"
                >
                  Tutup paparan ini
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
