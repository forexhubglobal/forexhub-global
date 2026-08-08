import { NextResponse } from 'next/server';
import { getAllData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const articles = await getAllData('articles');
    
    // Sort by date (descending) and get top 5
    const latestArticles = articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    const squawkData = latestArticles.map(article => ({
      title: article.title,
      summary: article.description || article.title
    }));

    return NextResponse.json({ success: true, data: squawkData });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
