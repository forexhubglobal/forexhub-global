import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, category, author, excerpt, content, image, originalSlug } = data;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title dan content diperlukan' }, { status: 400 });
    }

    // Buat slug dari tajuk
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const id = Date.now().toString();
    const date = new Date().toISOString().split('T')[0];
    const finalImage = image || 'bg-primary-500'; // Warna lalai jika tiada gambar

    // Format fail markdown
    const markdownContent = `---
id: "${id}"
title: "${title.replace(/"/g, '\\"')}"
category: "${category || 'Berita'}"
date: "${date}"
author: "${author || 'Admin'}"
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
image: "${finalImage}"
---

${content}
`;

    // Tulis fail ke public/images/ (wait this is save-article, it writes to content/articles)
    // Pastikan folder wujud
    const dir = path.join(process.cwd(), 'content/articles');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Buang fail lama jika slug bertukar (edit)
    if (originalSlug && originalSlug !== slug) {
      const oldFilePath = path.join(dir, `${originalSlug}.md`);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Tulis fail
    const filePath = path.join(dir, `${slug}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan artikel' }, { status: 500 });
  }
}
