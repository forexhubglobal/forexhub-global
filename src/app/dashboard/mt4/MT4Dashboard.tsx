'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Download, Plus, RefreshCw, TrendingUp, DollarSign, Activity, AlertCircle, Trash2, PieChart as PieChartIcon, BarChart2, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'

const COLORS = ['#00f3ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];
const STRATEGY_OPTIONS = ['Tiada Tag', 'Breakout', 'Trend Following', 'Scalping', 'SMC', 'Swing', 'News Trading'];

export default function MT4Dashboard({ user, accounts: initialAccounts, initialTrades }: { user: any, accounts: any[], initialTrades: any[] }) {
  const supabase = createClient()
  
  const [accounts, setAccounts] = useState(initialAccounts)
  const [activeAccount, setActiveAccount] = useState(initialAccounts[0] || null)
  const [trades, setTrades] = useState(initialTrades)
  
  const [isAdding, setIsAdding] = useState(initialAccounts.length === 0)
  const [loading, setLoading] = useState(false)
  const [fetchingTrades, setFetchingTrades] = useState(false)
  const [formData, setFormData] = useState({ broker: '', accountNum: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (activeAccount) {
      refreshTrades(activeAccount.id)
    }
  }, [activeAccount?.id])

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const secretKey = 'fh_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    
    const { data, error: dbError } = await supabase
      .from('trading_accounts')
      .insert({ user_id: user.id, broker_name: formData.broker, account_number: parseInt(formData.accountNum), secret_key: secretKey })
      .select().single()

    if (dbError) {
      setError('Gagal mendaftar akaun. Sila cuba lagi.')
      setLoading(false)
      return
    }

    setAccounts([data, ...accounts])
    setActiveAccount(data)
    setIsAdding(false)
    setFormData({ broker: '', accountNum: '' })
    setLoading(false)
  }

  const handleDeleteAccount = async (accountId: string) => {
    if (!window.confirm("Adakah anda pasti mahu memadam akaun ini? Semua rekod sejarah trading akan dipadam secara kekal.")) return;
    setLoading(true)
    const { error } = await supabase.from('trading_accounts').delete().eq('id', accountId)
    if (error) {
      alert("Gagal memadam akaun.")
      setLoading(false)
      return
    }
    const remaining = accounts.filter(a => a.id !== accountId)
    setAccounts(remaining)
    setActiveAccount(remaining[0] || null)
    if (remaining.length === 0) { setIsAdding(true); setTrades([]); }
    setLoading(false)
  }

  const refreshTrades = async (accountId = activeAccount?.id) => {
    if(!accountId) return;
    setFetchingTrades(true);
    const { data } = await supabase.from('trade_history').select('*').eq('account_id', accountId).order('close_time', { ascending: false }).limit(500);
    if(data) setTrades(data);
    setFetchingTrades(false);
  }

  const handleTagStrategy = async (ticket: string, tag: string) => {
    const updatedTrades = trades.map(t => t.ticket === ticket ? { ...t, strategy_tag: tag === 'Tiada Tag' ? null : tag } : t);
    setTrades(updatedTrades);
    await supabase.from('trade_history').update({ strategy_tag: tag === 'Tiada Tag' ? null : tag }).eq('ticket', ticket).eq('account_id', activeAccount.id);
  }

  // ---- Advanced Analytics Calculations ----
  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.profit > 0).length;
  const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
  const netProfit = trades.reduce((sum, t) => sum + Number(t.profit) + Number(t.commission) + Number(t.swap), 0);
  
  const grossProfit = trades.filter(t => t.profit > 0).reduce((sum, t) => sum + Number(t.profit), 0)
  const grossLoss = trades.filter(t => t.profit < 0).reduce((sum, t) => sum + Math.abs(Number(t.profit)), 0)
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? '∞' : '0.00'

  // Equity Curve Data
  const chronologicalTrades = [...trades].sort((a, b) => new Date(a.close_time).getTime() - new Date(b.close_time).getTime());
  let runningProfit = 0;
  const equityData = chronologicalTrades.map((t, index) => {
    runningProfit += (Number(t.profit) + Number(t.commission) + Number(t.swap));
    return { 
      index: index,
      dateLabel: new Date(t.close_time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), 
      fullDate: new Date(t.close_time).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' }),
      profit: parseFloat(runningProfit.toFixed(2)) 
    }
  });

  // Session Breakdown
  let asian = 0, london = 0, ny = 0;
  trades.forEach(t => {
    const hour = new Date(t.open_time).getUTCHours();
    if (hour >= 23 || hour < 8) asian++;
    else if (hour >= 8 && hour < 13) london++;
    else ny++;
  });
  const sessionData = [
    { name: 'Asian Session', value: asian },
    { name: 'London Session', value: london },
    { name: 'New York Session', value: ny }
  ].filter(s => s.value > 0);

  // Strategy Analytics
  const strategyDataObj: Record<string, { name: string, profit: number, count: number }> = {};
  trades.forEach(t => {
    const tag = t.strategy_tag || 'Tiada Tag';
    if (!strategyDataObj[tag]) strategyDataObj[tag] = { name: tag, profit: 0, count: 0 };
    strategyDataObj[tag].profit += (Number(t.profit) + Number(t.commission) + Number(t.swap));
    strategyDataObj[tag].count++;
  });
  const strategyData = Object.values(strategyDataObj).map(d => ({ ...d, profit: parseFloat(d.profit.toFixed(2)) })).sort((a,b) => b.profit - a.profit);

  // Risk-to-Reward Tracking
  let sumPlannedRR = 0, sumRealizedRR = 0, rrCount = 0;
  trades.forEach(t => {
    if (t.sl && t.tp && Number(t.sl) !== 0 && Number(t.tp) !== 0) {
      const op = Number(t.open_price), sl = Number(t.sl), tp = Number(t.tp), cp = Number(t.close_price);
      const risk = t.type === 'BUY' ? op - sl : sl - op;
      const reward = t.type === 'BUY' ? tp - op : op - tp;
      const realizedReward = t.type === 'BUY' ? cp - op : op - cp;
      
      if (risk > 0) {
        sumPlannedRR += (reward / risk);
        sumRealizedRR += (realizedReward / risk);
        rrCount++;
      }
    }
  });
  const avgPlannedRR = rrCount > 0 ? (sumPlannedRR / rrCount).toFixed(2) : '0.00';
  const avgRealizedRR = rrCount > 0 ? (sumRealizedRR / rrCount).toFixed(2) : '0.00';

  if (isAdding) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Tambah Akaun MT4/MT5</h2>
        <p className="text-slate-400 mb-8">Daftar nombor akaun trading anda untuk mendapatkan Kunci Rahsia (Secret Key) bagi kegunaan EA ForexHub.</p>
        
        {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3"><AlertCircle className="w-5 h-5"/>{error}</div>}
        
        <form onSubmit={handleAddAccount} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nama Broker</label>
            <input type="text" required className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue" placeholder="Cth: Exness, OctaFX, XM" value={formData.broker} onChange={(e) => setFormData({...formData, broker: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nombor Akaun MT4/MT5</label>
            <input type="number" required className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue" placeholder="Cth: 12345678" value={formData.accountNum} onChange={(e) => setFormData({...formData, accountNum: e.target.value})} />
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-neon-blue/80 transition-colors disabled:opacity-50">
              {loading ? 'Mendaftar...' : 'Jana Secret Key'}
            </button>
            {accounts.length > 0 && <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5">Batal</button>}
          </div>
        </form>
      </div>
    )
  }

  if (!activeAccount) return null;

  return (
    <div className="space-y-8">
      {/* Account Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => setActiveAccount(acc)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeAccount.id === acc.id 
              ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeAccount.id === acc.id ? 'bg-black' : 'bg-slate-500'}`}></div>
            {acc.broker_name} ({acc.account_number})
          </button>
        ))}
        <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-transparent border border-dashed border-white/30 text-slate-400 hover:text-white hover:border-white/60 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Akaun
        </button>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-neon-blue/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">Sistem Tracking Aktif</h3>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20 font-bold uppercase tracking-wider">Berhubung</span>
            </div>
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-lg border border-white/10 w-fit mb-2">
              <span className="text-slate-400">Account No:</span>
              <span className="text-white font-bold">{activeAccount.account_number}</span>
            </div>
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-lg border border-white/10 w-fit">
              <span className="text-slate-400">Secret Key EA:</span>
              <code className="text-neon-blue font-mono font-bold select-all">{activeAccount.secret_key}</code>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href="/ea/ForexHub_Tracker.mq4" download className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm">
              <Download className="w-4 h-4" /> Download EA (MT4)
            </a>
            <a href="/ea/ForexHub_Tracker.mq5" download className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors text-sm">
              <Download className="w-4 h-4" /> Download EA (MT5)
            </a>
            <button onClick={() => handleDeleteAccount(activeAccount.id)} disabled={loading} className="inline-flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-2 rounded-lg font-bold hover:bg-red-500/20 transition-colors text-sm mt-2 disabled:opacity-50">
              <Trash2 className="w-4 h-4" /> Padam Akaun Ini
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="col-span-2 bg-black border border-white/10 rounded-2xl p-5">
          <div className="text-slate-400 mb-1 text-sm font-medium">Balance</div>
          <p className="text-2xl font-black text-white">${activeAccount.balance?.toLocaleString() || '0'}</p>
        </div>
        <div className="col-span-2 bg-black border border-white/10 rounded-2xl p-5">
          <div className="text-slate-400 mb-1 text-sm font-medium">Net Profit</div>
          <p className={`text-2xl font-black ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {netProfit >= 0 ? '+' : '-'}${Math.abs(netProfit).toFixed(2)}
          </p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="text-slate-400 mb-1 text-sm font-medium">Win Rate</div>
          <p className="text-2xl font-black text-white">{winRate}%</p>
        </div>
        <div className="bg-black border border-white/10 rounded-2xl p-5">
          <div className="text-slate-400 mb-1 text-sm font-medium">Profit Factor</div>
          <p className="text-2xl font-black text-neon-blue">{profitFactor}</p>
        </div>
        <div className="col-span-2 bg-black border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><Target className="w-24 h-24 text-neon-purple"/></div>
          <div className="text-slate-400 mb-1 text-sm font-medium relative z-10">Avg Realized R:R</div>
          <p className="text-2xl font-black text-neon-purple relative z-10">1 : {avgRealizedRR}</p>
          <p className="text-xs text-slate-500 relative z-10">Planned: 1 : {avgPlannedRR}</p>
        </div>
      </div>

      {/* Advanced Analytics Graphs */}
      {trades.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equity Curve */}
          <div className="lg:col-span-3 bg-black border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold text-white">Cumulative Profit (Equity Curve)</h3>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={equityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="profit" stroke="#00f3ff" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                  <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="index" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => equityData[val]?.dateLabel} minTickGap={30} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    labelFormatter={(val) => equityData[val]?.fullDate}
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }} 
                    itemStyle={{ color: '#00f3ff', fontWeight: 'bold' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Breakdown */}
          <div className="bg-black border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-5 h-5 text-neon-purple" />
              <h3 className="text-lg font-bold text-white">Sesi Dagangan</h3>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sessionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {sessionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Strategy Analytics */}
          <div className="lg:col-span-2 bg-black border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Prestasi Strategi (Setup Analytics)</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strategyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {strategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Trade History Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
        {fetchingTrades && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Sejarah Transaksi</h3>
          <button onClick={() => refreshTrades()} disabled={fetchingTrades} className="text-slate-400 hover:text-white transition-colors">
            <RefreshCw className={`w-5 h-5 ${fetchingTrades ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-black/80 text-slate-400 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 font-medium">Tiket</th>
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Jenis</th>
                <th className="px-6 py-4 font-medium">Tag Strategi</th>
                <th className="px-6 py-4 font-medium text-right">Profit ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">Tiada rekod trading dijumpai. Pastikan EA sedang berjalan.</td>
                </tr>
              ) : (
                trades.map((t) => (
                  <tr key={t.ticket} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-slate-300">{t.ticket}</td>
                    <td className="px-6 py-4 font-bold text-white">{t.symbol}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{t.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="bg-black border border-white/20 text-xs text-white rounded px-2 py-1 focus:outline-none focus:border-neon-blue"
                        value={t.strategy_tag || 'Tiada Tag'}
                        onChange={(e) => handleTagStrategy(t.ticket, e.target.value)}
                      >
                        {STRATEGY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
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
