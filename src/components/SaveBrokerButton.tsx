'use client';

import { useBrokerStore } from '@/store/brokerStore';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SaveBrokerButton({ slug, className = "" }: { slug: string, className?: string }) {
  const { savedBrokers, toggleBroker, isSaved } = useBrokerStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const saved = isSaved(slug);

  return (
    <button 
      onClick={() => toggleBroker(slug)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${saved ? 'bg-neon-purple text-black' : 'bg-white/10 text-white hover:bg-white/20'} ${className}`}
    >
      {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
      {saved ? 'Disimpan' : 'Simpan Broker'}
    </button>
  );
}
