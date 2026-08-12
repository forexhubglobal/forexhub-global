'use client';

import Link from 'next/link';
import { useAcademyStore } from '@/store/academyStore';
import { useEffect, useState } from 'react';
import { PlayCircle, CheckCircle2, Clock } from 'lucide-react';
import { AcademyLesson } from '@/data/academyCourses';

export default function CourseProgressClient({ lesson, index, courseId }: { lesson: AcademyLesson, index: number, courseId: string }) {
  const [mounted, setMounted] = useState(false);
  const { isCompleted } = useAcademyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const completed = mounted ? isCompleted(lesson.slug) : false;

  return (
    <Link 
      href={`/academy/lesson/${lesson.slug}`}
      className={`block bg-black/40 backdrop-blur-md rounded-2xl border ${completed ? 'border-success-400/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border-white/5 hover:border-neon-blue/30'} p-5 transition-all duration-300 group`}
    >
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${completed ? 'bg-success-400/10 text-success-400' : 'bg-white/5 text-slate-500 group-hover:bg-neon-blue/10 group-hover:text-neon-blue'}`}>
          {completed ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <PlayCircle className="w-6 h-6" />
          )}
        </div>

        {/* Lesson Info */}
        <div className="flex-1">
          <div className="text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">
            Bab {index + 1}
          </div>
          <h3 className={`text-lg font-bold transition-colors ${completed ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {lesson.title.replace(/^Bab \d+: /, '')}
          </h3>
        </div>

        {/* Duration */}
        {lesson.duration && (
          <div className="hidden sm:flex items-center gap-1 text-sm text-slate-500 font-medium">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
        )}
      </div>
    </Link>
  );
}
