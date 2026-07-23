import { NextResponse } from 'next/server';
import { getDataBySlug } from '@/lib/markdown';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const collection = searchParams.get('collection') || 'articles';

  if (!slug) {
    return NextResponse.json({ error: 'Slug diperlukan' }, { status: 400 });
  }

  try {
    const item = await getDataBySlug(collection, slug);
    if (!item) {
      return NextResponse.json({ error: 'Item tidak wujud' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membaca item' }, { status: 500 });
  }
}
