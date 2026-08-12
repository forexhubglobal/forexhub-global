import { notFound } from 'next/navigation';
import { getLessonDetails } from '@/data/academyCourses';
import { getDataBySlug } from '@/lib/markdown';
import LessonClientLayout from './LessonClientLayout';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Ambil maklumat silibus dari struktur kursus
  const details = getLessonDetails(slug);
  if (!details) {
    // Jika artikel wujud tapi tak masuk dalam kursus, kita fallback 404
    notFound();
  }

  // Ambil kandungan markdown
  const article = await getDataBySlug('articles', slug);
  if (!article) {
    notFound();
  }

  return (
    <LessonClientLayout 
      course={details.course}
      currentLesson={details.lesson}
      nextLesson={details.nextLesson}
      prevLesson={details.prevLesson}
      contentHtml={article.contentHtml}
      articleTitle={article.title}
    />
  );
}
