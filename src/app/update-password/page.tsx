import { updatePassword } from '@/app/login/actions'
import { Lock, ShieldCheck } from 'lucide-react'

export default async function UpdatePasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="bg-[#09090b] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-neon-blue to-neon-purple mb-6 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
            <ShieldCheck className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Cipta Kata Laluan Baharu</h1>
          <p className="text-slate-400 text-sm">Sila masukkan kata laluan baharu anda di bawah.</p>
        </div>

        {/* Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Kata Laluan Baharu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  placeholder="Minimum 6 aksara"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                formAction={updatePassword}
                className="w-full bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-neon-blue/80 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
              >
                Kemas Kini Kata Laluan
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  )
}
