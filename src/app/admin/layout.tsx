import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="bg-black/40 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-neon-blue/10 text-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Akses</h1>
          <p className="text-slate-400 mb-6 text-sm">
            Sila masukkan kata laluan induk (Master Password) untuk mengakses Sistem CMS.
          </p>
          <form action={async (formData) => {
            'use server';
            const pass = formData.get('password');
            if (pass === 'bossku123') {
              const c = await cookies();
              c.set('admin_auth', 'true', { path: '/', httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });
              redirect('/admin');
            }
          }} className="space-y-4 text-left">
            <div>
              <input 
                type="password" 
                name="password"
                placeholder="Kata Laluan" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-neon-blue transition-colors"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-black bg-neon-blue hover:bg-neon-blue/90 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              Log Masuk Admin
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
              &larr; Kembali ke Laman Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Tombol Logout */}
      <div className="absolute top-4 right-4 z-50">
         <form action={async () => {
            'use server';
            const c = await cookies();
            c.delete('admin_auth');
            redirect('/');
         }}>
           <button type="submit" className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
             Keluar Admin
           </button>
         </form>
      </div>
      {children}
    </div>
  );
}
