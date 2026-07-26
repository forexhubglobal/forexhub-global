"use client";
import { useState } from 'react';

export default function ScamList({ initialScams }: { initialScams: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScams = initialScams.filter(scam => 
    scam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    scam.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scam.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-sm border border-white/10">
      {/* Search Bar */}
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-4 bg-[#09090b] border border-white/10 rounded-2xl focus:ring-2 focus:ring-danger-500 focus:border-danger-500 outline-none text-slate-300 font-medium transition-all"
          placeholder="Cari nama broker atau syarikat pelaburan..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredScams.length === 0 ? (
        <div className="text-center py-16 bg-[#09090b] rounded-2xl border border-white/10 border-dashed">
          <p className="text-slate-400 text-lg font-medium">Tiada rekod scam ditemui setakat ini.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-white/10">
                <th className="py-4 px-4 font-black text-white text-sm tracking-wider uppercase bg-[#09090b] rounded-tl-xl">Nama Syarikat / Entiti</th>
                <th className="py-4 px-4 font-black text-white text-sm tracking-wider uppercase bg-[#09090b]">Kategori</th>
                <th className="py-4 px-4 font-black text-white text-sm tracking-wider uppercase bg-[#09090b]">Modus Operandi / Sebab</th>
                <th className="py-4 px-4 font-black text-white text-sm tracking-wider uppercase bg-[#09090b] rounded-tr-xl">Status Semasa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScams.map((scam: any) => (
                <tr key={scam.id} className="hover:bg-red-50/50 transition-colors group">
                  <td className="py-4 px-4 align-top">
                    <span className="font-bold text-white text-base">{scam.name}</span>
                    <div className="text-xs text-slate-400 mt-1">Ditambah pada: {new Date(scam.dateAdded).toLocaleDateString('ms-MY')}</div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <span className="bg-white/5 text-slate-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {scam.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-top text-sm text-slate-400 max-w-md break-words leading-relaxed group-hover:text-white transition-colors">
                    {scam.reason}
                  </td>
                  <td className="py-4 px-4 align-top">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap inline-block ${
                      scam.status === 'Sah Scam' 
                        ? 'bg-danger-100 text-danger-700 border border-danger-200' 
                        : 'bg-warning-100 text-warning-700 border border-warning-200'
                    }`}>
                      {scam.status === 'Sah Scam' ? '🚨 ' : '⚠️ '}
                      {scam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
