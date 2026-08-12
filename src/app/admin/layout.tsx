import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Senarai E-mel Admin yang dibenarkan
const ADMIN_EMAILS = [
  'admin@forexhub.com',
  'test@forexhub.com',
  'forexhubglobal2026@gmail.com'
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Semak jika pengguna adalah Admin
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="bg-black/40 border border-red-500/30 p-8 rounded-2xl max-w-md w-full text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6 text-sm">
            Maaf, akaun anda ({user.email}) tidak mempunyai kebenaran untuk mengakses sistem Admin Dashboard (CMS).
          </p>
          <Link href="/dashboard" className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-black bg-neon-blue hover:bg-neon-blue/90 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)]">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
