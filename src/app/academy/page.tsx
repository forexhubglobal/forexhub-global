'use client';
import Link from 'next/link';
import { academyCourses } from '@/data/academyCourses';
import { useAcademyStore } from '@/store/academyStore';
import { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Trophy, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AcademyList() {
  const [mounted, setMounted] = useState(false);
  const { getCourseProgress } = useAcademyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-success-400 bg-success-400/10 border-success-400/20';
      case 'Intermediate': return 'text-gold-400 bg-gold-400/10 border-gold-400/20';
      case 'Advanced': return 'text-neon-purple bg-neon-purple/10 border-neon-purple/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <BookOpen className="w-5 h-5" />;
      case 'Intermediate': return <GraduationCap className="w-5 h-5" />;
      case 'Advanced': return <Trophy className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <main className="bg-[#09090b] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-6 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)] relative z-10">
            ForexHub Academy
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light relative z-10">
            Tingkatkan kemahiran trading anda dari tahap asas hingga menjadi profesional dengan laluan pembelajaran terstruktur percuma kami.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {academyCourses.map((course) => {
            const courseSlugs = course.lessons.map(l => l.slug);
            const progress = mounted ? getCourseProgress(courseSlugs) : 0;
            const isCompleted = progress === 100;

            return (
              <div 
                key={course.id} 
                className={`bg-black/40 backdrop-blur-md rounded-2xl border ${isCompleted ? 'border-success-400/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'border-white/10 hover:border-neon-blue/40 hover:shadow-[0_0_25px_rgba(0,243,255,0.15)]'} p-8 transition-all duration-300 flex flex-col h-full group`}
              >
                {/* Level Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold ${getLevelColor(course.level)}`}>
                    {getLevelIcon(course.level)}
                    {course.level}
                  </div>
                  {isCompleted && (
                    <div className="text-success-400 bg-success-400/10 p-2 rounded-full">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                  {course.title}
                </h2>
                
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>

                {/* Progress Bar Area */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-300">{course.lessons.length} Bab</span>
                    <span className={isCompleted ? 'text-success-400' : 'text-neon-blue'}>{progress}% Siap</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-success-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-gradient-to-r from-neon-blue to-neon-purple'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link 
                  href={`/academy/course/${course.id}`} 
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-all ${
                    isCompleted 
                      ? 'bg-success-400/10 text-success-400 border border-success-400/30 hover:bg-success-400/20' 
                      : progress > 0 
                        ? 'bg-neon-blue text-black hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {isCompleted ? 'Ulang Kaji' : progress > 0 ? 'Sambung Belajar' : 'Mula Belajar'}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
