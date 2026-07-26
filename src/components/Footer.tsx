import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-slate-400 py-16 border-t border-white/10 relative overflow-hidden">
      {/* Cyberpunk Glows in Footer */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20">
                <img src="/logo.jpg" alt="ForexHub Global Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                ForexHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">Global</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Platform perbandingan broker forex, pendidikan trading dan tools untuk trader Malaysia. Misi kami adalah membina ekosistem trader yang telus dan berinformasi.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'Youtube'].map((social) => (
                <a key={social} href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-neon-blue text-black font-bold transition-colors">
                    {social[0]}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigasi Utama</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Bandingkan Broker', href: '/compare' },
                { name: 'Promosi & Bonus', href: '/bonus' },
                { name: 'Akaun PAMM', href: '/pamm' },
                { name: 'Prop Firm', href: '/prop-firm' },
                { name: 'Berita Kewangan', href: '/news' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Brokers */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Broker Popular</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Moneta Markets', href: '/broker/moneta-markets' },
                { name: 'Exness', href: '/broker/exness' },
                { name: 'XM Global', href: '/broker/xm' },
                { name: 'HFM', href: '/broker/hfm' },
                { name: 'IC Markets', href: '/broker/ic-markets' },
                { name: 'Pepperstone', href: '/broker/pepperstone' },
              ].map((broker) => (
                <li key={broker.name}>
                  <Link href={broker.href} className="hover:text-primary-400 transition-colors">{broker.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Trading Tools</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Kalkulator Pip', href: '/tools/pip-calculator' },
                { name: 'Kalkulator Lot Size', href: '/tools/lot-size-calculator' },
                { name: 'Kalkulator Margin', href: '/tools/margin-calculator' },
                { name: 'Kalkulator Untung/Rugi', href: '/tools/profit-calculator' },
                { name: 'Kalendar Ekonomi', href: '/tools/kalendar-ekonomi' },
                { name: 'AI Broker Finder', href: '/#ai-finder' },
              ].map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="hover:text-primary-400 transition-colors">{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 leading-relaxed text-justify">
          <p className="mb-4">
            <strong className="text-slate-400">Amaran Risiko (Risk Disclaimer):</strong> Perdagangan pertukaran asing (Forex) dan Kontrak Perbezaan (CFD) menggunakan margin membawa tahap risiko yang tinggi dan mungkin tidak sesuai untuk semua pelabur. Leverage yang tinggi boleh memberi kesan buruk dan juga kelebihan kepada anda. Sebelum membuat keputusan untuk berdagang forex, anda harus berhati-hati mempertimbangkan objektif pelaburan, tahap pengalaman dan tahap risiko anda.
          </p>
          <p className="mb-4">
            ForexHub Global tidak memberikan nasihat pelaburan peribadi. Semua maklumat, analisis, kajian, harga, atau maklumat lain yang terkandung di laman web ini disediakan sebagai ulasan pasaran umum.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-white/10 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} ForexHub Global. Hak cipta terpelihara.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/penafian" className="hover:text-neon-blue hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all">Penafian & Terma</Link>
              <Link href="/hubungi" className="hover:text-neon-blue hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all">Hubungi Kami</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
