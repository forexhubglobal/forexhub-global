import Link from 'next/link';
import RegisterButton from './RegisterButton';
export default function Header() {
  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'QUIZ', href: '/quiz' },
    { label: 'BROKER', href: '/broker' },
    { label: 'COMPARE', href: '/compare' },
    { label: 'TOOLS', href: '/tools' },
    { label: 'BLOG', href: '/blog' },
    { label: 'BONUS', href: '/bonus' },
    { label: 'PAMM', href: '/pamm' },
    { label: 'PROP FIRM', href: '/prop-firm' },
    { label: 'NEWS', href: '/news' },
    { label: 'SCAM ALERT', href: '/scam-alert' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all border border-slate-200 shrink-0">
              <img src="/logo.jpg" alt="ForexHub Global Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight">
              ForexHub <span className="text-primary-600">Global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs xl:text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors whitespace-nowrap ${item.label === 'SCAM ALERT' ? 'text-red-600 font-bold' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section (Translate + CTA + Mobile Menu) */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Google Translate */}
            <div id="google_translate_element" className="flex items-center mt-1 scale-90 origin-right shrink-0"></div>
            
            {/* CTA Button (Hidden on smaller screens to save space) */}
            <RegisterButton />

            {/* Mobile menu button */}
            <button className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none shrink-0 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
