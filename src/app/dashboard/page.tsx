import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { GraduationCap, LayoutDashboard, Bookmark, Settings, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch real progress from cloud
  const { data: progressData } = await supabase
    .from('user_progress')
    .select('completed_lessons')
    .eq('user_id', user.id)
    .single();

  const completedCount = progressData?.completed_lessons?.length || 0;
  const totalLessons = 69; // We have 69 total academy lessons
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <main className="bg-[#09090b] min-h-screen py-10 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">Dashboard Pengguna</h1>
            <p className="text-slate-400">Selamat datang kembali, <span className="text-neon-blue font-bold">{user.email}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neon-blue/10 text-neon-blue font-bold border border-neon-blue/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                <LayoutDashboard className="w-5 h-5" />
                Utama
              </Link>
              <Link href="/academy" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                <GraduationCap className="w-5 h-5" />
                Akademi
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                <Settings className="w-5 h-5" />
                Tetapan Profil
              </Link>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <GraduationCap className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center text-neon-purple">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-white mb-1">{progressPercentage}%</h3>
                <p className="text-slate-400 text-sm">Kemajuan Akademi ({completedCount}/{totalLessons} Bab Selesai)</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                  <div className="bg-gradient-to-r from-neon-purple to-neon-blue h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400">
                    <Bookmark className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-white mb-1">TBA</h3>
                <p className="text-slate-400 text-sm">Broker Disimpan & Ulasan (Akan Datang)</p>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/20 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 md:flex justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Teruskan Pembelajaran Anda</h3>
                  <p className="text-slate-300 max-w-lg">Sistem simpanan profil (Cloud) telah berjaya disambungkan. Rekod akademi anda kini disegerakkan secara automatik ke pangkalan data selamat kami.</p>
                </div>
                <Link href="/academy" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors shrink-0">
                  Sambung Belajar
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
