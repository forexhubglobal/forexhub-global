import { NextResponse } from 'next/server';
import { getAllData } from '@/lib/markdown';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection') || 'articles';

  try {
    const items = getAllData(collection);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membaca senarai' }, { status: 500 });
  }
}
