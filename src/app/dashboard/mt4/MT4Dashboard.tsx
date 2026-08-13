'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Download, Plus, RefreshCw, TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react'

export default function MT4Dashboard({ user, accounts, initialTrades }: { user: any, accounts: any[], initialTrades: any[] }) {
  const supabase = createClient()
  const [activeAccount, setActiveAccount] = useState(accounts[0] || null)
  const [trades, setTrades] = useState(initialTrades)
  const [isAdding, setIsAdding] = useState(accounts.length === 0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ broker: '', accountNum: '' })
  const [error, setError] = useState('')

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Generate a random 16 char secret key
    const secretKey = 'fh_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    
    const { data, error: dbError } = await supabase
      .from('trading_accounts')
      .insert({
        user_id: user.id,
        broker_name: formData.broker,
        account_number: parseInt(formData.accountNum),
        secret_key: secretKey
      })
      .select()
      .single()

    if (dbError) {
      console.error(dbError)
      setError('Gagal mendaftar akaun. Sila pastikan nombor akaun tidak diduplikasi.')
      setLoading(false)
      return
    }

    setActiveAccount(data)
    setIsAdding(false)
    setLoading(false)
    // Reload page to fetch new layout
    window.location.reload()
  }

  const refreshTrades = async () => {
    if(!activeAccount) return;
    setLoading(true);
    const { data } = await supabase
      .from('trade_history')
      .select('*')
      .eq('account_id', activeAccount.id)
      .order('close_time', { ascending: false })
      .limit(100);
      
    if(data) setTrades(data);
    setLoading(false);
  }

  // Calculate stats
  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.profit > 0).length;
  const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
  const netProfit = trades.reduce((sum, t) => sum + Number(t.profit) + Number(t.commission) + Number(t.swap), 0);
  
  if (isAdding) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Tambah Akaun MT4/MT5</h2>
        <p className="text-slate-400 mb-8">Daftar nombor akaun trading anda untuk mendapatkan Kunci Rahsia (Secret Key) bagi kegunaan EA ForexHub.</p>
        
        {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3"><AlertCircle className="w-5 h-5"/>{error}</div>}
        
        <form onSubmit={handleAddAccount} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nama Broker</label>
            <input 
              type="text" 
              required
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue" 
              placeholder="Cth: Exness, OctaFX, XM"
              value={formData.broker}
              onChange={(e) => setFormData({...formData, broker: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nombor Akaun MT4/MT5</label>
            <input 
              type="number" 
              required
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue" 
              placeholder="Cth: 12345678"
              value={formData.accountNum}
              onChange={(e) => setFormData({...formData, accountNum: e.target.value})}
            />
          </div>
          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-neon-blue/80 transition-colors disabled:opacity-50"
            >
              {loading ? 'Mendaftar...' : 'Jana Secret Key'}
            </button>
            {accounts.length > 0 && (
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Banner with Secret Key */}
      <div className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-neon-blue/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Sistem Tracking Aktif</h3>
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-lg border border-white/10 w-fit mb-2">
              <span className="text-slate-400">Account No:</span>
              <span className="text-white font-bold">{activeAccount.account_number}</span>
            </div>
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-lg border border-white/10 w-fit">
              <span className="text-slate-400">Secret Key EA:</span>
              <code className="text-neon-blue font-mono font-bold select-all">{activeAccount.secret_key}</code>
            </div>
            <p className="text-sm text-slate-400 mt-2">Sila salin Secret Key ini dan tampal (paste) ke dalam tetapan Robot EA di MT4/MT5 anda.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href="/ea/ForexHub_Tracker.mq4" download className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm">
              <Download className="w-4 h-4" /> Download EA (MT4)
            </a>
            <a href="/ea/ForexHub_Tracker.mq5" download className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors text-sm">
              <Download className="w-4 h-4" /> Download EA (MT5)
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <DollarSign className="w-5 h-5 text-neon-blue" />
            <h4 className="font-medium">Baki Terkini (Balance)</h4>
          </div>
          <p className="text-3xl font-black text-white">${activeAccount.balance}</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Activity className="w-5 h-5 text-neon-purple" />
            <h4 className="font-medium">Ekuiti Semasa (Equity)</h4>
          </div>
          <p className="text-3xl font-black text-white">${activeAccount.equity}</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="font-medium">Win Rate</h4>
          </div>
          <p className="text-3xl font-black text-white">{winRate}%</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <h4 className="font-medium">Keuntungan (Net Profit)</h4>
          </div>
          <p className={`text-3xl font-black ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {netProfit >= 0 ? '+' : '-'}${Math.abs(netProfit).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Trade History */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Sejarah Transaksi (100 Terakhir)</h3>
          <button onClick={refreshTrades} disabled={loading} className="text-slate-400 hover:text-white transition-colors">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Tiket</th>
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Jenis</th>
                <th className="px-6 py-4 font-medium">Lot</th>
                <th className="px-6 py-4 font-medium">Buka</th>
                <th className="px-6 py-4 font-medium">Tutup</th>
                <th className="px-6 py-4 font-medium text-right">Profit ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500">Tiada rekod trading dijumpai. Pastikan EA sedang berjalan di MT4/MT5.</td>
                </tr>
              ) : (
                trades.map((t) => (
                  <tr key={t.ticket} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-slate-300">{t.ticket}</td>
                    <td className="px-6 py-4 font-bold text-white">{t.symbol}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{t.lots}</td>
                    <td className="px-6 py-4 text-slate-400">{t.open_price}</td>
                    <td className="px-6 py-4 text-slate-400">{t.close_price}</td>
                    <td className={`px-6 py-4 text-right font-bold ${t.profit > 0 ? 'text-green-400' : t.profit < 0 ? 'text-red-400' : 'text-slate-300'}`}>
                      {t.profit > 0 ? '+' : ''}{t.profit}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
