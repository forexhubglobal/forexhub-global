'use client';

import { useEffect, useState } from 'react';
import { useBrokerStore } from '@/store/brokerStore';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function SavedBrokersList() {
  const { savedBrokers } = useBrokerStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-12 w-12 bg-white/10 rounded-xl mb-4"></div>
        <div className="h-10 w-24 bg-white/10 rounded-lg mb-2"></div>
        <div className="h-4 w-40 bg-white/10 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative group overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Bookmark className="w-24 h-24" />
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400">
          <Bookmark className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-4xl font-black text-white mb-1">{savedBrokers.length}</h3>
      <p className="text-slate-400 text-sm mb-4">Broker Disimpan</p>

      {savedBrokers.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-4 relative z-10">
          {savedBrokers.map((slug) => (
            <Link 
              key={slug} 
              href={`/broker/${slug}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors capitalize"
            >
              {slug.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic relative z-10 mt-4">Belum ada broker disimpan.</p>
      )}
    </div>
  );
}
