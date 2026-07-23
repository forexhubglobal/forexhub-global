"use client";

import { useState } from 'react';

export default function CompareClient({ brokers }: { brokers: any[] }) {
  const [brokerA, setBrokerA] = useState(brokers[0]?.slug || '');
  const [brokerB, setBrokerB] = useState(brokers[1]?.slug || '');

  const dataA = brokers.find(b => b.slug === brokerA);
  const dataB = brokers.find(b => b.slug === brokerB);

  return (
    <div className="mb-20">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            Perbandingan "Head-to-Head"
            <svg className="w-8 h-8 text-primary-500 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-12">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Broker Pertama</label>
              <select 
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 font-bold text-slate-900 shadow-sm"
                value={brokerA}
                onChange={(e) => setBrokerA(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate">{b.title}</option>)}
              </select>
            </div>
            
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg rotate-12">
                VS
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Broker Kedua</label>
              <select 
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 font-bold text-slate-900 shadow-sm"
                value={brokerB}
                onChange={(e) => setBrokerB(e.target.value)}
              >
                {brokers.map(b => <option key={b.slug} value={b.slug} className="notranslate">{b.title}</option>)}
              </select>
            </div>
          </div>

          {dataA && dataB && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white">
                    <th className="p-4 border-b border-slate-200 text-slate-500 font-medium">Ciri-ciri</th>
                    <th className="p-6 border-b border-slate-200 border-l text-center w-[40%]">
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 mx-auto flex items-center justify-center text-slate-700 font-bold mb-3 shadow-sm overflow-hidden relative">
                        {dataA.logo ? <img src={dataA.logo} alt={dataA.title} className="w-full h-full object-cover" /> : <span>{dataA.title.charAt(0)}</span>}
                      </div>
                      <div className="text-xl font-bold text-slate-900 notranslate">{dataA.title}</div>
                    </th>
                    <th className="p-6 border-b border-slate-200 border-l text-center w-[40%]">
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 mx-auto flex items-center justify-center text-slate-700 font-bold mb-3 shadow-sm overflow-hidden relative">
                        {dataB.logo ? <img src={dataB.logo} alt={dataB.title} className="w-full h-full object-cover" /> : <span>{dataB.title.charAt(0)}</span>}
                      </div>
                      <div className="text-xl font-bold text-slate-900 notranslate">{dataB.title}</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-4 font-semibold text-slate-700">Rating Global</td>
                    <td className="p-4 text-center font-bold text-gold-600 border-l">{dataA.rating}/5.0</td>
                    <td className="p-4 text-center font-bold text-gold-600 border-l">{dataB.rating}/5.0</td>
                  </tr>
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-4 font-semibold text-slate-700">Deposit Minimum</td>
                    <td className="p-4 text-center font-medium border-l">${dataA.minDeposit}</td>
                    <td className="p-4 text-center font-medium border-l">${dataB.minDeposit}</td>
                  </tr>
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-4 font-semibold text-slate-700">Max Leverage</td>
                    <td className="p-4 text-center font-medium border-l">{dataA.leverage}</td>
                    <td className="p-4 text-center font-medium border-l">{dataB.leverage}</td>
                  </tr>
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-4 font-semibold text-slate-700">Spread EUR/USD</td>
                    <td className="p-4 text-center font-medium border-l">{dataA.spread} pips</td>
                    <td className="p-4 text-center font-medium border-l">{dataB.spread} pips</td>
                  </tr>
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-4 font-semibold text-slate-700">Regulators</td>
                    <td className="p-4 text-center text-sm font-medium border-l">{dataA.regulators}</td>
                    <td className="p-4 text-center text-sm font-medium border-l">{dataB.regulators}</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-6 bg-white border-t border-slate-200 grid grid-cols-2 gap-4">
                <a href={`/broker/${dataA.slug}`} className="block text-center py-3 px-4 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">Baca Review {dataA.title}</a>
                <a href={`/broker/${dataB.slug}`} className="block text-center py-3 px-4 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">Baca Review {dataB.title}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
