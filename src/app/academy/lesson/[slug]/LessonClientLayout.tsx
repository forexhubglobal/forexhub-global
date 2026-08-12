'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AcademyCourse, AcademyLesson } from '@/data/academyCourses';
import { useAcademyStore } from '@/store/academyStore';
import { Menu, X, ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import MarkdownStyles from '@/components/MarkdownStyles'; // We'll create this or use existing prose styles

export default function LessonClientLayout({
  course,
  currentLesson,
  nextLesson,
  prevLesson,
  contentHtml,
  articleTitle
}: {
  course: AcademyCourse;
  currentLesson: AcademyLesson;
  nextLesson: AcademyLesson | null;
  prevLesson: AcademyLesson | null;
  contentHtml: string;
  articleTitle: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const { isCompleted, markAsComplete, getCourseProgress } = useAcademyStore();

  useEffect(() => {
    setMounted(true);
    // Tutup sidebar bila route berubah di mobile
    setSidebarOpen(false);
  }, [currentLesson.slug]);

  const completed = mounted ? isCompleted(currentLesson.slug) : false;
  
  const courseSlugs = course.lessons.map(l => l.slug);
  const progress = mounted ? getCourseProgress(courseSlugs) : 0;

  const handleCompleteAndContinue = () => {
    markAsComplete(currentLesson.slug);
    if (nextLesson) {
      router.push(`/academy/lesson/${nextLesson.slug}`);
    } else {
      router.push(`/academy/course/${course.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col md:flex-row relative">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden sticky top-[72px] z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-sm font-bold text-white truncate">{course.title}</span>
        </div>
        <div className="text-xs font-bold text-neon-blue">{progress}% Siap</div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Silibus */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-white/10 flex flex-col transition-transform duration-300 md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10">
          <div>
            <Link href={`/academy/course/${course.id}`} className="text-xs text-slate-400 hover:text-neon-blue flex items-center gap-1 mb-2">
              <ChevronLeft className="w-3 h-3" /> Kembali ke Kursus
            </Link>
            <h3 className="font-bold text-white text-lg leading-tight">{course.title}</h3>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
          {course.lessons.map((lesson, index) => {
            const isCurrent = lesson.slug === currentLesson.slug;
            const isDone = mounted ? isCompleted(lesson.slug) : false;

            return (
              <Link
                key={lesson.slug}
                href={`/academy/lesson/${lesson.slug}`}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                  isCurrent 
                    ? 'bg-neon-blue/10 border border-neon-blue/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`mt-0.5 ${isDone ? 'text-success-400' : isCurrent ? 'text-neon-blue' : 'text-slate-600'}`}>
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                <div>
                  <div className={`text-xs font-bold mb-1 ${isCurrent ? 'text-neon-blue' : 'text-slate-500'}`}>Bab {index + 1}</div>
                  <div className={`text-sm font-medium leading-snug ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                    {lesson.title.replace(/^Bab \d+: /, '')}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Total Progress in Sidebar */}
        <div className="p-4 border-t border-white/10 bg-black/80 backdrop-blur-md absolute bottom-0 left-0 right-0">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-slate-400">Kemajuan Keseluruhan</span>
            <span className={progress === 100 ? 'text-success-400' : 'text-neon-blue'}>{progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-success-400' : 'bg-gradient-to-r from-neon-blue to-neon-purple'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center bg-[#09090b]">
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          
          <article className="prose prose-invert prose-neon max-w-none mb-16">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>

          {/* Bottom Action Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="w-full sm:w-auto flex justify-start">
              {prevLesson ? (
                <Link href={`/academy/lesson/${prevLesson.slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Bab Sebelumnya</span>
                </Link>
              ) : (
                <div className="w-24"></div> // Spacer
              )}
            </div>

            <button 
              onClick={handleCompleteAndContinue}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                completed 
                  ? 'bg-success-400/20 text-success-400 border border-success-400/50 hover:bg-success-400/30' 
                  : 'bg-neon-blue text-black hover:bg-neon-blue/80 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]'
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Selesai
                  {nextLesson && <ChevronRight className="w-5 h-5 ml-2" />}
                </>
              ) : (
                <>
                  Tandakan Selesai & Teruskan
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

          </div>
        </div>
      </main>
      
    </div>
  );
}
