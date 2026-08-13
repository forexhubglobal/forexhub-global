import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { GraduationCap, LayoutDashboard, Settings, LineChart } from 'lucide-react'
import Link from 'next/link'
import MT4Dashboard from './MT4Dashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MT4DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch registered trading accounts
  const { data: accounts } = await supabase
    .from('trading_accounts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  let initialTrades: any[] = []
  if (accounts && accounts.length > 0) {
    const { data: trades } = await supabase
      .from('trade_history')
      .select('*')
      .eq('account_id', accounts[0].id)
      .order('close_time', { ascending: false })
      .limit(100)
    
    if (trades) initialTrades = trades
  }

  return (
    <main className="bg-[#09090b] min-h-screen py-10 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">Trading Journal</h1>
          <p className="text-slate-400">Pantau prestasi trading MT4/MT5 anda secara langsung dari Dashboard.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                <LayoutDashboard className="w-5 h-5" />
                Utama
              </Link>
              <Link href="/academy" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                <GraduationCap className="w-5 h-5" />
                Akademi
              </Link>
              <Link href="/dashboard/mt4" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neon-blue/10 text-neon-blue font-bold border border-neon-blue/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                <LineChart className="w-5 h-5" />
                Trading Journal
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                <Settings className="w-5 h-5" />
                Tetapan Profil
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <MT4Dashboard user={user} accounts={accounts || []} initialTrades={initialTrades} />
          </div>

        </div>
      </div>
    </main>
  )
}
