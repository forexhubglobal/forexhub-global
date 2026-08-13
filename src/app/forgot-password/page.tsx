import { resetPassword } from '@/app/login/actions'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const { error, message } = await searchParams;

  return (
    <main className="bg-[#09090b] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 mb-6 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Log Masuk</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Lupa Kata Laluan?</h1>
          <p className="text-slate-400 text-sm">Masukkan emel anda dan kami akan hantar pautan rahsia untuk tetapkan semula kata laluan.</p>
        </div>

        {/* Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-500/10 border border-green-500/50 text-[#10b981] text-sm font-medium p-3 rounded-xl mb-6 text-center">
              {message}
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

            <div className="pt-2">
              <button 
                formAction={resetPassword}
                className="w-full bg-neon-purple text-white font-bold py-3 rounded-xl hover:bg-neon-purple/80 hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all"
              >
                Hantar Pautan Reset
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  )
}
