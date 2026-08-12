import { login, signup } from './actions'
import { Mail, Lock, ShieldCheck, Globe } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="bg-[#09090b] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
              <span className="font-bold text-black text-xl">F</span>
            </div>
            <span className="text-2xl font-black text-white">ForexHub</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Selamat Kembali!</h1>
          <p className="text-slate-400 text-sm">Log masuk untuk simpan rekod kemajuan Akademi anda.</p>
        </div>

        {/* Login Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Alamat E-mel</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Kata Laluan</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                formAction={login}
                className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-neon-blue/80 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
              >
                Log Masuk
              </button>
              <button 
                formAction={signup}
                className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 hover:bg-white/20 transition-all"
              >
                Daftar Baru
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Atau</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button 
            type="button"
            className="mt-6 w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
          >
            <Globe className="w-5 h-5 mr-2" />
            Teruskan dengan Google
          </button>
          
          <p className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            Maklumat anda dilindungi dengan penyulitan gred bank.
          </p>

        </div>
      </div>
    </main>
  )
}
