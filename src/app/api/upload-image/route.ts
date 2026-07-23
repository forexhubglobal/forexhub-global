import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Tiada fail dijumpai' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Bersihkan nama fail
    const originalName = file.name;
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const uniqueName = `${Date.now()}-${cleanName}`;

    // Pastikan folder public/images wujud
    const dir = path.join(process.cwd(), 'public/images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Tulis fail ke public/images/
    const filePath = path.join(dir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    // Pulangkan pautan (URL) gambar
    return NextResponse.json({ 
      success: true, 
      url: `/images/${uniqueName}` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Gagal memuat naik gambar' }, { status: 500 });
  }
}
