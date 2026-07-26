import { getDataBySlug } from '@/lib/markdown';

export const metadata = {
  title: 'Hubungi Kami | ForexHub Global',
  description: 'Hubungi pasukan ForexHub Global untuk sebarang pertanyaan, kerjasama perniagaan, atau sokongan pelanggan.',
};

export default async function HubungiPage() {
  const settings = await getDataBySlug('settings', 'main');
  const supportEmail = settings?.supportEmail || 'support@forexhub.com.my';
  const businessEmail = settings?.businessEmail || 'partners@forexhub.com.my';
  const operatingHours = settings?.operatingHours || 'Isnin - Jumaat, 9:00 Pagi - 6:00 Petang';

  return (
    <>
      <main className="bg-[#09090b] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Hubungi Kami</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ada pertanyaan, cadangan, atau ingin bekerjasama? Tinggalkan mesej anda dan pasukan kami akan membalas secepat mungkin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/10">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Maklumat Perhubungan</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Kami sentiasa bersedia untuk mendengar daripada anda. Sama ada anda seorang trader baru yang perlukan panduan, atau wakil rasmi broker yang ingin menyenaraikan platform anda, pintu kami sentiasa terbuka.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center text-neon-blue shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">E-mel Sokongan</h4>
                  <p className="text-slate-400">{supportEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center text-neon-blue shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Kerjasama Perniagaan (Business)</h4>
                  <p className="text-slate-400">{businessEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center text-neon-blue shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Waktu Operasi</h4>
                  <p className="text-slate-400">{operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#09090b] p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Hantar Mesej</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Nama Penuh</label>
                  <input type="text" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-black/40 backdrop-blur-md focus:ring-2 focus:ring-neon-blue outline-none" placeholder="Masukkan nama anda" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Alamat E-mel</label>
                  <input type="email" className="w-full border border-white/20 rounded-xl px-4 py-3 bg-black/40 backdrop-blur-md focus:ring-2 focus:ring-neon-blue outline-none" placeholder="Masukkan e-mel anda" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Subjek / Perkara</label>
                  <select className="w-full border border-white/20 rounded-xl px-4 py-3 bg-black/40 backdrop-blur-md focus:ring-2 focus:ring-neon-blue outline-none">
                    <option>Pertanyaan Umum</option>
                    <option>Sokongan Teknikal</option>
                    <option>Kerjasama Broker (Listing)</option>
                    <option>Lain-lain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Mesej Anda</label>
                  <textarea rows={4} className="w-full border border-white/20 rounded-xl px-4 py-3 bg-black/40 backdrop-blur-md focus:ring-2 focus:ring-neon-blue outline-none resize-none" placeholder="Tulis mesej anda di sini..."></textarea>
                </div>
                <button type="button" className="w-full bg-neon-blue text-black font-bold hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1 mt-4">
                  Hantar Mesej Sekarang
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
