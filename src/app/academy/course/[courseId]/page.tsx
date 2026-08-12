import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/data/academyCourses';
import { BookOpen, GraduationCap, Trophy, ChevronLeft, PlayCircle, Clock } from 'lucide-react';
import CourseProgressClient from './CourseProgressClient';

export const dynamic = 'force-dynamic';

export default async function CourseDetail({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <BookOpen className="w-5 h-5 text-success-400" />;
      case 'Intermediate': return <GraduationCap className="w-5 h-5 text-gold-400" />;
      case 'Advanced': return <Trophy className="w-5 h-5 text-neon-purple" />;
      default: return null;
    }
  };

  return (
    <main className="bg-[#09090b] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/academy" className="inline-flex items-center gap-2 text-slate-400 hover:text-neon-blue transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Akademi
          </Link>
        </div>

        {/* Course Header */}
        <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 mb-10 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-bl-full pointer-events-none group-hover:bg-neon-purple/5 transition-colors"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              {getLevelIcon(course.level)}
              <span className="text-slate-300 font-bold tracking-wide">{course.level} Path</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
              {course.title}
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-6 text-sm font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-neon-blue" />
                {course.lessons.length} Modul Pembelajaran
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            Silibus Kursus
            <span className="text-sm font-normal text-slate-400 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Langkah demi langkah
            </span>
          </h2>

          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <CourseProgressClient 
                key={lesson.slug} 
                lesson={lesson} 
                index={index} 
                courseId={course.id}
              />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
