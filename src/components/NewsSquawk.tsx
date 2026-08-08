'use client';
import { useState, useEffect, useRef } from 'react';

export default function NewsSquawk() {
  const [news, setNews] = useState<{title: string, summary: string}[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(-1);
  const [hasError, setHasError] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }

    const fetchNews = async () => {
      try {
        const res = await fetch('/api/get-squawk');
        const data = await res.json();
        if (data.success) setNews(data.data);
      } catch (e) {
        console.error('Failed to fetch squawk news');
        setHasError(true);
      }
    };
    fetchNews();

    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const playSquawk = () => {
    if (!synthRef.current || news.length === 0) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setCurrentNewsIndex(-1);
      return;
    }

    setIsPlaying(true);
    let index = 0;

    const speakNext = () => {
      if (index >= news.length || !synthRef.current) {
        setIsPlaying(false);
        setCurrentNewsIndex(-1);
        return;
      }

      setCurrentNewsIndex(index);
      const item = news[index];
      
      // Construct the text to speak
      const textToSpeak = `Pasaran Amaran: ${item.title}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Try to find a Malay voice, fallback to default English
      const voices = synthRef.current.getVoices();
      const myVoice = voices.find(v => v.lang.includes('ms')) || voices.find(v => v.lang.includes('en'));
      if (myVoice) utterance.voice = myVoice;

      utterance.rate = 1.0;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        index++;
        setTimeout(speakNext, 1000); // 1 second pause between news
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setCurrentNewsIndex(-1);
      };

      synthRef.current.speak(utterance);
    };

    speakNext();
  };

  if (news.length === 0 || hasError) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 flex-col sm:flex-row">
      {isPlaying && currentNewsIndex >= 0 && (
        <div className="bg-black/80 backdrop-blur-md border border-neon-blue/50 p-3 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.3)] animate-fade-in-up max-w-xs text-right">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="flex gap-1 h-3 items-end">
              <span className="w-1 h-2 bg-neon-blue animate-[bounce_1s_infinite]"></span>
              <span className="w-1 h-3 bg-neon-purple animate-[bounce_1.2s_infinite]"></span>
              <span className="w-1 h-2 bg-neon-pink animate-[bounce_0.8s_infinite]"></span>
            </span>
            <span className="text-[10px] text-neon-blue font-bold uppercase tracking-wider">Live AI Broadcast</span>
          </div>
          <p className="text-xs text-white line-clamp-2 leading-tight">
            "{news[currentNewsIndex]?.title}"
          </p>
        </div>
      )}

      <button
        onClick={playSquawk}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isPlaying 
            ? 'bg-neon-pink shadow-[0_0_20px_rgba(255,10,120,0.6)] animate-pulse' 
            : 'bg-[#09090b] border-2 border-neon-blue hover:bg-neon-blue/20 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
        }`}
        aria-label="Toggle News Squawk"
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
