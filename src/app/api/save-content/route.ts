import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { saveToGitHub, deleteFromGitHub } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { collection = 'articles', slug: providedSlug, originalSlug, content, ...metadata } = data;

    if (!metadata.title) {
      return NextResponse.json({ error: 'Title diperlukan' }, { status: 400 });
    }

    // Buat slug
    const slug = providedSlug || metadata.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const id = metadata.id || Date.now().toString();
    const date = metadata.date || new Date().toISOString().split('T')[0];

    // Build markdown frontmatter
    let frontmatter = `---\nid: "${id}"\nslug: "${slug}"\ndate: "${date}"\n`;
    
    // Add all other metadata fields
    Object.keys(metadata).forEach(key => {
      if (key !== 'id' && key !== 'slug' && key !== 'date' && metadata[key] !== undefined) {
        // escape quotes
        const val = typeof metadata[key] === 'string' ? metadata[key].replace(/"/g, '\\"') : metadata[key];
        frontmatter += `${key}: "${val}"\n`;
      }
    });
    
    frontmatter += `---\n\n${content || ''}\n`;

    const dir = path.join(process.cwd(), `content/${collection}`);
    
    if (!process.env.GITHUB_TOKEN) {
      // Local fallback
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    // Buang fail lama jika slug bertukar (edit)
    if (originalSlug && originalSlug !== slug) {
      if (process.env.GITHUB_TOKEN) {
        await deleteFromGitHub(`content/${collection}/${originalSlug}.md`, `CMS: Rename ${originalSlug} to ${slug}`);
      } else {
        const oldFilePath = path.join(dir, `${originalSlug}.md`);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Tulis fail
    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub(`content/${collection}/${slug}.md`, frontmatter, `CMS: Update ${slug}`);
    } else {
      const filePath = path.join(dir, `${slug}.md`);
      fs.writeFileSync(filePath, frontmatter, 'utf8');
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
