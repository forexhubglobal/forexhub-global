'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RegisterButton from './RegisterButton';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from 'lucide-react';
import { logout } from '@/app/login/actions';

export default function Header({ user }: { user?: User | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Close menu when route changes or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ACADEMY', href: '/academy' },
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
    { label: 'AI SCANNER', href: '/scam-scanner' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.3)] group-hover:shadow-[0_0_25px_rgba(188,19,254,0.5)] transition-all border border-white/20 shrink-0">
              <img src="/logo.jpg" alt="ForexHub Global Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg sm:text-2xl text-white tracking-tight">
              ForexHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">Global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs xl:text-sm font-bold text-slate-300 hover:text-neon-blue transition-colors whitespace-nowrap hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] ${(item.label === 'SCAM ALERT' || item.label === 'AI SCANNER') ? 'text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section (Translate + CTA + Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0">
            {/* Google Translate - Hidden on very small screens, visible on md+ */}
            <div id="google_translate_element" className="hidden sm:flex items-center mt-1 scale-90 origin-right shrink-0"></div>
            
            {/* CTA Button or User Menu */}
            <div className="hidden sm:block relative">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full flex items-center justify-center shrink-0">
                      <span className="text-black font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Dropdown User Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-down z-50">
                      <div className="p-4 border-b border-white/10">
                        <p className="text-xs text-slate-400 mb-1">Log masuk sebagai</p>
                        <p className="text-sm font-bold text-white truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link 
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </div>
                      <div className="p-2 border-t border-white/10">
                        <button 
                          onClick={async () => {
                            setIsUserMenuOpen(false);
                            await logout();
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="text-sm font-bold text-white hover:text-neon-blue px-4 transition-colors hidden xl:block">
                    Log Masuk
                  </Link>
                  <RegisterButton />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className="xl:hidden text-slate-300 hover:text-white focus:outline-none shrink-0 p-2 border border-slate-700/50 rounded-lg bg-slate-800/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl absolute top-20 left-0 w-full animate-fade-in-down max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 sm:hidden mb-2 border-b border-white/5 flex justify-center">
            {/* Show translate on mobile strictly inside menu since it was hidden above */}
            <div id="google_translate_element_mobile" className="scale-90 origin-center">
              <span className="text-xs text-slate-500 mr-2">Translate:</span>
            </div>
          </div>
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-base font-bold text-slate-300 hover:bg-white/5 hover:text-neon-blue rounded-lg transition-colors ${(item.label === 'SCAM ALERT' || item.label === 'AI SCANNER') ? 'text-red-500' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4 pt-6 pb-4 border-t border-white/5 sm:hidden flex justify-center">
              <RegisterButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
